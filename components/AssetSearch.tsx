"use client";

import React, { useState } from "react";
import Link from "next/link";
import api from "../services/api"; // Your Axios or fetch logic

interface AssetSearchProps {
    onSearchComplete: (data: any) => void;
}

export default function AssetSearch({ onSearchComplete }: AssetSearchProps) {
    const [transactionId, setTransactionId] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const encodedTransactionId = encodeURIComponent(transactionId);
            const apiUrl = `/api/credit-note/${encodedTransactionId}`;
            console.log("Generated API URL:", apiUrl);

            const response = await api.get(apiUrl);
            console.log("Response received:", response.data);

            // Send data back to the parent
            onSearchComplete(response.data);
        } catch (err: any) {
            console.error("Error fetching asset details:", err?.response || err);
            setError(
                err?.response?.data?.detail ||
                "Failed to fetch asset details. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-brand text-white p-6 rounded-md max-w-xl mx-auto shadow-xl">
            <Link href="/" className="text-indigo-400 text-sm font-medium inline-block mb-4">
                Back to Home
            </Link>

            <h2 className="text-2xl mb-4 font-bold text-center">Asset Search</h2>

            <form onSubmit={handleSearch} className="flex flex-col space-y-4">
                <div>
                    <label htmlFor="transactionId" className="text-sm font-medium">
                        Transaction ID:
                    </label>
                    <input
                        type="text"
                        id="transactionId"
                        placeholder="Enter Transaction ID"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        required
                        className="bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white
                       focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-white text-black font-semibold py-2 px-4 rounded
                     hover:bg-gray-200 transition-colors"
                >
                    {loading ? "Searching..." : "Search"}
                </button>
            </form>

            {error && (
                <p className="text-red-400 mt-4 text-center">{error}</p>
            )}
        </div>
    );
}
