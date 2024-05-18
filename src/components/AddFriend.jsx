
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { addFriend } from '../features/friendsSlice'
import Button from './Button'

export default function AddFriend() {
	const [name, setName] = useState('')
	const [image, setImage] = useState('https://i.pravatar.cc/48')

	const dispatch = useDispatch()

	function handleSubmit(e) {
		e.preventDefault()

		const id = crypto.randomUUID()
		if (!name || !image) return

		dispatch(addFriend(id, name, image))
		setName('')
	}

	return (
		<form
			className='form-add-friend'
			onSubmit={handleSubmit}
		>
			<label htmlFor='friend-name'>👫 Friend name</label>
			<input
				id='friend-name'
				type='text'
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>

			<label htmlFor='image'>🌄 Image URL</label>
			<input
				id='image'
				type='text'
				value={image}
				onChange={(e) => setImage(e.target.value)}
			/>

			<Button>Add Friend</Button>
		</form>
	)
}