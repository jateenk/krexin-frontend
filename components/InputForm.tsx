// components/InputForm.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import api from "../services/api";

export default function InputForm() {
    const [date, setDate] = useState("");
    const [rating, setRating] = useState("");
    const [tenors, setTenors] = useState("");
    const [pds, setPds] = useState<Record<string, number> | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPds(null);
        setError("");
        setLoading(true);

        try {
            const response = await api.get("/api/credit-matrix/pds", {
                params: { date, rating, tenors },
            });
            setPds(response.data.pds);
        } catch (err) {
            setError("Failed to fetch PDs. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Link back to Home */}
            <Link href="/" className="text-indigo-400 text-sm font-medium inline-block mb-4">
                Back to Home
            </Link>

            {/* Container with brand background (Tailwind), text color, etc. */}
            <div className="bg-brand text-white p-8 rounded-md max-w-xl mx-auto shadow-xl">
                <h2 className="text-2xl mb-4 font-bold text-center">
                    Probability of Default (PD) Calculator
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="date" className="text-sm font-medium">
                            Probability Table Date:
                        </label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            className=" bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white
                                          focus:outline-none focus:ring-2 focus:ring-indigo-400
                                          [&::-webkit-calendar-picker-indicator]:filter-[invert(1)]"
                        />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label htmlFor="rating" className="text-sm font-medium">
                            Rating:
                        </label>
                        <input
                            type="text"
                            id="rating"
                            placeholder="e.g., CR_2"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            required
                            className="bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white
                         focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label htmlFor="tenors" className="text-sm font-medium">
                            Tenors (comma-separated decimals):
                        </label>
                        <input
                            type="text"
                            id="tenors"
                            placeholder="e.g., 1.5, 2.0, 3.25"
                            value={tenors}
                            onChange={(e) => setTenors(e.target.value)}
                            required
                            className="bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white
                         focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    {/* White button with black text */}
                    <button
                        type="submit"
                        className="bg-white text-black font-semibold py-2 px-4 rounded
                       hover:bg-gray-200 transition-colors"
                    >
                        {loading ? "Calculating..." : "Calculate PDs"}
                    </button>
                </form>

                {/* Error Message */}
                {error && (
                    <p className="text-red-400 mt-4 text-center">
                        {error}
                    </p>
                )}

                {/* Results */}
                {pds && (
                    <div className="mt-6 bg-gray-800 p-4 rounded-md shadow-lg">
                        <h3 className="text-xl mb-2 font-semibold">
                            Calculated Probability of Defaults
                        </h3>
                        <table className="w-full border-collapse text-center">
                            <thead>
                            <tr className="border-b border-indigo-600">
                                <th className="py-2 text-left pl-3">Tenor</th>
                                <th className="py-2 text-left pl-3">PD</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.entries(pds).map(([tenor, pd]) => (
                                <tr key={tenor} className="border-b border-gray-700">
                                    <td className="py-2 pl-3">{tenor}</td>
                                    <td className="py-2 pl-3">{pd}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
