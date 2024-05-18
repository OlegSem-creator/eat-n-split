import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { addVisit } from '../features/visitSlice'
import { calculateDebts } from '../utils/calculateDebts'

import Button from './Button'

export default function SplitBill({ friendId, friendName }) {
	const [bill, setBill] = useState('')
	const [userExpense, setUserExpense] = useState('')
	const [whoIsPaying, setWhoIsPaying] = useState('user')
	const [error, setError] = useState('')
	const [info, setInfo] = useState('')

	const dispatch = useDispatch()

	function handleSubmit(e) {
		e.preventDefault()

		const billValue = parseFloat(bill)
		const userExpenseValue = parseFloat(userExpense)

		if (userExpenseValue > billValue) {
			setError('Your expense cannot exceed the total bill amount.')
			setInfo('')
			return
		} else if (userExpenseValue === billValue) {
			setError('')
			setInfo('You have fully paid the bill yourself.')
			return
		}

		const visit = {
			friendId,
			bill: billValue,
			userExpense: userExpenseValue,
			whoIsPaying,
		}

		const { userDebt, friendDebt, friendPaid } = calculateDebts(visit)

		dispatch(addVisit({
			...visit,
			friendPaid,
			userDebt,
			friendDebt,
		}))

		setBill('')
		setUserExpense('')
		setWhoIsPaying('user')
		setError('')
		setInfo('')
	}

	function handleBillChange(e) {
		setBill(e.target.value)
		setError('')
		setInfo('')
	}

	function handleUserExpenseChange(e) {
		setUserExpense(e.target.value)
		setError('')
		setInfo('')
	}

	return (
		<>
			<form onSubmit={handleSubmit} className='form-split-bill'>
				<h2>Split a bill with {friendName}</h2>

				<label htmlFor='bill'>💰 Bill value</label>
				<input
					id='bill'
					type='text'
					value={bill}
					onChange={handleBillChange}
				/>

				<label htmlFor='user'>🧍‍♀️ My expense</label>
				<input
					id='user'
					type='text'
					value={userExpense}
					onChange={handleUserExpenseChange}
				/>

				<label htmlFor='who'>🤑 Who is paying the bill</label>
				<select
					id='who'
					value={whoIsPaying}
					onChange={(e) => setWhoIsPaying(e.target.value)}
				>
					<option value='user'>You</option>
					<option value='friend'>{friendName}</option>
				</select>

				{error && <p className='error'>{error}</p>}
				{info && <p className='info'>{info}</p>}

				<Button>Split bill</Button>
			</form>
		</>
	)
}




