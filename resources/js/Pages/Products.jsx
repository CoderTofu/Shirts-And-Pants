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
            <div className="">
                <div className=" flex flex-col md:flex-row justify-between pt-10 px-8">
                    <h1 className="text-4xl mt font-bold albert-sans">
                        Our Products
                    </h1>

                    {/* Search and Filters */}
                    <div className="flex items-center mt-4 md:mt-0 md:mb-4 cursor-text">
                        <div
                            onClick={() =>
                                document.getElementById("searchInput").focus()
                            }
                            className="flex px-5 rounded mr-5 items-center bg-clearBlack border border-gray-400 focus:outline-none focus:ring focus:border-gray-400-500 "
                        >
                            <img
                                src="/assets/images/search.png"
                                className="h-[18px] w-auto"
                                alt=""
                            />
                            <input
                                id="searchInput"
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSearch();
                                    }
                                }}
                                className=" border-none bg-clearBlack focus:outline-none focus:ring-0 "
                            />
                        </div>
                        <select
                            value={filterType}
                            onChange={handleFilterType}
                            className="border border-gray-400 text-lightGray py-2 rounded cursor-pointer bg-clearBlack focus:ring-0 focus:border-gray-500 w-fit pr-10"
                        >
                            <option className="cursor-pointer" value="">
                                All Types
                            </option>
                            <option className="cursor-pointer" value="shirt">
                                Shirt
                            </option>
                            <option className="cursor-pointer" value="pants">
                                Pants
                            </option>
                        </select>
                    </div>
                </div>

                {/* Product Grid */}
                {displayedProducts.length === 0 ? (
                    <div className="w-full flex items-center flex-col mt-16">
                        <img
                            src="/assets/images/sad_face.png"
                            alt="No Items Found"
                        />
                        <p className="albert-sans mt-2 text-base">
                            Sorry, we couldn’t find any results.
                        </p>
                    </div>
                ) : (
                    <div className="m-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8">
                        {displayedProducts.map((product) => (
                            <div
                                key={product.id}
                                className="hover:scale-105 transition-all"
                            >
                                <a
                                    href={`/products/${product.id}`}
                                    className="text-center"
                                >
                                    <div className="bg-products hover:brightness-75 py-5 transition-all">
                                        <img
                                            src={`assets/products/${product.display_image}`}
                                            alt={product.name}
                                            className="hover:brightness-90 transition-all"
                                        />
                                    </div>
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
                )}
            </div>
        </>
    );
}
