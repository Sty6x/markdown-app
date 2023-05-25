import AuthContents from "@/components/AuthContents";
import AuthForm from "@/components/AuthForm";
import { useParams, NavLink, useLoaderData } from "react-router-dom";

const RootAuth = () => {
	const { action } = useLoaderData();
	return (
		<main id="auth" className="page">
			<section id="left-auth-contents">
				<AuthContents action={action} />
			</section>
			<section id="auth-form">
				<AuthForm action={action} />
			</section>
		</main>
	);
};

export default RootAuth;
