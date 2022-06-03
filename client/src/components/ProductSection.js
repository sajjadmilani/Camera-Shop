import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import LoadingSpinner from "./LoadingSpinner";
import Error from "./Error";
import SubHeader from "./Header/SubHeader";
import ProductsList from './ProductsList';
import { GlobalContext } from './GlobalContext';

// each product is divided either into "cameras" or "accessories".
// the user can select one of these 2 sections from the header to shop.
// once selected, the page will display all products from the selected section
const Section = () => {
    let { section } = useParams();
    const [items, setItems] = useState();
    const [error, setError] = useState();
    const [total, setTotal] = useState();

    const queryParams = new URLSearchParams(window.location.search);
    const page = queryParams.get("page") ? queryParams.get("page") : 1;
    const { currentPage, setCurrentPage } = useContext(GlobalContext);

    // fetching all products from the selected section 
    useEffect(() => {
        setCurrentPage(page);
        setItems(null);
        fetch(`/api/products/section/${section}?page=${currentPage}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 404 || data.status === 400) {
                    setError(data.message);
                }
                if (data.status === 200) {
                    setItems(data.data);
                    setTotal(data.total);
                }
            })
            .catch((err) => {
                "error";
            });
    }, [section, currentPage]);


    if (error) {
        return (
            <Error
                message={"Sorry, we can't seem to find what you're looking for."}
            />
        );
    }

    return (
        <>
            {items ? (
                <>
                    <SubHeader title={items[0].section} />
                    <ProductsList products={items} isPagination="true" total={total} />
                </>
            ) : (
                <LoadingSpinner top={40} />
            )}
        </>
    );
};


export default Section;
