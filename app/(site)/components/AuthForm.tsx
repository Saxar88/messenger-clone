"use client";

import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";

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
			//axios register
		}

		if (variant === "LOG IN") {
			//nextauth signin
		}
	};

	const socialAction = (action: string) => {
		setIsLoading(true);

		//nextauth social signin
	};

	return (
		<div className="mt-8 sm:w-full sm:max-w-md sm:mx-auto">
			<div className="px-4 sm:px-10 py-8 bg-white shadow sm:rounded-lg">
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					{variant === "SIGN UP" && (
						<Input id="name" label="Name" register={register} errors={errors} />
					)}
					<Input
						id="email"
						label="Email"
						type="email"
						register={register}
						errors={errors}
					/>
					<Input
						id="password"
						label="Password"
						type="password"
						register={register}
						errors={errors}
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
					<div className="flex gap-2 mt-6"></div>
				</div>
			</div>
		</div>
	);
};

export default AuthForm;
