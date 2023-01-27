import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BookContext } from "../components/context/BookContext";
import { addBookDetail } from "../network/lib/book-endpoint";
import Swal from "sweetalert2";

const defaultValue = {
  title: "",
  creator: "",
  subject: "",
  description: "",
  publisher: "",
  contributor: "",
  tanggal_terbit: "",
  resource_identifier: "",
  source: "",
  rights: "",
  pages: "",
  pk_categoryid: "",
  pk_subcategoryid: "",
};

const AddBookDetailPage = () => {
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
  } = formField;
  const [errors, setErrors] = useState({});
  const { bookData, setTriggerBk } = useContext(BookContext);
  const filteredCategory = bookData.filter(
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
      newError.creator = "Mohon Isi Penulis Buku!";
    }
    if (!pk_categoryid || pk_categoryid === "") {
      newError.pk_categoryid = "Mohon Pilih Kategori Buku!";
    }

    if (!subject || subject === "") {
      newError.subject = "Mohon Pilih Topik Buku!";
    }

    if (!description || description === "") {
      newError.description = "Mohon Isi Deskripsi Buku!";
    }
    if (!publisher || publisher === "") {
      newError.publisher = "Mohon Isi Penerbit Buku!";
    }

    if (!tanggal_terbit || tanggal_terbit === "") {
      newError.tanggal_terbit = "Mohon Isi Tanggal Terbit Buku!";
    }
    if (!resource_identifier || resource_identifier === "") {
      newError.resource_identifier = "Mohon Isi ISBN Buku!";
    }
    if (!source || source === "") {
      newError.source = "Mohon Isi Sumber Buku!";
    }

    if (!rights || rights === "") {
      newError.rights = "Mohon Isi Hak Cipta Buku!";
    }
    return newError;
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    const formError = validateForm();
    if (Object.keys(formError).length > 0) {
      setErrors(formError);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      (async () => {
        try {
          const response = await addBookDetail({
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
          });
          Swal.fire({
            icon: "success",
            text: response.data.message,
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
            <option value="">Pilih Kategori Buku</option>
            {bookData.map((cate) => (
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
              <option value="">Pilih Sub Kategori Buku</option>
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
            isInvalid={!!errors.description}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description}
          </Form.Control.Feedback>
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
          Tambah Judul Buku
        </Button>
      </Form>
    </>
  );
};

export default AddBookDetailPage;
