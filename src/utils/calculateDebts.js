export function calculateDebts({ bill, userExpense, whoIsPaying }) {
	const friendPaid = bill - userExpense
	const userDebt = whoIsPaying === 'friend' ? userExpense : 0
	const friendDebt = whoIsPaying === 'user' ? friendPaid : 0

	return { userDebt, friendDebt, friendPaid }
}
