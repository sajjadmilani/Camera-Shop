import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductsList from "./ProductsList";
import LoadingSpinner from "./LoadingSpinner";
import Error from "./Error";
import SubHeader from './Header/SubHeader';

// this component is responsible for showing the results of all items that match the keywords in the SearchBar.js. 
const SearchResult = () => {
  const { keyword } = useParams();

  const [items, setItems] = useState();
  const [error, setError] = useState();

  // fetching all products that match the keywords in the search bar
  useEffect(() => {
    fetch(`/api/products/name/${keyword}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 404 || data.status === 400) { setError(data.message); };
        if (data.status === 200) { setItems(data.data); };
      })
      .catch((err) => {
        console.log("fetch data error: " + err);
      });
  }, [keyword]);

  if (error) { return <Error message={"Sorry, we can't seem to find what you're looking for."} />; }
  return items ? <>
    <SubHeader title="Search results" subTitle={"keyword: "+keyword}/>
    <ProductsList products={items} />
  </> :
    <LoadingSpinner top={40} />;
};


export default SearchResult;
