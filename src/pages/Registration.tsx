
import { Button, Input, Group ,PasswordInput, TextInput,InputLabel} from '@mantine/core'
import { useUser } from '../context/userContext'
import { useForm } from '@mantine/form';
import { SiteColor } from '../utils/Definitions'

 export default function Registration() {

 const {signUp,error,resetError} = useUser();



  // validators

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      email: ''
    },

    validate: {
     
      username:  (value) => {
        return (value.length < 2 ? 'Name must have at least 2 letters' : null)
      },
      password :(value) => {
        let rgx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?\W).{8,20}$/
        return value.length <= 0 ? "Password must not be empty"
        : !rgx.test(value) ? "password must contain at least 8 characters, one or more lower case letters, uppercase letter, symbol, digits" : null
      }, 
    },
    
  });



    return (

     <div className="login-container">
   

          <h1>Registration</h1>
            
          <form onSubmit={form.onSubmit(signUp)}>
     

           
            <TextInput
          
              label = "User Name"
              onInput={resetError}
              id="username"
              name="username"
              required
              {...form.getInputProps('username')}
            />


          
          <PasswordInput
            id="password"
            onInput={resetError}
            name="password"
            label='Password:'
            placeholder='Password'
            {...form.getInputProps('password')}
            required
          />
       
     

      

            <InputLabel htmlFor="email">Email:  </InputLabel>
            <span style={{ color: 'red' }}>*</span>
            <Input
              type="email"
              id="email"
              name="email"
              required
              {...form.getInputProps('email')}
            />
          <br/>
          
          
          <Group justify="center" mt="md">
         <Button type="submit" color={SiteColor} variant='light'>Submit</Button>
      </Group>


      {error && <p style={{color:'red'}}>{error.message}</p>}
      </form>
      
      
          </div>
         )
}