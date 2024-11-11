import { Head } from "@inertiajs/react";
import Navbar from "../Elements/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get("/api/v1/products")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error(
                    "There was an error fetching the products!",
                    error
                );
            });
    }, []);

    return (
        <>
            <Head title="Products" />
            <Navbar auth />
            <div>
                <h1>Products</h1>
            </div>
        </>
    );
}
