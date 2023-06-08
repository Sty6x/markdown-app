import AuthForm from "@/components/auth/AuthForm";
import { useState, useContext } from "react";
import { FirebaseContext } from "@/App";

const SignUp = () => {
	const [error, setError] = useState<string>("");
	const { db, auth } = useContext(FirebaseContext);

	async function signUpUser(
		e: React.InvalidEvent<HTMLFormElement>
	): Promise<void> {
		e.preventDefault();
		const formValidation = e.target;
		const form = new FormData(e.currentTarget);
		const formEntries = Object.fromEntries(form.entries());
		console.log(formEntries);
		if (
			formValidation.checkValidity() &&
			formEntries.password === formEntries.passConf
		) {
			console.log("signed up");
		}
		if (!formValidation.checkValidity()) {
			setError("*Please check your email and password");
		}
		if (formEntries.password !== formEntries.passConf) {
			setError("*Password doesn't match");
		}
	}
	return (
		<>
			<AuthForm
				setError={setError}
				handleSubmit={signUpUser}
				error={error}
				action={window.location.pathname}
			/>
		</>
	);
};

export default SignUp;