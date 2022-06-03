import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import Error from "./Error";
import SubHeader from "./Header/SubHeader";
import ProductsList from './ProductsList';

// this component is to show all the products from a specific category
const Category = () => {
  let { category } = useParams();
  const [items, setItems] = useState();
  const [error, setError] = useState();
  const [total, setTotal] = useState();
  
  // fetching all the products from a specific category
  useEffect(() => {
    setItems(null);
    fetch(`/api/products/category/${category}`)
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
  }, [category]);


  if (error) {
    return (
      <Error
        message={"Sorry, we can't seem to find what you're looking for."}
      />
    );
  }

  return (
    <>
      {items ? (
        <>
          <SubHeader title={items[0].category} />
          <ProductsList products={items} isPagination="true" total={total}/>
        </>
      ) : (
        <LoadingSpinner top={40} />
      )}
    </>
  );
};


export default Category;
