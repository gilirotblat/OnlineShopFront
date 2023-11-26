// DynamicTitle.js
import React from 'react';

interface DynamicTitleProps {
  route: string;
}

const PageTitle: React.FC<DynamicTitleProps> = ({ route }) => {

    switch (route) {
        case '/':
          return <span>Home </span>;
        case '/login':
          return <span>Login </span>;
        case '/shop':
          return <span>Shop </span>;
        case '/Registration':
          return <span>Registration </span>;
          case '/favorite':
            return <span>Favorite </span>;
            case '/form-new-product':
              return <span> Add New Product</span>;
              case '/UserDetails':
                return <span> Personal Details</span>;
        default:
          return <span>Shop</span>;
      }
    };

export default PageTitle;
