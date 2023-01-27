import { Form, Col, Button } from "react-bootstrap";
const SubSubBab = ({ data, onChangeSubSubBab, onDeleteHandler }) => {
  return (
    <>
      {data.length > 0 &&
        data.map((data) => (
          <Form.Group
            key={data.id}
            className="mt-3 sub-bab"
            style={{
              border: "1px solid blue",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <Col>
              <Form.Label>Sub - Sub Bab</Form.Label>
              <Form.Control
                value={data.text}
                name="subsubbab"
                type="text"
                placeholder="Isi Sub - Sub Bab"
                onChange={(e) => {
                  onChangeSubSubBab(e, data.id);
                }}
              />
              <Form.Control
                value={data.page}
                placeholder="Isi Halaman"
                className="w-25 mt-3"
                type="number"
                name="page-subsubbab"
                onChange={(e) => {
                  onChangeSubSubBab(e, data.id);
                }}
              />
              <Button
                onClick={() => {
                  onDeleteHandler(data.id);
                }}
                className="mt-3"
                variant="danger"
              >
                Hapus Sub Sub Bab
              </Button>
            </Col>
          </Form.Group>
        ))}
    </>
  );
};
export default SubSubBab;
