
import Pagination from 'rc-pagination';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalContext } from './GlobalContext';

// this component is used for the pagination. For example when the user is selecting a category that has more than 20 products, they can navigate to the second page
const MyPagination = ({ isPagination, total }) => {
  const { currentPage, setCurrentPage } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleChangePage = (page) => {
    setCurrentPage(page);
    navigate(`?page=${page}`);
    window.scrollTo(0, 0);
  };

  return <>{isPagination &&
    <PaginationHolder>
      <StyledPagination
        total={total}
        current={currentPage}
        defaultPageSize="20"
        pagesize="20"
        prevIcon="<"
        nextIcon=">"
        className={"pagination"}
        onChange={(current) => handleChangePage(current)}
      />
    </PaginationHolder>}
  </>;
};

const PaginationHolder = styled.div`
  display: flex;
`;

const StyledPagination = styled(Pagination)`
  display: flex;
  margin:10px auto;
  margin-bottom:40px;
  li:nth-of-type(${(props) => Number(props.current) + 1}){
    background:#2279d2;
    color:white;
  }
  li{
    border:1px solid #ccc;
    padding:10px;
    margin-left:10px;
  }
  li:hover{
    cursor: pointer;
  }
  li.rc-pagination-prev ,li.rc-pagination-options,  li.rc-pagination-next{
    border:none;
  }
`;

export default MyPagination;