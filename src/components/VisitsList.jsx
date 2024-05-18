import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getVisitsByFriendId, getVisitsSummaryByFriendId } from '../features/selectors'
import { deleteVisit } from '../features/visitSlice'

import Modal from './Modal'

export default function VisitsList({ friendId, friendName }) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [visitToDeleteId, setVisitToDeleteId] = useState(null)

	const dispatch = useDispatch()

	const visits = useSelector((state) => getVisitsByFriendId(state, friendId))
	const summary = useSelector((state) => getVisitsSummaryByFriendId(state, friendId))

	const finalDebtText = summary.finalDebt > 0
		? `${friendName} owes me: ${summary.finalDebt}$`
		: summary.finalDebt < 0
			? `I owe ${friendName}: ${Math.abs(summary.finalDebt)}$`
			: `No debts`

	const openModal = (visitId) => {
		setVisitToDeleteId(visitId)
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setVisitToDeleteId(null)
		setIsModalOpen(false)
	}

	const handleConfirmDelete = () => {
		dispatch(deleteVisit(visitToDeleteId))
		closeModal()
	}

	return (
		<div className='visits-list'>
			<h3>Visits list for {friendName}</h3>
			<ol>
				{visits.map((visit, i) => (
					<li key={i} className='visits-item'>
						<div className='delete-button'>
							<button onClick={() => openModal(visit.id)}>x</button>
						</div>
						<p><span>Bill:</span> {visit.bill}$</p>
						<p><span>My part:</span> {visit.userExpense}$</p>
						<p><span>{friendName}&apos;s part:</span> {visit.friendPaid}$</p>
						<p><span>Who paid:</span> {visit.whoIsPaying === 'user' ? 'You' : 'Friend'}</p>
						<p><span>My debt:</span> {visit.userDebt}$</p>
						<p><span>{friendName}&apos;s debt:</span> {visit.friendDebt}$</p>
					</li>
				))}
			</ol>

			<p className='visits-list-results'>
				All bills sum is: <span>{summary.allBills}$</span>
			</p>
			<p className='visits-list-results'>
				I paid: <span>{summary.myBillsSum}$</span>
			</p>
			<p className='visits-list-results'>
				{friendName} paid: <span>{summary.friendBillsSum}$</span>
			</p>
			<p className='visits-list-results'>
				My debt is: <span>{summary.myDebt}$</span>
			</p>
			<p className='visits-list-results'>
				{friendName}&apos;s debt is: <span>{summary.friendDebt}$</span>
			</p>
			<br />
			<p className='visits-list-results'>
				{finalDebtText}
			</p>

			<Modal
				isOpen={isModalOpen}
				onClose={closeModal}
				onConfirm={handleConfirmDelete}
				message={`Are you sure you want to delete ${friendName}'s visit?`}
			/>
		</div>
	)
}



