export interface Product {
    id: number;
    name: string;
    price: number;
}

export async function getProducts() {
    // 1s delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return [
        { id: 283, name: "Product 283", price: 46 },
        { id: 874, name: "Product 874", price: 69 },
        { id: 512, name: "Product 512", price: 23 },
        { id: 157, name: "Product 157", price: 40 },
        { id: 765, name: "Product 765", price: 52 },
        { id: 392, name: "Product 392", price: 65 },
        { id: 936, name: "Product 936", price: 61 },
        { id: 647, name: "Product 647", price: 29 },
        { id: 491, name: "Product 491", price: 58 },
    ]
}