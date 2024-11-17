import InputError from "../../Elements/InputError";
import InputLabel from "../../Elements/InputLabel";
import PrimaryButton from "../../Elements/PrimaryButton";
import TextInput from "../../Elements/TextInput";
import GuestLayout from "../../Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
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
                            htmlFor="name"
                            className="text-white"
                            value="Name"
                        />

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full input-bg-form border-none"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
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
