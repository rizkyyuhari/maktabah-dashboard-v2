import { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = ({ placeholder, onSubmitHandler }) => {
  const [search, setSearch] = useState("");
  return (
    <div className="w-25">
      <Form onSubmit={(e)=>{
        e.preventDefault()
        onSubmitHandler(search)
      }}>
        <InputGroup className="mb-3">
          <Button
            style={{ backgroundColor: "#fff", borderColor: "#ced4da" }}
            type="submit"
          >
            <AiOutlineSearch color="black" />
          </Button>
          <Form.Control
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder={placeholder}
          />
        </InputGroup>
      </Form>
    </div>
  );
};

export default SearchBar;
