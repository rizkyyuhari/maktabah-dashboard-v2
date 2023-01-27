import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import {
  deleteSubKategori,
  deleteTableOfContent,
  getSubCategories,
  getTableOfContent,
} from "../../network/lib/book-endpoint";
import ReactPaginate from "react-paginate";
import "./coba.css";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEdit, AiFillDelete, AiOutlineSearch } from "react-icons/ai";
import Swal from "sweetalert2";
import SearchBar from "../../components/search-bar/SearchBar";
import { useContext } from "react";
import { BookContext } from "../../components/context/BookContext";

const EditTableOfContent = () => {
  const [kategori, setKategori] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [resultDelete, setResultDelete] = useState({});
  const [search, setSearch] = useState("");
  const { setTrigger } = useContext(BookContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchKategoriList();
  }, [page, resultDelete, search]);

  const fetchKategoriList = async () => {
    try {
      const response = await getTableOfContent(page, limit);
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

  const onSubmitHandler = (search) => {
    setPage(0);
    setSearch(search);
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteTableOfContent(id);
      setResultDelete({ id });
    } catch (error) {
    } finally {
      Swal.fire("Deleted!", "Berhasil Hapus Bab", "success");
    }
  };
  console.log("kattegoru", kategori);
  const onChangeSearch = (e) => {
    setPage(0);
    setSearch(e.target.value);
  };
  return (
    <>
      <div className="mb-3 d-flex justify-content-between">
        <div className="w-25">
          <Button
            onClick={() => {
              navigate("/tambah/table-of-content");
            }}
          >
            + Tambah Table Of Content
          </Button>
        </div>
      </div>
      {kategori.length !== 0 ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Buku</th>
                <th>Bab</th>
                <th>Halaman</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {kategori.map((kategori, index) => {
                return (
                  <tr key={kategori.pk_subcategoryid}>
                    <td>{index + 1}</td>
                    <td>{kategori.title}</td>
                    <td>{kategori.text}</td>
                    <td>{kategori.page}</td>
                    <td>
                      {
                        <div className="red">
                          <Link
                            className="mr-3"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate("/update/table-of-content", {
                                state: {
                                  pk_tblofcontent: kategori.pk_tblofcontent,
                                  text: kategori.text,
                                  sub: kategori.sub,
                                  page: kategori.page,
                                },
                              });
                            }}
                          >
                            {
                              <AiFillEdit
                                color="rgb(255,165,0)"
                                size={"25px"}
                              />
                            }
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
                                setTrigger(result);
                                if (result.isConfirmed) {
                                  handleDelete(
                                    kategori.pk_tblofcontent.toString()
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
                );
              })}
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

export default EditTableOfContent;
