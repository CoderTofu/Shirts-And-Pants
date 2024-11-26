import ApplicationLogo from "../Elements/ApplicationLogo";
import Dropdown from "../Elements/Dropdown";
import NavLink from "../Elements/NavLink";
import ResponsiveNavLink from "../Elements/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import Navbar from "./../Elements/Navbar";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen">
            <Navbar />

            <main>{children}</main>
        </div>
    );
}
