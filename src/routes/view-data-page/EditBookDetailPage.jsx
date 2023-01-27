import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import {
  deleteBook,
  getBookDetailPagination,
  getSubCategories,
} from "../../network/lib/book-endpoint";
import ReactPaginate from "react-paginate";
import "./coba.css";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEdit, AiFillDelete, AiOutlineSearch } from "react-icons/ai";
import Swal from "sweetalert2";
import SearchBar from "../../components/search-bar/SearchBar";
import { useContext } from "react";
import { BookContext } from "../../components/context/BookContext";

const EditBookDetailPage = () => {
  const [bookDetail, setBookDetail] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [resultDelete, setResultDelete] = useState({});
  const [search, setSearch] = useState("");
  const { setTriggerBk } = useContext(BookContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchKategoriList();
  }, [page, resultDelete, search]);

  const fetchKategoriList = async () => {
    try {
      const response = await getBookDetailPagination(page, limit, search);
      setBookDetail(response.data.result);
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

  const onSubmitHandler = (search) => {
    setPage(0);
    setSearch(search);
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteBook(id);
      console.log("berhasil");
      console.log(result.data);
      setResultDelete({ id });
    } catch (error) {
    } finally {
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  };
  console.log("bookdetail", bookDetail);
  return (
    <>
      <div className="mb-3 d-flex justify-content-between">
        <div className="w-25">
          <Button
            onClick={() => {
              navigate("/tambah/buku");
            }}
          >
            + Tambah Buku
          </Button>
        </div>

        <SearchBar placeholder="Cari Buku" onSubmitHandler={onSubmitHandler} />
      </div>
      {bookDetail.length !== 0 ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th>Creator</th>
                <th>Total Halaman</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookDetail.map((kategori, index) => (
                <tr key={kategori.pk_bookdetail}>
                  <td>{index + 1}</td>
                  <td>{kategori.title}</td>
                  <td>{kategori.creator}</td>
                  <td>{kategori.pages}</td>
                  <td>
                    {
                      <div className="red">
                        <Link
                          className="mr-3"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("/update/buku", {
                              state: {
                                kategori,
                              },
                            });
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
                              setTriggerBk(result);
                              if (result.isConfirmed) {
                                handleDelete(kategori.pk_bookdetail);
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

export default EditBookDetailPage;
