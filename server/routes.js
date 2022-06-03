const router = require("express").Router();

//Product Handlers
const {
    addProduct, getProducts, getSingleProduct, getProductsByCompany,
    getProductsByProperty, updateProduct, deleteProduct, getCategories
} = require('./handlers/productHandlers');

//Order Handlers
const {
    addOrder, getOrdersByUser, getOrder,
} = require('./handlers/orderHandlers');

//User Handlers
const {
    updateUser, getUser, deleteUser
} = require('./handlers/userHandlers');

//Company Handlers
const {
    addCompany, getSingleCompany,
    getCompanies, updateCompany, deleteCompany
} = require('./handlers/companyHandlers');

//Cart Handlers
const { addToCart, getCart, removeFromCart, clearCart } = require('./handlers/cartHandlers');

//Product endpoints 
router.post("/api/product", addProduct);
router.get("/api/products", getProducts);
router.get("/api/product/categories", getCategories);
router.get("/api/products/company/:name", getProductsByCompany);
router.get("/api/products/:key/:value", getProductsByProperty);
router.get("/api/product/:_id", getSingleProduct);
router.patch("/api/product/:_id", updateProduct);
router.delete("/api/product/:_id", deleteProduct);

//Company endpoints 
router.post("/api/company", addCompany);
router.get("/api/company/:_id", getSingleCompany);
router.get("/api/companies", getCompanies);
router.patch("/api/company/:_id", updateCompany);
router.delete("/api/company/:_id", deleteCompany);

//Cart endpoints
router.post("/api/cart", addToCart);
router.get("/api/cart/:_id", getCart);
router.delete("/api/cart/:_id", removeFromCart);
router.delete("/api/cart/clear/:_id", clearCart);

//Orders endpoints
router.post("/api/order", addOrder);
router.get("/api/orders/user/:userId", getOrdersByUser);
router.get("/api/order/:_id/:userId", getOrder);

//Users endpoints
router.get("/api/user/:_id", getUser);
router.patch("/api/user/:_id", updateUser);
router.delete("/api/user/:_id", deleteUser);
module.exports = router;
