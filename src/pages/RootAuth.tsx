import AuthContents from "@/components/AuthContents";
import LoadingScreen from "@/components/LoadingScreen";
import { FirebaseContext } from "@/utils/contexts/firebaseContext";
import { User, deleteUser, onAuthStateChanged } from "firebase/auth";
import { doc, collection, getDoc } from "firebase/firestore";
import { useState, useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const RootAuth = () => {
	const navigate = useNavigate();
	const { auth, db } = useContext(FirebaseContext);

	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			if (user && (await checkIfUserExists(user))) {
				navigate("/app");
			} else if (user === null) {
				navigate("/sign-in");
				auth.currentUser ? deleteUser(auth.currentUser) : 0;
			}
		});
	}, []);

	async function checkIfUserExists(user: User): Promise<boolean> {
		try {
			const useRef = doc(db, "users", user.uid);
			const userDoc = await getDoc(useRef);
			return userDoc.exists() ? true : false;
		} catch (err) {
			console.log(err);
			return false;
		}
	}

	return (
		<main id="auth" className="page flex bg-[#ffffff] h-screen min-w-fit">
			<section
				id="left-auth-contents"
				className="flex-1 flex w-full bg-vn-black p-8  "
			>
				<AuthContents />
			</section>
			<section
				id="auth-form"
				className="z-10 max-md:w-1/2 md:w-4/12 lg:w-5/12 2xl:w-4/12 bg-vn-black flex items-center justify-center "
			>
				{!auth.currentUser ? (
					<Outlet />
				) : (
					<span id="loading-spinner" className="loading-spinner" />
				)}
			</section>
		</main>
	);
};

export default RootAuth;
