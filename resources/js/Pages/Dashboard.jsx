import AuthenticatedLayout from "../Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Dashboard({ orders }) {
    const [tab, setTab] = useState("ALL");
    const [search, setSearch] = useState("");
    console.log(orders);
    const filteredOrders = orders
        .filter((order) => {
            // Filter by status
            if (tab === "ALL") return true;
            if (tab === "TO SHIP" && order.status === "To ship") return true;
            if (tab === "SHIPPING" && order.status === "Shipping") return true;
            if (tab === "COMPLETED" && order.status === "Completed")
                return true;
            if (tab === "CANCELLED" && order.status === "Cancelled")
                return true;
            if (tab === "RETURN/REFUND" && order.status === "Return/Refund")
                return true;
            return false;
        })
        .filter((order) => {
            // Filter by search query
            return (
                String(order.id).toLowerCase().includes(search.toLowerCase()) ||
                order.customer.name.toLowerCase().includes(search.toLowerCase())
            );
        });

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 px-[100px] albert-sans">
                <div className="p-6">
                    <h1 className="text-2xl font-semibold mb-6">Orders</h1>

                    <nav className="flex">
                        <button
                            onClick={() => {
                                setTab("ALL");
                            }}
                            className="flex-1 py-2 px-5 hover:bg-slate-100 transition-colors duration-300"
                        >
                            All
                        </button>
                        <button
                            onClick={() => {
                                setTab("TO SHIP");
                            }}
                            className="flex-1 py-2 px-5 hover:bg-slate-100 transition-colors duration-300"
                        >
                            To Ship
                        </button>
                        <button
                            onClick={() => {
                                setTab("SHIPPING");
                            }}
                            className="flex-1 py-2 px-5 hover:bg-slate-100 transition-colors duration-300"
                        >
                            Shipping
                        </button>
                        <button
                            onClick={() => {
                                setTab("COMPLETED");
                            }}
                            className="flex-1 py-2 px-5 hover:bg-slate-100 transition-colors duration-300"
                        >
                            Completed
                        </button>
                        <button
                            onClick={() => {
                                setTab("CANCELLED");
                            }}
                            className="flex-1 py-2 px-5 hover:bg-slate-100 transition-colors duration-300"
                        >
                            Cancelled
                        </button>
                        <button
                            onClick={() => {
                                setTab("RETURN/REFUND");
                            }}
                            className="flex-1 py-2 px-5 hover:bg-slate-100 transition-colors duration-300"
                        >
                            Return/Refund
                        </button>
                    </nav>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg my-2">
                        <div className="px-4 text-gray-900 ">
                            <div className="flex gap-4 my-3">
                                <Input
                                    placeholder="Order ID..."
                                    className="max-w-sm"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Button
                                    className="py-2 px-5 hover:bg-slate-100"
                                    variant="outline"
                                    onClick={() => {}}
                                >
                                    Search ID
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="border rounded-lg">
                        <div className="grid grid-cols-5 gap-4 p-4  text-sm">
                            <div className="col-span-2"></div>
                            <div className="text-center">Order Total</div>
                            <div className="text-center">Status</div>
                            <div className="text-center">Actions</div>
                        </div>

                        {filteredOrders.map((order) => (
                            <div
                                key={order.id + order.date}
                                className="grid grid-cols-5 gap-4 p-4 items-center text-sm"
                            >
                                <div className="col-span-2 flex gap-4 items-center">
                                    <div className="flex gap-3">
                                        <img
                                            src={`/assets/products/${order.products[0].product.display_image}`}
                                            alt="Just 1 Product Image"
                                            width={60}
                                            height={60}
                                            className="bg-muted"
                                        />
                                        <div>
                                            <div className="font-medium">
                                                Order #{order.id}
                                            </div>
                                            <div className="text-muted-foreground text-xs">
                                                {new Date(
                                                    order.date
                                                ).toUTCString()}
                                            </div>
                                            <div className="mt-1">
                                                Customer Name:{" "}
                                                {order.customer.name}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    P {order.total}
                                </div>
                                <div className="text-center">
                                    {order.status}
                                </div>
                                <div className="flex items-center gap-2 justify-center">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="hover:bg-slate-100 bg-slate-200 transition-colors duration-300"
                                    >
                                        <a href={`/order/${order.id}`}>
                                            View Details
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
