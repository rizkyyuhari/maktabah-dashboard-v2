import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BookContext } from "../components/context/BookContext";
import { addCategories } from "../network/lib/book-endpoint";

const AddKategoriBookPage = () => {
  const [form, setForm] = useState({ category_name: "" });
  const [errors, setErrors] = useState({});
  const { setTrigger } = useContext(BookContext);
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
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
    const { category_name } = form;
    const newError = {};

    if (!category_name || category_name === "") {
      newError.category_name = "Mohon isi Nama Kategori Buku!";
    }

    return newError;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formError = validateForm();

    if (Object.keys(formError).length > 0) {
      setErrors(formError);
    } else {
      (async () => {
        try {
          const response = await addCategories({
            category_name: form.category_name,
          });
          Swal.fire({
            icon: "success",
            text: response.data.message,
          });
          setTrigger(response);
          navigate("/");
        } catch (error) {
          Swal.fire({
            icon: "error",
            text: error.response.data.message,
          });
        }
      })();
    }
  };

  return (
    <>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="category_name">
          <Form.Label>Kategori Buku</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan Kategori Buku"
            value={form.category_name}
            onChange={onChange}
            isInvalid={!!errors.category_name}
            name="category_name"
          />
          <Form.Control.Feedback type="invalid">
            {errors.category_name}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="success" type="submit">
          Tambah Kategori Buku
        </Button>
      </Form>
    </>
  );
};

export default AddKategoriBookPage;
