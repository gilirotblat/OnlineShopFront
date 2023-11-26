

import { useState , useEffect} from 'react';
import {Box,NavLink} from '@mantine/core';
import { AiFillHome } from "react-icons/ai";
import {FaShopify } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { useLocation, useNavigate } from 'react-router-dom';
import { BsFillSuitHeartFill } from "react-icons/bs";
import { SiteColor } from '../utils/Definitions'
import { BsPatchExclamation } from "react-icons/bs";
// const { isLoggedIn } = useUser();


  const data = [
    { label: 'About', href: "/about", leftSection: <BsPatchExclamation /> },
    { label: 'Home', href: "/", leftSection: <AiFillHome /> },
  
    { label: 'Shop', href: "/shop", leftSection: <FaShopify /> },
   {label: 'Favorite' ,href:"/favorite" ,leftSection:<BsFillSuitHeartFill/> },
    { label: 'Registration', href: "/Registration", leftSection: <BsPencilSquare /> }

  ];

 

export function NavBarAct() {
  const location = useLocation()
  const [active, setActive] = useState(0);
  const nav = useNavigate();


  useEffect(() => {
    const path = location.pathname
    if(path.includes("shop")) {
      setActive(2)
    }else if(path === "/") {
      setActive(1)
    }else if (path ==="/favorite"){
setActive(3)
}else if (path ==="/Registration"){
  setActive(4)
}else if (path ==="/about"){
    setActive(0)
    } else {
      setActive(-1)
    }
  }, [location]);


  const items = data.map((item, index) => (
  
    <NavLink
      color={SiteColor}
      key={item.label}
      active={index === active}
      label={item.label}
      leftSection={item.leftSection}
      onClick={() => {
        setActive(index)
        nav(item.href)
      }}
    />
  ));

  return <Box w={300}>{items}</Box>;
}







