import React, { useState, useEffect } from 'react';
import Modal from './Modal.jsx';
import './App.css';

const App = () => {
    const [canciones, setCanciones] = useState([]);
    const [nombre, setNombre] = useState('');
    const [url, setUrl] = useState('');
    const [Busqueda, setBusqueda] = useState('');
    const [videoID, setVideoID] = useState(null);
    const [mensaje, setMensaje] = useState(null);

    useEffect(() => {
        const cancionesGuardadas = JSON.parse(localStorage.getItem('canciones')) || [];
        setCanciones(cancionesGuardadas);
    }, []);

    const mostrarMensaje = (texto, tipo = 'exito') => {
        setMensaje({ texto, tipo });
        setTimeout(() => setMensaje(null), 2000);
    };

    const agregarCancion = (e) => {
        e.preventDefault();
        const regexYoutube = /^(https?:\/\/)?((www\.)?(youtube\.com|youtu\.be)\/).+/;
        const esDuplicada = canciones.some(cancion => cancion.url === url.trim());
        if (!nombre.trim()) {
            mostrarMensaje('Falta el nombre de la canción', 'error');
            return;
        }
        if (!regexYoutube.test(url.trim())) {
            mostrarMensaje('La URL debe ser un enlace válido o de YouTube', 'error');
            return;
        }
        if (esDuplicada) {
            mostrarMensaje('URL ya guardada', 'error');
            return;
        }
        const nuevasCanciones = [...canciones, { nombre: nombre.trim(), url: url.trim(), reproducciones: 0 }];
        setCanciones(nuevasCanciones);
        localStorage.setItem('canciones', JSON.stringify(nuevasCanciones));
        setNombre('');
        setUrl('');
        mostrarMensaje('Canción guardada con éxito');
    };

const obtenerIdVideo = (url) => {
    const regex = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

    const reproducirCancion = (index) => {
        const cancionesActualizadas = [...canciones];
        cancionesActualizadas[index].reproducciones += 1;
        setCanciones(cancionesActualizadas);
        localStorage.setItem('canciones', JSON.stringify(cancionesActualizadas));
        setVideoID(obtenerIdVideo(cancionesActualizadas[index].url));
    };

    const cancionesFiltradas = canciones.filter(cancion => 
        cancion.nombre.toLowerCase().includes(Busqueda.toLowerCase())
    );

    const ordenarPorReproducciones = () => {
        const ordenadas = [...canciones].sort((a, b) => b.reproducciones - a.reproducciones);
        setCanciones(ordenadas);
    };

    return (
        <div>
            <h1 className='titulo'>CARP<span className='titulo2'>IFY</span></h1>

            {mensaje && (
                <div className={`message ${mensaje.tipo}`}>{mensaje.texto}</div>
            )}

            <form onSubmit={agregarCancion} className="formulario">
                <input 
                    className="form-textbox"
                    type="text" 
                    placeholder="Nombre de la canción" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input 
                    className="form-textbox"
                    type="text" 
                    placeholder="URL del video" 
                    value={url} 
                    onChange={(e) => setUrl(e.target.value)}
                />
                <button className="boton-guardar" type="submit">Guardar</button>
            </form>

            <input 
                type="text" 
                placeholder="Nombre del tema..." 
                value={Busqueda} 
                onChange={(e) => setBusqueda(e.target.value)}
                className="buscador"
            />

            <button onClick={ordenarPorReproducciones} className="boton-ordenar">Ordenar por reproducciones</button>

            <ul>
                {cancionesFiltradas.map((cancion, index) => (
                    <li key={index} className="cancion">
                        <span>{cancion.nombre}</span>
                        <button onClick={() => reproducirCancion(index)} className="boton-play">Play</button>
                        <span>Escuchado: {cancion.reproducciones} veces</span>
                    </li>
                ))}
            </ul>

            {videoID && (
                <Modal videoId={videoID} onClose={() => setVideoID(null)} />
            )}
        </div>
    );
};

export default App;