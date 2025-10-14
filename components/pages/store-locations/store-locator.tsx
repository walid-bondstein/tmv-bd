"use client"

import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { SearchIcon, CornerLeftUp } from "lucide-react"
import GoogleMap from "@/components/shared/google-map";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export interface StoreLocation {
    id: string
    name: string
    address: string
    city: string
    state: string
    zip: string
    phone: string
    hours: string
    lat: number
    lng: number
    store_image?: string
}

// Sample store data - replace with your actual data
const stores: StoreLocation[] = [
    {
        id: "1",
        name: "Dhaka",
        address: "Motijheel Commercial Area",
        city: "Dhaka",
        state: "Dhaka",
        zip: "1200",
        phone: "+880 2-9550000",
        hours: "Sun-Thu: 9AM-8PM, Fri-Sat: Closed",
        lat: 23.8103,
        lng: 90.4125,
    },
    {
        id: "2",
        name: "Chattogram",
        address: "Agrabad",
        city: "Chattogram",
        state: "Chattogram",
        zip: "4000",
        phone: "+880 31-716000",
        hours: "Sat-Thu: 9AM-8PM, Fri: Closed",
        lat: 22.3569,
        lng: 91.7832,
    },
    {
        id: "3",
        name: "Khulna",
        address: "KDA Avenue",
        city: "Khulna",
        state: "Khulna",
        zip: "9100",
        phone: "+880 41-720000",
        hours: "Sat-Thu: 9AM-8PM, Fri: Closed",
        lat: 22.8456,
        lng: 89.5403,
    },
    {
        id: "4",
        name: "Rajshahi",
        address: "Shaheb Bazar",
        city: "Rajshahi",
        state: "Rajshahi",
        zip: "6000",
        phone: "+880 721-750000",
        hours: "Sat-Thu: 9AM-8PM, Fri: Closed",
        lat: 24.3745,
        lng: 88.6042,
    },
    {
        id: "5",
        name: "Sylhet",
        address: "Zindabazar",
        city: "Sylhet",
        state: "Sylhet",
        zip: "3100",
        phone: "+880 821-720000",
        hours: "Sat-Thu: 9AM-8PM, Fri: Closed",
        lat: 24.8949,
        lng: 91.8687,
    },
    {
        id: "6",
        name: "Barishal",
        address: "Band Road",
        city: "Barishal",
        state: "Barishal",
        zip: "8200",
        phone: "+880 431-64000",
        hours: "Sat-Thu: 9AM-8PM, Fri: Closed",
        lat: 22.7010,
        lng: 90.3535,
    },
    {
        id: "7",
        name: "Rangpur",
        address: "Station Road",
        city: "Rangpur",
        state: "Rangpur",
        zip: "5400",
        phone: "+880 521-65000",
        hours: "Sat-Thu: 9AM-8PM, Fri: Closed",
        lat: 25.7439,
        lng: 89.2752,
    },
    {
        id: "8",
        name: "Mymensingh",
        address: "Ganginar Par",
        city: "Mymensingh",
        state: "Mymensingh",
        zip: "2200",
        phone: "+880 91-64000",
        hours: "Sat-Thu: 9AM-8PM, Fri: Closed",
        lat: 24.7471,
        lng: 90.4203,
    },
    {
        id: "9",
        name: "Comilla",
        address: "Kandirpar",
        city: "Comilla",
        state: "Comilla",
        zip: "3500",
        phone: "+880 81-64000",
        hours: "Sat-Thu: 9AM-8PM, Fri: Closed",
        lat: 23.4607,
        lng: 91.1809,
    },
    {
        id: "10",
        name: "Narayanganj",
        address: "Bangabandhu Road",
        city: "Narayanganj",
        state: "Dhaka",
        zip: "1400",
        phone: "+880 2-7640000",
        hours: "Sat-Thu: 9AM-8PM, Fri: Closed",
        lat: 23.6238,
        lng: 90.5000,
    },
    {
        id: "11",
        name: "Gazipur",
        address: "Chowrasta",
        city: "Gazipur",
        state: "Dhaka",
        zip: "1700",
        phone: "+880 2-9280000",
        hours: "Sat-Thu: 9AM-8PM, Fri: Closed",
        lat: 23.9999,
        lng: 90.4203,
    },
    {
        id: "12",
        name: "Jessore",
        address: "Jessore Sadar",
        city: "Jessore",
        state: "Khulna",
        zip: "7400",
        phone: "+880 421-65000",
        hours: "Sat-Thu: 9AM-8PM, Fri: Closed",
        lat: 23.1664,
        lng: 89.2089,
    },
    {
        id: "13",
        name: "Bogra",
        address: "Satmatha",
        city: "Bogra",
        state: "Rajshahi",
        zip: "5800",
        phone: "+880 51-64000",
        hours: "Sat-Thu: 9AM-8PM, Fri: Closed",
        lat: 24.8510,
        lng: 89.3710,
    },
    {
        id: "14",
        name: "Kushtia",
        address: "NS Road",
        city: "Kushtia",
        state: "Khulna",
        zip: "7000",
        phone: "+880 71-64000",
        hours: "Sat-Thu: 9AM-8PM, Fri: Closed",
        lat: 23.9013,
        lng: 89.1203,
    },
    {
        id: "15",
        name: "Dinajpur",
        address: "Nimtola",
        city: "Dinajpur",
        state: "Rangpur",
        zip: "5200",
        phone: "+880 531-64000",
        hours: "Sat-Thu: 9AM-8PM, Fri: Closed",
        lat: 25.6270,
        lng: 88.6332,
    },
    {
        id: "16",
        name: "Pabna",
        address: "Edward College Road",
        city: "Pabna",
        state: "Rajshahi",
        zip: "6600",
        phone: "+880 731-64000",
        hours: "Sat-Thu: 9AM-8PM, Fri: Closed",
        lat: 24.0000,
        lng: 89.2333,
    },
    {
        id: "17",
        name: "Tangail",
        address: "Court Road",
        city: "Tangail",
        state: "Dhaka",
        zip: "1900",
        phone: "+880 921-64000",
        hours: "Sat-Thu: 9AM-8PM, Fri: Closed",
        lat: 24.2498,
        lng: 89.9167,
    },
    {
        id: "18",
        name: "Cox’s Bazar",
        address: "Kolatoli Road",
        city: "Cox’s Bazar",
        state: "Chattogram",
        zip: "4700",
        phone: "+880 341-64000",
        hours: "Sat-Thu: 9AM-8PM, Fri: Closed",
        lat: 21.4272,
        lng: 92.0058,
    },
    {
        id: "19",
        name: "Feni",
        address: "Trunk Road",
        city: "Feni",
        state: "Chattogram",
        zip: "3900",
        phone: "+880 331-64000",
        hours: "Sat-Thu: 9AM-8PM, Fri: Closed",
        lat: 23.0231,
        lng: 91.3961,
    },
    {
        id: "20",
        name: "Faridpur",
        address: "Goalchamat",
        city: "Faridpur",
        state: "Dhaka",
        zip: "7800",
        phone: "+880 631-64000",
        hours: "Sat-Thu: 9AM-8PM, Fri: Closed",
        lat: 23.6071,
        lng: 89.8420,
    }
]

