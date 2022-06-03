import styled from "styled-components";

//the subheader shows specifically what page the user is on. The title of the page is in the subheader
const SubHeader = ({ title, subTitle, website }) => {
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <Wrapper>
      <Container>
        <LeftSide>
          <Title>{title}</Title>
          {/* the subtitle is to show what category or brand the product belongs to */}
          {subTitle && <SubTitle>{subTitle}</SubTitle>}
        </LeftSide>
        {/* this is showing a button to the website of the brand the product belongs to. the link opens in a new tab to ensure the user stays on our website */}
        {website && (
          <LinkContainer
            onClick={() => {
              openInNewTab(website);
            }}
          >
            <Website>Website</Website>
          </LinkContainer>
        )}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 15px 0;
  background-color: #ebebeb;
  font-family: "Poppins", sans-serif;
  display: flex;
  justify-content: space-between;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`

    width: 100%;
    max-width: 1200px;
    box-sizing: border-box;
    padding:30px;
    display: flex;
    justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 40px;
`;
const SubTitle = styled.h2`
  font-size: 20px;
  margin-top: 5px;
`;

const LinkContainer = styled.button`
  background-color: #c0c0c0;
  border: none;
  width: 120px;
  height: 40px;
  margin: 10px 60px 0 0;
  border-radius: 50px;
  font-size: 15px;
  &:hover {
    cursor: pointer;
  }
`;
const LeftSide = styled.div``;
const Website = styled.span``;
export default SubHeader;
