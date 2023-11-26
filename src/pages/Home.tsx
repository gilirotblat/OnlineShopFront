
 import { Card, Image, Button, Group, SimpleGrid, Box } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { SiteColor } from '../utils/Definitions'


export default function Home() {


  
  const data = [
   
    {id: 'woman',label:'Woman', src: 'https://image.lexica.art/full_jpg/29a8cba1-d4d9-412d-b782-465903ed3d70' ,nav :'/shop/category/woman'},
    {id: 'man',label:'Man', src: 'https://image.lexica.art/full_jpg/d8075e02-67f0-498d-8748-b790a11de073' ,nav:'/shop/category/man'},
    {id: 'kids',label:'Kids', src: 'https://image.lexica.art/full_jpg/c7564d42-044a-4b80-b6b0-bf717dc14ca6',nav:'/shop/category/kids' },
    {id: 'shoes',label:'Shoes', src: 'https://image.lexica.art/md2/ab9c7dbf-53a3-4473-8470-a9a725887319' , nav:'/shop/category/shoes'},
    {id: 'sport',label:'Sport', src: 'https://image.lexica.art/md2/06ac858c-7a6b-4914-a280-b913eb72f9a4',nav: '/shop/category/sport' },
    {id: 'favorite',label:'Favorite', src: 'https://image.lexica.art/full_jpg/b32ccbf8-70f5-4890-b9d0-eb54b5ebf170' ,nav:'/favorite' },
    {id: 'shop',label:'Shop', src: 'https://image.lexica.art/md2_webp/3e7d0383-4e9e-46dd-b2f1-2cfea35ad396' ,nav :'/shop'}


  ];

  function HomePage() {
  const items = data.map((item) => (
    <Card shadow="sm" padding="lg" radius="md" withBorder id={item.id} >
              <Card.Section component="a" >
                <Image
                src={item.src}
                height={350}
                width={250}
                fallbackSrc='https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png'
                  alt = 'Nothing To Show'
                />
              </Card.Section>
              <Group  justify="space-between" mt="md" mb="xs">
        
              <Button onClick={() => nav(item.nav)} variant="light" color={SiteColor} fullWidth mt="md" radius="md" >
              {item.label}
          </Button>
    
              </Group>
            </Card>))
          return <>{items}</>  
          }


const categories = ['woman', 'man', 'kids','shoes', 'sport','favorite']


  const nav = useNavigate()

    return (

        <SimpleGrid cols={3} className='home' >
  
        <HomePage/>

        </SimpleGrid>
      
      
    )
}