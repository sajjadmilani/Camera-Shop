import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import SubHeader from "./Header/SubHeader";

const ShopByBrands = () => {
  let navigate = useNavigate();

  const [brandsInfo, setBrandsInfo] = useState([]);

  // getting db from backend for all the brands info on mount
  useEffect(() => {
    try {
      fetch("/api/companies")
        .then((res) => res.json())
        .then((data) => {
          console.log("========", data.data);
          setBrandsInfo(data.data);
        });
    } catch (err) {
      console.log("ShopBrandsError", err);
    }
  }, []);

  // this function will navigate us on click to the item details page
  const handleBrand = (ev) => {
    return navigate(`/brand/${ev}`);
  };
  return (
    <>
      {/* display all the brand names */}
      <SubHeader title="Shop by brands" />
      {brandsInfo.length === 0 ? (
        <LoadingSpinner top={30} />
      ) : (
        <Div>
          {brandsInfo.map((brandInfo) => {
            return (
              <BrandName
                key={brandInfo._id}
                onClick={() => {
                  handleBrand(brandInfo.name);
                }}
              >
                {" "}
                {brandInfo.name}{" "}
              </BrandName>
            );
          })}
        </Div>
      )}
    </>
  );
};

const BrandName = styled.div`
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
  grid-template-columns: repeat(4, minmax(250px, 1fr));

  justify-items: center;
  justify-self: stretch;
  justify-content: center;
  align-items: center;
  justify-self: stretch;
  max-width: 1200px;
  min-height: 40vh;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 50px;
  gap: 10px;
  &:hover {
    cursor: pointer;
  }
`;

export default ShopByBrands;
