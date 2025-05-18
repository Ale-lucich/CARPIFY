import React, { useEffect } from 'react';

const Modal = ({ url, onCerrar }) => {
    useEffect(() => {
        const closeOnEscape = (e) => e.key === 'Escape' && onCerrar();
        window.addEventListener('keydown', closeOnEscape);
        return () => window.removeEventListener('keydown', closeOnEscape);
    }, [onCerrar]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onCerrar();
        }
    };

    return (
        <div 
            className="modal-backdrop" 
            onClick={handleBackdropClick} 
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <button 
                onClick={onCerrar} 
                style={{
                    position: 'fixed',
                    top: '15px',
                    right: '20px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    fontSize: '20px',
                    color: 'white',
                    cursor: 'pointer',
                }}
            >
                Cerrar
            </button>
            <div 
                className="modal-content" 
                style={{
                    width: '80%',
                    maxWidth: '1000px',
                    backgroundColor: 'red',
                    borderRadius: '10px',
                    padding: '8px',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <iframe
                    width="100%"
                    height="400"
                    src={`https://www.youtube.com/embed/${url}?autoplay=1&rel=0`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="YouTube Video Player"
                    style={{
                        borderRadius: '10px'
                    }}
                ></iframe>
            </div>
        </div>
    );
};

export default Modal;
