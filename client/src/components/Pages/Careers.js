import styled from "styled-components";
import SubHeader from "../Header/SubHeader"

const Careers = () => {
    return (
        <>
        <SubHeader title="Careers" />
            <Section>
                <Title>Join a team of passionate people! </Title>
                <P>
                    <Text>At CamShop, our employees are at the heart of our company. They are the asset that makes our expertise in the field of photography, video and printing recognized.</Text>
                    <Text>We are a growing company that encourages its employees to build a career with us. All CamShop employees have one thing in common: they have an innate ability to take care of their clients, they are passionate about photography and they have integrity.</Text>
                </P> 
                <P>
                    <Text>The values shared by our company and our employees are at the heart of our business relationships:</Text>
                
                <List>
                <Text>· Customer satisfaction</Text>
                <Text>· Innovation</Text>
                <Text>· Excellence</Text>
                <Text>· Determination</Text>
                <Text>· Passion</Text>
                <Text>· Team spirit</Text>
                <Text>· Integrity</Text>
                </List>
                </P> 
                <P>
                <Text>We are always looking for candidates for in-store positions such as:</Text>
                <List>
                <Text>· sales consultant</Text>
                <Text>· customer service agent</Text>
                <Text>· key administrative positions at our head office located in Montreal, Quebec</Text>
                </List>
                </P>
                <Text>Are you interested in joining a team of passionate people? Send us your resume now along with the position you are interested in to <Email>rh@camshop.com</Email></Text>
                <Text>Looking forward to meeting you!</Text>
            </Section>
        </>
    )
}
const Section = styled.div`
    text-align: left;
    margin: 20px;
    max-width: 1200px;
    margin:50px auto;
    margin-bottom: 30px;
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
const List = styled.ul`
    margin: 30px;
`
const P = styled.p`
    margin-bottom: 30px;
`
export default Careers