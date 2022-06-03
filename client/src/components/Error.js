import styled from "styled-components";


const Error = ({message})=>{
    return  <Wrapper>{message}</Wrapper> 
}

const Wrapper = styled.div`
  background:#fcf8e3;
  color:#8a6d3b;
  padding:20px;
  font-size:18px;
`;

export default Error