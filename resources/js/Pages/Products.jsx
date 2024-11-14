import { Head } from "@inertiajs/react";
import Navbar from "../Elements/Navbar";

export default function Products({ products }) {
    console.log(products);
    return (
        <>
            <Head title="Products" />
            <Navbar auth />
            <h1>Products</h1>
            <div className="m-10 flex flex-row space-x-5 ">
                sample lng
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
