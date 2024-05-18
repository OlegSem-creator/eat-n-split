import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	visits: [],
}

const visitSlice = createSlice({
	name: 'visits',
	initialState,
	reducers: {
		addVisit(state, action) {
			state.visits.push(action.payload)
		},
		deleteVisitsByFriendId(state, action) {
			state.visits = state.visits.filter(visit => visit.friendId !== action.payload)
		},
		// deleteVisit(state, action) {
		// 	state.visits = state.visits.filter(visit => visit.id !== action.payload)
		// },
		deleteVisit(state, action) {
			const index = state.visits.findIndex(visit => visit.id === action.payload);
			if (index !== -1) {
				state.visits.splice(index, 1);
			}
		},
	}
})

export const { addVisit, deleteVisitsByFriendId, deleteVisit } = visitSlice.actions
export default visitSlice.reducer