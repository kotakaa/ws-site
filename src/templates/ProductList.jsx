import React, { useEffect } from 'react';
import { ProductCard } from '../components/Products';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../reducks/products/operations';
import { getProducts } from '../reducks/products/selectors';


const ProductList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const products = getProducts(selector);
  
  const query = selector.router.location.search;
  const type = /^\?type=/.test(query) ? query.split('?type=')[1] : "";
  const category = /^\?category=/.test(query) ? query.split('?category=')[1] : "";

  useEffect(() => {
    dispatch(fetchProducts(type, category))
  },[query]);

  return(
    <section className="c-section-wrapin main">
      <div className="p-grid__row">
        { products.length > 0 && (
          products.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              images={product.images}
              area={product.area}
            />
          ))
        )}
      </div>
    </section>
  )
}

export default ProductList;