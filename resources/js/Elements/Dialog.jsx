import React from "react";

export function Dialog({ onClose, message }) {
    const handleCancel = () => {
        onClose(false);
    };

    const handleConfirm = () => {
        onClose(true);
    };

    return (
        <div className="fixed top-0 bottom-0 w-full h-full bg-black bg-opacity-50 albert-sans rounded-xl">
            <div className="flex justify-center items-center h-full">
                <div className="bg-white p-6 rounded shadow-lg w-[500px]">
                    <h2 className="text-4xl font-bold mb-4">Are you sure?</h2>
                    <span className="border-t border-black mb-4 block"></span>
                    <p>{message}</p>
                    <div className="flex justify-end mt-5">
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-700 transition-all"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition-all"
                            onClick={handleConfirm}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
