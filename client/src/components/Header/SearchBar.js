import { useState, useContext } from "react";
import styled from "styled-components";
import { BiSearchAlt2 } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";

const SearchBar = () => {
  let navigate = useNavigate();

  const { inputValue, setInputValue, setDisplaySearchBar } =
    useContext(GlobalContext);

  // getting all the items info from backend
  const [items, setItems] = useState();

  // fetch data from backend for titles of cameras and accessories. it will be stored in useState  as items in an array format(on keyup)
  const handleKeyUp = (e) => {
    fetch(`/api/products/name/${e.target.value}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItems(data.data);
      })
      .catch((err) => {
        console.log("fetch data error: " + err);
      });
  };

  // onClick it navigate to direct us to search items page (SearchResult) pressing the search button/icon or ENTER key
  const handleSelect = (value) => {
    setDisplaySearchBar(false);
    navigate(`/search-result/${value}`);
  };

  // onClick, it will direct us to search productDetails upon clicking the search item from the dropped down of the searchBar
  const handleSelectSuggestion = (suggestion) => {
    setDisplaySearchBar(false);
    navigate(`product/${suggestion._id}`);
  };

  return (
    <>
      {/* this is the input field and the search button */}
      <div>
        <label></label>
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSelect(e.target.value);
            }
            handleKeyUp(e);
          }}
        />
        <Button
          onClick={() => {
            handleSelect(inputValue);
          }}
        >
          <BiSearchAlt2 />
        </Button>

        {/* this is the dropdown of possible matching items on search. onClick it will take us to the page of the item selected. */}
        {items && (
          <Ul>
            {items.map((item) => {
              return (
                <Suggestion
                  key={item._id}
                  onClick={() => {
                    handleSelectSuggestion(item);
                  }}
                >
                  {" "}
                  <span>
                    {item.name.slice(
                      0,
                      item.name
                        .toLowerCase()
                        .indexOf(inputValue.toLowerCase()) + inputValue.length
                    )}
                    <Prediction>
                      {item.name.slice(
                        item.name
                          .toLowerCase()
                          .indexOf(inputValue.toLowerCase()) + inputValue.length
                      )}
                    </Prediction>
                  </span>
                </Suggestion>
              );
            })}
          </Ul>
        )}
      </div>
    </>
  );
};

const Prediction = styled.span`
  font-weight: bold;
`;

const Input = styled.input`
  border-radius: 5px;
  height: 17px;
  width: 300px;
  font-size: 20px;
  position: relative;
  padding: 10px;
  :focus {
    outline: none;
    border-color: #719ece;
    box-shadow: 0 0 10px #719ece;
  }
`;

const Button = styled.button`
  margin-left: 5px;
  background-color: #1079d5;
  color: white;
  border: none;
  height: 40px;
  width: 40px;
  border-radius: 5px;
  position: absolute;
`;

const Ul = styled.ul`
  display: column;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  padding: 10px;
  width: 365px;
  border-radius: 5px;
  position: absolute;
  height: 300px;
  background: #ffffff;
  color: #707072;
  overflow-y: auto;
`;

const Suggestion = styled.li`
  padding: 5px;
  border-radius: 5px;
  font-size: 14px;
  padding: 10px;
  :hover {
    cursor: pointer;
    background-color: #f5f5f7;
    color: #2279d2;
  }
`;

export default SearchBar;
