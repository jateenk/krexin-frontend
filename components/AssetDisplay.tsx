"use client";

import React from "react";

// Interface for each interest detail
interface InterestDetail {
    start_date: string;
    end_date: string;
    notional: number;
    spread: number;
    capitalize: boolean;
    fixed_or_float: boolean;
    fixed_rate: number;
}

// Interface for the full asset data
interface AssetData {
    transaction_id: string;
    counterparty: string;
    trade_date: string;
    settlement_date: string;
    credit_rating: string;
    lgd: number;
    maturity_date: string;
    initial_loan: number;
    interest_details?: InterestDetail[];
    // ...any additional fields
}

interface Props {
    assetData: AssetData; // or 'any' if you prefer
}

export default function AssetDisplay({ assetData }: Props) {
    // We can safely destructure now, because we only render when assetData exists
    // Provide a default empty array for interest_details if it's undefined
    const { interest_details = [], ...rest } = assetData;

    // Convert rest fields to a [key, value] array
    const generalFields = Object.entries(rest);

    return (
        <div className="mt-8 max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-black">Asset Details</h2>

            {/* -- TABLE FOR GENERAL FIELDS (excluding interest_details) -- */}
            <table className="w-full border-collapse text-left bg-white rounded-md shadow-lg mb-6">
                <thead>
                <tr className="border-b border-gray-300">
                    <th className="py-3 px-4 font-semibold text-black">Field</th>
                    <th className="py-3 px-4 font-semibold text-black">Value</th>
                </tr>
                </thead>
                <tbody>
                {generalFields.map(([key, value]) => (
                    <tr key={key} className="border-b border-gray-200">
                        <td className="py-2 px-4 font-medium capitalize text-black">{key}</td>
                        <td className="py-2 px-4 text-black">
                            {typeof value === "object" && value !== null
                                ? JSON.stringify(value)
                                : String(value)}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* -- TABLE FOR INTEREST DETAILS -- */}
            <h3 className="text-xl font-bold mb-2 text-black">Interest Details</h3>
            <table className="w-full border-collapse text-left bg-white rounded-md shadow-lg">
                <thead>
                <tr className="border-b border-gray-300">
                    <th className="py-3 px-4 font-semibold text-black">Start Date</th>
                    <th className="py-3 px-4 font-semibold text-black">End Date</th>
                    <th className="py-3 px-4 font-semibold text-black">Notional</th>
                    <th className="py-3 px-4 font-semibold text-black">Spread</th>
                    <th className="py-3 px-4 font-semibold text-black">Capitalize</th>
                    <th className="py-3 px-4 font-semibold text-black">Fixed/Float</th>
                    <th className="py-3 px-4 font-semibold text-black">Fixed Rate</th>
                </tr>
                </thead>
                <tbody>
                {interest_details.length > 0 ? (
                    interest_details.map((detail, index) => (
                        <tr key={index} className="border-b border-gray-200">
                            <td className="py-2 px-4 text-black">
                                {new Date(detail.start_date).toLocaleDateString()}
                            </td>
                            <td className="py-2 px-4 text-black">
                                {new Date(detail.end_date).toLocaleDateString()}
                            </td>
                            <td className="py-2 px-4 text-black">{detail.notional.toLocaleString()}</td>
                            <td className="py-2 px-4 text-black">{detail.spread}</td>
                            <td className="py-2 px-4 text-black">{detail.capitalize ? "Yes" : "No"}</td>
                            <td className="py-2 px-4 text-black">
                                {detail.fixed_or_float ? "Fixed" : "Floating"}
                            </td>
                            <td className="py-2 px-4 text-black">{detail.fixed_rate}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td className="py-2 px-4 text-black" colSpan={7}>
                            No interest details available.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}
