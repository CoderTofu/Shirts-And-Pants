import Navbar from "@/Elements/Navbar";

export default function OrderConfirmed({ order }) {
    return (
        <>
            <Navbar />
            <div className="albert-sans flex justify-center items-center mt-[100px] flex-col">
                <div className="max-w-[1000px]">
                    <div className="mb-10">
                        <div className="flex items-center">
                            <img
                                src="/assets/images/confirmed.png"
                                alt="Confirm Icon"
                                className="h-[3rem] w-auto mr-5"
                            />
                            <h1 className="text-4xl font-bold">
                                Thank you for your Order
                            </h1>
                        </div>
                        <p className="ml-16 text-xl pl-2">
                            Order #{order.id} placed
                        </p>
                    </div>
                    <div className="bg-green text-green py-16 px-10 text-lg border border-green-500">
                        Your order has been received. Kindly wait for further
                        confirmation details.
                    </div>
                    <div className="flex justify-end mt-4">
                        <a
                            className="bg-products text-white font-bold hover:bg-gray-400 transition-all py-2 px-4 rounded"
                            href={`/products`}
                        >
                            Continue Shopping
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
