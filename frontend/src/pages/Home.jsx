import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import Products from '../components/Products'
import { useSearchParams } from 'react-router';

const Home = () => {

  const [products, setproducts] = useState([]);

  const [searchParam] = useSearchParams();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/products?' + searchParam);
        const data = await response.json();
        setproducts(data.products);

      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [searchParam]);

  return (


    <Fragment>
      <h1 id="products_heading">Latest Products</h1>

      <section id="products" className="container mt-5">
        <div className="row">

          {products.length > 0 ? products.map(product => <Products product={product} />
          ) :
            <h2>No products found</h2>}


        </div>
      </section>
    </Fragment>
  )
}

export default Home
