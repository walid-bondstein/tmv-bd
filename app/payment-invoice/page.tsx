"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle, XCircle, Home } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Page() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const status = searchParams.get("status")

    const isSuccess = status === "ACCEPTED"
    if (!isSuccess) router.replace('/');
    return (
        <main className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="w-full max-w-md">
                <div className="flex flex-col items-center justify-center text-center">
                    {isSuccess ? (
                        <>
                            <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
                            <h1 className="text-3xl font-bold text-foreground mb-2">Payment Successful!</h1>
                            <p className="text-muted-foreground mb-8">
                                Thank you for your order. Your payment has been received and processed.
                            </p>
                        </>
                    ) : (
                        <>
                            <XCircle className="w-24 h-24 text-red-500 mb-6" />
                            <h1 className="text-3xl font-bold text-foreground mb-2">Payment Failed</h1>
                            <p className="text-muted-foreground mb-8">
                                Unfortunately, your payment could not be processed. Please try again or contact support.
                            </p>
                            <div className="bg-card rounded-lg p-6 w-full mb-8 border border-border">
                                <p className="text-sm text-muted-foreground mb-2">Error Code</p>
                                <p className="text-lg font-mono font-semibold text-red-500">
                                    ERR_{Math.random().toString(36).substring(7).toUpperCase()}
                                </p>
                            </div>
                        </>
                    )}

                    <div className="flex flex-col gap-3 w-full">
                        {isSuccess ? (
                            <>
                                <Button className="w-full" size="lg">
                                    Download Invoice
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button className="w-full" size="lg" asChild>
                                    <Link href="/cart">Try Again</Link>
                                </Button>
                            </>
                        )}
                    </div>

                    <Link
                        href="/"
                        className="mt-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </div>
        </main>
    )
}
