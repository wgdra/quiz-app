import { useEffect, useState } from "react";
import { Col, Row } from "antd";
import FormTitle from "../../../components/form/FormTitle";
import FormSelect from "../../../components/form/FormSelect";
import BreadCrumb from "../../../components/ui/BreadCrumb";
import TabBar from "../../../components/ui/TabBar";
import ImgQuestion from "../../../assets/images/img-question.png";
import { getDataClass } from "../../../services/apiService";

const Synthetic = () => {
  const [data, setData] = useState({
    dataClass: [],
    dataSubject: [],
    dataChapter: [],
    dataQuiz: [],
  });

  const [state, setState] = useState({
    subject: { disabled: true, placeholder: "Vui lòng chọn lớp" },
    chapter: { disabled: true, placeholder: "Vui lòng chọn môn học" },
    quiz: { disabled: true, placeholder: "Vui lòng chọn chương học" },
  });

  const [dataBreadcrumb, setDataBreadcrumb] = useState([]);
  const [itemsQuestion, setItemsQuestion] = useState([]);

  // Handle data item
  const handleDataItem = (dataInput) => {
    console.log("items in create", dataInput);
  };

  const handleOptionSelect = (isOption) => {
    console.log("option", isOption);

    setDataBreadcrumb([...dataBreadcrumb, isOption.label]);

    if (isOption.option.class_name !== undefined) {
      setData((prev) => ({ ...prev, dataSubject: isOption.option.subjects }));
      setState((prev) => ({
        ...prev,
        subject: { disabled: false, placeholder: "Chọn môn học" },
      }));
    }

    if (isOption.option.subject_name !== undefined) {
      setData((prev) => ({ ...prev, dataChapter: isOption.option.chapter }));
      setState((prev) => ({
        ...prev,
        chapter: { disabled: false, placeholder: "Chọn chương học" },
      }));
    }
    if (isOption.option.chapter_name !== undefined) {
      setData((prev) => ({ ...prev, dataQuiz: isOption.option.quiz }));
      setState((prev) => ({
        ...prev,
        quiz: { disabled: false, placeholder: "Chọn câu hỏi" },
      }));
    }
    if (isOption.option.quiz_name !== undefined) {
      setItemsQuestion(isOption.option.questions);
    }
  };

  // Handle API
  useEffect(() => {
    fetchDataClass();
  }, []);

  const fetchDataClass = async () => {
    // Fetch data class
    let result = await getDataClass();

    if (result.status === 200) {
      setData((prev) => ({ ...prev, dataClass: result.data }));
    } else {
      console.log("Looix");
    }
  };

  const handleCreate = async () => {
    // const result = await createClass ( class_name: dataInput )
    // if(result===true){
    //   fetchDataClass()
    // }
  };

  // Handle API Questions
  const handleCreateQuestion = () => {
    console.log("handleUpdateQuestion");

    // const result = await createClass ( class_name: dataInput )
    // if(result===true){
    //   fetchDataClass()
    // }
  };

  const handleUpdateQuestion = (id) => {
    console.log("handleUpdateQuestion", id);

    // const result = await createClass ( class_name: dataInput )
    // if(result===true){
    //   fetchDataClass()
    // }
  };

  const handleDeleteQuestion = (id) => {
    console.log("handleUpdateQuestion", id);

    // const result = await createClass ( class_name: dataInput )
    // if(result===true){
    //   fetchDataClass()
    // }
  };

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
            <Row
              gutter={[16, 24]}
              justify="space-around"
              style={{ height: "95%", padding: 16 }}
            >
              <Col className="gutter-row" span={12}>
                <FormTitle
                  title="Danh sách lớp"
                  fontSize="1.1em"
                  background="#0092ff"
                  margin="0px 0px 8px 0px"
                />

                <FormSelect
                  items={data.dataClass}
                  placeholder="Lựa chọn lớp học"
                  handleDataItem={handleDataItem}
                  handleOptionSelect={handleOptionSelect}
                />
              </Col>
              <Col className="gutter-row" span={12}>
                <FormTitle
                  title="Danh sách môn học"
                  fontSize="1.1em"
                  background="#0092ff"
                  margin="0px 0px 8px 0px"
                />

                <FormSelect
                  items={data.dataSubject}
                  disabled={state.subject.disabled}
                  placeholder={state.subject.placeholder}
                  handleOptionSelect={handleOptionSelect}
                />
              </Col>
              <Col className="gutter-row" span={12}>
                <FormTitle
                  title="Danh sách chương"
                  fontSize="1.1em"
                  background="#0092ff"
                  margin="0px 0px 8px 0px"
                />

                <FormSelect
                  items={data.dataChapter}
                  disabled={state.chapter.disabled}
                  placeholder={state.chapter.placeholder}
                  handleOptionSelect={handleOptionSelect}
                />
              </Col>
              <Col className="gutter-row" span={12}>
                <FormTitle
                  title="Danh sách bài tập"
                  fontSize="1.1em"
                  background="#0092ff"
                  margin="0px 0px 8px 0px"
                />

                <FormSelect
                  items={data.dataQuiz}
                  disabled={state.quiz.disabled}
                  placeholder={state.quiz.placeholder}
                  handleOptionSelect={handleOptionSelect}
                />
              </Col>
            </Row>
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
            <div style={{ height: "95%", padding: 16 }}>
              <FormTitle
                title={
                  <BreadCrumb
                    itemColor="rgb(255 255 255 / 71%);"
                    lastItemColor="#ffff"
                    style={{
                      fontSize: "1.1em",
                      padding: "0px 16px",
                    }}
                    items={dataBreadcrumb.map((item) => {
                      return {
                        title: item,
                      };
                    })}
                  />
                }
                background="#0092ff"
                margin="0px 0px 8px 0px"
              />
              <TabBar
                items={itemsQuestion}
                setItems={setItemsQuestion}
                handleUpdateQuestion={handleUpdateQuestion}
              />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Synthetic;
