
import './index.css';
import { useState } from 'react';
import {Routes, Route,Link ,Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Registration from './pages/Registration';
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Button ,Drawer, Group, Box,NavLink} from '@mantine/core';
import { useUser } from './context/userContext';
import CartItems from './components/Cart';
import {BsFillCartFill} from 'react-icons/bs';
import { NavBarAct } from './pages/Navbar';
import { LiaOpencart } from "react-icons/lia";

function App() {

  const [opened, { open, close }] = useDisclosure(false);

  const {  user, logOut,isLoggedIn  } = useUser()


    


  
  return  (
    <div>
      <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
         <AppShell.Header className='my-header'>
        <Group h="100%" px="md">
          <Burger opened={opened}  hiddenFrom="sm" size="sm" />
         לשים כאן כותרת דף +  הלוגו
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
      
       
    <p>Hello {isLoggedIn ? user!.username : 'Guest'}</p>
 

<NavBarAct/>
      {isLoggedIn &&<Button variant="light" color='red' onClick={logOut}> Log out </Button>}


     
      </AppShell.Navbar>
      </AppShell>

<nav className='cart'>

<Drawer
className='my-drawer'
        padding = {10}
        opened={opened}
        onClose={close}
        title={<LiaOpencart/>}
        overlayProps={{ backgroundOpacity: 0.2, blur: 4}}>

   <CartItems/>
  
      </Drawer>
    
{isLoggedIn &&
  <Button variant="filled"  size="compact-lg" radius="xl"   color='rgb(188, 158, 216)'  justify="center" onClick={open}>
  <BsFillCartFill/>
  </Button>
  }
</nav>

      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={isLoggedIn ? <Navigate to="/"/>  : <Login />}/>
        <Route path='/shop' element={<Shop />}/>
        <Route path='/shop/category/:category' element={<Shop />}/>
        <Route path='/Registration' element = {<Registration/>}/>
      </Routes>
    </div>
  );
}

export default App;
