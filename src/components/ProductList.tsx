import { Product } from '../utils/Definitions';
import ProductComponent from './ProductComponent';
import {Card, SimpleGrid,Button ,HoverCard,Group ,Text,UnstyledButton,TextInput} from '@mantine/core';
import { BiPlusMedical } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';
import { SiteColor } from '../utils/Definitions';
//import {useProducts } from '../hooks'

//import React, { useState,useEffect } from 'react';



const ProductList = ({products, onFavoriteClick} : {products: Product[], onFavoriteClick?: (product: Product) => void}) => {
  const nav = useNavigate()
  const {isAdmin} = useUser();
 // const {}= useProducts();
 


  return (

  <SimpleGrid cols={5} className='shop-items'>
    {products.map((product) => (
     <ProductComponent key={product.id} product ={product} onFavoriteClick={onFavoriteClick} />
      ))}
{isAdmin&&<Card shadow="sm" padding="lg" radius="md" withBorder id='product-list' >




<Group justify="center" >
      <HoverCard width={280} shadow="md">
        <HoverCard.Target>
        <Button
onClick={() => nav("/form-new-product")}
className='plus'
color={SiteColor}
        variant='light'
        mt="md"
        radius="md"
      > 
 <BiPlusMedical size={90}/>
      </Button>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="sm">
          Adding a product to the store and database
          </Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>

      
   

      </Card>}



    </SimpleGrid>

  );
};

export default ProductList;


