import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav
			id="navbar"
			className="min-h-fit bg-no-repeat flex bg-vn-black px-6 py-2 border-b-[2px] items-center border-separator-grey-line"
		>
			<div id="left" className="flex ">
				<button className="bg-nav-sb-icon bg-cover bg-no-repeat w-8 h-8 bg-center" />
			</div>
			<div id="right" className="ml-auto flex">
				<Link
					to={"/app/info/vim-shortcuts"}
					className="bg-nav-info-icon bg-cover bg-no-repeat w-8 h-8 bg-center inline-block mr-5"
				/>
				<button className="bg-nav-more-icon bg-cover bg-no-repeat w-8 h-8 bg-center inline-block" />
			</div>
		</nav>
	);
};

export default Navbar;
