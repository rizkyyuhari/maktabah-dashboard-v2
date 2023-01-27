import { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { BookContext } from "../components/context/BookContext";
import { addSubCategories } from "../network/lib/book-endpoint";

const defaultValue = {
  subKategori: "",
  id_category_book: "",
};
const AddSubKategoriBookPage = () => {
  const [forms, setForms] = useState(defaultValue);
  const [errors, setErrors] = useState({});
  const { bookData, setTrigger } = useContext(BookContext);
  console.log("bookdata", bookData);
  const onChange = (e) => {
    const { name, value } = e.target;
    setForms({
      ...forms,
      [name]: value,
    });

    if (!!errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const { subKategori, id_category_book } = forms;
    const newError = {};

    if (!id_category_book || id_category_book === "") {
      newError.id_category_book = "Mohon Pilih Kategori Buku!";
    }

    if (!subKategori || subKategori === "") {
      newError.subKategori = "Mohon Isi Nama Sub Kategori!";
    }

    return newError;
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    const formError = validateForm();
    if (Object.keys(formError).length > 0) {
      setErrors(formError);
    } else {
      (async () => {
        try {
          const response = await addSubCategories({
            sub_name: forms.subKategori,
            id_category_book: forms.id_category_book,
          });
          Swal.fire({
            icon: "success",
            text: response.data.message,
          });
          setTrigger(response);
        } catch (error) {
          Swal.fire({
            icon: "error",
            text: error.response.data.message,
            timer: 3000,
          });
        }
      })();
    }
  };
  return (
    <>
      <Form onSubmit={onHandleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Kategori Buku</Form.Label>
          <Form.Select
            onChange={onChange}
            name="id_category_book"
            isInvalid={!!errors.id_category_book}
          >
            <option value="">Pilih Kategori</option>
            {bookData.map((category) => (
              <option
                key={category.pk_categoryid}
                value={category.pk_categoryid}
              >
                {category.category_name}
              </option>
            ))}
          </Form.Select>
          <div style={{ color: "red" }}>{errors.id_category_book}</div>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Sub Kategori Buku</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan Sub Kategori Buku"
            value={forms.subKategori}
            onChange={onChange}
            name="subKategori"
            isInvalid={!!errors.subKategori}
          />
          <Form.Control.Feedback type="invalid">
            {errors.subKategori}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="success" type="submit">
          Tambah Sub Kategori
        </Button>
      </Form>
    </>
  );
};

export default AddSubKategoriBookPage;
