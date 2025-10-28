import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import React from 'react'

interface ProductSpecifications {
    productImage: string;
    description: string[];
    gallery: string[];
    specifications: string[];
    productName: string;
}
export default function ProductDescription({ productSpecifications }: { productSpecifications: ProductSpecifications }) {
    const { productImage = "/images/demo-prod.png", productName, description, gallery, specifications } = productSpecifications;
    return (
        <div className="component-container mx-auto lg:my-24 my-7">
            <Tabs defaultValue="description" className="bg-[#F0F2F5] lg:p-12 p-4 rounded-lg w-full">
                <TabsList className="mx-0 w-full bg-transparent lg:h-[60px] h-[38px]">
                    <TabsTrigger value="description" className="py-4 custom-tab lg:h-[60px] h-[38px] lg:text-2xl text-base font-semibold">
                        Description
                    </TabsTrigger>
                    <TabsTrigger value="gallery" className="py-4 custom-tab lg:h-[60px] h-[38px] lg:text-2xl text-base font-semibold" >Product Gallery</TabsTrigger>
                    <TabsTrigger value="specifications" className="py-4 custom-tab lg:h-[60px] h-[38px] lg:text-2xl text-base font-semibold">Specifications</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className=''>
                    <div className='lg:grid flex flex-col-reverse grid-cols-2 bg-[#F0F2F5]'>
                        <div className="bg-[#F0F2F5] p-4">
                            <p className='text-lg font-semibold md:text-2xl'>{productName} Features:</p>
                            <ul className='list-disc space-y-4 px-4 py-2'>
                                {description.map((desc, index) => (
                                    <li key={index} className='text-lg leading-7 text-[#4A5E6D] font-normal'>
                                        {desc}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='bg-[#F0F2F5]'>
                            <AspectRatio ratio={1} className="w-full">
                                <Image
                                    src={"/images/demo-prod.png"}
                                    alt="Product Image"
                                    fill
                                    className="object-contain w-full h-full"
                                />
                            </AspectRatio>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="gallery">
                    <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 bg-[#F0F2F5] lg:max-h-auto gap-4 max-h-[80vh] overflow-x-auto '>
                        {gallery.map((img, index) => (
                            <div key={index}>
                                <AspectRatio ratio={1} className="w-full">
                                    <Image
                                        src={"/images/demo-prod.png"}
                                        alt="Product Image"
                                        fill
                                        className="object-contain w-full h-full"
                                    />
                                </AspectRatio>
                            </div>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="specifications">
                    <div className='lg:grid flex flex-col-reverse grid-cols-2 bg-[#F0F2F5]'>
                        <div className="bg-[#F0F2F5] p-4">
                            <p className='text-lg font-semibold md:text-2xl'>{productName} specifications:</p>
                            <ul className='list-disc space-y-4 px-4 py-2'>
                                {specifications.map((desc, index) => (
                                    <li key={index} className='text-lg leading-7 text-[#4A5E6D] font-normal'>
                                        {desc}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='bg-[#F0F2F5]'>
                            <AspectRatio ratio={1} className="w-full">
                                <Image
                                    src={"/images/demo-prod.png"}
                                    alt="Product Image"
                                    fill
                                    className="object-contain w-full h-full"
                                />
                            </AspectRatio>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
