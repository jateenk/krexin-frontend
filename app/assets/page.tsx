"use client";

import React, { useState } from "react";
import AssetSearch from "@/components/AssetSearch";
import AssetDisplay from "@/components/AssetDisplay";

export default function AssetPage() {
    // Parent holds the asset data
    const [assetData, setAssetData] = useState<any>(null);

    // Called by the child after a successful API call
    const handleSearchComplete = (data: any) => {
        setAssetData(data);
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">Asset Page</h1>

            {/* The search form */}
            <AssetSearch onSearchComplete={handleSearchComplete} />

            {/*
        Only render AssetDisplay if assetData is not null/undefined.
        This prevents the destructuring error.
      */}
            {assetData ? (
                <AssetDisplay assetData={assetData} />
            ) : (
                <div className="mt-6 text-gray-400">
                    No data loaded yet. Please search above.
                </div>
            )}
        </div>
    );
}
