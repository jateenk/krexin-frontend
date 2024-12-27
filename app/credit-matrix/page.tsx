// app/credit-matrix/page.tsx

import InputForm from "@/components/InputForm";

export default function CreditMatrixPage() {
    return (
        <section>
            <h1>Credit Matrix</h1>
            <p>Check your default probabilities below.</p>
            {/* Render the InputForm here */}
            <InputForm />
        </section>
    );
}
