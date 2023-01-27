import { useContext } from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { BookContext } from "../../components/context/BookContext";
import { updateKategoriBook } from "../../network/lib/book-endpoint";

const UpdateKategoriPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { kategori, id } = state;
  const { setTrigger } = useContext(BookContext);
  const [kategoriname, setKategoriName] = useState(kategori);
  const onChangeHandler = (e) => {
    setKategoriName(e.target.value);
  };

  return (
    <>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const result = await updateKategoriBook({
              newCategoryName: kategoriname,
              id: id,
            });
            setTrigger(result);
            Swal.fire({
              icon: "success",
              text: "Berhasil Merubah Nama Kategori Buku!",
            }).then((response) => navigate("/"));
          } catch (error) {
            if (error.response.status === 409) {
              Swal.fire({
                icon: "error",
                text: error.response.data.message,
              });
            }
          }
        }}
      >
        <Form.Group className="mb-3" controlId="category_name">
          <Form.Label>Kategori Buku</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan Kategori Buku"
            name="category_name"
            value={kategoriname}
            onChange={onChangeHandler}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Ubah Kategori Buku
        </Button>
      </Form>
    </>
  );
};

export default UpdateKategoriPage;
