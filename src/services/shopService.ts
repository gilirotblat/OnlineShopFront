import { httpClient } from ".";
import { Cart, CartItemDTO, Product,NewProductForm } from "../utils/Definitions";


export async function getProducts() : Promise<Product[]>{
    return httpClient.get("/shop").then(response => {
        return response.data
    })
}


export async function getCategory(category: string): Promise<Product[]> {
    return httpClient.get(`/shop/category/${category}`).then(response => {
        return response.data;
    })
}



export async function updateCart(dto : CartItemDTO) : Promise<Cart> {
    return httpClient.put("/user/cart", JSON.stringify(dto))
    .then(response => {
        return response.data
    })
}

export async function adminCreateItem(form : NewProductForm) : Promise<Product> {
    return httpClient.post("/shop",JSON.stringify(form))
    .then(response => {
        return response.data
})
}




export async function adminDeleteItem(id: number): Promise<void> {
    return httpClient.delete(`/shop/${id}`)
        .then(response => {
return response.data;
        })
        .catch(error => {
            console.error("Error deleting item:", error);
            throw error;
        });
}
