import { createSelector } from 'reselect'

const getVisits = (state) => state.visits.visits
const getSelectedFriendId = (state, friendId) => friendId

export const getVisitsByFriendId = createSelector(
	[getVisits, getSelectedFriendId],
	(visits, friendId) => {
		if (!visits) return []
		return visits.filter(visit => visit.friendId === friendId)
	}
)

export const getVisitsSummaryByFriendId = createSelector(
	[getVisitsByFriendId],
	(visits) => {
		const summary = {
			allBills: 0,
			myBillsSum: 0,
			friendBillsSum: 0,
			myDebt: 0,
			friendDebt: 0,
			finalDebt: 0,
		}

		visits.forEach(visit => {
			summary.allBills += visit.bill

			if (visit.whoIsPaying === 'user') {
				summary.myBillsSum += visit.bill
				summary.friendDebt += visit.friendPaid
			} else {
				summary.friendBillsSum += visit.bill
				summary.myDebt += visit.userExpense
			}
		})

		summary.finalDebt = summary.friendDebt - summary.myDebt

		return summary
	}
)
