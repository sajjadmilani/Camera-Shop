import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate } from "react-router-dom";
import SubHeader from "./Header/SubHeader";
import { BsTrash } from "react-icons/bs";
import { NotificationManager } from "react-notifications";

const ShoppingCart = () => {
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();
  let navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const {
    cart,
    addToCart,
    setAddToCart,
    myCart,
    setMyCart,
    setTax10,
    setTax5,
    setSum,
  } = useContext(GlobalContext);
  //=============================================================
  // fetch user's current cart from backend
  useEffect(() => {
    if (isAuthenticated) {
      setIsLoaded(false);
      fetch(`/api/cart/${user.sub}`)
        .then((res) => res.json())
        .then((data) => {
          setMyCart(data.data);
          setIsLoaded(true);
        })
        .catch((err) => {
          "error";
        });
    }
  }, [user]);
  //=============================================================
  // function to remove item from cart
  const removeItem = (item) => {
    fetch(`/api/cart/${item._id}`, {
      body: JSON.stringify({
        user,
      }),
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAddToCart(addToCart - 1);
        NotificationManager.success(
          "Item successfully removed from cart",
          "Success!"
        );
        window.location.reload();
      })
      .catch((err) => {
        "error";
      });
  };
  //=============================================================
  // function to clear the cart
  const clearCart = (user) => {
    console.log("hello");
    fetch(`/api/cart/clear/${user.sub}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setAddToCart([]);
          NotificationManager.success("Cart cleared!", "Success!");
          window.location.reload();
        }
        if (data.status === 404) {
          NotificationManager.error(data.message, "Error");
        }
      })
      .catch((err) => {
        "error";
      });
  };
  //=============================================================
  // calculating the total price of all items in the cart and taxes
  let sum = 0;
  myCart?.forEach((item) => {
    sum += Number(item.price.replace(",","").replace(/[$,]+/g, "")) * item.quantity;
    
  });
  
  const tax5 = Number((sum * 0.05).toFixed(2));
  const tax10 = Number((sum * 0.09975).toFixed(2));

  useEffect(() => {
    if (myCart) {
      setSum(sum);
      setTax5(tax5);
      setTax10(tax10);
    }
  }, [myCart]);

  //=============================================================
  if (!isLoaded) {
    return <LoadingSpinner top={40} />;
  }
  //============================================================
  // asking the user to sign in if they are trying to see their shopping cart and is not logged in
  if (isLoaded && !isAuthenticated) {
    return (
      <CartHeader>
        <NotSignedIn>
          Please
          <Click onClick={() => loginWithRedirect()}> sign in</Click> to view
          your cart.
        </NotSignedIn>
      </CartHeader>
    );
  }
  return (
    <>
      <SubHeader title="My Cart" />
      <Body>
        {/* showing the shopping cart only if there are items in the cart */}
        {myCart ? (
          <Wrapper>
            <ItemsSection>
              <CartHeader>
                <Count>
                  {addToCart > 0 ? (
                    <>
                      You have {addToCart} items.
                      <span>{cart}</span>
                    </>
                  ) : (
                    <>Your cart is empty.</>
                  )}
                </Count>
                {addToCart > 0 && (
                  <Clear onClick={() => clearCart(user)}>
                    <BsTrash />
                    Clear cart
                  </Clear>
                )}
              </CartHeader>
              {myCart?.map((item) => {
                return (
                  <Item key={item._id}>
                    <Img
                      onClick={() => navigate(`/product/${item._id}`)}
                      src={item.imageSrc}
                      alt="camera"
                    />
                    <Middle>
                      <Name onClick={() => navigate(`/product/${item._id}`)}>
                        {item.name}
                      </Name>
                      <Text>Quantity:{item.quantity} </Text>
                    </Middle>
                    <Text>Price: {item.price}</Text>
                    <RemoveButton onClick={() => removeItem(item)}>
                      <BsTrash />
                    </RemoveButton>
                  </Item>
                );
              })}
            </ItemsSection>
{/* Order totals section */}
            {addToCart > 0 && (
              <TotalSection>
                <Title>Order totals</Title>
                <Text2>
                  Subtotal
                  <TotalText>{Math.floor(sum * 100) / 100} $</TotalText>
                </Text2>
                <Text2>
                  Tax (TPS 5%)
                  <TotalText>{tax5} $</TotalText>
                </Text2>
                <Text2>
                  Tax (TVQ 9.975%)
                  <TotalText>{tax10} $</TotalText>
                </Text2>
                <Text2>
                  Shipping
                  {sum >= 49 ? (
                    <TotalText>Free</TotalText>
                  ) : (
                    <TotalText>10.00 $</TotalText>
                  )}
                </Text2>
                <OrderTotals>
                  Total Cost
                  {sum >= 49 ? (
                    <TotalText>
                      {Math.round((sum + tax5 + tax10) * 100) / 100} $
                    </TotalText>
                  ) : (
                    <TotalText>
                      {Math.round((sum + tax5 + tax10 + 10) * 100) / 100} $
                    </TotalText>
                  )}
                </OrderTotals>
                <CheckoutButton onClick={() => navigate("/checkout")}>
                  Checkout
                </CheckoutButton>
              </TotalSection>
            )}
          </Wrapper>
        ) : (
          <LoadingSpinner top={40} />
        )}
      </Body>
    </>
  );
};
const NotSignedIn = styled.div`
  width: 100%;
  padding: 50px 0 20px 60px;
`;
const Click = styled.span`
  &:hover {
    cursor: pointer;
    color: #2279d2;
    text-decoration: underline;
  }
`;
const Clear = styled.span`
  margin-right: 10px;
  padding: 10px;
  background-color: #f96e86;
  color: white;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`;
const TotalText = styled.span`
  float: right;
  font-weight: bold;
`;
const Body = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 50px;
  font-family: "Poppins", sans-serif;
`;
const Middle = styled.div`
  text-align: left;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ItemsSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 50px;
  box-sizing: border-box;
`;
const CartHeader = styled.div`
  border-bottom: 1px solid #cccccc;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Count = styled.span`
  margin-left: 30px;
  font-size: 18px;
`;
const Item = styled.div`
  border-bottom: 1px dashed #cccccc;
  margin: 10px;
  padding: 10px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Img = styled.img`
  cursor: pointer;
  width: 80px;
  height: 80px;
  margin-right: 30px;
`;
const Name = styled.div`
  &:hover {
    cursor: pointer;
    color: #2279d2;
  }
`;
const Text = styled.div`
  margin-top: 10px;
`;
const RemoveButton = styled.button`
  margin-top: 10px;
  background-color: #f0f0f0;
  height: 30px;
  border-radius: 50px;
  font-size: 15px;
  border: none;
  &:hover {
    cursor: pointer;
    background-color: pink;
    color: white;
  }
`;

const TotalSection = styled.div`
  width: 320px;
  background: #f5f5f6;
  height: fit-content;
  padding: 30px;
`;
const Title = styled.h2`
  font-size: 30px;
  border-bottom: 2px solid #d3d3d3;
  padding-bottom: 20px;
  margin-bottom: 30px;
`;
const Text2 = styled.div`
  margin-top: 15px;
  font-size: 17px;
`;
const OrderTotals = styled.div`
  margin-top: 15px;
  font-size: 18px;
  font-weight: bold;
  padding: 20px 0 0px 0;
  border-top: 2px solid #d3d3d3;
`;
const CheckoutButton = styled.button`
  margin-top: 20px;
  background-color: #2279d2;
  height: 50px;
  color: white;
  font-weight: bold;
  border-radius: 50px;
  font-size: 20px;
  width: 100%;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

export default ShoppingCart;
