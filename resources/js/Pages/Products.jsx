import { Head } from "@inertiajs/react";
import Navbar from "../Elements/Navbar";
import { useEffect } from "react";
import Footer from "./../Elements/Footer";

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
    function getProducts() {
        return products.map((product, index) => (
            <div key={index}>
                <a href={`/products/${product.id}`} className="text-center">
                    <img src={`assets/products/${product.display_image}`} />
                    <h4 className="albert-sans text-xl p-3 pb-1 underline">
                        {product.name}
                    </h4>
                    <h6 className="albert-sans font-thin italic text-sm">
                        P {product.price}
                    </h6>
                </a>
            </div>
        ));
    }

    return (
        <>
            <Head title="Products" />
            <Navbar auth />
            <div className="m-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8 p-[200px]">
                {
                    Array.from({ length: 5 }).map((_, i) =>
                        getProducts()
                    ) /* This is a dummy data, replace this with the actual data*/
                }
            </div>
            <Footer />
        </>
    );
}

{
    /* <div key={index} className="w-52">
    <div className="flex flex-col justify-center hover:underline hover:border text-sm m-2">
        <a href={`/products/${product.id}`}>
            <img src={`assets/products/${product.display_image}`} />
            {product.name}
        </a>
    </div>
</div>; */
}
