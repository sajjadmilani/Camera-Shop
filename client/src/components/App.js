import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header/Header";
import Homepage from "./Homepage";
import ShoppingCart from "./ShoppingCart";
import Brands from "./Brands";
import ShopByCategories from "./ShopByCategories";
import ProductDetails from "./ProductDetails";
import Confirmation from "./Confirmation";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import SearchResult from "./SearchResult";
import Footer from "./Footer/Footer";
import Careers from "./Pages/Careers";
import Shipping from "./Pages/Shipping";
import Returns from "./Pages/Returns";
import ShopByBrands from "./ShopByBrands";
import Category from "./Category";
import Section from "./ProductSection";
import Checkout from "./Checkout";
import styled from 'styled-components';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

const App = () => {
  return (
    <BrowserRouter>
      <NotificationContainer />
      <GlobalStyles />
      <Header />
      <Container>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/shoppingcart" element={<ShoppingCart />} />
          <Route path="/brand/:name" element={<Brands />} />
          <Route path="/products/company/" element={<ShopByBrands />} />
          <Route path="/categories" element={<ShopByCategories />} />
          <Route path="/products/:category" element={<Category />} />
          <Route path="/product/:_id" element={<ProductDetails />} />
          <Route path="/search-result/:keyword" element={<SearchResult />} />
          <Route path="/products/section/:section" element={<Section />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
};
const Container = styled.div`
  min-height: calc(100vh - 350px);
`;
export default App;
