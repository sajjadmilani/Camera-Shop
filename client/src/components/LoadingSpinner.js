import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

// this is the loading spinner that shows when the page is still loading
const LoadingSpinner = ({ top }) => {
    return (
        <LoadingContainer>
            <CircularProgress style={{ marginTop:`${top}vh`}} />
        </LoadingContainer>
    );
};

const LoadingContainer = styled.div`
    display: flex;
    margin: auto;
    padding:10px 10px;
    align-items: center;
    justify-content: center;
`;
export default LoadingSpinner;