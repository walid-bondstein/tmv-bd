"use client";
import { calculateVat } from "@/lib/utils";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

// 🧩 Types
type CartItem = {
    id: number;
    name: string;
    price: number;
    discount: number;
    priceWithoutDiscount: number;
    quantity: number;
    subscriptionPrice: number;
    subscriptionDurationMonths: number;
    itemImage?: string;
    subscriptionID: number;
    item_type: "product" | "bundle";
};

type Coupon = {
    code: string;
    discount: number;
};

type CartContextType = {
    items: CartItem[];
    coupon: Coupon | null;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number, subscription: number) => void;
    updateQuantity: (id: number, quantity: number, subscription: number) => void;
    applyCoupon: (code: string, discountPercent: number) => void;
    clearCart: () => void;
    subtotal: number;
    discount: number;
    total: number;
    clearCoupon: () => void;
    subtotalWithoutVat: number;
    deviceVat: number;
    subscriptionVat: number;
    totalVat: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [coupon, setCoupon] = useState<Coupon | null>(null);

    // ➕ Add item
    const addToCart = (item: CartItem) => {
        setItems((prev) => {
            const existing = prev.find((p) => (p.id === item.id) && (item.subscriptionDurationMonths === p.subscriptionDurationMonths));
            if (existing) {
                return prev.map((p) =>
                    ((p.id === item.id) && (item.subscriptionDurationMonths === p.subscriptionDurationMonths)) ? { ...p, quantity: p.quantity + item.quantity } : p
                );
            }
            return [...prev, item];
        });
    };

    // ❌ Remove item
    const removeFromCart = (id: number, subscription: number) => {
        setItems((prev) => prev.filter((item) => !(item.id === id && item.subscriptionDurationMonths === subscription)));
    };

    // 🔄 Update quantity
    const updateQuantity = (id: number, quantity: number, subscription: number) => {
        if (quantity <= 0) return removeFromCart(id, subscription);
        setItems((prev) =>
            prev.map((item) =>
                ((item.id === id) && (subscription === item.subscriptionDurationMonths)) ? { ...item, quantity } : item
            )
        );
    };

    // 🎟️ Apply coupon
    const applyCoupon = (code: string, discount: number) => {
        setCoupon({ code, discount });
    };

    const clearCoupon = () => {
        setCoupon(null);
    }

    // 🧹 Clear cart
    const clearCart = () => {
        setItems([]);
        setCoupon(null);
    };

    // 🧮 Calculations
    const { subtotal, discount, total, subtotalWithoutVat, deviceVat, subscriptionVat, totalVat } = useMemo(() => {
        const deviceVat = 10; // VAT can be calculated here if needed in future
        const subscriptionVat = 5; // VAT can be calculated here if needed in future
        let totalVat = 0;
        let deviceVatAmount = 0;
        let subscriptionVatAmount = 0;
        const subtotal = items.reduce(
            (acc, item) => {
                const dv = calculateVat(item.priceWithoutDiscount, deviceVat);
                const sv = calculateVat(item.subscriptionPrice, subscriptionVat);
                deviceVatAmount += dv * item.quantity;
                subscriptionVatAmount += sv * item.quantity;
                totalVat += dv * item.quantity + sv * item.quantity;
                const devicePriceWithVat = item.priceWithoutDiscount + dv;
                const subscriptionPriceWithVat = item.subscriptionPrice + sv;
                return acc + (devicePriceWithVat * item.quantity) + (subscriptionPriceWithVat * item.quantity)
            },
            0
        );
        const discount = coupon ? coupon.discount : 0;
        const total = subtotal - discount;
        return { subtotal, discount, total, subtotalWithoutVat: subtotal - totalVat, deviceVat: deviceVatAmount, subscriptionVat: subscriptionVatAmount, totalVat };
    }, [items, coupon]);


    useEffect(() => {
        const storedCart = localStorage.getItem('cartItems');
        if (storedCart) {
            setItems(JSON.parse(storedCart));
        }

    }, []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(items));
    }, [items]);

    return (
        <CartContext.Provider
            value={{
                items,
                coupon,
                addToCart,
                removeFromCart,
                updateQuantity,
                applyCoupon,
                clearCart,
                subtotal,
                discount,
                total,
                clearCoupon,
                subtotalWithoutVat,
                deviceVat,
                subscriptionVat,
                totalVat
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context)
        throw new Error("useCart must be used within a CartProvider");
    return context;
};