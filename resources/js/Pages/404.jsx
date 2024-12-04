import Navbar from "../Elements/Navbar";

export default function page404() {
    return (
        <>
            <Navbar />
            <div className="flex justify-center flex-col items-center h-screen w-screen">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="albert-sans text-8xl font-bold">404</h1>
                    <h3 className="albert-sans text-3xl">
                        Oops! Page not found.
                    </h3>
                </div>
                <div className="flex flex-col justify-center items-center mt-10">
                    <p className="text-xl mb-5">
                        This page you're looking for doesn't exist or has been
                        removed.
                    </p>
                    <div>
                        <a
                            className="w-[300px] border border-gray-600 hover:bg-gray-900 hover:text-white transition-all px-12 py-2  text-lg "
                            href="/"
                        >
                            Go to Home Page
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
