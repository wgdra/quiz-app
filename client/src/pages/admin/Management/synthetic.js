import { Col, Row } from "antd";
import FormTitle from "../../../components/form/FormTitle";
import FormSelect from "../../../components/form/FormSelect";

const Synthetic = () => {
  const itemsClass = [
    {
      id: 1,
      label: "Lớp 1",
    },
    {
      id: 2,
      label: "Lớp 2",
    },
  ];

  return (
    <>
      <Row
      // style={{
      //   boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      // }}
      >
        <Col
          span={12}
          style={{
            height: "80vh",
            maxHeight: "80vh",
          }}
        >
          <div
            style={{
              height: "100%",
              maxHeight: "100%",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              margin: 8,
            }}
          >
            <FormTitle
              title="Nhóm Quản Lý"
              fontSize="1.4em"
              background="#1677ff"
            />
            {/* <div style={{ height: "95%" }}> */}
            <Row
              gutter={[16, 24]}
              justify="space-around"
              //   align="middle"
              style={{ height: "95%", padding: 16 }}
            >
              <Col className="gutter-row" span={12}>
                <FormTitle
                  title="Danh sách lớp"
                  fontSize="1.1em"
                  background="#0092ff"
                  margin="0px 0px 8px 0px"
                />

                <FormSelect items={itemsClass} />
              </Col>
              <Col className="gutter-row" span={12}>
                <FormTitle
                  title="Danh sách môn học"
                  fontSize="1.1em"
                  background="#0092ff"
                  margin="0px 0px 8px 0px"
                />

                <FormSelect />
              </Col>
              <Col className="gutter-row" span={12}>
                <FormTitle
                  title="Danh sách chương học"
                  fontSize="1.1em"
                  background="#0092ff"
                  margin="0px 0px 8px 0px"
                />

                <FormSelect />
              </Col>
              <Col className="gutter-row" span={12}>
                <FormTitle
                  title="Danh sách bài tập"
                  fontSize="1.1em"
                  background="#0092ff"
                  margin="0px 0px 8px 0px"
                />

                <FormSelect />
              </Col>
            </Row>
            {/* </div> */}
          </div>
        </Col>
        <Col
          span={12}
          style={{
            height: "80vh",
            maxHeight: "80vh",
          }}
        >
          <div
            style={{
              height: "100%",
              maxHeight: "100%",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              margin: 8,
            }}
          >
            <FormTitle
              title="Thông Tin"
              fontSize="1.4em"
              background="#1677ff"
            />
            <h1>synthetic 2 </h1>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Synthetic;
