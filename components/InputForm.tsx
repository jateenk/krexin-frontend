// components/InputForm.tsx

"use client";
// ^ Important so we can use useState, useEffect, and other client-side hooks in Next.js.

import React, { useState } from "react";
import Link from "next/link"; // Next.js Link
import api from "../services/api"; // or wherever this lives

const InputForm = () => {
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
            // Adjust the endpoint as needed for your Next.js environment
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
            {/* Next.js <Link> usage */}
            <Link href="/" style={styles.link}>
                Back to Home
            </Link>
            <div style={styles.container}>
                <h2 style={styles.title}>Probability of Default (PD) Calculator</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label htmlFor="date" style={styles.label}>
                            Date:
                        </label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label htmlFor="rating" style={styles.label}>
                            Rating:
                        </label>
                        <input
                            type="text"
                            id="rating"
                            placeholder="e.g., CR_2"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label htmlFor="tenors" style={styles.label}>
                            Tenors (comma-separated decimals):
                        </label>
                        <input
                            type="text"
                            id="tenors"
                            placeholder="e.g., 1.5, 2.0, 3.25"
                            value={tenors}
                            onChange={(e) => setTenors(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                    <button type="submit" style={styles.button}>
                        {loading ? "Calculating..." : "Calculate PDs"}
                    </button>
                </form>

                {error && <p style={styles.error}>{error}</p>}

                {pds && (
                    <div style={styles.resultsContainer}>
                        <h3 style={styles.resultsTitle}>
                            Calculated Probability of Defaults
                        </h3>
                        <table style={styles.table}>
                            <thead>
                            <tr>
                                <th style={styles.tableHeader}>Tenor</th>
                                <th style={styles.tableHeader}>PD</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.entries(pds).map(([tenor, pd]) => (
                                <tr key={tenor}>
                                    <td style={styles.tableCell}>{tenor}</td>
                                    <td style={styles.tableCell}>{pd}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

// Inline styles from your snippet
const styles: { [key: string]: React.CSSProperties } = {
    container: {
        backgroundColor: "#1e1e5f",
        color: "#e5e5e5",
        padding: "2rem",
        borderRadius: "10px",
        maxWidth: "600px",
        margin: "3rem auto",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
        fontFamily: "'Roboto', sans-serif",
    },
    title: {
        fontSize: "24px",
        marginBottom: "1rem",
        fontWeight: "600",
        textAlign: "center",
        color: "#f5f5f5",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
    },
    label: {
        fontSize: "14px",
        color: "#b0b0c3",
        fontWeight: "500",
    },
    input: {
        padding: "10px",
        fontSize: "14px",
        borderRadius: "6px",
        border: "1px solid #3a3a4f",
        backgroundColor: "#2a2a3e",
        color: "#e5e5e5",
        outline: "none",
        transition: "border-color 0.3s",
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#6c63ff",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
    error: {
        color: "#ff6b6b",
        marginTop: "1rem",
        fontSize: "14px",
        textAlign: "center",
    },
    resultsContainer: {
        marginTop: "2rem",
        backgroundColor: "#282838",
        padding: "1rem",
        borderRadius: "6px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    },
    resultsTitle: {
        fontSize: "18px",
        marginBottom: "1rem",
        fontWeight: "500",
        color: "#f5f5f5",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        textAlign: "center",
    },
    tableHeader: {
        borderBottom: "2px solid #6c63ff",
        padding: "10px",
        color: "#f5f5f5",
        fontWeight: "600",
    },
    tableCell: {
        padding: "10px",
        borderBottom: "1px solid #3a3a4f",
        color: "#e5e5e5",
    },
    link: {
        textDecoration: "none",
        color: "#6c63ff",
        fontSize: "14px",
        fontWeight: "500",
        marginBottom: "1rem",
        display: "inline-block",
    },
};

export default InputForm;
