import styled from "styled-components";
import SubHeader from "../Header/SubHeader"

const ContactUs = () => {
    return (
        <>
            <SubHeader title="Contact us"/>
            <Section>
                <Title>To contact us... it's simple!</Title>
                <Text>You wish to obtain expert help for the purchase of photo equipment?</Text>
                <Text>Or would you like a follow-up on an existing order?</Text>
                <Text>Contact the CamShop team by sending us an email at <Email>info@camshop.com</Email>.</Text>
                <Text>A member of our team will be in touch in 48 to 72 business hours. </Text>
            </Section>
        </>
    )
}
const Section = styled.div`
    text-align: center;
    margin: 20px;
    margin-bottom: 30px;
    max-width:1200px;
    margin:50px auto;
`
const Title = styled.h1`
    font-size: 45px;
    margin: 0 0 40px 10px;
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
export default ContactUs