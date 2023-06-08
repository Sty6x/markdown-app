import AuthForm from "@/components/auth/AuthForm";
import { useState, useContext } from "react";
import { FirebaseContext } from "@/App";

const SignIn = () => {
	const { db, auth } = useContext(FirebaseContext);
	const [error, setError] = useState<string>("");
	const [isValid, setIsValid] = useState<null | boolean>(null);
	async function signInUser(
		e: React.InvalidEvent<HTMLFormElement>
	): Promise<void> {
		e.preventDefault();
		const formValidation = e.target;
		if (formValidation.checkValidity()) {
			const form = new FormData(e.currentTarget);
			const formEntries = Object.fromEntries(form.entries());
			console.log(formEntries);
			console.log("signed in");
		} else {
			console.log("wrong credentials");
			setError("Please check your email and password");
		}
	}
	return (
		<>
			<AuthForm
				isValid={isValid}
				setError={setError}
				handleSubmit={signInUser}
				error={error}
				action={window.location.pathname}
			/>
		</>
	);
};

export default SignIn;
