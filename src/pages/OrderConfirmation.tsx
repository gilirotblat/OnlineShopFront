import { useLocation } from "react-router-dom"
import { OrderResponseDto } from "../utils/Definitions"
import {useMemo} from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Group ,Text,Image,Badge, Button} from "@mantine/core"
import { SiteColor } from '../utils/Definitions'


export default function OrderConfirmation() {
    const nav = useNavigate();
    const location = useLocation()
    const orderConfirmation = location.state as OrderResponseDto | undefined
    
    
    const totalPrice = useMemo (() => {
        if(!orderConfirmation) return 0
        return orderConfirmation.cart.items.reduce((prev, next) => prev + next.item.price * next.quantity, 0)
    }, [orderConfirmation])

    if(!orderConfirmation)  {
        return <div>Opps! You must have reached here accidently</div>
    }


    return(
 <>
     <Group className='order-page' mt="xs" mb="xs" >

          <h2>  The order was successfully received ! </h2> 
         
          <h4 >Order Confirmation id :<br/> {orderConfirmation.orderConfirmationId}</h4>
           
          <Text size="md">Shipping address: {orderConfirmation.address}</Text>
         

         <Text size="md"> Contact phone: {orderConfirmation.phone}</Text>
          <h4>  Order items :</h4>

            {React.Children.toArray( orderConfirmation.cart.items.map(
                item => <Group className="order-item" >
                        <Image  className= "cart-img" src={item.item.img}      fallbackSrc='https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png' alt = 'Nothing To Show'/>
                        <Text> {item.item.title}</Text>
                       <Text> Price: {item.item.price} ₪ </Text>
                     <Text> Quantity: {item.quantity}</Text>
                     </Group>
            ))}    
        
             
        <Badge
       className="order-badge"
      size="xl"
      variant="light"
      color={SiteColor}> Total price : {totalPrice} ₪ </Badge>


<Button  onClick= {()=>{nav('/')}} className="home-btn" color="" variant="light"> HOME</Button>
    </Group>
    
    </>
    )
}