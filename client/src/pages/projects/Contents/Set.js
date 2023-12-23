import { useState } from "react";
import { Row, Col, Space } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { SwapLeftOutlined } from "@ant-design/icons";
import BoxContentChapter from "../../../components/ui/BoxContentChapter";
import BoxContentExam from "../../../components/ui/BoxContentExam";
import ModalCustomize from "../../../components/ui/Modal";
import ButtonGroup from "../../../components/ui/ButtonGroup";

const Set = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state.data;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataModal, setDataModal] = useState();

  // Handle

  // Set
  // Chapter
  const handleClickChapter = (item) => {
    if (item.questions) {
      navigate("/project/quiz", {
        state: {
          dataQuiz: item,
        },
      });
    }
    if (item.lessons) {
      navigate("/project/theory", {
        state: {
          dataChapter: data.chapters,
          dataTheory: item,
        },
      });
    }
  };

  // Test
  const handleClickTest = (item) => {
    setIsModalOpen(true);
    setDataModal(item);
  };

  // Modal Test
  const ChildrenModalTest = () => {
    const noteList = [
      "Ôn tập chắc các kiến thức",
      "Căn chỉnh thời gian làm bài hợp lý",
      "Tắt các thiết bị như điện thoại để tập trung",
      "Tránh gian lận. Ví dụ: chuyển sang trang Web khác,...",
    ];

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: "1.3em",
          fontWeight: "bold",
        }}
      >
        <span>
          Đề:{" "}
          <span style={{ fontWeight: "normal" }}>{dataModal?.test_name}</span>
        </span>
        <span>
          Nội dung:{" "}
          <span style={{ fontWeight: "normal" }}>{dataModal?.description}</span>
        </span>
        <span style={{ textAlign: "center", marginBottom: 16 }}>
          Để làm bài hiệu quả, em hãy
        </span>
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          {noteList.map((note, index) => {
            return (
              <Col span={12}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: 70,
                    border: "2px solid #999999",
                    borderRadius: 5,
                    marginBottom: 26,
                  }}
                >
                  <span
                    style={{
                      fontSize: "2em",
                      background: "#F1F1F1",
                      padding: "13px 30px",
                      marginRight: 16,
                      borderRight: "2px solid #999999",
                      borderTopRightRadius: 50,
                    }}
                  >
                    {index + 1}
                  </span>
                  <span
                    style={{
                      fontSize: "1em",
                      fontWeight: "normal",
                      paddingRight: 8,
                    }}
                  >
                    {note}
                  </span>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  };

  const handleClickStartTest = (e) => {
    if (e.target.innerText === "Quay lại") {
      setIsModalOpen(false);
      return;
    }
    if (e.target.innerText === "Bắt đầu làm bài") {
      setIsModalOpen(false);
      navigate("/project/test", {
        state: {
          dataTest: dataModal,
        },
      });
    }
  };

  const FooterModalTest = () => {
    return (
      <ButtonGroup
        size="large"
        items={[
          {
            label: "Quay lại",
            tokenCustomize: {
              colorPrimaryHover: "#999999",
              colorPrimaryActive: "#999999",
            },
          },
          {
            label: "Bắt đầu làm bài",
            tokenCustomize: {
              colorPrimaryHover: "#EC8E00",
              colorPrimaryActive: "#EC8E00",
            },
            buttonDesign: {
              defaultColor: "#8AC53E",
              defaultBorderColor: "#8AC53E",
            },
          },
        ]}
        onClick={handleClickStartTest}
      />
    );
  };

  return (
    <>
      <Space>
        <a
          href="javascript:window.history.back()"
          style={{ fontSize: "3em", color: "#6051f8", marginRight: 16 }}
        >
          <SwapLeftOutlined />
        </a>
        <h1 style={{ color: "#44A500" }}>
          {data.method} {location.state.subject_name} -{" "}
          {location.state.class_name}
        </h1>
      </Space>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        {data.chapters ? (
          <BoxContentChapter
            dataChapter={data.chapters}
            handleClickChapter={handleClickChapter}
          />
        ) : (
          <BoxContentExam
            dataSet={data.set}
            handleClickStartTest={handleClickTest}
          />
        )}
        <ModalCustomize
          open={isModalOpen}
          title="Em hãy đọc kỹ phần dưới đây"
          width={700}
          modalDesign={{
            titleFontSize: 26,
            titleColor: "#44A500",
          }}
          closable={false}
          footer={<FooterModalTest />}
        >
          <ChildrenModalTest />
        </ModalCustomize>
      </Row>
    </>
  );
};

export default Set;
