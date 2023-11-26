import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import '@mantine/core/styles.css';
import { UserContextProvider } from './context/userContext';
import { MantineProvider } from '@mantine/core';
import { ProductContextProvider } from './context/productContext';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <BrowserRouter>
    <MantineProvider>
      <UserContextProvider>
        <ProductContextProvider>
          <App />
      </ProductContextProvider>
    </UserContextProvider>
    </MantineProvider>
  </BrowserRouter>
);

