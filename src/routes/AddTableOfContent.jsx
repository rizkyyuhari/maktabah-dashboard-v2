import { useContext, useEffect } from "react";
import { useState } from "react";
import { Button, Form, Col, Container, Row } from "react-bootstrap";
import SubSubBab from "../components/SubSubBab";
import { headingIDTOF, subHeadingIDTOF } from "../utils";
import { BookContext } from "../components/context/BookContext";
import { addTblOfContent } from "../network/lib/book-endpoint";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const defaultValue = {
  page: 0,
  text: "",
  sub: [],
};

const AddTableOfContent = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(defaultValue);
  const [rootID, setRoodID] = useState("");
  const [anak, setAnak] = useState([]);
  const [currentId, setCurrentId] = useState(1);
  const [currentSubSubID, setCurrentSubSubID] = useState(1);
  const [cucu, setCucu] = useState([]);
  const [book, setBook] = useState("");
  const { bookDetail } = useContext(BookContext);

  useEffect(() => {
    setRoodID(headingIDTOF());
  }, []);

  const onDeleteSubSubBab = (parentId) => {
    const filtered = cucu.filter((cucu) => cucu.id !== parentId);
    setCucu(filtered);
  };

  const onChangeSubSubBab = (e, id) => {
    const { name, value } = e.target;
    const filteredCucu = cucu.filter(
      (cucu) =>
        parseInt(cucu.id.substring(0, 1)) === parseInt(id.substring(0, 1))
    );

    const temp = cucu.filter(
      (cucu) =>
        parseInt(cucu.id.substring(0, 1)) !== parseInt(id.substring(0, 1))
    );

    if (name === "page-subsubbab") {
      filteredCucu[0].page = parseInt(value);
    }
    if (name === "subsubbab") {
      filteredCucu[0].text = value;
    }
    const gabung = [...temp, ...filteredCucu].sort(
      (a, b) => parseInt(a.id.substring(0, 1)) - parseInt(b.id.substring(0, 1))
    );
    setCucu(gabung);
  };

  const onChangeSubBab = (e, id) => {
    console.log("onchangesubbab");
    const { name, value } = e.target;
    const filteredAnak = anak.filter((anak) => anak.id === id);

    const temp = anak.filter((anak) => anak.id !== id);
    if (name === "page-subbab") {
      filteredAnak[0].page = parseInt(value);
    }
    if (name === "subbab") {
      filteredAnak[0].text = value;
    }
    const gabung = [...temp, ...filteredAnak].sort((a, b) => a.id - b.id);
    setAnak(gabung);
  };

  const onChangeHeading = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  const filteredSubSubBab = (parentID) => {
    return cucu.filter((cucu) => cucu.parentId === parentID);
  };

  const onChangeBook = (e) => {
    setBook(e.target.value);
  };

  console.log("anak", anak);

  return (
    <Form
      style={{
        border: "1px solid red",
        padding: "10px",
        borderRadius: "10px",
      }}
      onSubmit={(e) => {
        e.preventDefault();
        const temp = anak;
        for (let i = 0; i < temp.length; i++) {
          const filt = cucu.filter((cucu) => temp[i].id === cucu.parentId);
          temp[i].sub = filt;
        }
        // setData(data, (data.sub = temp));
        console.log(data, (data.sub = temp));
        console.log("temp", JSON.stringify(temp));
        console.log("temp", temp);
        (async () => {
          try {
            const response = await addTblOfContent({
              pk_bookdetail: book,
              pk_tblofcontent: rootID,
              text: data.text,
              page: data.page,
              sub: JSON.stringify(temp),
            });
            Swal.fire({
              icon: "success",
              text: "Berhasil Menambahkan Table Of Content",
            }).finally((response) => navigate("/table-of-content"));
          } catch (error) {
            console.log(error);
          }
        })();
      }}
    >
      <Form.Group>
        <Form.Label>Buku</Form.Label>
        <Form.Select name="id_category_book" onChange={onChangeBook}>
          <option value="">Pilih Kategori</option>
          {bookDetail.map((book) => (
            <option key={book.pk_bookdetail} value={book.pk_bookdetail}>
              {book.title}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Heading</Form.Label>
        <Form.Control type="text" name="text" onChange={onChangeHeading} />
        <Form.Control
          autoComplete="off"
          placeholder="Isi Halaman Bab"
          className="w-25 mt-3"
          type="number"
          name="page"
          onChange={onChangeHeading}
        />
        <Button
          className="mt-3"
          onClick={(e) => {
            setAnak([
              ...anak,
              {
                parentID: rootID,
                id: currentId,
                text: "",
                page: parseInt(data.page),
                sub: [],
              },
            ]);
            setCurrentId(currentId + 1);
          }}
        >
          Tambah Sub Bab
        </Button>
      </Form.Group>

      {anak.length > 0 &&
        anak.map((datas) => (
          <Form.Group
            key={datas.id}
            className="mb-3 sub-bab"
            style={{
              border: "1px solid green",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <Form.Label>Sub Bab</Form.Label>
            <Form.Control
              name="subbab"
              type="text"
              placeholder="Isi Sub Bab"
              onChange={(e) => {
                onChangeSubBab(e, datas.id);
              }}
            />
            <Form.Control
              placeholder="Isi Halaman"
              className="w-25 mt-3"
              type="number"
              name="page-subbab"
              value={datas.page}
              onChange={(e) => {
                onChangeSubBab(e, datas.id);
              }}
            />
            <div className="mt-3">
              <Button
                className="me-3"
                onClick={(e) => {
                  e.preventDefault();
                  setCucu([
                    ...cucu,
                    {
                      parentId: datas.id,
                      id: `${currentSubSubID}-subsubbab`,
                      text: "",
                      page: datas.page,
                    },
                  ]);
                  setCurrentSubSubID(currentSubSubID + 1);
                }}
              >
                Tambah Sub - Sub Bab
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  const filteredAnak = anak.filter((anakan) => {
                    return anakan.id !== datas.id;
                  });
                  console.log(filteredAnak);
                  const filteredCucu = cucu.filter(
                    (cucuan) => cucuan.parentId !== datas.id
                  );
                  setAnak(filteredAnak);
                  setCucu(filteredCucu);
                }}
              >
                Hapus Sub Bab
              </Button>
            </div>

            <SubSubBab
              data={filteredSubSubBab(datas.id)}
              onChangeSubSubBab={onChangeSubSubBab}
              onDeleteHandler={onDeleteSubSubBab}
            />
          </Form.Group>
        ))}
      <Button type="submit">submit</Button>
    </Form>
  );
};

export default AddTableOfContent;
