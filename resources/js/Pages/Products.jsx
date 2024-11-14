import { Head } from "@inertiajs/react";
import Navbar from "../Elements/Navbar";

export default function Products({ products }) {
    return (
        <>
            <Head title="Products" />
            <Navbar auth />
            <h1>Products</h1>
            <div className="m-10 flex flex-row space-x-5 ">
                {products.map((product, index) => (
                    <div key={index} className="w-52">
                        <div className="flex flex-col justify-center items-center">
                            <a href={`/products/${product.id}`}>
                                <img
                                    src={`assets/products/${product.variations[0].images[0].image}`}
                                />
                            </a>
                            <a
                                className="hover:underline"
                                href={`/products/${product.id}`}
                            >
                                {product.name}
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
