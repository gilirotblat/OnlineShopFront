import { useLocation } from "react-router-dom"
import { OrderResponseDto } from "../utils/Definitions"
import {useMemo} from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Group ,Text,Image,Badge, Button, Title} from "@mantine/core"

import { SiteColor } from '../utils/Definitions'


export default function AboutPage() {
    const nav = useNavigate();
    const location = useLocation()
   



    return(
 <>

     <Group className='about-page' mt="xs" mb="xs" >

   
         
    
    <h2>  digital clothing store:</h2>
<h1> Site Menu</h1>
<Text>
On the left side there is a menu where you can navigate the site, each button leads to a different page.
</Text>
<h1> Home Page</h1>
<Text>
On the home page, the store's categories are displayed.
When choosing a category, you go to a page where there are only the products according to the selected category.
</Text>

<h1>Shop</h1>
<Text>
In the store you can see all the products.
Each product has a button for more information about the product where you can see more details such as description and stock.
In addition there is a like button and an add to cart button.
<br/>
<b>You can add a product to the cart and like it only when the user is logged in. </b>
</Text>

<h1>Cart</h1>
<Text>
On the top right we have the user's cart.
In the cart you can see all the added products,
You can change the amount you want from each product / remove it.
Below is the total amount of the cart and there is a button to go to payment.
In order to pay and close the order, you need to fill in details and send. After sending, the user will receive an order confirmation number and details of the order he sent.
</Text>

<h1>Favorites page</h1>
<Text>
On the favorites page you can see all the favorite products that will be saved if the user logs out.
</Text>
<h1>Registration and login</h1>
<Text>
On the registration page, select a username, password and fill in the email address, after registration you will reach the login page.
On the login page, enter the username and password and enter the site.
</Text>


    </Group>

    </>
    )
}