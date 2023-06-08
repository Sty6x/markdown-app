import { Link, useNavigate } from "react-router-dom";
import { showRelevantInputs, authText } from "@/utils/formInputs";
import { useRef, useState } from "react";
interface IAuthFormProps {
	action: "/" | "/sign-up";
	handleSubmit: (e: React.InvalidEvent<HTMLFormElement>) => void;
	validateOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error: string;
}

const AuthForm = ({
	action,
	handleSubmit,
	validateOnChange,
	error,
}: IAuthFormProps) => {
	const navigate = useNavigate();
	const mapFormInputs: (action: string) => React.ReactNode = function (
		action
	) {
		return showRelevantInputs(action).map((input) => {
			return (
				<div key={input.id} className="inputs-container flex flex-col ">
					<label
						className="text-sm block w-full text-[#D9D9D970] focus-within:text-vn-white hover:text-vn-white transition-colors duration-150 ease-in-out"
						htmlFor={input.htmlFor}
					>
						{input.label}
					</label>
					<input
						required
						onChange={validateOnChange}
						type={input.type}
						className="hover:border-vn-white transition-colors  focus-within:border-vn-white focus-within:transition-[border-color] duration-150 ease-in-out appearance-none outline-none text-vn-white bg-[transparent] border-b-[1px] border-[#D9D9D970]"
						id={input.id}
						name={input.name}
						minLength={input.minLength ? input.minLength : 0}
					/>
				</div>
			);
		});
	};

	return (
		<div id="auth-form" className="flex w-2/3 flex-col z-10 text-[#ffffff]">
			<div id="instruct-user-txt">
				<h1 className="font-semibold mb-[8px] sm:text-2xl lg:text-3xl xl:text-4xl">
					{action === "/"
						? authText.signIn.header
						: authText.signUp.header}
				</h1>
				<p className="font-light">Enter your account details below</p>
			</div>
			{error !== "" && (
				<p className="lg:text-xs xl:text-base text-vn-red">{error}</p>
			)}
			<form
				className="text-vn-white flex flex-col gap-9 mt-6 "
				onSubmit={handleSubmit}
				noValidate
			>
				{mapFormInputs(action)}
				<button
					type="submit"
					className="text-[#FFFFFF] drop-shadow-md bg-vn-blue py-4 hover:bg-[#7086FF] ease-out duration-150 transition-all"
				>
					{action === "/" ? "Sign in" : "Sign up"}
				</button>
			</form>
			<div id="form-actions">
				{action === "/" ? (
					<div
						id="forgot-redirect"
						className="flex content-center justify-center mt-4 mb-4"
					>
						<Link
							to={"/"}
							className="hover:underline inline-block text-[#d9d9d970]"
						>
							{authText.signIn.forgot}
						</Link>
					</div>
				) : null}
				<div
					id="create-signin"
					className="flex justify-between items-center text-sm pt-6 border-t-[1px] border-[#d9d9d970] max-lg:text-xs"
				>
					<span className="inline-block">
						<p className="text-[#D9D9D970]">
							{action === "/"
								? authText.signIn.noAcc
								: authText.signUp.exist}
						</p>
					</span>
					<Link
						to={action === "/" ? "/sign-up" : "/"}
						className="hover:bg-[#D9D9D920] hover:transition-colors duration-150 ease-in-out px-7 py-3 inline-block bg-[#D9D9D910]"
					>
						{action === "/"
							? authText.signIn.linkBtnText
							: authText.signUp.linkBtnText}
					</Link>
				</div>
			</div>
		</div>
	);
};

export default AuthForm;
