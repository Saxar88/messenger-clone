import Image from "next/image";

import AuthForm from "./components/AuthForm";

export default function Home() {
	return (
		<div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8 bg-gray-100">
			<div className="sm:w-full sm:mx-auto sm:max-w-md">
				<Image
					src="/images/logo.png"
					alt="logo"
					height={48}
					width={48}
					className="w-auto mx-auto"
				/>
				<h2 className="mt-6 text-center text-3xl font-bold text-gray-900 tracking-tight">
					Sign in to your account!
				</h2>
			</div>
			<AuthForm />
		</div>
	);
}
