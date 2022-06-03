import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "./GlobalContext";
import LoadingSpinner from "./LoadingSpinner";
import { useAuth0 } from '@auth0/auth0-react';
import SubHeader from "./Header/SubHeader";
import Error from "./Error";

// this component is to show the details of one specific product
const ProductDetails = () => {
  const { addItem } = useContext(GlobalContext);
  let navigate = useNavigate();
  let { _id } = useParams();
  const [productDetails, setProductDetails] = useState();
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const [error, setError] = useState();

  // fetch the product details
  useEffect(() => {
    setProductDetails(null);
    fetch(`/api/product/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setProductDetails(data.data);
        }
        if (data.status === 404 || data.status === 400) {
          setError(data.message);
        }
      });
  }, [_id]);

  if (error) {
    return (
      <Error
        message={"Sorry, we can't seem to find what you're looking for."}
      />
    );
  }

  return (
    <>
      {productDetails ? (
        <>
          <SubHeader title={productDetails.section} subTitle={productDetails.category+" > "+productDetails.name} />
          <Section>
            <Body>
              <ProductContainer>
                <Img src={window.location.origin + productDetails.imageSrc} alt="watch" />
                <ItemDescription>
                  <Name>{productDetails.name}</Name>
                  Brand: <Click onClick={() =>
                    navigate(`/brand/${productDetails.company.name}`)
                  }>{productDetails.company.name}</Click>
                  <Price>{productDetails.price}</Price>
                  {/* if user not logged in, they can't add to cart */}
                  {!isAuthenticated ? (
                    <SignIn onClick={() => loginWithRedirect()}
                    >Please sign in to add items in the cart.</SignIn>)
                    : (<div>
                      {/* "Add to cart" button is only showing if item is still in stock, otherwise "out of stock" */}
                      {productDetails.numInStock > 0 ? (
                        <AddToCartButton onClick={() => addItem(productDetails)}>
                          Add to cart
                        </AddToCartButton>
                      ) : (
                        <OutOfStock>Out of stock</OutOfStock>
                      )} </div>
                    )}
                  <div
                    onClick={() =>
                      navigate(`/products/${productDetails.category}`)
                    }>
                    Category: <Click>{productDetails.category}</Click>
                  </div>
                  <Description>
                    {productDetails.description}
                  </Description>
                </ItemDescription>
              </ProductContainer>
            </Body>
          </Section>
        </>
      ) : (
        <LoadingSpinner top={40} />
      )}
    </>
  );
};
const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

`;
const SignIn = styled.button`
  margin-top: 10px;
  margin-bottom: 15px;
  background-color: #909090;
  color: white;
  height: 30px;
  width: 300px;
  border-radius: 10px;
  font-size: 15px;
  border: none;
  &:hover {
    cursor: pointer;
    background-color: #2279d2;
  }
`;
const Body = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0 40px 0;
  justify-items: center;
  justify-self: stretch;
  justify-content: center;
  align-items: center;
  
`;
const Click = styled.span`
  font-weight: bold;
  &:hover {
    cursor: pointer;
    color: #2279d2;
    text-decoration: underline;
  }
`;
const ItemDescription = styled.div`
  margin-left: 30px;
  max-width: 450px;
`;
const Name = styled.div`
  font-size: 25px;
  margin-bottom: 15px;
  color: #505050;
`;
const Price = styled.div`
  font-size: 25px;
  margin-top: 20px;
`;
const OutOfStock = styled.div`
  margin-top: 10px;
  margin-bottom: 15px;
  background-color: #909090;
  color: white;
  height: 20px;
  width: 100px;
  border-radius: 50px;
  padding: 10px;
  font-size: 17px;
  border: none;
  &:hover {
    cursor: not-allowed;
  }
`;
const AddToCartButton = styled.button`
  margin-top: 10px;
  margin-bottom: 40px;
  background-color: #2279d2;
  color: white;
  font-weight: bold;
  height: 45px;
  width: 300px;
  border-radius: 50px;
  font-size: 15px;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 40px;
  height: 100%;
  gap: 20px;
`;
const Img = styled.img`
  height: 300px;
  align-items: left;
`;
const Description = styled.div`
  margin-top: 20px;
  color: #505050;
`;

export default ProductDetails;