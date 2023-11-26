import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { SignInForm, SignUpForm,NewProductForm, User, BadRequest, Product, CartItem, Cart, UserDetailsForm, OrderRequestDto, OrderResponseDto } from "../utils/Definitions";
import { me, signIn, signUp as serviceSignUp, newOrder, } from "../services/authService";
import {useNavigate} from 'react-router-dom'
import { updateCart ,adminCreateItem, adminDeleteItem} from "../services/shopService";
import {message} from 'antd';
import { IoIosLogIn } from "react-icons/io";
import { BsPencilSquare } from "react-icons/bs";
import { RiAddCircleLine } from "react-icons/ri";
import { MdOutlineDelete } from "react-icons/md";
import { CiLogout } from "react-icons/ci";


interface IUserContext {
    setUser: (user: User) => void
    addItemToCart: (product: Product, quantity?:number) => void,
    decreaseItemFromCart :(cartItem:CartItem , quantity?:number)=>void,
    deleteItemFromCart :(cartItem:CartItem)=>void,
    logOut: () => void
    logIn: (form: SignInForm) => void
    signUp: (form: SignUpForm) => void
    isAdmin:  boolean,
    createNewOrder: (dto: OrderRequestDto)  => Promise<OrderResponseDto | undefined>
    createProduct : (form :NewProductForm )=> void,
    saveUserDetail : (form : UserDetailsForm)=> void,
    deleteItem : (id :number)=> Promise<boolean>,
    isLoggedIn: boolean 
    user: User | undefined
    error: BadRequest | undefined
    resetError: () => void
}


const UserContext = createContext<IUserContext| null>(null)


export const UserContextProvider = ({children} : {children: ReactNode}) => {

  const [error,setError] = useState<BadRequest | undefined>()
  const [user, setUser] = useState<User>();
  const nav = useNavigate()
 
 
  useEffect(() => {
    getMe()
  },[])


  const getMe = async () => {
    return me().then(user => {
      console.log(user)
        if(user &&user.email)
          setUser(user)

        return user
      }).then( () => {
        if(user)
          saveCartLocal(user.cart)
      }).catch(err => {
        console.error(err)
        setError(err)
      })
  }



 

  const logOut = () => {
    localStorage.removeItem('token')
    setUser(undefined)
     nav('/login')
     message.info({content: <span>
      <span>  {' '} <b> Logged out</b> <br/>You've logged out successfully</span>
     </span>, icon: <CiLogout />})
  } 

  const logIn = (form:SignInForm) => {
        signIn(form)
        .then(getMe)
        .then(() => nav("/"),
        message.info({content: <span>
          <span>  {' '} <b> Logged in</b> <br/>You've logged in successfully</span>
         </span>, icon: <IoIosLogIn />})
        )
     
        .catch(setError)
  }
  
  const signUp = (form:SignUpForm) => {
    serviceSignUp(form)
    .then((_) => {
      message.info({content: <span>
        <span>  {' '} <b> Success</b> <br/>You've successfully registered</span>
       </span>, icon: <BsPencilSquare /> })
      nav("/login")
    })
    .catch(setError)
  }

  const addItemToCart = async (product: Product, quantity:number = 1) => {
      try {
        const response = await updateCart({
          itemId: product.id,
          quantity
        })
        saveCartLocal(response)

      } catch(e) {
        console.log(e)
      }
  }
  


  const createItem = (form : NewProductForm)=>{

    adminCreateItem(form)
    
   .then((_) => {nav("/shop")
   message.info({content: <span>
    <span>  {' '} <b> Success</b> <br/>New item successfully created</span>
   </span>, icon: <RiAddCircleLine /> })
  })
   .catch(setError) 
  }

  const saveUserDetail = (form:UserDetailsForm)=>{
return ''
  }



  const deleteItem =async (id:number)=>{
    try {
      await adminDeleteItem(id);
      message.info({content: <span>
        <span>  {' '} <b> Deleted</b> <br/>Item deleted successfully</span>
       </span>, icon: <MdOutlineDelete /> })
       return true
    } catch (error) {
      console.error(error);
      return false
    }
    }
   


  const saveCartLocal = (cart:Cart) =>{
    if(user)
      setUser({...user, cart: {
        ...cart,
        items: cart.items.sort((item_1,item_2) => item_1.item.price - item_2.item.price)
        }})
  }
  
      const decreaseItemFromCart = async (cartItem:CartItem, quantity:number = -1) => { // -1
        try {
          const response = await updateCart({
            itemId: cartItem.item.id,
            quantity
          })
          saveCartLocal(response)
        } catch(e) {
          console.log(e)
        }
    }

    const deleteItemFromCart = async (cartItem : CartItem) => {
      await decreaseItemFromCart(cartItem, -cartItem.quantity)
    }


    const createNewOrder = async(dto: OrderRequestDto) => {
      if(!user) return
      try {
        const confirmation = await newOrder(dto)
        setUser({...user,cart: {  id: confirmation.newCartId, items:[]}})
        return confirmation
      } catch(e) {
        console.log(e)
      }
    }

    const isLoggedIn = useMemo(() => user !== undefined, [user])
    const isAdmin = useMemo(() => user?.roleIds.includes(1) ?? false, [user])

    return <UserContext.Provider value= {{
    user,
    setUser,
    logOut,
    logIn,
    addItemToCart, 
    decreaseItemFromCart,
    deleteItemFromCart,
    saveUserDetail,
    createNewOrder,
    error,
    signUp, 
    isLoggedIn,
    isAdmin,
    createProduct: createItem,
    deleteItem :deleteItem,
    resetError: () => setError(undefined)
    }}>
        {children}
    </UserContext.Provider>
}



export function useUser() : IUserContext {
    const context = useContext(UserContext)

    if(!context) {
        throw new Error("User Context not provided")
    }
    return context
}


