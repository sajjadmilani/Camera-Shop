import React, { useState, createContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NotificationManager } from "react-notifications";

export const GlobalContext = createContext(null);

const GlobalProvider = ({ children }) => {
  // state used in searchBar
  const [inputValue, setInputValue] = useState("");

  // state used in searchBar and Header
  const [displaySearchBar, setDisplaySearchBar] = useState(false);

  //used in shoppingcart
  const [cart, setCart] = useState([]);

  // used in shoppingcart, checkout, shoppingCart, Header
  const [addToCart, setAddToCart] = useState(0);

  // used in checkout, shoppingCart
  const [myCart, setMyCart] = useState();

  // used in checkout, shoppingCart,
  const [sum, setSum] = useState();
  const [tax5, setTax5] = useState();
  const [tax10, setTax10] = useState();

  // used in checkout, confirmation
  const [trackingCode, setTrackingCode] = useState();

  // used in MyPagination, productSection
  const [currentPage, setCurrentPage] = useState(1);

  // used in checkout, producDetails, shoppingCart, Header
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  // useEffect to fetch cart item quantity from backend
  useEffect(() => {
    if (isAuthenticated) {
      fetch(`/api/cart/${user.sub}`)
        .then((res) => res.json())
        .then((data) => {
          let sum = 0;
          data.data.forEach((item) => (sum += item.quantity));
          setAddToCart(sum);
        })
        .catch((err) => {
          "error";
        });
    }
  }, [user]);

  // post itemsId and user from ProductDetails and return a message as a top right corner either success  or error using (NotificationManager) library
  const addItem = (item) => {
    fetch(`/api/cart/`, {
      body: JSON.stringify({
        user,
        itemId: item._id,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 404) {
          NotificationManager.error("Sorry, item out of stock", "Error!");
        }
        if (data.status === 200) {
          setAddToCart(addToCart + 1);
          NotificationManager.success(
            "Item successfully added to cart",
            "Success!"
          );
        }
      })
      .catch((err) => {
        "error";
      });
  };

  return (
    <GlobalContext.Provider
      value={{
        inputValue,
        setInputValue,
        displaySearchBar,
        setDisplaySearchBar,
        cart,
        setCart,
        addToCart,
        setAddToCart,
        addItem,
        myCart,
        setMyCart,
        tax10,
        setTax10,
        tax5,
        setTax5,
        sum,
        setSum,
        trackingCode,
        setTrackingCode,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
