import { Link } from "react-router-dom";
import RootTextLayout from "./RootTextLayout";
const WelcomeText = () => {
	return (
		<RootTextLayout top="30%">
			<h1 className="text-6xl font-bold border-b-2 border-black border-solid inline-block mb-[19px]">
				# Hi There!
			</h1>
			<div className="greet">
				<p className="text-4xl mb-2">
					Welcome to <span className="font-bold">Vimnotes</span>
				</p>
				<p className="text-2xl font-light">
					A simple markdown app with vim key mappings.
				</p>
			</div>
			<Link
				to={
					window.location.pathname === "/sign-in" ? "/sign-up" : "/sign-in"
				}
				className="z-0 hover:bg-[#7086FF] ease-out duration-150 transition-all grow-0 font-bold text-[#ffffff] bg-vn-blue px-10 py-4 text-lg inline-block mt-[19px] drop-shadow-md"
			>
				{window.location.pathname === "/sign-in"
					? "Create account"
					: "Do Something"}
			</Link>
		</RootTextLayout>
	);
};

export default WelcomeText;
