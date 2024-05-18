import { configureStore } from '@reduxjs/toolkit'

import friendsSlice from './features/friendsSlice'
import visitSlice from './features/visitSlice'

const store = configureStore({
	reducer: {
		friends: friendsSlice,
		visits: visitSlice,
	}
})

export default store