export function generateAddress(location: StoreLocation) {
    const parts = [
        location.address,
        location.city,
        location.state,
        location.zip,
        "Bangladesh",
    ].filter(Boolean); // remove empty values

    return parts.join(", ");
}

export default function StoreLocator() {

    console.log("Initializing map");
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedStore, setSelectedStore] = useState<StoreLocation | null>(null)

    const filteredStores = searchQuery === "" ? stores : stores.filter((store) => {
        const query = searchQuery.toLowerCase()
        return (
            store.name.toLowerCase().includes(query) ||
            store.address.toLowerCase().includes(query) ||
            store.city.toLowerCase().includes(query) ||
            store.state.toLowerCase().includes(query) ||
            store.zip.includes(query)
        )
    })

    const handleStoreClick = useCallback((store: StoreLocation) => {
        setSelectedStore(store)
    }, [])

    const handleMapClick = useCallback(() => {
        setSelectedStore(null)
    }, [])

    const displayedStores = selectedStore ? [selectedStore] : filteredStores

    return (
        <div className="component-container mx-auto flex-1 flex flex-col overflow-y-auto">
            <div className="border-red-500 flex-1 md:my-14 my-4 rounded-2xl lg:p-6 p-2 flex flex-col bg-white  overflow-y-auto">
                <div className="border-amber-400 flex-1 rounded-2xl grid grid-cols-12 gap-6 overflow-y-auto">
                    <div className="border-amber-400 col-span-4 lg:flex flex-col hidden overflow-y-auto">
                        <h1 className="text-[clamp(20px,1.7708vw,34px)] font-bold mb-4 whitespace-nowrap">
                            <span className="text-primary-foreground">
                                STORE
                            </span> {' '}
                            <span className="text-orange-500">
                                LOCATIONS
                            </span>
                        </h1>
                        <div className="flex justify-start items-center gap-3 rounded-full border-2 border-gray-200 px-2">
                            <SearchIcon className="text-slate-500" />
                            <Input
                                type="text"
                                placeholder="Search location near you"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-grow border-0 focus:border-0 ring-0 focus:ring-0 focus-visible:ring-0 outline-none focus:outline-none focus-visible:outline-none shadow-none"
                            />
                        </div>
                        <div className="flex-1 mt-4 overflow-y-auto space-y-4 border-green-400 bg-[#F6F5EE] rounded-2xl p-3">
                            {filteredStores.map((store) => (
                                <div
                                    key={store.id}
                                    onClick={() => handleStoreClick(store)}
                                    className={`${selectedStore?.id === store.id ? "border border-gradient" : ""} w-full mb-2 border bg-white rounded-2xl p-3 flex justify-between items-center space-x-5 cursor-pointer`}>
                                    <div>
                                        <p className="text-[clamp(16px,1.2499vw,24px)] text-primary-foreground font-semibold">{store?.name ?? ""}</p>
                                        <p className="text-[clamp(10px,0.7291vw,14px)] text-gray-400 font-normal">{generateAddress(store)}</p>
                                    </div>
                                    <div>
                                        <div className="border rounded-full w-[60px] h-[60px] flex justify-center items-center">
                                            <div className="w-[24px] h-[24px] rounded-[5px] mx-auto my-auto rotate-45 border border-gray-400">
                                                <CornerLeftUp size={18} className="mx-auto my-auto text-gray-400 " />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="border-amber-400 lg:col-span-8 col-span-12 rounded-2xl lg:overflow-hidden flex flex-col">
                        <div className="lg:hidden flex flex-col spacey-y-2 mb-2">
                            <h1 className="text-[clamp(20px,1.7708vw,34px)] font-bold whitespace-nowrap">
                                <span className="text-primary-foreground">
                                    STORE
                                </span> {' '}
                                <span className="text-orange-500">
                                    LOCATIONS
                                </span>
                            </h1>
                            <Select>
                                <SelectTrigger className="w-auto">
                                    <SelectValue placeholder="Select a store" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {
                                            filteredStores.map((store) => (
                                                <SelectItem key={store.id} value={store.id} onClick={() => handleStoreClick(store)}>
                                                    {store.name}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex-1 rounded-2xl overflow-hidden">
                            <GoogleMap stores={displayedStores} setSelectedStore={setSelectedStore} selectedStore={selectedStore} onMapClick={handleMapClick} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


