"use client";

import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";

type Variant = "LOGIN" | "SIGNUP";

const AuthForm = () => {
	const [variant, setVariant] = useState<Variant>("LOGIN");
	const [isLoading, setIsLoading] = useState(false);

	const toggleVariant = useCallback(() => {
		if (variant === "LOGIN") {
			setVariant("SIGNUP");
		} else {
			setVariant("LOGIN");
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

		if (variant === "SIGNUP") {
			//axios register
		}

		if (variant === "LOGIN") {
			//nextauth signin
		}
	};

	const socialAction = (action: string) => {
		setIsLoading(true);

		//nextauth social signin
	};

	return (
		<div className="mt-8 sm:w-full sm:max-w-mdsm:mx-auto">
			<div className="px-4 sm:px-10 py-8 bg-white shadow sm:rounded-lg">
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					{variant === "SIGNUP" && (
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
						<Button></Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AuthForm;
