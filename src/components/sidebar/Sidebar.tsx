import { MutableRefObject } from "react";
import "./sidebarAnimation.scss";
interface ISidebarProps {
	children: React.ReactNode;
	sideBarRef: MutableRefObject<HTMLDivElement>;
}

const Sidebar = ({ children, sideBarRef }: ISidebarProps) => {
	return (
		<div
			id="sidebar"
			ref={sideBarRef}
			className="sidebar-active w-96 py-8 bg-vn-black flex flex-col h-screen"
		>
			{children}
		</div>
	);
};

export default Sidebar;
