import React, { useEffect, useRef, useState } from 'react';
import ProductList from '../components/ProductList';
import { useParams } from 'react-router-dom';
import { useProducts } from '../context/productContext';
import { Group, TextInput, Button, UnstyledButton, HoverCard, Text } from '@mantine/core';
import { IoSearchOutline } from 'react-icons/io5';
import { TbFilterUp } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { Product } from '../utils/Definitions';
import {ClipLoader} from 'react-spinners'

function Shop() {
  const nav = useNavigate();
  const { category } = useParams();
  const { products, error,loading, getProductsForCategory } = useProducts();

  const searchInput = useRef<HTMLInputElement | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
      getProductsForCategory(category)
  },[category])

  
  useEffect(() => {
      setFilteredProducts(products);
  }, [products]);

  const filterProducts = (part?: string) => {
    if (!part) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.title.toLowerCase().includes(part.toLowerCase())));
    }
  };

  const resetSearch = () => {
    filterProducts();
    if (searchInput.current) {
      searchInput.current.value='';
    }
  };

  const sortProducts = () => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setFilteredProducts(sortedProducts);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

 

  return (
    <div className="shop">
      <Group className="search">
        <TextInput
          ref={searchInput}
          leftSection={<IoSearchOutline />}
          placeholder="search"
        />
        <Button variant="light" size="xs" onClick={() => filterProducts(searchInput.current!.value)}>
          Search
        </Button>
        <Button variant="light" size="xs" onClick={resetSearch}>
          Reset
        </Button>
        <HoverCard shadow="md">
          <HoverCard.Target>
            <UnstyledButton onClick={sortProducts}>
              <TbFilterUp />
            </UnstyledButton>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text size="sm">Sort items by price</Text>
          </HoverCard.Dropdown>
        </HoverCard>
      </Group>
      {loading ? <div style={{padding:'16px',marginInline:'auto',width:'fit-content'}}><ClipLoader color={'#bd3333'} loading/></div> : <ProductList products={filteredProducts} />}
    </div>
  );
}

export default Shop;
