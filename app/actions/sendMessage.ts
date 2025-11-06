"use server";

export async function sendMessage(formData: FormData) {
    const email = formData.get("email");
    const countryCode = formData.get("countryCode");
    const phone = formData.get("phone");
    const message = formData.get("message");

    try {
        // Send data to your real API, not localhost
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-in-touch`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                phone: `${countryCode}${phone}`,
                message,
            }),
        });

        if (!response.ok) {
            console.error("API Error:", await response.text());
            throw new Error("Failed to send message to API");
        }

        console.log("✅ Message sent successfully");
        return { success: true };
    } catch (err) {
        console.error("Server Action Error:", err);
        return { success: false, error: "Something went wrong" };
    }
}
