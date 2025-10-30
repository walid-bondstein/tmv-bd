"use client"

import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import CustomRadio from './CustomRdio'

const billingFormSchema = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    contactNumber: z.string().regex(/^[0-9+\-\s()]+$/, "Invalid phone number"),
    email: z.string().email("Invalid email address").or(z.literal("")),
    installationDate: z.string().min(1, "Installation date is required"),
    installationTime: z.string().min(1, "Installation time is required"),
    district: z.string().min(1, "District is required"),
    thana: z.string().min(1, "Thana is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    couponCode: z.string(),
    paymentMethod: z.enum(["cash", "online"] as const),
})

type BillingFormValues = z.infer<typeof billingFormSchema>

const defaultValues: BillingFormValues = {
    fullName: "",
    contactNumber: "",
    email: "",
    installationDate: "",
    installationTime: "",
    district: "",
    thana: "",
    postalCode: "",
    address: "",
    couponCode: "",
    paymentMethod: "cash",
}

export default function BillingForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [showCoupone , setCouponeForm] = useState(false);


    const form = useForm<BillingFormValues>({
        resolver: zodResolver(billingFormSchema),
        defaultValues,
    })

    const onSubmit = async (values: BillingFormValues) => {
        try {
            setIsSubmitting(true)
            setSubmitSuccess(false)

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))
            console.log("Form submitted:", values)

            setSubmitSuccess(true)

            // Reset success message after 3 seconds
            setTimeout(() => setSubmitSuccess(false), 3000)
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
                <div className='grid grid-cols-12 md:gap-8 gap-0'>
                    <div className='lg:col-span-7 col-span-12'>
                        <div className='space-y-5'>

                            {/* Success Message */}
                            {submitSuccess && (
                                <div className="rounded-md bg-green-50 p-4 text-sm text-green-800">
                                    ✓ Billing details submitted successfully!
                                </div>
                            )}
                            <div className="border space-y-4 border-gray-200 px-7 py-8 rounded-lg">
                                <div >
                                    <h2 className="mb-6 text-lg font-semibold text-foreground">BILLING DETAILS</h2>
                                    <div className="space-y-4">

                                        {/* Full Name */}
                                        <FormField
                                            control={form.control}
                                            name="fullName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-medium">
                                                        Full Name <span className="text-destructive">*</span>
                                                    </FormLabel>
                                                    <Input placeholder="Enter Full Name" {...field} className="bg-muted/50" />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* Contact Number and Email */}
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <FormField
                                                control={form.control}
                                                name="contactNumber"
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
                                                name="installationDate"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm font-medium">
                                                            Installation Date <span className="text-destructive">*</span>
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
                                                name="installationTime"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm font-medium">
                                                            Installation Time <span className="text-destructive">*</span>
                                                        </FormLabel>

                                                        <Input type="time" {...field}
                                                            min="09:00"
                                                            max="21:00"
                                                            step="60" 
                                                            value={field.value || ""}
                                                            onChange={(e) => {
                                                                const val = e.target.value
                                                                
                                                                if (val < "09:00") field.onChange("09:00")
                                                                else if (val > "21:00") field.onChange("21:00")
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
                                                name="district"
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
                                                                <SelectItem value="dhaka">Dhaka</SelectItem>
                                                                <SelectItem value="chittagong">Chittagong</SelectItem>
                                                                <SelectItem value="sylhet">Sylhet</SelectItem>
                                                                <SelectItem value="khulna">Khulna</SelectItem>
                                                                <SelectItem value="rajshahi">Rajshahi</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="thana"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm font-medium">
                                                            Thana <span className="text-destructive">*</span>
                                                        </FormLabel>
                                                        <Select onValueChange={field.onChange} value={field.value}>
                                                            <SelectTrigger className="bg-muted/50 w-full">
                                                                <SelectValue placeholder="Select Thana" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="gulshan">Gulshan</SelectItem>
                                                                <SelectItem value="banani">Banani</SelectItem>
                                                                <SelectItem value="dhanmondi">Dhanmondi</SelectItem>
                                                                <SelectItem value="mirpur">Mirpur</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="postalCode"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm font-medium">
                                                            Postal Code <span className="text-destructive">*</span>
                                                        </FormLabel>
                                                        <Select onValueChange={field.onChange} value={field.value}>
                                                            <SelectTrigger className="bg-muted/50 w-full">
                                                                <SelectValue placeholder="Select Postal Code" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="1212">1212</SelectItem>
                                                                <SelectItem value="1213">1213</SelectItem>
                                                                <SelectItem value="1214">1214</SelectItem>
                                                                <SelectItem value="1215">1215</SelectItem>
                                                            </SelectContent>
                                                        </Select>
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

                            <span onClick={() => setCouponeForm(!showCoupone)}
                              className="cursor-pointer text-[clamp(14px,4.0625vw,16px)] lg:font-semibold text-black hover:underline">
                              {showCoupone ? " - Hide Coupon" : " + Apply Coupon"}
                            </span>


                            {showCoupone&& <div className='border border-gray-200 px-7 py-8 rounded-lg'>
                                {/* Coupon Code */}
                                <FormField
                                    control={form.control}
                                    name="couponCode"
                                    render={({ field }) => (
                                        <div className="space-y-4">
        <FormItem>
          <FormLabel className="text-sm font-medium">Coupon Code</FormLabel>
          <div className="flex gap-4 md:flex-row flex-col">
            <Input
              placeholder="Code Here"
              {...field}
              className="bg-muted/50 h-[52px]"
            />
            <Button
              type="button"
              className="bg-submit lg:w-40 xs:w-[9.8rem] xs:h-13 w-28 h-[52px] lg:font-bold rounded-lg tmv-shadow submit cursor-pointer text-[clamp(14px,4.0625vw,16px)]"
            >
              Apply
            </Button>
          </div>
          <FormMessage />
        </FormItem>
    </div>

                                    )}
                                />
                            </div>}
                        </div>
                    </div>
                    <div className='lg:col-span-5 col-span-12'>
                        <div className='border px-7 py-8 rounded-lg space-y-4'>
                            <p className="text-2xl font-bold">Place An Order</p>
                            <div className='grid grid-cols-2 gap-y-4'>
                                <p className="text-sm font-medium md:text-lg text-[#727B8C]">Item Name</p>
                                <p className="text-sm md:text-lg font-semibold text-right">4545/- MRP</p>
                                <p className="text-sm font-medium md:text-lg text-[#727B8C]">Monthly Subscrive</p>
                                <p className="text-sm md:text-lg font-semibold text-right">4545/- MRP</p>
                                <p className="text-sm font-medium md:text-lg text-[#727B8C]">Shipping</p>
                                <p className="text-sm md:text-lg font-semibold text-right">4545/- MRP</p>
                            </div>
                            <hr />
                            <div className='grid grid-cols-2'>
                                <p className="text-sm font-medium md:text-lg text-[#727B8C]">Total Amount</p>
                                <p className="text-sm md:text-lg font-semibold text-right">4545/- MRP</p>
                            </div>
                            <div>
                                <FormField
                                    control={form.control}
                                    name="paymentMethod"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div
                                                    className={`flex items-center space-x-2 rounded-lg border border-border p-3 cursor-pointer hover:bg-muted/50 ${field.value === "cash" ? "bg-[#e0e2e5]" : ""}`}
                                                    onClick={() => field.onChange("cash")}
                                                >
                                                    <CustomRadio
                                                        name="payment"
                                                        value="online"
                                                        checked={field.value === "cash"}
                                                        onChange={() => field.onChange("cash")}
                                                    />
                                                    <label htmlFor="cash" className="flex-1 cursor-pointer font-medium">
                                                        Cash
                                                    </label>
                                                </div>
                                                <div
                                                    className={`flex items-center space-x-2 rounded-lg border border-border p-3 cursor-pointer hover:bg-muted/50 ${field.value === "online" ? "bg-[#e0e2e5]" : ""}`}
                                                    onClick={() => field.onChange("online")}
                                                >
                                                    <CustomRadio
                                                        name="payment"
                                                        value="online"
                                                        checked={field.value === "online"}
                                                        onChange={() => field.onChange("online")}
                                                    />
                                                    <label htmlFor="online" className="flex-1 cursor-pointer font-medium">
                                                        Online
                                                    </label>
                                                </div>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="mt-3 space-y-3">
                                <Button className="bg-submit xs:h-13 w-full h-[52px] lg:font-bold rounded-lg tmv-shadow submit cursor-pointer text-[clamp(14px,4.0625vw,16px)]">
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
                </div>
            </Form>
        </div>
    )
}
