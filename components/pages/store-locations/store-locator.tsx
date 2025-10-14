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
import { StoreLocation } from "@/app/store-locations/page";

export function generateAddress(location: StoreLocation) {
    const parts = [
        location.address,
        location.city,
        "Bangladesh",
    ].filter(Boolean); // remove empty values

    return parts.join(", ");
}

export default function StoreLocator({ stores }: { stores: StoreLocation[] }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedStore, setSelectedStore] = useState<StoreLocation | null>(null)

    const filteredStores = searchQuery === "" ? stores : stores.filter((store) => {
        const query = searchQuery.toLowerCase()
        return (
            store.name.toLowerCase().includes(query) ||
            store.address.toLowerCase().includes(query)
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


