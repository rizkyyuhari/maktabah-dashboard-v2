import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import AddKategoriBookPage from "./routes/AddKategoriBookPage";
import AddSubKategoriBookPage from "./routes/AddSubKategoriBookPage";
import AddBookDetailPage from "./routes/AddBookDetailPage";
import AddBookContentPage from "./routes/AddBookContentPage";
import EditKategoriPage from "./routes/view-data-page/EditKategoriPage";
import EditSubKategori from "./routes/view-data-page/EditSubKategori";
import EditBookDetailPage from "./routes/view-data-page/EditBookDetailPage";
import EditBookContentPage from "./routes/view-data-page/EditBookContentPage";
import UpdateKategoriPage from "./routes/edit-page/UpdateKategoriPage";
import UpdateSubKategoriPage from "./routes/edit-page/UpdateSubKategoriPage";
import UpdateBookDetailPage from "./routes/edit-page/UpdateBookDetailPage";
import UpdateBookContentPage from "./routes/edit-page/UpdateBookContentPage";
import AddTableOfContent from "./routes/AddTableOfContent";
import EditTableOfContent from "./routes/view-data-page/EditTableOfContent";
import UpdateTableOfContent from "./routes/edit-page/UpdateTableOfContent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Sidebar />}>
        <Route path="/book-detail" element={<EditBookDetailPage />} />
        <Route index element={<EditKategoriPage />} />
        <Route path="/sub-kategori" element={<EditSubKategori />} />
        <Route path="tambah/kategori-buku" element={<AddKategoriBookPage />} />
        <Route
          path="tambah/sub-kategori-buku"
          element={<AddSubKategoriBookPage />}
        />
        <Route path="/book-content" element={<EditBookContentPage />} />
        <Route path="tambah/buku" element={<AddBookDetailPage />} />
        <Route path="tambah/konten-buku" element={<AddBookContentPage />} />
        <Route path="/update/kategori-buku" element={<UpdateKategoriPage />} />
        <Route
          path="/update/sub-kategori-buku"
          element={<UpdateSubKategoriPage />}
        />
        <Route path="table-of-content" element={<EditTableOfContent />} />
        <Route path="/update/buku" element={<UpdateBookDetailPage />} />
        <Route path="/update/konten-buku" element={<UpdateBookContentPage />} />
        <Route path="tambah/table-of-content" element={<AddTableOfContent />} />

        <Route
          path="update/table-of-content"
          element={<UpdateTableOfContent />}
        />
      </Route>
    </Routes>
  );
}



export default App;
