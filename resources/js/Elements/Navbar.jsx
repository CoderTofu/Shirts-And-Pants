import { Link, usePage } from "@inertiajs/react";
import Dropdown from "../Elements/Dropdown";

export default function Navbar({ auth }) {
    const user = usePage().props.auth.user;
    return (
        <div className="flex justify-around bg-customGray align-middle p-3">
            <nav className="-mx-3 flex items-center justify-center">
                <>
                    <Link
                        href={route("home")}
                        className="px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                    >
                        Home
                    </Link>
                    <Link
                        href={route("products")}
                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] "
                    >
                        Products
                    </Link>
                </>
            </nav>
            <img
                className="w-[80px] justify-self-center"
                src="/assets/images/sap-logo-no-bg.png"
                alt="SAP Logo"
            />
            <nav className="-mx-3 flex items-center justify-center">
                <div className="relative ms-3">
                    {user ? (
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-md border border-transparent  px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                                    >
                                        <img
                                            className="h-11 border-gray-800 justify-self-center border p-2 rounded-full"
                                            src="/assets/images/account-icon.png"
                                            alt="Account Icon"
                                        />
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route("profile.edit")}>
                                    Profile
                                </Dropdown.Link>
                                {user.is_admin == 1 && (
                                    <Dropdown.Link href={route("dashboard")}>
                                        Dashboard
                                    </Dropdown.Link>
                                )}
                                <Dropdown.Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    ) : (
                        <Link
                            href={route("login")}
                            className="rounded-md py-2 text-black ring-1 ring-transparent transition hover:opacity-75 focus:outline-none focus-visible:ring-[#FF2D20] "
                        >
                            <img
                                className="h-11 border-gray-800 justify-self-center border p-2 rounded-full"
                                src="/assets/images/account-icon.png"
                                alt="Account Icon"
                            />
                        </Link>
                    )}
                </div>

                <Link
                    href={route("shopping-cart")}
                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:opacity-75 focus:outline-none focus-visible:ring-[#FF2D20] "
                >
                    <img
                        className="h-9 justify-self-center"
                        src="/assets/images/cart-icon.png"
                        alt="Cart Icon"
                    />
                </Link>
            </nav>
        </div>
    );
}
