import { Head } from "@inertiajs/react";
import Navbar from "../Components/Navbar";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Home" />
            <Navbar />
        </>
    );
}
