import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import SubHeader from "./Header/SubHeader";

const ShopByCategories = () => {
  let navigate = useNavigate();

  const [allCategories, setAllCategories] = useState([]);

  // get all categories of all the items db from backend
  useEffect(() => {
    try {
      fetch("/api/product/categories")
        .then((res) => res.json())
        .then((data) => {
          setAllCategories(data.data);
        });
    } catch (err) {
      console.log("ShopBrandsError", err);
    }
  }, []);

  // onClick this Function will take us to the details page of the item selected
  const handleCategories = (eachCategory) => {
    return navigate(`/products/${eachCategory}`);
  };

  return (
    <>
      {/* display all the categories of the items */}
      <SubHeader title="Shop by categories" />
      {allCategories.length === 0 ? (
        <LoadingSpinner top={30} />
      ) : (
        <Div>
          {allCategories.map((eachCategory, index) => {
            return (
              <Category
                key={eachCategory[index]}
                onClick={() => {
                  handleCategories(eachCategory);
                }}
              >
                {eachCategory}
              </Category>
            );
          })}
        </Div>
      )}
    </>
  );
};

const Category = styled.div`
  gap: 2px;
  background-color: #f2f2f2;
  margin: 2px;
  font-size: 30px;
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  :hover {
    cursor: pointer;
    background-color: #f5f5f7;
    color: #2279d2;
  }
`;

const Div = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 4fr);
  justify-items: center;
  justify-self: stretch;
  justify-content: center;
  align-items: center;
  justify-self: stretch;
  max-width: 1200px;
  min-height: calc(100vh - 290px);
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  gap: 10px;
  &:hover {
    cursor: pointer;
  }
`;

export default ShopByCategories;
