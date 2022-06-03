import styled from "styled-components";
import SubHeader from "../Header/SubHeader";

const Shipping = () => {
    return (
        <>
            <SubHeader title="Shipping and delivery" />
            <Section>
                <Wrapper>
                    <Text>We offer delivery to your home for a flat rate of 10.00$.</Text>
                    <Text>Delivery is free with any purchase of $49 or more (before taxes).</Text>
                    <Text>CamShop presently only sells and delivers in Canada</Text>
                    <Title>Delivery time</Title>
                    <List>
                        <Text>· For products that are in stock in our Montreal warehouse, the delivery time is 3 to 7 business days*.</Text>
                        <Text>· For products in stock in another of our stores and that require a transfer, the delivery time will be 5 to 9 business days*.</Text>
                        <Text>If the item is not in stock, we will place an order with our suppliers, as soon as the item is received, we will deliver it to you within the time frame mentioned above*.</Text>
                        <Text>* Please note that this may vary due to unpredictable delays from our delivery partners.</Text>
                    </List>
                </Wrapper>
                <Wrapper>
                    <Title>The safety of your package is our priority</Title>

                    <Text>All our shipments contain valuable material and the delivery company is required to obtain a signature upon delivery.</Text>
                    <Text>Orders of $1,000 or more will be delivered at the nearest post office. The person picking it up has to be the one whose name appear on the credit card used to order. An ID will be required.</Text>
                </Wrapper>
            </Section>
        </>
    );
};
const Wrapper = styled.div`
width: 600px;
`;
const Section = styled.div`
    text-align: center;
    width: 1200px;
    margin:50px auto;
    display: flex;
    justify-content: space-evenly;
`;
const Title = styled.h1`
    font-size: 35px;
    margin: 30px 0 30px 10px;
`;
const Text = styled.p`
    color: #888888;
    margin: 0 0 10px 10px;
    font-size: 17px;
`;
const List = styled.ul`
    margin: 30px;
`;
export default Shipping;