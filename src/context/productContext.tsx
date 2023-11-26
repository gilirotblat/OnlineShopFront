import { createContext, useContext, useEffect, useState } from "react"
import { Product} from "../utils/Definitions"
import {getCategory, getProducts, updateCart } from "../services/shopService"


interface IProductContext {
    products: Product[],
    error: unknown,
    loading: boolean
    getProductsForCategory: (category?: string) => void
    deleteProduct: (id:number) => void
  }
  
  
  
  const wait = (time:number) => new Promise((resolve) => setTimeout(resolve,time))
  const ProductContext = createContext<IProductContext | null>(null)
  
  export const ProductContextProvider = ({children} : {children : React.ReactNode}) => {
      const [products,setProducts] = useState<Product[]>([])
      const [error,setError] = useState<unknown>()
      const [loading, setLoading] = useState(true)
      
      useEffect(() => {
        getProductsForCategory()
      }, [])
  
      const deleteProduct = (id:number) => {
        setProducts(products.filter(p => p.id !== id))
      }
  
      const getProductsForCategory = async (category?:string) => {
        setLoading(true)
        try {
            if(!category) {
                const products = await getProducts()
                setProducts(products)
            } else {
                const products = await getCategory(category)
                setProducts(products)
            }
        } catch(e) {
          setError(e)
        }
        await wait(2000);
        setLoading(false)
      }
  
      return <ProductContext.Provider value={{
        products,error,loading,
        getProductsForCategory,deleteProduct
      }}>
        {children}
      </ProductContext.Provider>
  }
  
  export const useProducts = () => {
  
    const context = useContext(ProductContext)
    if(!context) {
      throw new Error("ProductContext not provided")
    }
    return context
      /*const [products,setProducts] = useState<Product[]>([])
      const [error,setError] = useState<unknown>()
  
      useEffect(() => {
        if(category) {
          getCategory(category).then(setProducts).catch(setError)
        } else {
          getProducts().then(setProducts).catch(setError)
        }
      }, [category])
      
  
      return {products, error}*/
  }
  
  