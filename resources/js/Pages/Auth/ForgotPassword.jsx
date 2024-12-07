import InputError from "../../Elements/InputError";
import PrimaryButton from "../../Elements/PrimaryButton";
import TextInput from "../../Elements/TextInput";
import GuestLayout from "../../Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="max-w-md mt-20 mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 text-center mb-4">
                    Forgot Password
                </h2>
                <p className="mb-6 text-sm text-gray-600 dark:text-gray-400 text-center">
                    Forgot your password? No problem. Just let us know your
                    email address, and we will email you a password reset link
                    that will allow you to choose a new one.
                </p>

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400 text-center">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Email Address
                        </label>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="Enter your email"
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="flex justify-center">
                        <PrimaryButton
                            className="w-full md:w-auto px-6 py-2 text-center"
                            disabled={processing}
                        >
                            Email Password Reset Link
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
