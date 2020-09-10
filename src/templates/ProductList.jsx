import React, { useEffect, useState } from 'react';
import { ProductCard } from '../components/Products';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../reducks/products/operations';
import { getProducts } from '../reducks/products/selectors';
import Pagination from "material-ui-flat-pagination";
// import Pagination from '@material-ui/lab/Pagination';


const ProductList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const products = getProducts(selector);
  const [offset, setOffset] = useState(0);
  const parPage = 9;

  const query = selector.router.location.search;
  const type = /^\?type=/.test(query) ? query.split('?type=')[1] : "";
  const style = /^\?style=/.test(query) ? query.split('?style=')[1] : "";

  useEffect(() => {
    dispatch(fetchProducts(type, style))
  },[query]);

  const handleClickPagination = (offset) => {
    setOffset(offset)
  }

  const currentList = products.slice(offset, offset + parPage);
  const renderProducts = currentList.map((product) => {
    return (
      <ProductCard
        key={product.id}
        id={product.id}
        name={product.name}
        images={product.images}
        area={product.area}
      />
    )
  });

  return(
    <section className="c-section-wrapin main">
      <div className="p-grid__row">
        {renderProducts}
      </div>
        <Pagination
          limit={parPage}
          offset={offset}
          total={products.length}
          onClick={(e, offset) => handleClickPagination(offset)}
        />
    </section>
  )
}

export default ProductList;