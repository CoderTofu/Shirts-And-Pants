import { Head } from "@inertiajs/react";
import Navbar from "../Elements/Navbar";
import { useState } from "react";
import Footer from "../Elements/Footer";
import Alert from "../Elements/Alert";

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
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("");
    const [displayedProducts, setDisplayedProducts] = useState(products);
    const [showSearchAlert, setShowSearchAlert] = useState(false);
    const [showFilterAlert, setShowFilterAlert] = useState(false);

    const handleSearch = () => {
        const filtered = products.filter((product) => {
            return (
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (filterType ? product.type === filterType : true)
            );
        });
        setDisplayedProducts(filtered);

        setShowSearchAlert(true); // Show alert when the item is added
        setTimeout(() => setShowSearchAlert(false), 3000); // Hide after 3 seconds
    };

    const handleFilterType = (event) => {
        setFilterType(event.target.value);
        const filtered = products.filter((product) => {
            return (
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (event.target.value
                    ? product.type === event.target.value
                    : true)
            );
        });
        setDisplayedProducts(filtered);

        setShowFilterAlert(true); // Show alert when the item is added
        setTimeout(() => setShowFilterAlert(false), 3000); // Hide after 3 seconds
    };

    return (
        <>
            <Head title="Products" />
            <Navbar auth />
            {showSearchAlert && (
                <Alert type="success" message="Search applied!" />
            )}

            {showFilterAlert && (
                <Alert type="success" message="Filter applied!" />
            )}
            <div className="px-[200px] py-5">
                <div className="flex justify-between">
                    <h1 className="text-4xl font-bold albert-sans">Products</h1>

                    {/* Search and Filters */}
                    <div className="flex justify-between items-center mb-4">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch();
                                }
                            }}
                            className="border p-2 rounded"
                        />
                        <select
                            value={filterType}
                            onChange={handleFilterType}
                            className="border p-2 rounded"
                        >
                            <option value="">All Types</option>
                            <option value="shirt">Shirt</option>
                            <option value="pants">Pants</option>
                        </select>
                        <button
                            onClick={handleSearch}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="m-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8">
                    {displayedProducts.map((product) => (
                        <div
                            key={product.id}
                            className="hover:scale-105 transition-all"
                        >
                            <a
                                href={`/products/${product.id}`}
                                className="text-center"
                            >
                                <img
                                    src={`assets/products/${product.display_image}`}
                                    alt={product.name}
                                    className="hover:brightness-90 transition-all"
                                />
                                <h4 className="albert-sans text-xl p-3 pb-1 font-bold">
                                    {product.name}
                                </h4>
                                <h6 className="albert-sans font-thin italic text-sm">
                                    P {product.price}
                                </h6>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
