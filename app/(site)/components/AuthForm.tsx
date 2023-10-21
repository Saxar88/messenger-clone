'use client';

import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

type Variant = 'LOGIN' | 'SIGNUP';

const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('SIGNUP');
        } else {
            setVariant('LOGIN');
        }
    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: { name: '', email: '', password: '' },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (variant === 'SIGNUP') {
            //axios register
        }

        if (variant === 'LOGIN') {
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
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                ></form>
            </div>
        </div>
    );
};

export default AuthForm;
