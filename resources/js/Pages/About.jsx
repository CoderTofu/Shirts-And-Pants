import Navbar from "../Elements/Navbar";
import { Head } from "@inertiajs/react";

export default function About() {
    return (
        <>
            <Navbar />
            {/* Banner */}
            <Head title="About" />
            <div className="relative">
                <img
                    src="/assets/images/banners/banner_8.png"
                    alt=""
                    className="h-auto max-h-[800px] w-full object-cover"
                />
                <div className="w-full h-full absolute bg-black opacity-30 top-0"></div>
                <div className="w-full h-full absolute top-0">
                    <div
                        className="flex justify-center items-center h-full text-white albert-sans text-8xl italic font-black"
                        style={{
                            textShadow:
                                "4px 4px 10px rgba(0, 0, 0, 0.8), 2px 2px 5px rgba(255, 255, 255, 0.5)",
                        }}
                    >
                        Simple. Bold. Yours.
                    </div>
                </div>
            </div>
            {/* Content */}
            <div className="flex flex-col justify-center items-center mt-20">
                <div className="albert-sans">
                    <h2 className="text-center text-4xl font-black">
                        ABOUT US
                    </h2>
                    <p className="max-w-[800px] mt-10 text-lg">
                        Founded in 2024, Shirts and Pants (SAP) is all about
                        merging simplicity with style. We create high-quality,
                        minimalist clothing that looks good and feels good. By
                        blending classic streetwear aesthetics with a modern
                        twist, we design pieces that make a bold statement
                        without ever being over the top. Our goal is to make
                        premium, fashion-forward clothing accessible to
                        everyone, offering easy-to-wear designs that capture the
                        essence of a simple yet artistic life.
                    </p>
                    <p className="max-w-[800px] mt-10 text-lg">
                        We believe in the power of simplicity. Our clothes are
                        inspired by street culture and crafted with precision to
                        empower individuals to express their true selves.
                        Whether you're navigating city streets or just hanging
                        out, Shirts and Pants offers versatile, timeless pieces
                        that balance comfort with unique design. For us, fashion
                        is about being confident, authentic, and
                        unapologetically you.
                    </p>
                </div>
                <a
                    className="border border-gray-600 rounded hover:bg-gray-900 hover:text-white transition-all px-12 py-2 my-10 text-lg "
                    href="/"
                >
                    Explore
                </a>
                <div className="border-b border-solid border-black w-[1000px] max-w-[90vw]"></div>
            </div>
            {/* Meet the Team */}
            <div className="my-10">
                <div className="albert-sans">
                    <h2 className="text-center text-4xl font-black">
                        MEET THE TEAM
                    </h2>
                    {/* INSERT CARDS HERE */}
                </div>
            </div>
        </>
    );
}
