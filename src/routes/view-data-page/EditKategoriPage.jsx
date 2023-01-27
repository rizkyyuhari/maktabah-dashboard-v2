import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { deleteKategori, getCategories } from "../../network/lib/book-endpoint";
import ReactPaginate from "react-paginate";
import "./coba.css";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import SearchBar from "../../components/search-bar/SearchBar";
import { useContext } from "react";
import { BookContext } from "../../components/context/BookContext";

const EditKategoriPage = () => {
  const [kategori, setKategori] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [resultDelete, setResultDelete] = useState({});
  const [search, setSearch] = useState("");

  const { setTrigger } = useContext(BookContext);
  console.table(kategori);
  const navigate = useNavigate();

  useEffect(() => {
    fetchKategoriList();
  }, [page, resultDelete, search]);

  const fetchKategoriList = async () => {
    try {
      const response = await getCategories(page, limit, search);
      setKategori(response.data.result);
      setPage(response.data.page);
      setRows(response.data.totalRows);
      setPages(response.data.totalPage);
    } catch (error) {
      console.log(error);
    }
  };

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const handleDelete = async (id, name) => {
    try {
      const result = await deleteKategori(id);
      setResultDelete({ id });
      setTrigger(result);
    } catch (error) {
    } finally {
      Swal.fire("Deleted!", `${name} has been deleted.`, "success");
    }
  };

  const onChangeSearch = (search) => {
    setPage(0);
    setSearch(search);
  };
  return (
    <>
      <div className="mb-3 d-flex justify-content-between">
        <div className="w-25">
          <Button
            onClick={() => {
              navigate("/tambah/kategori-buku");
            }}
          >
            + Tambah Kategori
          </Button>
        </div>

        <SearchBar
          placeholder="Cari Kategori Buku"
          onSubmitHandler={onChangeSearch}
        />
      </div>
      {kategori.length !== 0 ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Kategori Buku</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {kategori.map((kategori, index) => (
                <tr key={kategori.pk_categoryid}>
                  <td>{index + 1}</td>
                  <td>{kategori.category_name}</td>
                  <td>
                    {
                      <div className="red">
                        <Link
                          className="mr-3"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(
                              `/update/kategori-buku?id=${kategori.pk_categoryid}`,
                              {
                                state: {
                                  kategori: kategori.category_name,
                                  id: kategori.pk_categoryid,
                                },
                              }
                            );
                          }}
                        >
                          {<AiFillEdit color="rgb(255,165,0)" size={"25px"} />}
                        </Link>
                        <Link
                          onClick={() => {
                            Swal.fire({
                              title: "Are you sure?",
                              text: "You won't be able to revert this!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                console.log("delete berhasil");
                                handleDelete(
                                  kategori.pk_categoryid,
                                  kategori.category_name
                                );
                              }
                            });
                          }}
                        >
                          {<AiFillDelete color="#dc3545" size={"25px"} />}
                        </Link>
                      </div>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <p>
            Total Rows : {rows} Page: {rows ? page + 1 : 0} of {pages}
          </p>

          <nav
            className="d-flex justify-content-center"
            role="navigation"
            aria-label="pagination"
            key={rows}
          >
            <ReactPaginate
              previousLabel={"< prev"}
              nextLabel={"Next >"}
              pageCount={pages}
              onPageChange={changePage}
              containerClassName={"pagination"}
              pageLinkClassName={"page-link"}
              previousLinkClassName={"page-link"}
              previousClassName={"page-item"}
              nextLinkClassName={"page-link"}
              nextClassName={"page-item"}
              activeClassName={"active"}
            />
          </nav>
        </>
      ) : (
        "Tidak ada data yang bisa ditampilkan"
      )}
    </>
  );
};

export default EditKategoriPage;

// import Select from "react-select";
// import { useState } from "react";
// import { useEffect } from "react";
// import { getBookDetail } from "../../network/lib/book-endpoint";

// const optionList = [
//   { value: "red", label: "Red" },
//   { value: "green", label: "Green" },
//   { value: "yellow", label: "Yellow" },
//   { value: "blue", label: "Blue" },
//   { value: "white", label: "White" },
// ];
// const EditKategoriPage = () => {
//   const [result, setResult] = useState([]);
//   const [selectedOptions, setSelectedOptions] = useState();
//   function handleSelect(data) {
//     setSelectedOptions(data);
//   }

//   console.log("selected", selectedOptions);
//   console.log(result);
//   useEffect(() => {
//     getBookDetail().then((response) => setResult(response.data));
//   }, []);
//   return (
//     <>
//       <h1>asdfsa</h1>
//       <Select
//         options={optionList}
//         value={selectedOptions}
//         onChange={handleSelect}
//         isSearchable={true}
//       />
//     </>
//   );
// };

// export default EditKategoriPage;
