"use client"
import React, { useRef, useState } from 'react'
import { Input } from '../ui/input'
import { Send } from 'lucide-react'
import { toast } from 'sonner';

export default function NewsLetter() {
    const inpRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);

    const handleOnClick = async () => {
        if (loading) return;
        setLoading(true);
        if (inpRef.current) {
            const email = inpRef.current.value;
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/drop-email`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                });
                const resp = await res.json();
                if (resp.code === 200) {
                    toast.success("Subscribed successfully!");
                    inpRef.current.value = ''; // Clear input after successful subscription
                } else {
                    console.error("Error:", resp);
                    toast.error(resp.data.email || "Failed to send message. Please try again.");
                }
            } catch (err) {
                console.error("Error:", err);
            } finally {
                setLoading(false);
            }
        }
    }
    return (
        <div className='border px-2 py-1 rounded-full flex justify-between items-center'>
            <Input
                ref={inpRef}
                type="email"
                placeholder="Enter Your Email Address"
                className="border-0 focus:ring-0 rounded-lg h-auto focus-visible:ring-0 focus-visible:border-0 shadow-none"
            />
            <div className={`bg-yellow-400 h-10 w-10 shrink-0 flex justify-center items-center rounded-full ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                <Send onClick={() => handleOnClick()} />
            </div>
        </div>
    )
}
