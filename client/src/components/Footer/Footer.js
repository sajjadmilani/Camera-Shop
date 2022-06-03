import styled from "styled-components";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <FooterContainer>
            <Link to="/"><Logo src={window.location.origin + "/logo.png"} /></Link>
            <div>
                <Section>CamShop</Section>
                <List>
                    <Links to="/about-us">· About us</Links>
                </List>
                <List>
                    <Links to="/careers">· Careers</Links>
                </List>
            </div>
            <div>
                <Section>Practical info</Section>
                <List>
                    <Links to="/shipping">· Shipping and delivery</Links>
                </List>
                <List>
                    <Links to="/returns">· Returns and refunds</Links>
                </List>
            </div>
            <div>
                <Section>Need help?</Section>
                <List>
                    <Links to="/contact-us">· Contact us</Links>
                </List>
            </div>
        </FooterContainer>
    );
};

const FooterContainer = styled.div`
    text-decoration: none;
    font-family: "Poppins", sans-serif;
    background-color:rgb(49 49 50);
    color: white;
    display: flex;
    padding: 10px;
    flex-direction: row;
    align-items: center;
    height:180px;
    justify-content: space-evenly;
`;
const Logo = styled.img`
    margin-left: 10px;
    color: #e0e0e0;
    width:200px;
`;
const List = styled.div`
margin:5px 0;
`;
const Section = styled.h1`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    padding-bottom:7px;
    border-bottom: 1px solid #FFFFFF;
`;
const Links = styled(Link)`
    text-decoration: none;
    color: #e0e0e0;
    &:hover {
        color: white;
    }
`;
export default Footer;