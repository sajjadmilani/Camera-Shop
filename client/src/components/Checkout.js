import React, { useContext } from "react";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { GlobalContext } from "./GlobalContext";
import SubHeader from "./Header/SubHeader";
import { BsPencilSquare } from "react-icons/bs";

const Checkout = () => {
  let navigate = useNavigate();

  //bringing all the states(includes the taxes, items in cart, the total before adding taxes and the id of confirm purchases) used from shopping cart with all the checkout items so I can use it here(checkoutItems)
  const { myCart, tax10, tax5, sum, setTrackingCode, setAddToCart } =
    useContext(GlobalContext);

  !myCart && navigate("/shoppingCart");
  // for sign in with Auth 0 and setting as default for the user's name as value of the input field
  const { isAuthenticated, user } = useAuth0();
  const [name, setName] = useState(isAuthenticated ? user.name : null);

  // setting the value for all the input fields of the form
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [apt, setApt] = useState();
  const [city, setCity] = useState();
  const [province, setProvince] = useState();
  const [postalCode, setPostalCode] = useState();
  const [country, setCountry] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  // POST. send all the info to backend from the filled up FORM
  const handleCompleteOrder = (e) => {
    e.preventDefault();
    fetch("/api/order", {
      body: JSON.stringify({
        userId: user.sub,
        name: name,
        email: email,
        address: address,
        apt: apt,
        city: city,
        province: province,
        postalCode: postalCode,
        country: country,
        phoneNumber: phoneNumber,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          // once the we receive the data from backend, we reset the cart to Qty:0 and take us to confirmation page. we also set the confirmation id here so once we are taken confirmation page, the id will display.
          setAddToCart([]);
          navigate("/confirmation");

          setTrackingCode(data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <SubHeader title="Checkout" />
      <WholePage>
        {/* form with all input fields*/}
        <Form
          onSubmit={(e) => {
            handleCompleteOrder(e);
          }}
        >
          <AllInputField>
            <CartHeader>
              <CheckOutTitle>Shipping Address</CheckOutTitle>
              <EditButton to="/shoppingcart">
                {" "}
                <BsPencilSquare /> Edit Cart
              </EditButton>
            </CartHeader>
            <InputTitle>Please complete all fields:</InputTitle>
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></Input>
            <Input
              placeholder="Address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            ></Input>
            <Input
              placeholder="Apt."
              value={apt}
              onChange={(e) => {
                setApt(e.target.value);
              }}
            ></Input>
            <Div2>
              <Input
                placeholder="City"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              ></Input>
              <Input
                placeholder="Province"
                value={province}
                onChange={(e) => {
                  setProvince(e.target.value);
                }}
              ></Input>
            </Div2>
            <Div2>
              <Input
                placeholder="PostalCode"
                value={postalCode}
                onChange={(e) => {
                  setPostalCode(e.target.value);
                }}
              ></Input>
              <Input
                placeholder="Country"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              ></Input>
            </Div2>
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></Input>
            <Input
              placeholder="Phone Number/Optional"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            ></Input>
          </AllInputField>

          <CheckoutItemsWitTotalPrice>
            <div>
              <Title>Order Summary</Title>{" "}
            </div>
            <CheckoutItems>
              {/* map all the items that's added in the cart.  */}
              {myCart?.map((checkoutItem) => {
                return (
                  <Item key={checkoutItem._id}>
                    <Top>
                      <Img src={checkoutItem.imageSrc}></Img>
                      <Name
                        onClick={() => navigate(`/product/${checkoutItem._id}`)}
                      >
                        {checkoutItem.name}
                      </Name>
                    </Top>
                    <Middle>
                      <Text>Qty:{checkoutItem.quantity}</Text>
                      <Text>{checkoutItem.price}</Text>
                    </Middle>
                  </Item>
                );
              })}
            </CheckoutItems>
            {/* we calculate the total price along with taxes and shipping fees */}
            <TotalCalculation>
              <Text2>
                Subtotal <span>{sum} $</span>
              </Text2>
              <Text2>
                Tax (TPS 5%) <span>{tax5} $</span>
              </Text2>
              <Text2>
                Tax (TVQ 9.975%) <span>{tax10} $</span>
              </Text2>
              <Text2>
                shipping{" "}
                {sum >= 49 ? (
                  <TotalText>Free</TotalText>
                ) : (
                  <TotalText>10.00 $</TotalText>
                )}
              </Text2>
              {/* calculation for shipping if purchase price is = or > than 49$, the shipping is free. otherwise, the shipping is 10$ flat rate */}
              <OrderTotals>
                Order totals
                {sum >= 49 ? (
                  <TotalText>{Math.floor(sum + tax5 + tax10)} $</TotalText>
                ) : (
                  <TotalText>{Math.floor(sum + tax5 + tax10 + 10)} $</TotalText>
                )}
              </OrderTotals>
            </TotalCalculation>
            <PlaceOrderButton type="submit">Place order</PlaceOrderButton>
          </CheckoutItemsWitTotalPrice>
        </Form>
      </WholePage>
    </>
  );
};

const InputTitle = styled.h2`
  margin-top: 30px;
  font-size: 18px;
  margin-bottom: 15px;
`;

const Span = styled.span`
  margin-left: 25px;
  font-weight: bold;
  font-size: 30px;
`;

const Links = styled(Link)`
  margin-left: 39px;
  margin-bottom: 15px;
`;

const Name = styled.div`
  text-align: left;
  &:hover {
    cursor: pointer;
    color: #2279d2;
  }
`;
const Img = styled.img`
  cursor: pointer;
  width: 50px;
  border: 1px solid #ccc;
  background-color: white;
  padding: 10px;
`;
const Top = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;
const Middle = styled.div`
  text-align: left;
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 20px;
`;

const Text = styled.div`
  margin-top: 10px;
`;

const Item = styled.div`
  margin: 10px;
  padding: 10px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  -webkit-box-pack: justify;
  align-items: center;
  align-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  border-bottom: 1px solid #ccc;
`;

const OrderTotals = styled.div`
  margin-top: 15px;
  font-size: 20px;
  font-weight: bold;
  padding: 20px 0 0px 0;
  border-top: 2px solid #d3d3d3;
`;
const Title = styled.h2`
  font-size: 30px;
  border-bottom: 2px solid #d3d3d3;
  padding-bottom: 20px;
`;

const PlaceOrderButton = styled.button`
  margin-top: 20px;
  background-color: #2279d2;
  height: 50px;
  color: white;
  font-weight: bold;
  border-radius: 50px;
  font-size: 20px;
  width: 100%;
  border: none;

  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const TotalText = styled.span`
  float: right;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  width: fit-content;
`;

const Input = styled.input`
  display: block;
  margin-top: 5px;
  padding: 0.7rem 1.1rem;
  box-sizing: border-box;
  color: inherit;
  width: 100%;
  font-family: inherit;
  font-size: 20px;
  font-weight: inherit;
  margin-top: 10px;
  line-height: 1.4;
  transition: box-shadow 300ms;
  ::placeholder {
    color: #b0bec5;
  }

  :focus {
    outline: none;
    box-shadow: 0.2rem 0.8rem 1.6rem #719ece;
  }
`;

const AllInputField = styled.div`
  margin-top: 45px;
  padding: 1px;
  width: 100%;
  padding: 50px 0;
  box-sizing: border-box;
`;

const CheckoutItems = styled.div``;

const CartHeader = styled.div`
  border-bottom: 1px solid #cccccc;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Text2 = styled.div`
  margin-top: 15px;
  font-size: 17px;
  display: flex;
  justify-content: space-between;
`;
const CheckOutTitle = styled.span`
  font-size: 23px;
`;
const EditButton = styled(Link)`
  margin-right: 10px;
  padding: 10px;
  background-color: #f9b26e;
  border-radius: 5px;
  color: white;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
`;
const CheckoutItemsWitTotalPrice = styled.div`
  display: flex;
  flex-direction: column;
  background: #f5f5f6;
  padding: 30px;
  box-sizing: border-box;
  margin-left: 60px;
  margin-top: 60px;
  height: fit-content;
`;

const TotalCalculation = styled.div`
  margin-left: 10px;
`;

const WholePage = styled.div`
  max-width: 1200px;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;
  min-height: calc(100vh - 290px);
  margin-bottom: 20px;
`;

const Div2 = styled.div`
  display: flex;
  gap: 10px;
`;

export default Checkout;
