import React from 'react';

const ConfirmationModal = ({ isOpen, onCancel, onConfirm, message }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <p>{message}</p>
                <div className="modal-buttons">
                    <button className="modal-button" onClick={onCancel}>Cancel</button>
                    <button className="modal-button" onClick={onConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
