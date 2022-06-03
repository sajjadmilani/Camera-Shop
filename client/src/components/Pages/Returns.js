import styled from "styled-components";
import SubHeader from "../Header/SubHeader"

const Returns= () => {
    return (
        <>
        <SubHeader title="Returns and refunds" />
            <Section>
                    <Text>CamShop wants you to be completely satisfied with your purchase. If for any reason you want to return or exchange an item, we will be glad to do it,  within the delays specified below. This is part of CamShop's Guaranteed Satisfaction policy.</Text>

                    <Title>Time limit for a return or a refund:</Title>
                <List>
                    <Text>For online purchases, 14 days from receipt of delivery of the item.</Text>
                </List>
                <Text>Any reclamation for an missing, broken, or non functional item upon delivery, must be made within two (2) days following the delivery date.</Text>
                <Title>How to return a product</Title>

                <Text>To return a product, kindly send us an email at <Email>returns@camshop.com</Email> and we will reply back with the instructions.</Text>
            </Section>
        </>
    )
}
const Section = styled.div`
    text-align: center;
    margin: 20px;
    margin-bottom: 30px;
    width: 1200px;
    margin:50px auto;
`
const Title = styled.h1`
    font-size: 35px;
    margin: 30px 0 30px 10px;
`
const Text = styled.p`
    color: #888888;
    margin: 0 0 10px 10px;
    font-size: 17px;
`
const Email = styled.span`
    font-weight: bold;
    text-decoration: underline;
`
const List = styled.ul`
    margin: 30px;
`
export default Returns;