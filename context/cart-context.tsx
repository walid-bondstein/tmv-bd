"use client";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

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
};

type Coupon = {
    code: string;
    discount: number;
};

type CartContextType = {
    items: CartItem[];
    coupon: Coupon | null;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    applyCoupon: (code: string, discountPercent: number) => void;
    clearCart: () => void;
    subtotal: number;
    discount: number;
    total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [coupon, setCoupon] = useState<Coupon | null>(null);

    // ➕ Add item
    const addToCart = (item: CartItem) => {
        setItems((prev) => {
            const existing = prev.find((p) => p.id === item.id);
            if (existing) {
                return prev.map((p) =>
                    ((p.id === item.id) && (item.subscriptionDurationMonths === p.subscriptionDurationMonths)) ? { ...p, quantity: p.quantity + item.quantity } : p
                );
            }
            return [...prev, item];
        });
    };

    // ❌ Remove item
    const removeFromCart = (id: number) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    // 🔄 Update quantity
    const updateQuantity = (id: number, quantity: number) => {
        if (quantity <= 0) return removeFromCart(id);
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    // 🎟️ Apply coupon
    const applyCoupon = (code: string, discount: number) => {
        setCoupon({ code, discount });
    };

    // 🧹 Clear cart
    const clearCart = () => {
        setItems([]);
        setCoupon(null);
    };

    // 🧮 Calculations
    const { subtotal, discount, total } = useMemo(() => {
        const subtotal = items.reduce(
            (acc, item) => acc + (item.priceWithoutDiscount * item.quantity) + (item.subscriptionDurationMonths * item.subscriptionPrice * item.quantity),
            0
        );
        const discount = coupon ? coupon.discount : 0;
        const total = subtotal - discount;
        return { subtotal, discount, total };
    }, [items, coupon]);

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