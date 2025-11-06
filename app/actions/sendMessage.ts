// inside your Server Component
async function handleSubmit(formData: FormData) {
    "use server"; // marks this as a server action

    const email = formData.get("email")?.toString();
    const countryCode = formData.get("countryCode")?.toString();
    const phone = formData.get("phone")?.toString();
    const message = formData.get("message")?.toString();

    const payload = {
        email,
        contact_number: `${countryCode}${phone}`,
        message,
    };

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/get-in-touch`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const resp = await res.json();

        if (resp.code !== 200) {
            console.error("Error from API:", resp);
            throw new Error(resp.data?.message || "Failed to send message");
        }

        // You can optionally return a message
        return { success: true, message: resp.message || "Message sent successfully!" };
    } catch (err) {
        console.error("Error sending form data:", err);
        throw err; // server action can throw errors
    }
}
export { handleSubmit };