import AuthenticatedLayout from "../Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown } from "lucide-react";

export default function Dashboard() {
    const [orders] = useState([
        {
            id: "XXXX",
            date: "29 Sep, 2024 at 8:19 PM",
            product: {
                name: "PRODUCT NAME",
                variation: "White",
                image: "/placeholder.svg",
            },
            quantity: 1,
            total: 200,
            courier: "J&T Express",
            status: "Cancelled",
        },
        {
            id: "XXXX",
            date: "11 Nov, 2024 at 3:24 PM",
            product: {
                name: "PRODUCT NAME",
                variation: "Beige",
                image: "/placeholder.svg",
            },
            quantity: 1,
            total: 600,
            courier: "J&T Express",
            status: "To ship",
        },
        {
            id: "XXXX",
            date: "07 Nov, 2024 at 10:39 AM",
            product: {
                name: "PRODUCT NAME",
                variation: "Beige/Black",
                image: "/placeholder.svg",
            },
            quantity: 2,
            total: 400,
            courier: "J&T Express",
            status: "Completed",
        },
    ]);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="p-6">
                    <h1 className="text-2xl font-semibold mb-6">Orders</h1>

                    <Tabs defaultValue="all" className="mb-6">
                        <TabsList className="grid grid-cols-7 w-full">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
                            <TabsTrigger value="to-ship">To Ship</TabsTrigger>
                            <TabsTrigger value="shipping">Shipping</TabsTrigger>
                            <TabsTrigger value="completed">
                                Completed
                            </TabsTrigger>
                            <TabsTrigger value="cancellation">
                                Cancellation
                            </TabsTrigger>
                            <TabsTrigger value="return-refund">
                                Return/Refund
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="flex gap-4 mb-6">
                        <Input placeholder="Search" className="max-w-sm" />
                        <Button variant="outline">Filters</Button>
                    </div>

                    <div className="border rounded-lg">
                        <div className="grid grid-cols-7 gap-4 p-4 border-b bg-muted/50 text-sm">
                            <div className="col-span-2">Order Details</div>
                            <div>Quantity</div>
                            <div>Order Total</div>
                            <div>Courier</div>
                            <div>Status</div>
                            <div>Actions</div>
                        </div>

                        {orders.map((order) => (
                            <div
                                key={order.id + order.date}
                                className="grid grid-cols-7 gap-4 p-4 border-b items-center text-sm"
                            >
                                <div className="col-span-2 flex gap-4">
                                    <Checkbox />
                                    <div className="flex gap-3">
                                        <img
                                            src={order.product.image}
                                            alt={order.product.name}
                                            width={60}
                                            height={60}
                                            className="bg-muted"
                                        />
                                        <div>
                                            <div className="font-medium">
                                                Order #{order.id}
                                            </div>
                                            <div className="text-muted-foreground text-xs">
                                                {order.date}
                                            </div>
                                            <div className="mt-1">
                                                {order.product.name}
                                            </div>
                                            <div className="text-muted-foreground text-xs">
                                                Variation:{" "}
                                                {order.product.variation}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>x{order.quantity}</div>
                                <div>P {order.total}</div>
                                <div>{order.courier}</div>
                                <div>{order.status}</div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm">
                                        View Details
                                    </Button>
                                    {order.status === "To ship" && (
                                        <Button size="sm" variant="ghost">
                                            <ChevronDown className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
