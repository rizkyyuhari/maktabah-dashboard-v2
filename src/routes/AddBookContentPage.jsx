import { useState, useContext } from "react";
import { Button, Form } from "react-bootstrap";

import RichTextEditor from "../components/rich-editor/RichEditor";
import { BookContext } from "../components/context/BookContext";
import {
  addBookContent,
  getListOftblofContent,
} from "../network/lib/book-endpoint";
import Swal from "sweetalert2";
import { useEffect } from "react";

const defaultValue = {
  idBook: null,
};

const AddBookContentPage = () => {
  const [forms, setForms] = useState(defaultValue);
  const [errors, setErrors] = useState({});
  const [cateID, setCateID] = useState(null);
  const { bookData, bookDetail } = useContext(BookContext);
  const subCate = bookData.filter((cate) => cate.pk_categoryid === cateID);
  const [subCateID, setSubCateID] = useState(null);
  const [page, setPage] = useState(0);
  const [content, setContent] = useState("");
  const [tableofContent, setTblOfContent] = useState([]);
  const onTextEditorChange = (e) => {
    setContent(e);
  };

  const filteredBookDetail = bookDetail.filter(
    (book) =>
      book.pk_categoryid === cateID && book.pk_subcategoryid === subCateID
  );

  console.log("cateid", cateID);
  console.log("subcate", subCateID);
  console.log("idbook", forms.idBook);

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

  const onChangeCategory = (e) => {
    if (e.target.value === "null") {
      setCateID(null);
    } else {
      setCateID(e.target.value);
    }
    setForms(defaultValue);
    setSubCateID(null);
  };
  const onChangeSubCategory = (e) => {
    if (e.target.value === "null") {
      setSubCateID(null);
    } else {
      setSubCateID(e.target.value);
    }
    setForms(defaultValue);
  };

  const onChangePage = (e) => {
    setPage(e.target.value);
  };

  useEffect(() => {
    console.log("trigger nih bos");
    getListOftblofContent(forms.idBook).then((response) =>
      setTblOfContent(response.data)
    );
  }, [forms]);

  const onSubmit = (e) => {
    e.preventDefault();
    const formError = validateForm();
    if (Object.keys(formError).length > 0) {
      setErrors(formError);
    } else {
      (async () => {
        try {
          const response = await addBookContent({
            idBook: forms.idBook,
            content,
            page,
          });
          Swal.fire({
            icon: "success",
            text: response.data.message,
          });
        } catch (error) {
          console.log(error);
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
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Kategori Buku</Form.Label>
          <Form.Select onChange={onChangeCategory}>
            <option value="null">Pilih Kategori Buku</option>
            {bookData.map((cate) => (
              <option key={cate.pk_categoryid} value={cate.pk_categoryid}>
                {cate.category_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        {subCate[0]?.sub_categories?.length > 0 && (
          <Form.Group className="mb-3">
            <Form.Label>Sub Kategori Buku</Form.Label>
            <Form.Select onChange={onChangeSubCategory}>
              <option value="null">Pilih Sub Kategori Buku</option>
              {subCate[0].sub_categories.map((sub) => (
                <option key={sub.pk_subcategoryid} value={sub.pk_subcategoryid}>
                  {sub.sub_category_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Judul Buku</Form.Label>
          <Form.Select
            onChange={onChange}
            name="idBook"
            isInvalid={!!errors.idBook}
          >
            <option value="">Pilih salah satu</option>
            {filteredBookDetail.map((book) => (
              <option key={book.pk_bookdetail} value={book.pk_bookdetail}>
                {book.title}
              </option>
            ))}
          </Form.Select>
          <div style={{ color: "red" }}>{errors.idBook}</div>
        </Form.Group>

        {forms.idBook.length > 0 && (
          <Form.Group>
            <Form.Label>Table Of Content</Form.Label>
            <Form.Select
              onChange={(e) => {
                setPage(parseInt(e.target.value));
              }}
            >
              <option value="">Pilih salah satu</option>
              <option value="">lainya</option>
              {tableofContent.map((tbl) => (
                <option value={tbl.page}>{tbl.text}</option>
              ))}
            </Form.Select>
          </Form.Group>
        )}

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
          <RichTextEditor setValue={onTextEditorChange} />
        </Form.Group>

        <Button variant="success" type="submit">
          Tambah Konten Buku
        </Button>
      </Form>
    </>
  );
};

export default AddBookContentPage;
