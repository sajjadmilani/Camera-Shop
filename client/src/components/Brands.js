import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductsList from "./ProductsList";
import LoadingSpinner from "./LoadingSpinner";
import Error from "./Error";
import SubHeader from './Header/SubHeader';

// this component is to show all the products from a specific brand, when user is clicking on a brand
const Brands = () => {
  let { name } = useParams();
  const [items, setItems] = useState();
  const [error, setError] = useState();
  const [total, setTotal] = useState();
  
  //fetching all the products from a specific brand
  useEffect(() => {
    setItems(null);
    fetch(`/api/products/company/${name}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 404 || data.status === 400) {
          setError(data.message);
        }
        if (data.status === 200) {
          setItems(data.data);
          setTotal(data.total);
        }
      })
      .catch((err) => {
        "error";
      });
  }, [name]);


  if (error) {
    return (
      <Error
        message={"Sorry, we can't seem to find what you're looking for."}
      />
    );
  }
  return (
    <>
      {items ? (<>
        <SubHeader
          title={items[0].company.name}
          subTitle={`Made in: ${items[0].company.country}`}
          website={`${items[0].company.url}`}
        />
        <ProductsList products={items} total={total} isPagination="true"/>
      </>
      ) : (
        <LoadingSpinner top={40} />
      )}

    </>
  );
};


export default Brands;
