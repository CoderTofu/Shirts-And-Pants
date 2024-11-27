import Navbar from "../../Elements/Navbar";
import { Head } from "@inertiajs/react";
const dummyProduct = [
    {
        product_name: "Product 1",
        product_size: "M",
        product_price: 100,
        product_qty: 1,
        product_img: "assets/products/product-1-black.jpg",
    },
    {
        product_name: "Product 2",
        product_size: "L",
        product_price: 200,
        product_qty: 2,
        product_img: "assets/products/product-2-red.jpg",
    },
    {
        product_name: "Product 3",
        product_size: "S",
        product_price: 300,
        product_qty: 3,
        product_img: "assets/products/product-1-gray-1.jpg",
    },
];

const dummyOrder = {
    order_id: "123456",
    order_time: "2021-08-23 12:34:56",
};

const dummyCustomer = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    phone: "081234567890",
    address: "1234 Main St, Suburb, City",
};

export default function Order() {
    return (
        <>
            <Navbar />
            <Head title="Order" />
            <main className="py-12 px-[200px] albert-sans">
                {/* Order ID and Time */}
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-end mb-2">
                        <h1 className="text-4xl mr-5">
                            Order #{dummyOrder.order_id}
                        </h1>
                        <h4 className="text-xl text-customGray">
                            {dummyOrder.order_time}
                        </h4>
                    </div>
                    <div>
                        <button className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors duration-300">
                            Save Changes
                        </button>
                    </div>
                </div>

                {/* Order Details and Customer info */}
                <section className="flex justify-normal">
                    {/* Order */}
                    <div className="bg-white flex-1 border-2 border-gray-300 rounded-lg">
                        <div className="flex justify-between items-center border-b border-gray-300 py-4 px-10">
                            <div>
                                <h2 className="text-2xl">Order Details</h2>
                            </div>
                            <div className="flex items-center space-x-2">
                                <h4 className="albert-sans text-base font-light pb-1">
                                    Status:
                                </h4>
                                <select className="cursor-pointer border border-gray-300 rounded-md px-3 py-1 text-base focus:outline-none focus:ring-2 focus:ring-gray-400">
                                    <option value="To Ship">To Ship</option>
                                    <option value="Shipping">Shipping</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="Return/Refund">
                                        Return/Refund
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div>
                            {dummyProduct.map((product, index) => (
                                <div
                                    className="flex justify-between px-10 items-center my-5"
                                    key={index}
                                >
                                    {/* Product Detail */}
                                    <div className="flex items-center overflow-hidden">
                                        <img
                                            src={product.product_img}
                                            alt={product.product_name}
                                            className="w-[100px] h-[100px] object-cover "
                                        />
                                        <div className="ml-5">
                                            <h3 className="text-xl">
                                                {product.product_name}
                                            </h3>
                                            <h4 className="text-base">
                                                Size: {product.product_size}
                                            </h4>
                                            <h4 className="text-sm">
                                                Quantity: {product.product_qty}
                                            </h4>
                                        </div>
                                    </div>

                                    {/* Price and action button */}
                                    <div className="flex justify-start ">
                                        <p className="ml-5 text-customGray">
                                            P{" "}
                                            {product.product_price *
                                                product.product_qty}
                                        </p>
                                        <button className="ml-20 px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-600 hover:text-white transition-colors duration-300">
                                            {" "}
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-b border-gray-300 mx-8"></div>

                        <div className="py-5 px-10 flex items-center">
                            <h4 className="mr-3 text-xl font-semibold">
                                Total:{" "}
                            </h4>
                            <h3 className="text-base">
                                P{" "}
                                {dummyProduct.reduce(
                                    (acc, product) =>
                                        acc +
                                        product.product_price *
                                            product.product_qty,
                                    0
                                )}
                            </h3>
                        </div>
                    </div>

                    {/* Customer Info */}
                    <div className="bg-white border-2 border-gray-300 rounded-lg ml-2 py-4 px-7 min-w-[20vw] h-fit">
                        <div className="text-2xl mb-3">
                            <h2>Customer Info</h2>
                        </div>
                        <div>
                            <div className="mb-2">
                                <h4 className="text-sm text-customGray">
                                    Name
                                </h4>
                                <h3 className="text-lg">
                                    {dummyCustomer.name}
                                </h3>
                            </div>
                            <div className="mb-2">
                                <h4 className="text-sm text-customGray">
                                    Email
                                </h4>
                                <h3 className="text-lg">
                                    {dummyCustomer.email}
                                </h3>
                            </div>
                            <div className="mb-2">
                                <h4 className="text-sm text-customGray">
                                    Phone
                                </h4>
                                <h3 className="text-lg">
                                    {dummyCustomer.phone}
                                </h3>
                            </div>
                            <div className="mb-2">
                                <h4 className="text-sm text-customGray">
                                    Shipping Address
                                </h4>
                                <h3 className="text-lg">
                                    {dummyCustomer.address}
                                </h3>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
