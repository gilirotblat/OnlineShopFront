
import { useDisclosure } from '@mantine/hooks';
import CartComponent from './CartComponent ';
import { useUser } from '../context/userContext';
import {  Badge,Group,Text} from '@mantine/core';
import { SiteColor } from '../utils/Definitions'
import { useMemo } from 'react';

  const CartItems = () => {
  const { user } = useUser();

  console.log(user)
  const totalAmount = useMemo(() => {
    return user?.cart.items.reduce((total, cartItem) => {
      return total + cartItem.item.price * cartItem.quantity;
    }, 0);
  } ,[user])

 

  return (
  <>
  <div >
        {user?.cart.items
          .map((item) => (
            <CartComponent cartItem={item}/>
          ))}



<Badge

id='total-cart'
      size="xl"
      mb={'md'}
      variant="light"
      color={SiteColor}>
      Total  ₪ {totalAmount} 
      
      </ Badge>
   
    
    </div>

    </>
);

 }
export default CartItems ;


