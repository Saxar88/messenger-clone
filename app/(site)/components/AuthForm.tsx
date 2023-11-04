"use client";

import axios from "axios";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { BsGithub, BsGoogle } from "react-icons/bs";

import AuthSocialButton from "./AuthSocialButton";
import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { signIn } from "next-auth/react";

type Variant = "LOG IN" | "SIGN UP";

const AuthForm = () => {
	const [variant, setVariant] = useState<Variant>("LOG IN");
	const [isLoading, setIsLoading] = useState(false);

	const toggleVariant = useCallback(() => {
		if (variant === "LOG IN") {
			setVariant("SIGN UP");
		} else {
			setVariant("LOG IN");
		}
	}, [variant]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: { name: "", email: "", password: "" },
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		if (variant === "SIGN UP") {
			axios
				.post("/api/register", data)
				.catch(() => toast.error("Something went wrong!"))
				.finally(() => setIsLoading(false));
		}

		if (variant === "LOG IN") {
			signIn("credentials", { ...data, redirect: false })
				.then((callback) => {
					if (callback?.error) {
						toast.error("Invalid credentials");
					}

					if (callback?.ok && !callback?.error) {
						toast.success("Log in successfull!");
					}
				})
				.finally(() => setIsLoading(false));
		}
	};

	const socialAction = (action: string) => {
		setIsLoading(true);

		signIn(action, { redirect: false })
			.then((callback) => {
				if (callback?.error) {
					toast.error("Invalid credentials!");
				}

				if (callback?.ok && !callback?.error) {
					toast.success("Log in successfull!");
				}
			})
			.finally(() => setIsLoading(false));
	};

	return (
		<div className="mt-8 sm:w-full sm:max-w-md sm:mx-auto">
			<div className="px-4 sm:px-10 py-8 bg-white shadow sm:rounded-lg">
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					{variant === "SIGN UP" && (
						<Input
							id="name"
							label="Name"
							register={register}
							errors={errors}
							disabled={isLoading}
						/>
					)}
					<Input
						id="email"
						label="Email"
						type="email"
						register={register}
						errors={errors}
						disabled={isLoading}
					/>
					<Input
						id="password"
						label="Password"
						type="password"
						register={register}
						errors={errors}
						disabled={isLoading}
					/>
					<div className="">
						<Button type="submit" disabled={isLoading} fullWidth>
							{variant === "LOG IN" ? "Log in" : "Sign up"}
						</Button>
					</div>
				</form>
				<div className="mt-6">
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-2 bg-white text-gray-500">
								Or continue with
							</span>
						</div>
					</div>
					<div className="flex gap-2 mt-6">
						<AuthSocialButton
							icon={BsGithub}
							onClick={() => socialAction("github")}
						/>
						<AuthSocialButton
							icon={BsGoogle}
							onClick={() => socialAction("google")}
						/>
					</div>
				</div>
				<div className="flex justify-center gap-2 mt-6 px-2 text-sm text-gray-500">
					<div className="">
						{variant === "LOG IN"
							? "New to Messenger?"
							: "Already have an account?"}
					</div>
					<div onClick={toggleVariant} className="underline cursor-pointer">
						{variant === "LOG IN" ? "Create an account." : "Log in."}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthForm;
