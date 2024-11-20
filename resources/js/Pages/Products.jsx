import { Head } from "@inertiajs/react";
import Navbar from "../Elements/Navbar";
import { useEffect } from "react";

/*
 Product = {
    id: number
    name: string
    description: string
    display_image: Image
    price: number
    gender: enum ('M', 'F', 'Unisex')
    type: enum ('shirt', 'pants')
    sizes: Variant[]
    images: string[]
 }

 Variant = {
    variant_id: string
    size: string
    stock: number
 }

*/

export default function Products({ products }) {
    return (
        <>
            <Head title="Products" />
            <Navbar auth />
            <div className="m-10 flex flex-row space-x-5 ">
                {products.map((product, index) => (
                    <div key={index} className="w-52">
                        <div className="flex flex-col justify-center hover:underline hover:border text-sm m-2">
                            <a href={`/products/${product.id}`}>
                                <img
                                    src={`assets/products/${product.display_image}`}
                                />
                                {product.name}
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
