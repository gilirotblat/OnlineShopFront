
import './index.css';

import {Routes, Route,Link ,Navigate, NavLink} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Shop from './pages/Shop';
import NewProduct from './pages/NewProduct';
import Registration from './pages/Registration';
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Image, Button ,Drawer, Group } from '@mantine/core';
import { useUser } from './context/userContext';
import CartItems from './components/Cart';
import {BsFillCartFill} from 'react-icons/bs';
import { NavBarAct } from './pages/Navbar';
import { useLocation } from 'react-router-dom';
import PageTitle from './components/Title';
import { useNavigate } from 'react-router-dom';
import FavoritesPage from './pages/Favorite';
import { LiaOpencart } from "react-icons/lia";
import UserDetails from './pages/UserDetails';
import { MdOutlinePayment } from "react-icons/md";
import { SiteColor } from './utils/Definitions'
import OrderConfirmation from './pages/OrderConfirmation';
import AboutPage from './pages/AboutPage';
import NotFound from './pages/NotFound';

function App() {

  const [opened, { open, close }] = useDisclosure(false);

  const {  user, logOut,isLoggedIn  } = useUser()

  const location = useLocation();

  const navigate = useNavigate();
 
  
  return  (
    <div>
      <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
         <AppShell.Header className='my-header'>
         
         <Image
         className='logo'
        src={'https://image.lexica.art/full_jpg/c6558e10-99bc-48f3-a28e-b2212055d593'}
        height={50}
        width={50}
        radius={'xl'}
          alt = 'LOGO' />
        
        <Group h="100%" px="sm">
       <div className='title-header'>
        <PageTitle route={location.pathname}  />
        </div>
             
        </Group>


      <nav className='cart'>
      <Drawer
        className='my-drawer'
        padding = {15}
        opened={opened}
        onClose={close}
        title={<LiaOpencart size={50} className='cart-icon'/>}
        overlayProps={{ backgroundOpacity: 0.7, blur: 4}}>

        <CartItems/>
        <Button onClick={() => { navigate("/UserDetails"); close(); }} size='compact-lg' radius='xl'color={SiteColor} leftSection={<MdOutlinePayment />} className='pay-btn'>
         Pay
        </Button>
      
      </Drawer>
    
{isLoggedIn &&
  <Button variant="filled"  size="compact-lg" radius="xl" id="cart-btn"  color='rgb(200, 200, 241)'  justify="center" onClick={open}>
  <BsFillCartFill/>
  </Button>
  }
</nav>
      </AppShell.Header>
      <AppShell.Navbar className='navbar'>
      
       
    <p>Hello {isLoggedIn ? user!.username : 'Guest'}</p>
<NavBarAct/>
{isLoggedIn ? (
        <Button variant="light" color='red' onClick={logOut}>
          Log Out
        </Button>
      ) : (
        <Button variant="light" color='blue' onClick={() => navigate('/login')}>
        Log In
      </Button>
   
 
      )}

      
      </AppShell.Navbar>
      </AppShell>

      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={isLoggedIn ? <Navigate to="/"/>  : <Login />}/>
        <Route path='/shop' element={<Shop />}/>
        <Route path='/order-confirm' element={<OrderConfirmation />}/>
        <Route path='/favorite' element={<FavoritesPage />}/>
        <Route path='/form-new-product' element={<NewProduct/>}/>
        <Route path='/shop/category/:category' element={<Shop />}/>
        <Route path='/Registration' element = {<Registration/>}/>
        <Route path='/UserDetails' element = {<UserDetails/>}/>
        <Route path='/about' element = {<AboutPage/>}/>
        <Route path='*' element ={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
