import { useEffect } from "react";
import Checkbox from "../../Elements/Checkbox";
import InputError from "../../Elements/InputError";
import InputLabel from "../../Elements/InputLabel";
import PrimaryButton from "../../Elements/PrimaryButton";
import TextInput from "../../Elements/TextInput";
import GuestLayout from "../../Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        axios.get("/sanctum/csrf-cookie").then((response) => {
            console.log("here");
            post(route("login"), {
                onFinish: () => reset("password"),
            });
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
            <main className="w-full flex flex-col justify-center items-center mt-[100px]">
                <h1 className="text-3xl mb-[30px] font-bold albert-sans">
                    LOGIN
                </h1>
                <div className="w-full overflow-hidden bg-form px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg ">
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel
                                className="text-white"
                                htmlFor="email"
                                value="Email"
                            />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full input-bg-form border-none"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                className="text-white"
                                htmlFor="password"
                                value="Password"
                            />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full input-bg-form  border-none"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4 block text-center">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <span className="ms-2 text-sm  dark:text-gray-400 text-white">
                                    Remember me
                                </span>
                            </label>
                        </div>

                        <PrimaryButton
                            className="text-2xl w-full ml-0 mt-4 flex justify-center items-center bg-white text-black
                            hover:bg-gray-200"
                            disabled={processing}
                        >
                            SIGN IN
                        </PrimaryButton>

                        <div className="mt-4 flex items-center justify-between">
                            <Link
                                href={route("register")}
                                className="rounded-md text-sm text-white underline hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
                            >
                                New to SAP?
                            </Link>

                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="rounded-md text-sm text-white underline hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
                                >
                                    Forgot your password?
                                </Link>
                            )}
                        </div>
                    </form>
                </div>
            </main>
        </GuestLayout>
    );
}
