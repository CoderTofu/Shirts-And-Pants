import AuthenticatedLayout from "../Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Alert from "../Elements/Alert";

export default function Dashboard({ orders }) {
    const [tab, setTab] = useState("ALL");
    const [search, setSearch] = useState("");
    const [filteredOrders, setFilteredOrders] = useState(orders);
    const [showSearchAlert, setShowSearchAlert] = useState(false);
    const [showFilterAlert, setShowFilterAlert] = useState(false);

    const handleSearch = () => {
        const filtered = orders.filter((order) => {
            const matchesTab =
                tab === "ALL" || order.status.toUpperCase() === tab;

            const matchesSearch =
                order.customer.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                String(order.id).includes(search);

            return matchesTab && matchesSearch;
        });

        setFilteredOrders(filtered);
        setShowSearchAlert(true);
        setTimeout(() => setShowSearchAlert(false), 3000);
    };

    const handleTabChange = (status) => {
        const filtered = orders.filter((order) => {
            const matchesTab =
                status === "ALL" || order.status.toUpperCase() === status;

            return (
                matchesTab &&
                (search
                    ? order.customer.name
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                      String(order.id).includes(search)
                    : true)
            );
        });

        setTab(status);
        setFilteredOrders(filtered);
        setShowFilterAlert(true);
        setSearch("");
        setTimeout(() => setShowFilterAlert(false), 3000);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            {showSearchAlert && (
                <Alert type="success" message="Search applied!" />
            )}

            {showFilterAlert && (
                <Alert type="success" message="Filter applied!" />
            )}
            <div className="py-12 px-[100px] albert-sans">
                <div className="p-6">
                    <h1 className="text-2xl font-semibold mb-6">Orders</h1>

                    <nav className="flex bg-white border-2 border-gray-300 rounded-xl rounded-b-none">
                        {[
                            "ALL",
                            "PENDING ORDER",
                            "TO SHIP",
                            "SHIPPING",
                            "COMPLETED",
                            "CANCELLED",
                        ].map((status) => (
                            <button
                                key={status}
                                onClick={() => handleTabChange(status)}
                                className={`flex-1 py-2 px-5 hover:bg-slate-100 transition-colors duration-300 ${
                                    tab === status
                                        ? "bg-gray-200 font-bold"
                                        : ""
                                }`}
                            >
                                {status}
                            </button>
                        ))}
                    </nav>

                    <div className="overflow-hidden bg-white border-2 border-gray-300 shadow-sm sm:rounded-lg my-2 rounded-xl sm:rounded-t-none">
                        <div className="px-4 text-gray-900 ">
                            <div className="flex gap-4 my-3">
                                <Input
                                    placeholder="Search orders..."
                                    className="max-w-sm"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={handleKeyDown} // Trigger search on Enter
                                />
                                <Button
                                    className="py-2 px-5 hover:bg-slate-100"
                                    variant="outline"
                                    onClick={handleSearch}
                                >
                                    Search
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="border rounded-lg px-5">
                        <div className="grid grid-cols-5 gap-4 p-4 text-sm border-b border-gray-500">
                            <div className="col-span-2"></div>
                            <div className="text-center font-bold">
                                Order Total
                            </div>
                            <div className="text-center font-bold">Status</div>
                            <div className="text-center font-bold">Actions</div>
                        </div>

                        {filteredOrders.length === 0 ? (
                            <div>
                                <div className="text-center py-4">
                                    No orders found.
                                </div>
                            </div>
                        ) : (
                            filteredOrders.map((order) => (
                                <div
                                    key={order.id + order.date}
                                    className="grid grid-cols-5 gap-4 p-4 items-center text-sm border-b border-gray-300"
                                >
                                    <div className="col-span-2 flex gap-4 items-center">
                                        <div className="flex gap-3">
                                            <img
                                                src={`/assets/products/${order.products[0].product.display_image}`}
                                                alt="Product Image"
                                                width={60}
                                                height={60}
                                                className="bg-gray-400 rounded-sm"
                                            />
                                            <div>
                                                <div className="font-medium">
                                                    Order #{order.id}
                                                </div>
                                                <div className="text-muted-foreground text-xs">
                                                    {new Date(
                                                        order.date
                                                    ).toLocaleString()}
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
                            ))
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
