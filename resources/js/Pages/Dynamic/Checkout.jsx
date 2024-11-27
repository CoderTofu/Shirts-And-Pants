import Navbar from "../../Elements/Navbar";

export default function Checkout({ order }) {
    return (
        <>
            <Navbar />
            <div>Thank you for your order. Order # {order.id}</div>
        </>
    );
}
