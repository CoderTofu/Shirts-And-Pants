import { Link } from "@inertiajs/react";
import Navbar from "../Elements/Navbar";
import Footer from "./../Elements/Footer";

export default function GuestLayout({ children }) {
    return (
        <>
            <Navbar />
            <div className="flex h-5/6 flex-col items-center pt-6 sm:justify-center sm:pt-0">
                {children}
            </div>
            <div className="pt-[20vh]">
                <Footer />
            </div>
        </>
    );
}
