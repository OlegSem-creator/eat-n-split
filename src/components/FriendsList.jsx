import { useState } from 'react'
import Modal from './Modal'

export default function FriendsList({
	friends,
	selectedFriendId,
	onFriendClick,
	visitsSummaries,
	onDeleteFriend,
}) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [friendToDelete, setFriendToDelete] = useState(null)

	const openModal = (friend) => {
		setFriendToDelete(friend)
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setFriendToDelete(null)
		setIsModalOpen(false)
	}

	const handleConfirmDelete = () => {
		onDeleteFriend(friendToDelete.id)
		closeModal()
	}

	return (
		<>
			<ul>
				{friends.map((friend) => {
					const summary = visitsSummaries[friend.id]
					let finalDebtText = 'No debts'

					if (summary) {
						if (summary.finalDebt < 0) {
							finalDebtText = `You owe ${friend.name}: ${Math.abs(summary.finalDebt)}$`
						} else if (summary.finalDebt > 0) {
							finalDebtText = `${friend.name} owes you: ${summary.finalDebt}$`
						} else {
							finalDebtText = `You and ${friend.name} are even`
						}
					}

					const debtClass = summary ? (summary.finalDebt < 0 ? 'red' : summary.finalDebt > 0 ? 'green' : '') : ''

					return (
						<li
							key={friend.id}
							onClick={() => onFriendClick(friend.id)}
							className={selectedFriendId === friend.id ? 'selected' : 'friend-content-box'}
						>
							<img src={friend.image} alt={friend.name} />
							<div className='friend-content'>
								<h3>
									{friend.name}
									<span className='delete-button'><button onClick={() => openModal(friend)} >x</button></span>
								</h3>
								<p className={debtClass}>
									{finalDebtText}
								</p>
							</div>
						</li>
					)
				})}
			</ul>

			<Modal
				isOpen={isModalOpen}
				onClose={closeModal}
				onConfirm={handleConfirmDelete}
				message={`Are you sure you want to delete ${friendToDelete ? friendToDelete.name : ''}?`}
			/>
		</>
	)
}


