import React, { useState,useEffect } from 'react';
import { Image, Text, Badge, Button, Group, Card,Drawer,HoverCard,UnstyledButton } from '@mantine/core';
import { useUser } from '../context/userContext';
import { Product } from '../utils/Definitions';
import { LuEraser} from "react-icons/lu";
import { AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import {message} from 'antd'
import { LiaCartPlusSolid } from "react-icons/lia";
import { IoIosLogIn } from "react-icons/io";
import {Modal} from 'antd'
import { SiteColor } from '../utils/Definitions'
import { useDisclosure } from '@mantine/hooks';
import ProductPage from '../pages/ProductPage';
import { FaRegQuestionCircle } from "react-icons/fa";
import {useProducts } from '../context/productContext'




type ProductProps = {product: Product, onFavoriteClick?: (product: Product) => void}
const isInitialyFavorite = (id:number) => {
  const storedFavorites = localStorage.getItem('favorites');

  let favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];
  return favoritesArray.findIndex((p:Product) => p.id ===id) !==-1
}

const ProductComponent: React.FC<ProductProps> = ({ product, onFavoriteClick} : ProductProps ) => {
  const { addItemToCart, isLoggedIn , deleteItem,isAdmin } = useUser();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isHeartPressed, setIsHeartPressed] = useState(isInitialyFavorite(product.id));
  const [opened, { open, close }] = useDisclosure(false);
  const { deleteProduct } = useProducts();
  const navigate = useNavigate();



  const handleAddToCart = (e: any) => {
    e.stopPropagation()
    if (isLoggedIn) {
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


  const handleDeleteProduct =(id:number , e?: React.MouseEvent)=>{ 
  
    if (e) {
      e.stopPropagation();
    }
  
  Modal.confirm({
        content:  "Are you sure you want to delete this item from the cart?",
        okText:"delete",
        icon : <LuEraser/>,
        onOk: async () => {

          deleteProduct(id)
          const deleted = await deleteItem(id)

          if(deleted) {
            //
          }
          /*return new Promise((resolve,reject) => {
            setTimeout(() =>{
              resolve(null)
            }, 2000)
          })*/
        
        }
      })
    }
  
 

  const handleAddToFavorites = (e:any) => {
    e.stopPropagation()
    const storedFavorites = localStorage.getItem('favorites');
    let favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];
    const toDeleteIndex = favoritesArray.findIndex((p: Product) => p.id === product.id)
    if(onFavoriteClick) {
      onFavoriteClick(product)
    }
    if (toDeleteIndex === -1) {
       favoritesArray.push( product)
       setIsHeartPressed(true)
    } else {
       favoritesArray.splice(toDeleteIndex, 1)
       setIsHeartPressed(false)
    }

      localStorage.setItem('favorites', JSON.stringify(favoritesArray));
    };
    
  

  return (

    <Card shadow="sm" padding="lg" radius="md" withBorder className='product-card' >

      <Card.Section component="a" >
        <Image
        className='product-img'
        src={product.img  }
        height={350}
        width={200}
        fallbackSrc='https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png'
           alt = 'Nothing To Show  '
        />
      </Card.Section>

      <Group  justify="space-between"  className="text-ellipsis">
        <Text fw={350}>{product.title}</Text>
        <Badge color="black"  variant="light" size='14' >
        ₪ {product.price} 
        </Badge>
        </Group>


        <Group  justify="space-between" mt="md" mb="xs"  className="text-ellipsis" >
  
      {/* <Button onClick={handleAddToFavorites} color={isHeartPressed ? 'rgb(229, 71, 148)'  : 'white'} size='compact-lg' radius='xl' variant='light'>

      {isHeartPressed?<AiFillHeart/> : <AiOutlineHeart/>}
      </Button> */}
      <UnstyledButton onClick={handleAddToFavorites} color={isHeartPressed ? 'rgb(229, 71, 148)'  : 'white'} size='compact-lg'  variant='light'>

{isHeartPressed?<AiFillHeart size={30} color='red'/> : <AiOutlineHeart  size={30}/>}
</UnstyledButton>
    
      <HoverCard width={280} shadow="md">
        <HoverCard.Target>
        <UnstyledButton
className='more-info'
onClick={open}

      > 
 <FaRegQuestionCircle />

      </UnstyledButton>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="sm">
          More information about the product
          </Text>
        </HoverCard.Dropdown>
      </HoverCard>
  
   
     
      </Group>

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

   { isAdmin &&  <Button  onClick={(e) => handleDeleteProduct(product.id, e)}variant="light" color="red"   mt="md" radius="md">
     delete
      </Button>} 
     
   
      <Drawer
        opened={opened}
        onClose={close}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <ProductPage {...product} />
      </Drawer>

    </Card>
  );
};

export default ProductComponent;