import SplitBill from "./SplitBill";
import VisitsList from "./VisitsList";

export default function FriendCard({ friendId, friendName }) {
	return (
		<>
			<SplitBill friendId={friendId} friendName={friendName} />
			<VisitsList friendId={friendId} friendName={friendName} />
		</>
	)
}


