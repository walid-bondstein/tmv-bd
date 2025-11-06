"use client";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export default function FormClient() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            email: formData.get("email"),
            contact_number: `${formData.get("countryCode")}${formData.get("phone")}`,
            message: formData.get("message"),
        };
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/get-in-touch`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const resp = await res.json();
            if (resp.code === 200) {
                toast.success(resp.message || "Message sent successfully!");
                e.currentTarget.reset();
            } else {
                console.error("Error:", resp);
                toast.error(resp.data.message || "Failed to send message. Please try again.");
            }
        } catch (err) {
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="lg:px-9 lg:py-8 py-3 px-3 bg-[#F3F5F8] rounded-2xl space-y-3"
        >
            <Input
                type="email"
                name="email"
                placeholder="Enter Your Email Address"
                className="bg-white rounded-lg px-5 py-4 h-auto"
                required
            />

            <div className="space-y-2">
                <div className="flex gap-3">
                    <Select name="countryCode" defaultValue="+880">
                        <SelectTrigger className="w-24 bg-white/20 border-gray-200 text-gray-900 focus:ring-yellow-400">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="+880">+880</SelectItem>
                            <SelectItem value="+1">+1</SelectItem>
                            <SelectItem value="+44">+44</SelectItem>
                            <SelectItem value="+91">+91</SelectItem>
                            <SelectItem value="+86">+86</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input
                        id="phone"
                        type="tel"
                        name="phone"
                        placeholder="1786594256"
                        className="bg-white rounded-lg px-5 py-4 h-auto"
                        required
                    />
                </div>
            </div>

            <Textarea
                name="message"
                className="bg-white px-5 py-4 rounded-lg max-h-28 h-28"
                placeholder="Write Your Message..."
                required
            />

            <button
                disabled={loading}
                className="bg-submit w-full xs:h-13 h-8 lg:font-bold rounded-lg tmv-shadow submit cursor-pointer text-[clamp(14px,4.0625vw,16px)]"
                type="submit"
            >
                {loading ? "Sending..." : "Let’s Talk"}
            </button>
        </form>
    );
}
