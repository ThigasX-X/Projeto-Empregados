import './style.css'

function ConfirmationModal({ isOpen, message, onClose, onConfirm }) {
    if (!isOpen) {
        return null
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>
                <div className="modal-buttons">
                    <button className='modal-button cancel' onClick={onClose}>
                        Cancelar
                    </button>
                    <button className='modal-button confirm-delete' onClick={onConfirm}>
                        Deletar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal