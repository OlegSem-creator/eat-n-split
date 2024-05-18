import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedFriendId, deleteFriend } from './features/friendsSlice'
import { deleteVisitsByFriendId, deleteVisit } from './features/visitSlice'
import { getVisitsSummaryByFriendId } from './features/selectors'

import AddFriend from './components/AddFriend'
import FriendCard from './components/FriendCard'
import FriendsList from './components/FriendsList'
import ErrorBoundary from './components/ErrorBoundary'

export default function App() {
	const dispatch = useDispatch();

	const friends = useSelector((state) => state.friends.friends)
	const selectedFriendId = useSelector((state) => state.friends.selectedFriendId)

	const [selectedFriendName, setSelectedFriendName] = useState('')

	const visitsSummaries = useSelector((state) => {
		return friends.reduce((acc, friend) => {
			acc[friend.id] = getVisitsSummaryByFriendId(state, friend.id)
			return acc
		}, {})
	})

	useEffect(() => {
		const selectedFriend = friends.find((friend) => friend.id === selectedFriendId)
		if (selectedFriend) {
			setSelectedFriendName(selectedFriend.name)
		} else {
			setSelectedFriendName('')
		}
	}, [friends, selectedFriendId])

	function handleFriendClick(id) {
		dispatch(setSelectedFriendId(id))
	}

	function handleDeleteFriend(id) {
		dispatch(deleteFriend(id))
		dispatch(deleteVisitsByFriendId(id))
	}

	function handleDeleteVisit(id) {
		dispatch(deleteVisit(id))
	}

	return (
		<>
			<h1 className='title'>split bills with friends</h1>
			<ErrorBoundary>
				<div className='app'>
					<div className='sidebar'>
						<AddFriend />
						<FriendsList
							friends={friends}
							selectedFriendId={selectedFriendId}
							onFriendClick={handleFriendClick}
							visitsSummaries={visitsSummaries}
							onDeleteFriend={handleDeleteFriend}
						/>
					</div>
					<div>
						{selectedFriendId &&
							<FriendCard
								friendId={selectedFriendId}
								friendName={selectedFriendName}
								onDeleteVisit={handleDeleteVisit}
							/>}
					</div>
				</div >
			</ErrorBoundary>
		</>
	)
}


