import { Head } from "@inertiajs/react";
import Navbar from "../Elements/Navbar";
import { useState } from "react";
import Footer from "../Elements/Footer";
import Alert from "../Elements/Alert";

export default function Products({ products }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("");
    const [displayedProducts, setDisplayedProducts] = useState(products);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

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
        setCurrentPage(1); // Reset to first page after filtering
        setShowSearchAlert(true);
        setTimeout(() => setShowSearchAlert(false), 3000);
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
        setCurrentPage(1); // Reset to first page after filtering
        setShowFilterAlert(true);
        setTimeout(() => setShowFilterAlert(false), 3000);
    };

    const paginate = (products) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return products.slice(startIndex, endIndex);
    };

    const totalPages = Math.ceil(displayedProducts.length / itemsPerPage);

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
                <div className="flex flex-col md:flex-row md:px-[5vw] justify-between pt-10 px-8">
                    <h1 className="text-4xl mt font-bold albert-sans">
                        Our Products
                    </h1>
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
                            className="border border-gray-400 text-lightGray py-2 rounded bg-clearBlack focus:ring-0 w-fit pr-10"
                        >
                            <option value="">All Types</option>
                            <option value="shirt">Shirts</option>
                            <option value="pants">Pants</option>
                        </select>
                    </div>
                </div>

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
                    <>
                        <div className="m-10 md:px-[5vw] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8">
                            {paginate(displayedProducts).map((product) => (
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

                        {/* Pagination Controls */}
                        <div className="flex justify-center items-center my-5 ">
                            <button
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.max(prev - 1, 1)
                                    )
                                }
                                className={`w-[120px] py-2 bg-gray-800 text-white rounded transition-all mr-2 ${
                                    currentPage === 1
                                        ? "opacity-50 cursor-not-allowed"
                                        : "hover:bg-gray-700"
                                }`}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>

                            {/* Numbered Page Buttons */}
                            {Array.from(
                                { length: totalPages },
                                (_, index) => index + 1
                            ).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-2 mr-1 rounded transition-all ${
                                        page === currentPage
                                            ? "bg-slate-600 text-white font-bold"
                                            : "bg-gray-200 hover:bg-gray-300"
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.min(prev + 1, totalPages)
                                    )
                                }
                                className={`w-[120px] ml-1 px-4 py-2 bg-gray-800 text-white rounded transition-all ${
                                    currentPage === totalPages
                                        ? "opacity-50 cursor-not-allowed"
                                        : "hover:bg-gray-700"
                                }`}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
