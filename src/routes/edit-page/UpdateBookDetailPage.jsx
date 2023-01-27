import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BookContext } from "../../components/context/BookContext";
import { updateBookDetail } from "../../network/lib/book-endpoint";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

const UpdateBookDetailPage = () => {
  const { state } = useLocation();
  const { kategori } = state;
  const defaultValue = {
    title: kategori.title,
    creator: kategori.creator,
    subject: kategori.subject,
    description: kategori.description,
    publisher: kategori.publisher,
    contributor: kategori.contributor,
    tanggal_terbit: kategori.tanggal_terbit,
    resource_identifier: kategori.resource_identifier,
    source: kategori.source,
    rights: kategori.rights,
    pages: kategori.pages,
    pk_categoryid: kategori.pk_categoryid,
    pk_subcategoryid: kategori.pk_subcategoryid,
    pk_bookdetail: kategori.pk_bookdetail,
  };
  const [formField, setFormField] = useState(defaultValue);
  const {
    title,
    creator,
    subject,
    description,
    publisher,
    contributor,
    tanggal_terbit,
    resource_identifier,
    source,
    rights,
    pages,
    pk_categoryid,
    pk_subcategoryid,
    pk_bookdetail,
  } = formField;

  const [errors, setErrors] = useState({});

  const { bookData, setTriggerBk } = useContext(BookContext);

  const filterBookData = [
    ...bookData.filter((book) => book.pk_categoryid === kategori.pk_categoryid),
    ...bookData.filter((book) => book.pk_categoryid !== kategori.pk_categoryid),
  ];

  const filteredCategory = filterBookData.filter(
    (cate) => cate.pk_categoryid === pk_categoryid
  );

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    if (name === "pk_categoryid") {
      setFormField({ ...formField, [name]: value, ["pk_subcategoryid"]: "" });
    } else {
      setFormField({ ...formField, [name]: value });
    }

    if (!!errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newError = {};
    if (!title || title === "") {
      newError.title = "Mohon Isi Judul Buku!";
    }
    if (!creator || creator === "") {
      newError.author = "Mohon Isi Pengarang Buku";
    }
    if (!pk_categoryid || pk_categoryid === "") {
      newError.pk_categoryid = "Mohon Pilih Kategori Buku";
    }
    return newError;
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    const formError = validateForm();
    if (Object.keys(formError).length > 0) {
      setErrors(formError);
    } else {
      (async () => {
        try {
          const response = await updateBookDetail({
            title,
            creator,
            subject,
            description,
            publisher,
            contributor,
            tanggal_terbit,
            resource_identifier,
            source,
            rights,
            pages,
            pk_categoryid,
            pk_subcategoryid,
            pk_bookdetail,
          });
          Swal.fire({
            icon: "success",
            text: "Berhasil Update Data",
          });
          setTriggerBk(response);
          setFormField(defaultValue);
        } catch (error) {
          Swal.fire({
            icon: "error",
            text: error.response.data.message,
          });
        } finally {
          e.target.reset();
        }
      })();
    }
  };
  console.log("pk categoryid 8", pk_categoryid);
  console.log("filtered category", filteredCategory);
  return (
    <>
      <Form onSubmit={onSubmitForm}>
        <Form.Group className="mb-3">
          <Form.Label>Kategori Buku</Form.Label>
          <Form.Select
            onChange={onChangeValue}
            name="pk_categoryid"
            isInvalid={errors.pk_categoryid}
          >
            {filterBookData.map((cate) => (
              <option key={cate.pk_categoryid} value={cate.pk_categoryid}>
                {cate.category_name}
              </option>
            ))}
          </Form.Select>
          <div style={{ color: "red" }}>{errors.pk_categoryid}</div>
        </Form.Group>

        {filteredCategory[0]?.sub_categories?.length > 0 && (
          <Form.Group className="mb-3">
            <Form.Label>Sub Kategori Buku</Form.Label>
            <Form.Select
              onChange={onChangeValue}
              name="pk_subcategoryid"
              isInvalid={!!errors.pk_subcategoryid}
            >
              {filteredCategory[0].sub_categories.map((sub) => (
                <option key={sub.pk_subcategoryid} value={sub.pk_subcategoryid}>
                  {sub.sub_category_name}
                </option>
              ))}
            </Form.Select>
            <div style={{ color: "red" }}>{errors.pk_subcategoryid}</div>
          </Form.Group>
        )}
        <Form.Group className="mb-3">
          <Form.Label className="red-start">Judul</Form.Label>
          <Form.Control
            type="text"
            placeholder="Judul Buku"
            onChange={onChangeValue}
            name="title"
            value={title}
            isInvalid={!!errors.title}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="red-start">Penulis</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nama Creator Buku"
            onChange={onChangeValue}
            name="creator"
            value={creator}
            isInvalid={!!errors.creator}
          />
          <Form.Control.Feedback type="invalid">
            {errors.creator}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="red-start">Topik / Subjek</Form.Label>
          <Form.Control
            type="text"
            placeholder="Topik atau Subject Buku"
            onChange={onChangeValue}
            name="subject"
            value={subject}
            isInvalid={!!errors.subject}
          />
          <Form.Control.Feedback type="invalid">
            {errors.subject}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="red-start">Deskripsi</Form.Label>
          <Form.Control
            type="text"
            placeholder="Deskripsi Buku"
            onChange={onChangeValue}
            value={description}
            name="description"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="red-start">Penerbit</Form.Label>
          <Form.Control
            type="text"
            placeholder="Topik atau Subject Buku"
            onChange={onChangeValue}
            name="publisher"
            value={publisher}
            isInvalid={!!errors.publisher}
          />
          <Form.Control.Feedback type="invalid">
            {errors.publisher}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Kontributor</Form.Label>
          <Form.Control
            type="text"
            placeholder="Kontributor Buku"
            onChange={onChangeValue}
            value={contributor}
            name="contributor"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="red-start">Tanggal Terbit</Form.Label>
          <Form.Control
            type="date"
            onChange={onChangeValue}
            value={tanggal_terbit}
            name="tanggal_terbit"
            isInvalid={!!errors.tanggal_terbit}
          />
          <Form.Control.Feedback type="invalid">
            {errors.tanggal_terbit}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="red-start">ISBN</Form.Label>
          <Form.Control
            type="text"
            placeholder="Topik atau Subject Buku"
            onChange={onChangeValue}
            name="resource_identifier"
            value={resource_identifier}
            isInvalid={!!errors.resource_identifier}
          />
          <Form.Control.Feedback type="invalid">
            {errors.resource_identifier}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="red-start">Sumber</Form.Label>
          <Form.Control
            type="text"
            placeholder="Sumber Buku"
            onChange={onChangeValue}
            name="source"
            value={source}
            isInvalid={!!errors.source}
          />
          <Form.Control.Feedback type="invalid">
            {errors.source}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="red-start">Rights</Form.Label>
          <Form.Select
            type="text"
            placeholder="Topik atau Subject Buku"
            onChange={onChangeValue}
            name="rights"
            value={rights}
            isInvalid={!!errors.rights}
          >
            <option>Pilih Stastus Hak Cipta Buku</option>
            <option value={true}>Sudah Di Wakaf-kan</option>
            <option value={false}>Belum Di Wakaf-kan</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.rights}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="red-start">Pages</Form.Label>
          <Form.Control
            type="number"
            placeholder="Jumlah Halaman Buku"
            onChange={onChangeValue}
            name="pages"
            value={pages}
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Update Book Detail
        </Button>
      </Form>
    </>
  );
};

export default UpdateBookDetailPage;
