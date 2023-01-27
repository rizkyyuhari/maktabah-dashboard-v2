import { useState } from "react";
import { useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { BookContext } from "../../components/context/BookContext";
import { updateSubKategori } from "../../network/lib/book-endpoint";

const UpdateSubKategoriPage = () => {
  const { bookData } = useContext(BookContext);
  const { state } = useLocation();
  const { category_name, sub_category_name, pk_subcategoryid } = state;

  const [subcate, setSubCate] = useState(sub_category_name);
  const filterBookData = [
    ...bookData.filter((book) => book.category_name === category_name),
    ...bookData.filter((book) => book.category_name !== category_name),
  ];
  const [categoryId, setCategoryId] = useState(filterBookData[0].pk_categoryid);
  const { setTrigger } = useContext(BookContext);
  const onChangeCategory = (e) => {
    setCategoryId(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("coba");
    try {
      const result = await updateSubKategori({
        newPk: categoryId,
        newSubName: subcate,
        currentPkSub: pk_subcategoryid,
      });
      setTrigger(result);
      Swal.fire({
        icon: "success",
        text: "Berhasil Merubah Nama Kategori Buku!",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Kategori Buku</Form.Label>
          <Form.Select name="id_category_book" onChange={onChangeCategory}>
            {filterBookData.map((book) => (
              <option value={book.pk_categoryid} key={book.pk_categoryid}>
                {book.category_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Sub Kategori Buku</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan Sub Kategori Buku"
            value={subcate}
            onChange={(e) => {
              setSubCate(e.target.value);
            }}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Ubah Sub Kategori Buku
        </Button>
      </Form>
    </>
  );
};

export default UpdateSubKategoriPage;
