import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

const Test = () => {
  const [value, setValue] = useSearchParams();
  const handleOnClick = () => {
    Swal.fire(value.get("id"));
  };

  return (
    <>
      <div>coba</div>
      <button onClick={handleOnClick}>bangsat</button>
    </>
  );
};

export default Test;
