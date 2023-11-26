
import { Button ,Select, TextInput, NumberInput} from '@mantine/core'
import { FormEvent, useState } from 'react';
import { SiteColor } from '../utils/Definitions'
import { useUser } from '../context/userContext'
// import {BiImageAdd } from "react-icons/bi";
import { useForm } from '@mantine/form';


export default function NewProduct() {

  const {createProduct,error,resetError} = useUser();

  //const [file, setFile] = useState<File | null>(null);

  // const onSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   const formData = Object.fromEntries(new FormData(e.target as HTMLFormElement).entries()) as unknown as NewProductForm 
  //   createProduct(formData)
  // }

  const form = useForm({
    initialValues: {
      title:'',
      price: 0,
      description: '',
      stock:0,
      category: '',
      img:''
    },

    validate: {
     
      title:  (value) => {
        return (value.length < 2  ? 'title must have at least 2 letters' : null)
      },
      description: (value) => {
        return value.length < 2 || value.length > 25 ? 'Title must have between 2 and 25 characters' : null;
      },
      
    
    },
    
  });


    return (
     <div className="login-container">
          <h1>Add New Product</h1>
        
          <form  onSubmit={form.onSubmit(createProduct)}> 
          

          <TextInput 
           label= "Title"
           placeholder='Title'
              onInput={resetError}
              id="title"
              name="title"
              required
              {...form.getInputProps('title')}
            />


        <NumberInput
        label="Price"
        placeholder="price"
        prefix="₪"
        onInput={resetError}
        id="price"
        required
        {...form.getInputProps('price')}
       />
    
        <TextInput 
        label= "Description"
        placeholder='description'
        type="text"
        onInput={resetError}
        id="description"
        {...form.getInputProps('description')}
                />
    <NumberInput
        label="Stock"
        placeholder="Stock"
        onInput={resetError}
        id="Stock"
        required
        {...form.getInputProps('stock')}
       />

            <Select
            label="Category"
            type='text'
            placeholder="Pick Category"
            data={['woman', 'man', 'kids','shoes', 'sport']}
            required
            {...form.getInputProps('category')}
          />
         
              
              <TextInput 
              label="Image(url)"
              placeholder="Image(url)"
              type="text"
              onInput={resetError}
              id="img"
              name=" img"
              {...form.getInputProps('img')}
            />
    

    {/* כפתור להוספת תמונה ולא URL  */}
    {/* <FileButton onChange={setFile} accept="image/png,image/jpeg">  <BiImageAdd/> </FileButton> */}
   

      
          <br/>
          {error && <p style={{color:'red'}}>{error.message}</p>}
          <Button type="submit" variant='light' color={ SiteColor}> Save </Button>
         </form>
         </div>
         )
}