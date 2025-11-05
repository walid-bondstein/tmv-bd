"use client"

import { Option } from '@/app/billing/page'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from '@/context/cart-context'
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import CustomRadio from './CustomRdio'
import { toast } from 'sonner'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const billingFormSchema = z.object({
    first_name: z.string().min(2, "First name must be at least 2 characters"),
    last_name: z.string().min(2, "Last name must be at least 2 characters"),
    contact_number: z.string().regex(/^[0-9+\-\s()]+$/, "Invalid phone number"),
    email: z.string().email("Invalid email address").or(z.literal("")),
    installation_date: z.string().min(1, "Installation date is required"),
    installation_time: z.string().min(1, "Installation time is required"),
    district_id: z.string().min(1, "District is required"),
    division_id: z.string().min(1, "Division is required"),
    post_code: z.string().min(1, "Postal code is required"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    coupon_code: z.string(),
    paymentType: z.enum(["full_payment", "partial_payment"] as const),
    advance_payment_amount: z.string().optional(),
    payment_method: z.enum(["bkash", "online"] as const),
    city: z.string("City is required").min(1, "City is required"),
})

type BillingFormValues = z.infer<typeof billingFormSchema>

const defaultValues: BillingFormValues = {
    first_name: "",
    last_name: "",
    contact_number: "",
    email: "",
    installation_date: "",
    installation_time: "",
    district_id: "",
    division_id: "",
    post_code: "",
    address: "",
    coupon_code: "",
    paymentType: "full_payment",
    payment_method: "online",
    city: "",
    advance_payment_amount: "",
}
type BillinfFormProps = {
    divitions: Option[]
    districts: Option[]
    upazilas: Option[]
    unions: Option[]
}
export default function BillingForm({
    districts,
    // upazilas,
    divitions,
    // unions,
}: BillinfFormProps) {
    const { items, applyCoupon, coupon, clearCoupon, subtotal, discount, total, clearCart } = useCart()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showCoupon, setCouponForm] = useState(false);
    const [couponText, setCouponText] = useState("");
    const router = useRouter();


    const form = useForm<BillingFormValues>({
        resolver: zodResolver(billingFormSchema),
        defaultValues: { ...defaultValues, coupon_code: coupon?.code ?? "" },
    })


    function popupWindow(url: string, windowName: string, win: Window, w: number, h: number) {
        const topWin = (win.top ?? win) as Window;
        const outerHeight = topWin.outerHeight ?? win.outerHeight ?? 0;
        const outerWidth = topWin.outerWidth ?? win.outerWidth ?? 0;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const screenY = (topWin as any).screenY ?? 0;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const screenX = (topWin as any).screenX ?? 0;

        const y = outerHeight / 2 + screenY - h / 2;
        const x = outerWidth / 2 + screenX - w / 2;
        return win.open(
            url,
            windowName,
            `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`
        );
    }


    const onSubmit = async (values: BillingFormValues) => {
        try {
            const { paymentType, advance_payment_amount, ...rest } = values;
            const rawData = {
                ...rest,
                coupon_code: coupon ? values.coupon_code : "",
                partial_payment_amount: advance_payment_amount ? Number(advance_payment_amount) : 0,
                products: items.map((itm) => ({
                    id: itm.id,
                    quantity: itm.quantity,
                    product_subscription_id: itm.subscriptionID,
                })),
            }
            setIsSubmitting(true);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))
            axios
                .post(`https://middleware.bondstein.net/api/v4/tmvbd/store-order`, rawData)
                .then((res) => {
                    console.log(res.data);
                    const childWindow = popupWindow(
                        res.data.url,
                        "Track My Vehicle Payment",
                        window,
                        430,
                        620
                    );

                    window.addEventListener("message", (event) => {
                        if (event.data?.type === "payment_status") {
                            /* 
                            childWindow?.close();
                            toast.success("Payment status received");
                            */
                            if (event.data.status === "ACCEPTED") {
                                toast.success("Payment Successful!");
                                clearCart();
                                childWindow?.close();
                                router.push(`/payment-invoice?status=ACCEPTED`);
                            } else if (event.data.status === "REJECTED") {
                                toast.error("Payment Failed! Try again.");
                                childWindow?.close();
                                // router.push(`/payment-invoice?status=REJECTED`);
                            }
                        }
                        window.removeEventListener("message", () => {
                            console.log("Event listener removed");
                        })
                    });

                    toast.success("Invoice has been created");
                    const intervalId = setInterval(() => {
                        try {
                            if (!childWindow || childWindow.closed) return;

                            const currentUrl = childWindow.location.href;
                            console.log("Current URL:", currentUrl);
                            if (currentUrl.includes("ACCEPTED")) {
                                // toast.success("Payment Successfull!");
                                // childWindow.close();
                                clearInterval(intervalId);
                                console.log("Current URL:", { currentUrl });
                                window.postMessage({ type: "payment_status", status: "ACCEPTED" }, "*");
                            } else if (currentUrl.includes("REJECTED")) {
                                // toast.error("Payment Rejected!");
                                // childWindow.close();
                                window.postMessage({ type: "payment_status", status: "REJECTED" }, "*");
                                clearInterval(intervalId);
                                setIsSubmitting(false);
                            }
                        } catch (e) {
                            console.log("Error accessing child window URL", e);
                            // errorNotify("Payment Error");
                        } finally {
                            setIsSubmitting(false);
                        }
                    }, 300);
                })
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .catch((err: any) => {
                    console.log(err?.response?.data?.user_message);
                })
                .finally(() => {
                    setIsSubmitting(false);
                });
            console.log("Form submitted:", rawData)
        } catch (error) {
            console.error("Submission error:", error)
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <div className="component-container mx-auto space-y-4 my-4">
            <div onClick={() => window?.history?.back()} className='flex cursor-pointer justify-start items-center gap-2'>
                <ArrowLeft className='cursor-pointer' />
                <h2 className='md:text-2xl text-lg  md:font-bold font-medium text-[#202939]'>Billing details</h2>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-cols-12 md:gap-8 gap-0'>
                    <div className='lg:col-span-7 col-span-12'>
                        <div className='space-y-5'>
                            <div className="border space-y-4 border-gray-200 md:px-7 px-2 md:py-8 py-3 rounded-lg">
                                <div >
                                    <h2 className="mb-6 text-lg font-semibold text-foreground">BILLING DETAILS</h2>
                                    <div className="space-y-4">
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <FormField
                                                control={form.control}
                                                name="first_name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm font-medium">
                                                            First Name <span className="text-destructive">*</span>
                                                        </FormLabel>
                                                        <Input placeholder="Enter First Name" {...field} className="bg-muted/50" />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="last_name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm font-medium">
                                                            Last Name <span className="text-destructive">*</span>
                                                        </FormLabel>
                                                        <Input placeholder="Enter Last Name" {...field} className="bg-muted/50" />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {/* Contact Number and Email */}
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <FormField
                                                control={form.control}
                                                name="contact_number"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm font-medium">
                                                            Contact Number <span className="text-destructive">*</span>
                                                        </FormLabel>
                                                        <Input placeholder="Enter Contact Number" {...field} className="bg-muted/50" />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm font-medium">
                                                            Email <span className="text-muted-foreground">(optional)</span>
                                                        </FormLabel>
                                                        <Input type="email" placeholder="example@gmail.com" {...field} className="bg-muted/50" />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {/* Installation Date and Time */}
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <FormField
                                                control={form.control}
                                                name="installation_date"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm font-medium">
                                                            Preferred Installation Date <span className="text-destructive">*</span>
                                                        </FormLabel>
                                                        <Input
                                                            type="date"
                                                            {...field}
                                                            className="bg-muted/50"
                                                            min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                                                        />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="installation_time"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm font-medium">
                                                            Preferred Installation Time <span className="text-destructive">*</span>
                                                        </FormLabel>

                                                        <Input type="time" {...field}
                                                            min="09:00"
                                                            max="21:00"
                                                            step="60"
                                                            value={field.value || ""}
                                                            onChange={(e) => {
                                                                const val = e.target.value

                                                                if (val < "09:00") {
                                                                    field.onChange("09:00");
                                                                    toast.error("Please select a time between 09:00AM and 09:00PM");
                                                                }
                                                                else if (val > "21:00") {
                                                                    field.onChange("21:00");
                                                                    toast.error("Please select a time between 09:00AM and 09:00PM");
                                                                }
                                                                else field.onChange(val)
                                                            }}
                                                            className="bg-muted/50" />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                    </div>
                                </div>
                                {/* Address Section */}
                                <div>
                                    <h2 className="mb-6 text-lg font-semibold text-foreground">ADDRESS</h2>
                                    <div className="space-y-4">
                                        {/* District, Thana, Postal Code */}
                                        <div className="xl:grid xl:grid-cols-3 lg:block md:grid md:grid-cols-3 gap-4 justify-start items-center">
                                            <FormField
                                                control={form.control}
                                                name="division_id"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm font-medium">
                                                            Division <span className="text-destructive">*</span>
                                                        </FormLabel>
                                                        <Select onValueChange={field.onChange} value={field.value}>
                                                            <SelectTrigger className="bg-muted/50 w-full">
                                                                <SelectValue placeholder="Select Division" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {
                                                                    divitions.map((div) => (
                                                                        <SelectItem key={div.value} value={div.value}>{div.label}</SelectItem>
                                                                    ))
                                                                }
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="district_id"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm font-medium">
                                                            District <span className="text-destructive">*</span>
                                                        </FormLabel>
                                                        <Select onValueChange={field.onChange} value={field.value}>
                                                            <SelectTrigger className="bg-muted/50 w-full">
                                                                <SelectValue placeholder="Select District" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {
                                                                    districts.map((district) => (
                                                                        <SelectItem key={district.value} value={district.value}>{district.label}</SelectItem>
                                                                    ))
                                                                }
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="city"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm font-medium">
                                                            City <span className="text-destructive">*</span>
                                                        </FormLabel>
                                                        <Input
                                                            type="text"
                                                            {...field}
                                                            className="bg-muted/50"
                                                            placeholder='City Name. Eg: Dhaka'
                                                        />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="post_code"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm font-medium">
                                                            Postal Code <span className="text-destructive">*</span>
                                                        </FormLabel>
                                                        <Input
                                                            type="text"
                                                            {...field}
                                                            className="bg-muted/50"
                                                            placeholder='Postal Code'
                                                        />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        {/* Address */}
                                        <FormField
                                            control={form.control}
                                            name="address"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-medium">
                                                        Address <span className="text-destructive">*</span>
                                                    </FormLabel>
                                                    <Input placeholder="Address Here.." {...field} className="bg-muted/50" />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Button */}

                            {coupon ? <>
                                <div className='border border-gray-200 md:px-7 px-2 md:py-8 py-3 mb-4 rounded-lg flex justify-between items-center'>
                                    <p className='text-subtitle'>Coupon Applied</p>
                                    <div className='flex justify-between items-center gap-4'>
                                        <div>
                                            <p className="text-lg font-semibold">{coupon.code}</p>
                                            <p>{discount}/- BDT off</p>
                                        </div>
                                        <Button onClick={() => { applyCoupon("", 0); clearCoupon(); setCouponText("") }} className="bg-primary rounded-lg tmv-shadow submit cursor-pointer text-[clamp(14px,4.0625vw,16px)]">
                                            <X />
                                        </Button>
                                    </div>
                                </div>
                            </> : <>
                                <span onClick={() => setCouponForm(!showCoupon)}
                                    className="cursor-pointer text-[clamp(14px,4.0625vw,16px)] select-none lg:font-semibold text-black hover:underline">
                                    {showCoupon ? " - Hide Coupon" : " + Apply Coupon"}
                                </span>


                                {showCoupon && <div className='border border-gray-200 md:px-7 px-2 md:py-8 py-3 mb-4 rounded-lg'>
                                    {/* Coupon Code */}
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm font-medium select-none">Coupon Code</p>
                                            <div className="flex gap-4 md:flex-row flex-col">
                                                <Input
                                                    placeholder="Code Here"
                                                    className="bg-muted/50 h-[52px]"
                                                    value={couponText}
                                                    onChange={(e) => setCouponText(e.target.value)}
                                                />
                                                <Button
                                                    onClick={() => { applyCoupon(couponText, 100); setCouponText(""); setCouponForm(false); }}
                                                    type="button"
                                                    className="bg-submit lg:w-40 xs:w-[9.8rem] xs:h-13 w-28 h-[52px] lg:font-bold rounded-lg tmv-shadow submit cursor-pointer text-[clamp(14px,4.0625vw,16px)]"
                                                >
                                                    Apply
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                            </>
                            }
                        </div>
                    </div>
                    <div className='lg:col-span-5 col-span-12'>
                        <div className='border md:px-7 px-2 md:py-8 py-3 rounded-lg space-y-4'>
                            <p className="text-2xl font-bold">Place An Order</p>
                            <div className='grid grid-cols-2 gap-y-4'>
                                {
                                    items.map((itm, indx) => <div key={indx} className='col-span-2 flex justify-between items-center'>
                                        <section className='max-w-4xs'>
                                            <p className="text-sm font-medium md:text-lg text-[#727B8C]">{itm.quantity}X. {itm.name}</p>
                                            <p className='text-[#727B8C] md:text-base text-xs'>Monthly Subscription- {itm.subscriptionDurationMonths} Month {`(${(itm.subscriptionPrice) * itm.quantity}/- BDT)`}</p>
                                        </section>
                                        <p className="text-sm md:text-lg font-semibold text-right">{(itm.priceWithoutDiscount + itm.subscriptionPrice) * itm.quantity}/- BDT</p>
                                    </div>)
                                }

                                <p className="text-sm font-medium md:text-lg text-[#727B8C]">Subtotal</p>
                                <p className="text-sm md:text-lg font-semibold text-right">{subtotal ?? 0}/- BDT</p>
                                {coupon && <p className="text-sm font-medium md:text-lg text-[#727B8C]">Coupon Discount</p>}
                                {coupon && <p className="text-sm md:text-lg font-semibold text-right">{coupon?.discount ?? 0}/- BDT</p>}
                            </div>
                            <hr />
                            <div className='grid grid-cols-2'>
                                <p className="text-sm font-medium md:text-lg text-[#727B8C]">Total Amount</p>
                                <p className="text-sm md:text-lg font-semibold text-right">{total}/- BDT</p>
                            </div>
                            <div>
                                <FormField
                                    control={form.control}
                                    name="paymentType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div
                                                    className={`flex items-center space-x-2 rounded-lg border border-border p-3 cursor-pointer hover:bg-muted/50 ${field.value === "full_payment" ? "bg-[#e0e2e5]" : ""}`}
                                                    onClick={() => field.onChange("full_payment")}
                                                >
                                                    <CustomRadio
                                                        name="payment"
                                                        value="full_payment"
                                                        checked={field.value === "full_payment"}
                                                        onChange={() => field.onChange("full_payment")}
                                                    />
                                                    <label htmlFor="full_payment" className="flex-1 cursor-pointer font-medium">
                                                        Full Payment
                                                    </label>
                                                </div>
                                                <div
                                                    className={`flex items-center space-x-2 rounded-lg border border-border p-3 cursor-pointer hover:bg-muted/50 ${field.value === "partial_payment" ? "bg-[#e0e2e5]" : ""}`}
                                                    onClick={() => field.onChange("partial_payment")}
                                                >
                                                    <CustomRadio
                                                        name="payment"
                                                        value="partial_payment"
                                                        checked={field.value === "partial_payment"}
                                                        onChange={() => field.onChange("partial_payment")}
                                                    />
                                                    <label htmlFor="partial_payment" className="flex-1 cursor-pointer font-medium">
                                                        Partial Payment
                                                    </label>
                                                </div>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {form.watch("paymentType") === "partial_payment" && (
                                    <FormField
                                        control={form.control}
                                        name="advance_payment_amount"
                                        render={({ field }) => (
                                            <FormItem className="mt-4">
                                                <FormLabel className="text-sm font-medium">
                                                    Advance Payment Amount <span className="text-destructive">*</span>
                                                </FormLabel>
                                                <Input
                                                    type="number"
                                                    placeholder="Enter advance payment amount (BDT)"
                                                    {...field}
                                                    className="bg-muted/50"
                                                    step="1"
                                                    min="500"
                                                />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </div>
                            <div className="mt-3 space-y-3">
                                <Button
                                    disabled={isSubmitting || items.length === 0}
                                    className="bg-submit xs:h-13 w-full h-[52px] lg:font-bold rounded-lg tmv-shadow submit cursor-pointer text-[clamp(14px,4.0625vw,16px)]">
                                    {isSubmitting ? "Submitting..." : "Place Order"}
                                </Button>
                                <p className='text-subtitle text-center'>By ordering, you agree to the Privacy Policy</p>
                                <div className='relative w-full space-y-3'>
                                    <p className='text-base font-medium text-[#777F92]'>Guaranteed Safe Checkout :</p>
                                    <Image
                                        src="/images/SSLCOMMERZ.png"
                                        height={68}
                                        width={1024}
                                        alt="Payment Methods"
                                        className="h-auto w-full object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}
