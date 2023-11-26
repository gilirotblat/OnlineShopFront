
import { Button,  Group, Box, TextInput,InputLabel, NumberInput,HoverCard,Text,UnstyledButton} from '@mantine/core'
import { useForm } from '@mantine/form';
import { CartItem, CartItemDTO, OrderRequestDto, SiteColor,UserDetailsForm } from '../utils/Definitions'
import React, { useEffect, useState } from 'react';
import { BsQuestionCircle } from "react-icons/bs";
import { useUser } from '../context/userContext';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';


 export default function Registration() {


  //יש ליצור פעולת שמירה בלוקאל
  const {user,createNewOrder} = useUser()
  // שימוש ב ME?
  const [userDetails, setUserDetails] = useState([] as UserDetailsForm[] );

  useEffect(() => {
    const storedUserDetails = localStorage.getItem('user-details');
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  }, []);

  const nav = useNavigate()

  const onSubmitDetails = async (form:UserDetailsForm)=> {
      if(!user) return
      const cart : Array<CartItemDTO> = user.cart.items.map(item => ({itemId:item.id, quantity:item.quantity}))
      const {address,phone} = form

      let request = {
        cartId: user.cart.id,
        address,
        phone,
        cart
      } as OrderRequestDto

      const confirmation = await createNewOrder(request)
      if(confirmation?.orderConfirmationId) {
    
        nav("/order-confirm",{
          state: confirmation
        })
      } else {
        message.info("There was a problem processing your order, please contact site admins for further information")
      }
  }


  // validators

  const form = useForm({
    initialValues: {
      name: '',
      address: '',
      phone: ''
    },

    validate: {
     
      name:  (value) => {
        return (value.length < 2 ? 'Name must have at least 2 letters' : null)
      },
      address :(value) => {
        let rgx = /^(?=.*?[A-Z,a-z])(?=.*?[0-9])(?=.*?\W).{8,20}$/
        return value.length <= 0 ? " Address must not be empty"
        : !rgx.test(value) ? " Address must contain at least 2 characters and digits" :null
      }, 
      phone : (value) => {
        return (value.length !== 10 ? 'Phone number must have 10 digits' : null)
      },
    },
    
  });



    return (

     <div className="login-container">
    <Box maw={340} mx="auto">

       <h1>Personal Details</h1>
            
       <form   onSubmit={form.onSubmit(onSubmitDetails)}>
     

            <TextInput
            label = "Name"
              type="text"
              id="name"
              required
            
              {...form.getInputProps('name')}
            />


<InputLabel htmlFor="address"  > Address  </InputLabel>
            <span style={{ color: 'red' }}>*</span>
            <TextInput
              type="text"
              id="address"
              required
              {...form.getInputProps('address')}
            />
       
       <InputLabel htmlFor="phone"  > Phone  </InputLabel>
            <span style={{ color: 'red' }}>*</span>
            <TextInput
             
              id="phone"
              required
              {...form.getInputProps('phone')}
            />

<h2>Credit Card</h2>


   <NumberInput
   id = "cardNumber "
   label="Card number"
   placeholder='Card number'
   />

<NumberInput
   id = "expiry"
   label="Expiry"
   placeholder='Expiry'
   />

<Group className='cvv' justify="center">
<NumberInput
size='xs'
   id = "cvv"
   label="CVV"
   placeholder='CVV'
   />

   <HoverCard width={280} shadow="md">
        <HoverCard.Target>
          <UnstyledButton >
        <BsQuestionCircle />
        </UnstyledButton>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="sm">
          Three numbers on the back of the card
          </Text>
        </HoverCard.Dropdown>
      </HoverCard>
      </Group>
   
      <Group justify="center" mt="md">
 <Button type="submit"  color={ SiteColor} variant='light'>Send</Button>
</Group>
</form>


         </Box>
          </div>
         )
}