import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Col, Row } from "antd";
import MenuSubject from "../../../components/ui/MenuSubject";
import "../../../assets/styles/App.css";

const Method = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dataClass = location.state.data;

  console.log("dataaaaa", dataClass);
  const [subjectSelect, setSubjectSelect] = useState(dataClass.subjects[0]);
  console.log("subjectSelect", subjectSelect);

  const handleClickBoxMethod = (data) => {
    navigate("/project/chapter", {
      state: {
        class_name: dataClass.class_name,
        subject_name: subjectSelect.subject_name,
        data: data,
      },
    });
  };

  return (
    <>
      <h1 style={{ color: "#e29000" }}>{dataClass.class_name}</h1>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col className="gutter-row" span={6}>
          <MenuSubject
            setSubjectSelect={setSubjectSelect}
            dataSubject={dataClass.subjects}
          />
        </Col>
        <Col className="gutter-row" span={18}>
          <span
            style={{
              fontSize: "1.3em",
              fontWeight: "bold",
              display: "block",
              marginBottom: 20,
            }}
          >
            Bạn đã chọn {subjectSelect?.subject_name}. Chọn phương thức bạn muốn
            ôn luyện.
          </span>
          <div style={{ display: "flex" }}>
            {subjectSelect?.methods.map((item, index) => {
              return (
                <div
                  className="box-method"
                  key={index}
                  style={{
                    width: 186,
                    height: 166,
                    fontSize: "1.2em",
                    fontWeight: "bold",
                    textAlign: "center",
                    border: "2px solid #cfcfcf",
                    borderRadius: "5px",
                    padding: 16,
                    marginRight: 16,
                    cursor: "pointer",
                  }}
                  onClick={() => handleClickBoxMethod(item)}
                >
                  <img
                    src={item.method_img}
                    style={{ width: 60, height: 60, margin: "10px 0px" }}
                  />
                  <p>{item.method}</p>
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
    </>
  );
};
export default Method;
