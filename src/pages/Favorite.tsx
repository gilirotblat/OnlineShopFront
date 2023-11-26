

import React, { useEffect, useState } from 'react';
import { Product } from '../utils/Definitions';
import ProductList from '../components/ProductList';

const FavoritesPage = () => {
  
  const [favorites, setFavorites] = useState([] as Product[]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const removeFromFavorites =(product: Product) => {
    const toDeleteIndex = favorites.findIndex((p: Product) => p.id === product.id)
    favorites.splice(toDeleteIndex, 1)
    setFavorites([...favorites])
  }

  return (
    <div>
  
        <ProductList products={favorites} onFavoriteClick={removeFromFavorites}/>
    </div>
  );
};

export default FavoritesPage;
