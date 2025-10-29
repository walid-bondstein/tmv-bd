import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import React from "react";

export default function GetInTouch() {
  return (
    <div className="component-container mx-auto section-padding-y bg-white">
      <div
        className="2xl:px-[5.625rem]
        xl:px-20
        lg:px-16
        md:px-12
        p-4
        rounded-2xl
        2xl:py-[4.25rem]
        xl:py-14
        lg:py-11
        md:py-9
        py-6
        bg-[#D9DEE5]
        flex
        lg:flex-row
        flex-col
        2xl:gap-40
        lg:gap-20
        md:gap-16
        gap-10
        lg:items-center
        lg:justify-between
        "
      >
        <div className="flex-1 space-y-5">
          <div className="max-w-md">
            <h2 className="font-semibold text-black text-[clamp(2rem,2.8124vw,3.375rem)] text-left">
              Get In Touch
            </h2>
            <p className="text-[clamp(0.7rem,2.8124vw,1rem)] text-[#777F92] text-left">
              Have questions? Our team is here to help you with all your vehicle
              tracking needs. Reach out to us today!
            </p>
          </div>
          <div className="relative w-full h-56 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/get-in-touch-map.png"
              alt="Location map"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="lg:px-9 lg:py-8 py-3 px-3 bg-[#F3F5F8] rounded-2xl space-y-3">
            <Input
              type="email"
              placeholder="Enter Your Email Address"
              className="bg-white rounded-lg px-5 py-4 h-auto"
            />
            <div className="space-y-2">
              <div className="flex gap-3">
                <Select defaultValue="+880" name="countryCode">
                  <SelectTrigger
                    size=""
                    className="w-24 bg-white/20 border-gray-200 text-gray-900 focus:ring-yellow-400"
                  >
                    <SelectValue className="border border-red-600" />
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
              className="bg-white px-5 py-4 rounded-lg  max-h-28 h-28"
              placeholder="Write Your Message..."
            />

            <button
              className="bg-submit w-full xs:h-[3.25rem] h-[2rem] lg:font-bold rounded-lg tmv-shadow submit cursor-pointer text-[clamp(14px,4.0625vw,16px)]"
              type="submit"
            >
              Let&apos;s Talk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
