import Navbar from "../Elements/Navbar";

export default function Error() {
    return (
        <>
            <Navbar />
            <div className="flex justify-center flex-col items-center h-screen w-screen">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="albert-sans text-8xl font-bold">Error</h1>
                    <h3 className="albert-sans text-3xl">
                        Oops! There was an error.
                    </h3>
                </div>
                <div className="flex flex-col justify-center items-center mt-10">
                    <p className="text-xl mb-5">
                        Please check the URL or contact support if the problem
                        persists.
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
