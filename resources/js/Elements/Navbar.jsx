import { Link } from "@inertiajs/react";

export default function Navbar() {
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
                className="max-w-[80px] h-auto justify-self-center"
                src="/assets/sap-logo-no-bg.png"
                alt="SAP Logo"
            />
            <nav className="-mx-3 flex items-center justify-center">
                <Link
                    href={route("login")}
                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:opacity-75 focus:outline-none focus-visible:ring-[#FF2D20] "
                >
                    <img
                        className="h-11 border-gray-800 justify-self-center border p-2 rounded-full"
                        src="/assets/account-icon.png"
                        alt="Account Icon"
                    />
                </Link>
                <Link
                    href={route("products")}
                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:opacity-75 focus:outline-none focus-visible:ring-[#FF2D20] "
                >
                    <img
                        className="h-9 justify-self-center"
                        src="/assets/cart-icon.png"
                        alt="Cart Icon"
                    />
                </Link>
            </nav>
        </div>
    );
}
