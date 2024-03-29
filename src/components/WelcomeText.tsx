import { Link, useLocation } from "react-router-dom";
import RootTextLayout from "./RootTextLayout";
const WelcomeText = () => {
  const location = useLocation();
  return (
    <RootTextLayout>
      <section id="welcome-text" className="">
        <h1 className="w-fit text-4xl font-bold border-b-2 border-black border-solid inline-block mb-[19px]">
          # Hi There!
        </h1>
        <div id="greet">
          <p className="text-2xl mb-2">
            Welcome to <span className="font-bold">Vimnotes</span>
          </p>
          <p className="text-xl font-light">
            A simple markdown app with vim key mappings.
          </p>
        </div>
        <Link
          to={location.pathname === "/" ? "/sign-up" : "/"}
          className="z-0 hover:bg-[#7086FF] box-border ease-out duration-150 transition-all grow-0 font-bold text-[#ffffff] bg-vn-blue px-10 py-4 text-lg inline-block mt-[19px] drop-shadow-md"
        >
          {location.pathname === "/"
            ? "Create account"
            : "Log in to your account"}
        </Link>
      </section>
    </RootTextLayout>
  );
};

export default WelcomeText;
