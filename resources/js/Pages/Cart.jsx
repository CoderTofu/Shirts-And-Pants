import { Head } from "@inertiajs/react";
import Navbar from "../Elements/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Cart() {
    return (
        <>
            <Head title="Cart" />
            <Navbar auth />
            <div>
                <h1>Cart</h1>
            </div>
        </>
    );
}
