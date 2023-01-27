import { useContext, useEffect } from "react";
import { useState } from "react";
import { Button, Form, Col, Container, Row } from "react-bootstrap";
import SubSubBab from "../../components/SubSubBab";
import { headingIDTOF } from "../../utils";
import { BookContext } from "../../components/context/BookContext";
import { updateTableOfContent } from "../../network/lib/book-endpoint";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateTableOfContent = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { pk_tblofcontent, text, sub, page } = state;
  console.log("tblofconten", pk_tblofcontent);
  const defaultValue = {
    page: 0,
    text: text,
    sub: sub,
    page: page,
  };

  const convert = [].concat(...sub.map((sundul) => sundul.sub));

  const [data, setData] = useState(defaultValue);
  const [rootID, setRoodID] = useState("");
  const [anak, setAnak] = useState(sub);

  const filteredad = sub.map((anak) => anak.sub);

  const [currentId, setCurrentId] = useState(1);
  const [currentSubSubID, setCurrentSubSubID] = useState(1);
  const [cucu, setCucu] = useState(convert);
  console.log("cucu update", cucu);
  const [book, setBook] = useState("");
  const { bookDetail } = useContext(BookContext);

  useEffect(() => {
    setRoodID(headingIDTOF());
  }, []);

  const onChangeSubSubBab = (e, id) => {
    const { name, value } = e.target;
    const parsingID = parseInt(id.substring(0, id.indexOf("-")));

    const filteredCucu = cucu.filter(
      (cucu) =>
        parseInt(cucu.id.substring(0, cucu.id.indexOf("-"))) === parsingID
    );

    const temp = cucu.filter(
      (cucu) =>
        parseInt(cucu.id.substring(0, cucu.id.indexOf("-"))) !== parsingID
    );

    if (name === "page-subsubbab") {
      filteredCucu[0].page = value;
    }
    if (name === "subsubbab") {
      filteredCucu[0].text = value;
    }
    const gabung = [...temp, ...filteredCucu].sort(
      (a, b) =>
        parseInt(a.id.substring(0, a.id.indexOf("-"))) -
        parseInt(b.id.substring(0, b.id.indexOf("-")))
    );
    setCucu(gabung);
  };

  const onChangeSubBab = (e, id) => {
    const { name, value } = e.target;
    const filteredAnak = anak.filter((anak) => anak.id === id);

    const temp = anak.filter((anak) => anak.id !== id);
    if (name === "page-subbab") {
      filteredAnak[0].page = value;
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
  const onDeleteSubSubBab = (parentId) => {
    const filtered = cucu.filter((cucu) => cucu.id !== parentId);
    setCucu(filtered);
  };
  const filteredSubSubBab = (parentID) => {
    return cucu.filter((cucu) => cucu.parentId === parentID);
  };
  console.log("anak", anak);
  const onChangeBook = (e) => {
    setBook(e.target.value);
  };
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
            const response = await updateTableOfContent({
              pk_tblofcontent: pk_tblofcontent,
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
          {bookDetail.map((book) => (
            <option key={book.pk_bookdetail} value={book.pk_bookdetail}>
              {book.title}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Heading</Form.Label>
        <Form.Control
          value={data.text}
          type="text"
          name="text"
          onChange={onChangeHeading}
        />
        <Form.Control
          value={data.page}
          placeholder="Isi Heading"
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
                parentID: pk_tblofcontent,
                id: currentId + anak[anak.length - 1].id,
                text: "",
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
              value={datas.text}
              type="text"
              name="subbab"
              placeholder="Isi Sub Bab"
              onChange={(e) => {
                onChangeSubBab(e, datas.id);
              }}
            />
            <Form.Control
              value={datas.page}
              placeholder="Isi Halaman"
              className="w-25 mt-3"
              type="number"
              name="page-subbab"
              onChange={(e) => {
                onChangeSubBab(e, datas.id);
              }}
            />
            <div className="mt-3">
              <Button
                className="me-3"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("ke klik");
                  setCucu([
                    ...cucu,
                    {
                      parentId: datas.id,
                      id: `${
                        cucu.length > 0
                          ? currentSubSubID +
                            parseInt(
                              cucu[cucu.length - 1]?.id?.substring(
                                0,
                                cucu[cucu.length - 1].id.indexOf("-")
                              )
                            )
                          : currentSubSubID
                      }-subsubbab`,
                      text: "",
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
                  const filteredAnak = anak.filter(
                    (anakan) => parseInt(anakan.id) !== parseInt(datas.id)
                  );
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
export default UpdateTableOfContent;
