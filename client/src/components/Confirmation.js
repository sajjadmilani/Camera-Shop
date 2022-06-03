import styled from "styled-components";
import SubHeader from "../components/Header/SubHeader";
import { GlobalContext } from "./GlobalContext";
import { useContext } from "react"

const Confirmation = () => {
    const { trackingCode } = useContext(GlobalContext)

// this is for the confirmation page, once the user has successfully placed an order
    return (
        <>
        <SubHeader title="Order confirmation"/>
        <Body>
            <Container>
            <div>
                <ThankYou>Thank you for you order.</ThankYou>

                <OrderNumber>Order number: {trackingCode}</OrderNumber>

                <Text>You will receive an email confirmation shortly.</Text>
            </div>
            <div>
                <Question>Questions ? </Question>
                <Text>Email us at <Email>info@camshop.com</Email></Text>
            </div>
            </Container>
            </Body>
        </>
    )
}
const Body = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 1000px;
    margin-top: 30px;
`;
const ThankYou = styled.div`
    font-size: 35px;
    font-weight: bold;
`;
const OrderNumber = styled.div`
    font-size: 17px;
    font-weight: bold;
    margin: 30px 0 30px 0;
    height: 30px;
    background-color: #ebebeb;
    padding: 10px 0 0 10px;
    border-radius: 4px;
    width: 100%;
`;
const Text = styled.div`
    margin-top: 10px;
`;
const Question = styled.div`
    font-weight: bold;
`;
const Email = styled.span`
    &:hover {
        cursor: pointer;
        color: #2279d2;
    }
`;
export default Confirmation