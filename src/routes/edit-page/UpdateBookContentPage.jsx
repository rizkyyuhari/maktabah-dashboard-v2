import { useState, useContext } from "react";
import { Button, Form } from "react-bootstrap";

import RichTextEditor from "../../components/rich-editor/RichEditor";
import { BookContext } from "../../components/context/BookContext";
import { updateBookContent } from "../../network/lib/book-endpoint";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

const defaultValue = {
  idBook: null,
};

const UpdateBookContentPage = () => {
  const { state } = useLocation();
  const { kategori } = state;
  const [forms, setForms] = useState(defaultValue);
  const [errors, setErrors] = useState({});
  const { bookDetail } = useContext(BookContext);
  const [page, setPage] = useState(kategori.page);
  const [content, setContent] = useState("");

  const onTextEditorChange = (e) => {
    setContent(e);
  };

  const filteredBookDetail = bookDetail.filter(
    (book) => book.pk_bookdetail === kategori.pk_bookdetail
  );

  const onChange = (e) => {
    const { name, value } = e.target;
    setForms({ ...forms, [name]: value });

    if (!!errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const { idBook } = forms;
    const newError = {};
    if (!idBook || idBook === "") {
      newError.idBook = "Tolong Pilih Buku!";
    }
    return newError;
  };

  const onChangePage = (e) => {
    setPage(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("keteken ga");

      (async () => {
        try {
          const response = await updateBookContent({
            book_content: content,
            page: page,
            pk_bookdetail: kategori.pk_bookdetail,
          });
          Swal.fire({
            icon: "success",
            text: "success Update Konten Buku",
          });
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            text: error.response.data.message,
          });
        }
      })();
    
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Judul Buku</Form.Label>
          <Form.Select disabled>
            {filteredBookDetail.map((book) => (
              <option key={book.title}>{book.title}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Page</Form.Label>
          <Form.Control
            disabled
            type="number"
            min="0"
            value={page}
            onChange={onChangePage}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <RichTextEditor
            setValue={onTextEditorChange}
            value={kategori.book_content}
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Update Konten Buku
        </Button>
      </Form>
    </>
  );
};

export default UpdateBookContentPage;
