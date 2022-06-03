import styled from "styled-components";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import React, { useContext } from "react";
import { GlobalContext } from "../GlobalContext";
import { BiSearchAlt2 } from "react-icons/bi";
import { useAuth0 } from "@auth0/auth0-react";
import { BsFillCartFill } from "react-icons/bs";

const Header = () => {
  const { displaySearchBar, setDisplaySearchBar, addToCart } =
    useContext(GlobalContext);
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <Wrapper>
      <InfoBar>
        <span>Customer Service: 1-123-568-888</span>
        <span>Free shipping on all purchase of over $49 (before taxes)</span>
        <span>EN</span>
      </InfoBar>
      <NavigationBar>
        <HeaderContainer>
          <Ul>
            <Link to="/">
              <Logo src={window.location.origin + "/logo.png"} />
            </Link>
            {!displaySearchBar ? (
              <>
                <RightSide>
                  {/* displaySearchBar state is set to true or false for showing the search bar on click to the search icon */}
                  <BiSearchAlt2 onClick={() => setDisplaySearchBar(true)} />

                  <Links to="/shoppingcart">
                    My Cart
                    <CartIcon>
                      <BsFillCartFill />
                    </CartIcon>
                    {/* display the items added in cart if it has 1 item or more */}
                    {addToCart > 0 && <span> ({addToCart} items)</span>}
                  </Links>
                  {/* sign in and sign ou using Auth0Provider */}
                  {isAuthenticated ? (
                    <>
                      <Avatar src={user.picture}></Avatar>
                      <Auth onClick={() => logout()}>(Sign Out)</Auth>
                    </>
                  ) : (
                    <Auth onClick={() => loginWithRedirect()}>Sign In</Auth>
                  )}
                </RightSide>
              </>
            ) : (
              <SearchBar />
            )}
          </Ul>
        </HeaderContainer>
        <Ul2>
          <Links to="/products/section/cameras">Cameras</Links>
          <Links to="/products/section/accessories">Accessories</Links>
          <Links to="/products/company/">Shop by brands</Links>
          <Links to="/categories">Shop by categories</Links>
        </Ul2>
      </NavigationBar>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  min-height: 150px;
`;
const CartIcon = styled.span`
  margin: 0 3px 0 3px;
`;
const Links = styled(Link)`
  text-decoration: none;
  margin-left: 20px;
  margin-right: 20px;
  color: #e0e0e0;
  &:hover {
    color: white;
  }
`;
const Logo = styled.img`
  margin-left: 10px;
  color: #e0e0e0;
  width: 200px;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
`;
const Auth = styled.button`
  background: none;
  border: none;
  text-decoration: none;
  margin-left: 10px;
  color: #e0e0e0;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    color: white;
  }
`;
const Avatar = styled.img`
  margin-left: 10px;
  color: #e0e0e0;
  width: 30px;
  border-radius: 50%;
`;
const Ul = styled.ul`
  margin-top: 0;
  margin-right: 15px;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .icon path:hover {
    fill: grey;
  }
`;
const Ul2 = styled.ul`
  margin-top: 0;
  margin-right: 15px;
  list-style: none;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  max-width: 1100px;
  .icon path:hover {
    fill: grey;
  }
`;

const HeaderContainer = styled.div`
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  color: white;
  width: 100%;
  max-width: 1200px; ;
`;
const NavigationBar = styled.div`
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  background-color: rgb(49 49 50);
  color: white;
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  height: 96px;
  justify-content: center;
`;

const InfoBar = styled.div`
  background: #000000;
  color: white;
  padding: 10px 40px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: space-between;
  justify-items: center;
`;
export default Header;
