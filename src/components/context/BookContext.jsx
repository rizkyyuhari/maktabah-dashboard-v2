import { createContext, useEffect, useState } from "react";
import { getBookDetail, getCategories } from "../../network/lib/book-endpoint";
export const BookContext = createContext({
  bookData: null,
  setBookData: () => null,
  setTrigger: () => null,
  trigger: null,
  triggerBKDetail: null,
  setTriggerBk: () => null,
});

export const BookProvider = ({ children }) => {
  const [bookData, setBookData] = useState([]);
  const [bookDetail, setBookDetail] = useState([]);
  const [trigger, setTrigger] = useState({});
  const [triggerBKDetail, setTriggerBk] = useState({});
  const value = { bookData, setTrigger, bookDetail, setTriggerBk };

  useEffect(() => {
    getCategories(0, null, "").then((response) =>
      setBookData(response.data.result)
    );
  }, [trigger]);

  useEffect(() => {
    getBookDetail(0, null, "").then((response) => setBookDetail(response.data));
  }, [triggerBKDetail]);

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};
