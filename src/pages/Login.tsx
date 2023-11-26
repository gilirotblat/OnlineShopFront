


import { Button, Input, InputLabel ,Text} from '@mantine/core'
import { FormEvent } from 'react'
import {Link} from 'react-router-dom'
import { SignInForm } from '../utils/Definitions'
import { useUser } from '../context/userContext'
import { SiteColor } from '../utils/Definitions'



export default function Login() {


  const { logIn } = useUser()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = Object.fromEntries(  new FormData(e.target as HTMLFormElement).entries() ) as SignInForm
    logIn(formData)


}

    return (
     <div className="login-container">
          <h1>Login</h1>
          <form onSubmit={onSubmit} >
            <InputLabel htmlFor="username"> User Name  </InputLabel>
            <Input
              type="text"
              id="username"
              name="username"
              required
            />
            <InputLabel htmlFor="password">Password:  </InputLabel>
            <Input
              type="password"
              id="password"
              name="password"
              required
            />
          <br/>
            <Button type='submit'color={SiteColor} variant='light'
            > Login </Button>

            <Text>Unregistered ? </Text>
            <Link to={'/Registration'}>Register here now</Link>
         </form>
         </div>)
}