import { EmptyNotes } from "@/components/EmptyNotes";
import VimnoteCheatSheet from "@/components/VimnoteCheatSheet";
import Note from "@/components/note/Note";
import App from "@/pages/App";
import RootAuth from "@/pages/RootAuth";
import { createBrowserRouter, createHashRouter } from "react-router-dom";
import SignIn from "@/components/auth/SignIn";
import SignUp from "@/components/auth/SignUp";
import PasswordRecovery from "@/components/auth/PasswordRecovery";
import ErrorPage from "@/pages/ErrorPage";

export const ROUTES = createHashRouter([
	{
		path: "/",
		element: <RootAuth />,
		children: [
			{
				path: "sign-in",
				element: <SignIn />,
			},
			{
				path: "sign-up",
				element: <SignUp />,
			},
			{
				path: "forgot-password",
				element: <PasswordRecovery />,
			},
		],
	},
	{
		path: "/app",
		element: <App />,
		shouldRevalidate: () => false,
		errorElement: <ErrorPage code="404" redirect={true} />,
		children: [
			{
				path: ":noteID",
				element: <Note />,
			},
			{
				path: "empty-notes",
				element: <EmptyNotes />,
			},
			{
				path: "vim-cheatsheet",
				element: <VimnoteCheatSheet />,
			},
			{
				path: "*",
				element: <ErrorPage code="404" redirect={true} />,
			},
		],
	},
	{
		path: "*",
		element: <ErrorPage code="404" redirect={true} />,
	},
]);
