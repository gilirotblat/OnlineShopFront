import { Group ,Card, Image, Button, Text,Badge,Drawer, Title } from '@mantine/core';
import { Product } from '../utils/Definitions';
import { useDisclosure } from '@mantine/hooks';
import React, { useState,useEffect } from 'react';
import {message} from 'antd'
import { LiaCartPlusSolid } from "react-icons/lia";
import { IoIosLogIn } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';
import { SiteColor } from '../utils/Definitions'


export default  function ProductPage (product: Product){
  const { addItemToCart, isLoggedIn , deleteItem,isAdmin } = useUser();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const handleAddToCart = (e: any) => {
    e.stopPropagation()
    if (isLoggedIn) {
      close();
      addItemToCart(product);
      setIsAddedToCart(true);

        message.info({content: <span>
          <span>  {' '} <b> Successfully</b> <br/> Added </span>
                
              </span>, icon: <LiaCartPlusSolid size={20} />});
                setTimeout(() => {
                  setIsAddedToCart(false);
                }, 2000);
      
    } else{
    
      message.info({content: <span>
       <span>  {' '} <b> LOG IN</b> <br/> You need to log in before adding an item to the cart</span>
      </span>, icon: <IoIosLogIn />});
    setTimeout(()=>{
      navigate('/login')
    },2000)
    
  }}

    return (
   
        <Card shadow="sm" padding="lg" radius="md" withBorder className='product-card'>
    
    <h1>Product information</h1>
          <Card.Section component="a" >
            <Image
            className='product-img'
            src={product.img}
            height={350}
            width={250}
            fallbackSrc='https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png'
              alt = 'Nothing To Show'
            />
          </Card.Section>
    
          <Group  justify="space-between">
            <Title fw={350}>{product.title}</Title>
            <Badge color="black"  variant="light" size='14' >
            ₪ {product.price} 
            </Badge>
            </Group>
    
    
            <Group  justify="space-between" mt="md" mb="xs"  className="text-ellipsis" >
          <Text size="sm" c="dimmed">
           {product.description}
          </Text>
    
    <Text>Stock ({product.stock})</Text>

    <Button
      onClick={handleAddToCart}
  
        variant={isAddedToCart ? 'filled' : 'light'}
        color= {SiteColor}
        fullWidth
        mt="md"
        radius="md"
      >
    {isAddedToCart ? 'Added to Cart' : 'Add to Cart'}


      </Button>
        
          </Group>
    

        </Card>
        
      );
    };
    
