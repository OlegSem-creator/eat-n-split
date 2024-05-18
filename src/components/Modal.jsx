export default function Modal({ isOpen, onClose, onConfirm, message }) {
	if (!isOpen) return null

	return (
		<div className='modal'>
			<div className='modal-content'>
				<p>{message}</p>
				<button onClick={onConfirm} className='button'>Yes</button>
				<button onClick={onClose} className='button'>No</button>
			</div>
		</div>
	)
}
