import styled from "styled-components";
import { Link } from "react-router-dom";
import SubHeader from "../Header/SubHeader"

const AboutUs = () => {
    return (
        <>
        <SubHeader title="About us" />
        <Body>
            <Section>
                <Title>A History of Passion</Title>
                <Text>Since opening our first store, we have kept our spark alive. This spark has given us the power to capture an emotion for eternity. It has launched us on an exciting journey into visual arts. And it made us want to share our passion for photo with the world. </Text>
                <Text>Established in 1936, our company has been building on its success and expanding ever since, to a point where it is nowadays known as a leader in Canada among specialized photo retailers. </Text>
                <Text>CamShop offers beginners, advanced amateurs and experienced professionals alike a vast selection of photographic. More than 10,000 products and services are available through <Link to="/">camshop.ca</Link>. </Text>
                <Text>Passion, integrity and excellence are core values for us and are shared by all members of our team through the service and advice we provide to our clients. </Text>
            </Section>
            <Section>
                <Title>Our mission</Title>
                <Mission>"Through our know-how, allow us to capture and share the present moments."</Mission>
            </Section>
            <Section>
                
                <Title>Our values</Title>
                <ul>
                    <Text>·Customer satisfaction</Text>
                    <Text>·Innovation</Text>
                    <Text>·Excellence</Text>
                    <Text>·Determination</Text>
                    <Text>·Passion</Text>
                    <Text>·Team spirit</Text>
                    <Text>·Integrity</Text>
                </ul>
            </Section>
        </Body>
        

        </>
    )
}
const Body = styled.div`
    text-align: center;
    margin: 20px;
    max-width:1200px;
    margin:auto;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin-bottom:50px;
`
const Section = styled.div`
    text-align: left;
    margin: 20px;
    margin-bottom: 30px;
`
const Title = styled.h1`
    font-size: 35px;
    margin: 0 0 20px 10px;

`
const Mission = styled.p`
    font-style: italic;
    color: #888888;
    margin: 10px;
    font-size: 17px;
`
const Text = styled.p`
    color: #888888;
    margin: 0 0 10px 10px;
    font-size: 17px;

`
export default AboutUs