import InputError from "../../Elements/InputError";
import InputLabel from "../../Elements/InputLabel";
import PrimaryButton from "../../Elements/PrimaryButton";
import TextInput from "../../Elements/TextInput";
import GuestLayout from "../../Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <main className="w-full flex flex-col justify-center items-center mt-[100px]">
                <h1 className="albert-sans text-3xl font-bold mb-[50px]">
                    CREATE AN ACCOUNT
                </h1>
                <form
                    onSubmit={submit}
                    className="w-full overflow-hidden bg-form px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg "
                >
                    <div>
                        <InputLabel
                            htmlFor="first_name"
                            className="text-white"
                            value="First Name"
                        />

                        <TextInput
                            id="first_name"
                            name="first_name"
                            value={data.first_name}
                            className="mt-1 block w-full input-bg-form border-none"
                            autoComplete="first_name"
                            isFocused={true}
                            onChange={(e) =>
                                setData("first_name", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.first_name}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="last_name"
                            className="text-white"
                            value="Last Name"
                        />

                        <TextInput
                            id="last_name"
                            name="last_name"
                            value={data.last_name}
                            className="mt-1 block w-full input-bg-form border-none"
                            autoComplete="last_name"
                            isFocused={true}
                            onChange={(e) =>
                                setData("last_name", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.last_name}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="email"
                            className="text-white"
                            value="Email"
                        />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full input-bg-form border-none"
                            autoComplete="username"
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="username"
                            className="text-white"
                            value="Username"
                        />

                        <TextInput
                            id="username"
                            type="username"
                            name="username"
                            value={data.username}
                            className="mt-1 block w-full input-bg-form border-none"
                            autoComplete="username"
                            onChange={(e) =>
                                setData("username", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.username}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="password"
                            className="text-white"
                            value="Password"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full input-bg-form border-none"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirm Password"
                            className="text-white"
                        />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full input-bg-form  border-none"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center justify-between mt-[2rem]">
                        <Link
                            href={route("login")}
                            className="rounded-md text-sm text-white underline hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                        >
                            Already registered?
                        </Link>

                        <PrimaryButton
                            className="ms-4 bg-white text-black
                            hover:bg-gray-200"
                            disabled={processing}
                        >
                            Register
                        </PrimaryButton>
                    </div>
                </form>
            </main>
        </GuestLayout>
    );
}
