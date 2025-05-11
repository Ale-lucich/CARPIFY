import React from 'react';

const Modal = ({ videoId, onClose }) => {
    if (!videoId) return null;

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <lite-youtube videoid={videoId} style={{ width: '100%', height: '315px' }}></lite-youtube>
                <button onClick={onClose} className="close-button">Cerrar</button>
            </div>
        </div>
    );
};

export default Modal;
