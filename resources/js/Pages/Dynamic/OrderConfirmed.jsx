import Navbar from "@/Elements/Navbar";

export default function OrderConfirmed({ order }) {
    return (
        <>
            <Navbar />
            <div>Order {order.id} placed</div>;
        </>
    );
}
