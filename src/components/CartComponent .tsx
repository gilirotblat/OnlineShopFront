
import React from 'react';
import { CartItem} from '../utils/Definitions';
import { Group, Image, Text, Badge, Button} from '@mantine/core';
import { useUser } from '../context/userContext';
import { IoTrashOutline } from "react-icons/io5";
import {AiOutlineMinus } from "react-icons/ai";
import {BsPlusLg } from "react-icons/bs";
import { SiteColor } from '../utils/Definitions'


type CartsProps = {cartItem: CartItem}



 const CartComponent : React.FC <CartsProps> =({cartItem}) => {

  const { deleteItemFromCart ,decreaseItemFromCart,addItemToCart} = useUser()

  


    return ( 

      <Group className='cart-item' mt="xs" mb="xs" >

        <Image
        src={cartItem.item.img}
       className='cart-img'
       fallbackSrc='https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png'
          alt = 'Nothing To Show' />

        <Text  className="text-ellipsis" >
        {cartItem.item.title}
        </Text>
     

       <Badge
      size="md"
      variant="light"
      color={SiteColor}>
       {cartItem.item.price* cartItem.quantity} ₪ 
      </ Badge>
    
      <Button onClick={() => {
        
        addItemToCart(cartItem.item)
      }}  variant="light" size='compact-md' radius="md" className='cart-btn' >
   <BsPlusLg size={10}/>
      </Button>
      <Text fw={30}>{cartItem.quantity} </Text>
      <Button onClick={() => decreaseItemFromCart(cartItem)} variant="light"  size='compact-md'  radius="md" className='cart-btn'>
  <AiOutlineMinus size={10}/>
      </Button>

      <Button onClick={() => deleteItemFromCart(cartItem)} variant="light" color="red"  size='compact-sm'  radius="xl" className='cart-delete'>
    <IoTrashOutline size={20}/>
      </Button>
      </Group>
          
          );
        }      
    
export default CartComponent;