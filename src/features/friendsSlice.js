import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	friends: [],
	selectedFriendId: null,
}

const friendsSlice = createSlice({
	name: 'friends',
	initialState,
	reducers: {
		setFriends(state, action) {
			state.friends = action.payload;
		},
		setSelectedFriendId(state, action) {
			state.selectedFriendId = action.payload
		},
		addFriend: {
			prepare(id, name, image) {
				return {
					payload: {
						id,
						name,
						image,
						visits: [],
					}
				}
			},
			reducer(state, action) {
				state.friends.push(action.payload)
			}
		},
		deleteFriend(state, action) {
			state.friends = state.friends.filter(friend => friend.id !== action.payload)
		},
	}
})

export const { setFriends, setSelectedFriendId, addFriend, deleteFriend } = friendsSlice.actions;
export default friendsSlice.reducer;