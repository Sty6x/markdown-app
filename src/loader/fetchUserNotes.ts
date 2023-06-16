import { db, auth } from "@/utils/contexts/firebaseContext";
import {
	collection,
	DocumentData,
	getDocs,
	QueryDocumentSnapshot,
	Timestamp,
} from "firebase/firestore";

// HMR problem when reloading, maybe because app needs to reauthenticate user so loader has not chance of updating
// cannot fetch collection on refresh because loader only waits for the loader function to finish fetching from firestore db
// but the loader function thats fetching data from database needs a user that is authorize to fetch it, but it cannot fetch it
// because on refresh the app needs to reauthenticate the user that is was signed in prior to refreshin

// loader needs to wait for the reauthentication to finish before loader function should start fetching from db

function convertTimeStampDate(dateObject: {
	seconds: number;
	nanoseconds: number;
}): Date {
	const timeStamp = new Timestamp(dateObject.seconds, dateObject.nanoseconds);
	return timeStamp.toDate();
}

export async function fetchUserNotesLoader(): Promise<Array<DocumentData>> {
	console.log("called");
	let retries = 4;
	try {
		const userNoteCollectionRef = collection(
			db,
			"users",
			auth.currentUser?.uid as string,
			"notes"
		);
		const userNotes = await getDocs(userNoteCollectionRef);
		const mapNoteDocument = userNotes.docs.map((doc) => {
			const dateAdded = doc.data().dateAdded;
			// console.log(timeStamp.toDate());
			return {
				...doc.data(),
				dateAdded: convertTimeStampDate(doc.data().dateAdded),
				lastUpdated: convertTimeStampDate(doc.data().lastUpdated),
			};
		});
		return mapNoteDocument;
	} catch (err) {
		console.log(err);
		return [];
	}
}
