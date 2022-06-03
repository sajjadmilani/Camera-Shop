import ProductsList from "./ProductsList";
import React, { useState, useEffect } from "react";
import LoadingSpinner from './LoadingSpinner';
import Error from "./Error";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// this component is the homepage. It contains 2 promotional images and a list grid of random products
const Homepage = () => {
  const [error, setError] = useState();
  const [items, setItems] = useState();
  const [total, setTotal] = useState();

  // fetching all products from data
  useEffect(() => {
    fetch(`/api/products`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 404 || data.status === 400) {
          setError(data.message);
        }
        if (data.status === 200) {
          setItems(data.data);
          setTotal(data.total);
        }
      });
  }, []);

  if (error) {
    return (
      <Error
        message={"Sorry, we can't seem to find what you're looking for."}
      />
    );
  }

  return items ? (<>
    <Banners>
      <FirstBanner to={"/product/f3c7dd3d-b17b-468a-9b0e-2a263f2da142"}>
        <Big src="/slides/first-slide.jpg" />
      </FirstBanner>
      <SecondBanner to={"/products/Lens"}>
        <Big src="/slides/second-slide.jpg" />
      </SecondBanner>
    </Banners>
    <ProductsList products={items} total={total} />
  </>) :
    <LoadingSpinner top={40} />;
};
const Banners = styled.div`
max-width: 1200px;
margin:auto;
margin-top:20px;
display: flex;
gap:10px;
padding:10px 20px;
`;
const FirstBanner = styled(Link)`
width:75%;
`;
const SecondBanner = styled(Link)`
width:23%;
`;
const Big = styled.img`
  width: 100%;
`;

export default Homepage;
