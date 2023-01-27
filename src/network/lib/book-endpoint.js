import axiosClient from "../apiClient";

export function addCategories(data) {
  return axiosClient.post("/categories", data).then((response) => response);
}

export function addBookDetail(data) {
  return axiosClient.post("/book-detail", data).then((response) => response);
}

export function getCategories(page, limit, search) {
  return axiosClient
    .get(`/categories?page=${page}&limit=${limit}&search=${search}`)
    .then((response) => response);
}

export function addSubCategories(data) {
  return axiosClient.post("/sub-categories", data).then((response) => response);
}

export function getBookDetail() {
  return axiosClient.get("book-detail");
}

export function addBookContent(data) {
  return axiosClient.post("/book-content", data).then((response) => response);
}

export function getSubCategories(page, limit, search) {
  return axiosClient
    .get(`/sub-categories?page=${page}&limit=${limit}&search=${search}`)
    .then((response) => response);
}

export function getBookDetailPagination(page, limit, search) {
  return axiosClient
    .get(`/book-detail-pagination?page=${page}&limit=${limit}&search=${search}`)
    .then((response) => response);
}
export function getBookContentPagination(page, limit, search) {
  return axiosClient
    .get(
      `/book-content-pagination?page=${page}&limit=${limit}&search=${search}`
    )
    .then((response) => response);
}

export function deleteSubKategori(id) {
  return axiosClient.delete(`/sub-categories?id=${id}`);
}

export function deleteKategori(id) {
  return axiosClient.delete(`/categories?id=${id}`);
}

export function deleteBookContent(id, page) {
  return axiosClient.delete(`/book-content?id=${id}&page=${page}`);
}

export function updateKategoriBook(data) {
  return axiosClient.put(`/categories`, data).then((response) => response);
}

export function updateSubKategori(data) {
  return axiosClient.put(`/sub-categories`, data).then((response) => response);
}

export function updateBookDetail(data) {
  return axiosClient.put("/book-detail", data).then((response) => response);
}

export function updateBookContent(data) {
  return axiosClient.put("/konten-buku", data).then((response) => response);
}

export function addTblOfContent(data) {
  return axiosClient.post("/tableofcontent", data).then((response) => response);
}

export function getTableOfContent(page, limit) {
  return axiosClient
    .get(`/tableofcontent?page=${page}&limit=${limit}`)
    .then((response) => response);
}

export function updateTableOfContent(data) {
  return axiosClient.put("/tableofcontent", data).then((response) => response);
}

export function deleteTableOfContent(id) {
  return axiosClient.delete(`/tableofcontent?id=${id}`);
}

export function deleteBook(id) {
  return axiosClient.delete(`/book?id=${id}`);
}

export function getListOftblofContent(id) {
  return axiosClient.get(`/coba?id=${id}`).then((response) => response);
}
