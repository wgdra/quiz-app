import { useEffect, useState } from "react";
import { Col, Row } from "antd";
import FormTitle from "../../../components/form/FormTitle";
import FormSelect from "../../../components/form/FormSelect";
import TabBar from "../../../components/ui/TabBar";
import ImgQuestion from "../../../assets/images/img-question.png";
import { getData } from "../../../services/apiService";
import { createSubject } from "../../../services/subjectApiService";
import { createChapter } from "../../../services/chapterApiService";

const Synthetic = () => {
  const [data, setData] = useState({
    dataClass: [],
    dataSubject: [],
    dataMethod: [],
    dataChapter: [],
    dataQuiz: [],
  });

  const [dataSelected, setDataSelected] = useState({
    class: "",
    subject: "",
    method: "",
    chapter: "",
  });

  console.log("dataSelected", dataSelected);
  const [state, setState] = useState({
    subject: { disabled: true, placeholder: "Vui lòng chọn lớp" },
    chapter: { disabled: true, placeholder: "Vui lòng chọn môn học" },
    quiz: { disabled: true, placeholder: "Vui lòng chọn chương học" },
  });

  const [itemsQuestion, setItemsQuestion] = useState([]);

  // Handle data item

  const handleOptionSelect = (isOption) => {
    console.log("option", isOption);

    if (isOption.option.class_name !== undefined) {
      setData((prev) => ({ ...prev, dataSubject: isOption.option.subjects }));
      setState((prev) => ({
        ...prev,
        subject: { disabled: false, placeholder: "Chọn môn học" },
      }));
      setDataSelected((prev) => ({
        ...prev,
        class: isOption.option.classId,
      }));
    }

    if (isOption.option.subject_name !== undefined) {
      isOption.option.methods.forEach((method) => {
        if (method.method === "Làm trắc nghiệm") {
          setData((prev) => ({
            ...prev,
            dataChapter: method.chapters,
          }));
          setState((prev) => ({
            ...prev,
            chapter: { disabled: false, placeholder: "Chọn chương học" },
          }));

          setDataSelected((prev) => ({
            ...prev,
            subject: isOption.option.subject_name,
            method: method.method,
          }));
        }
      });
    }
    if (isOption.option.chapter_name !== undefined) {
      setData((prev) => ({ ...prev, dataQuiz: isOption.option.quizes }));
      setState((prev) => ({
        ...prev,
        quiz: { disabled: false, placeholder: "Chọn câu hỏi" },
      }));
      setDataSelected((prev) => ({
        ...prev,
        chapter: isOption.option.chapter_name,
      }));
    }
    if (isOption.option.quiz_name !== undefined) {
      setItemsQuestion(isOption.option.questions);
    }
  };

  // Handle Api
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Fetch data
    let result = await getData();

    if (result.status === 200) {
      setData((prev) => ({ ...prev, dataClass: result.data }));
    } else {
      console.log("Looix");
    }
  };

  const handleCreate = async (data, name) => {
    console.log("data", data);
    switch (name) {
      case "subject":
        const resSubject = await createSubject({
          classId: [1, 2, 3, 4, 5],
          subject_name: data,
          methods: [
            {
              method: "Làm trắc nghiệm",
              method_img:
                "data:image/png;base64,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",
            },
          ],
        });
        if (resSubject.status !== 201) {
          return;
        }
        if (resSubject.status === 201) {
          fetchData();
        }
        break;

      case "chapter":
        console.log("chap");
        const resChapter = await createChapter({
          chapter_name: data,
          classId: dataSelected.class,
          subject: dataSelected.subject,
          method: dataSelected.method,
        });
        if (resChapter.status !== 201) {
          return;
        }
        if (resChapter.status === 201) {
          fetchData();
        }

        break;

      case "quiz":
        console.log("quiz");
        // console.log("ré", res);

        break;

      default:
        break;
    }
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
          span={24}
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
              // margin: 8,
            }}
          >
            <FormTitle
              title="Thông Tin Tổng Hợp"
              fontSize="1.4em"
              background="#1677ff"
            />
            <Row
              gutter={[16, 24]}
              // justify="space-around"
              style={{ padding: 8 }}
            >
              <Col className="gutter-row" span={6}>
                <FormTitle
                  title="Danh sách lớp"
                  fontSize="1.1em"
                  background="#0092ff"
                  margin="0px 0px 8px 0px"
                />

                <FormSelect
                  items={data.dataClass}
                  name="class"
                  placeholder="Lựa chọn lớp học"
                  handleOptionSelect={handleOptionSelect}
                />
              </Col>
              <Col className="gutter-row" span={6}>
                <FormTitle
                  title="Danh sách môn học"
                  fontSize="1.1em"
                  background="#0092ff"
                  margin="0px 0px 8px 0px"
                />

                <FormSelect
                  items={data.dataSubject}
                  name="subject"
                  disabled={state.subject.disabled}
                  placeholder={state.subject.placeholder}
                  handleCreate={handleCreate}
                  handleOptionSelect={handleOptionSelect}
                />
              </Col>
              <Col className="gutter-row" span={6}>
                <FormTitle
                  title="Danh sách chương"
                  fontSize="1.1em"
                  background="#0092ff"
                  margin="0px 0px 8px 0px"
                />

                <FormSelect
                  items={data.dataChapter}
                  name="chapter"
                  disabled={state.chapter.disabled}
                  handleCreate={handleCreate}
                  placeholder={state.chapter.placeholder}
                  handleOptionSelect={handleOptionSelect}
                />
              </Col>
              <Col className="gutter-row" span={6}>
                <FormTitle
                  title="Danh sách bài tập"
                  fontSize="1.1em"
                  background="#0092ff"
                  margin="0px 0px 8px 0px"
                />

                <FormSelect
                  items={data.dataQuiz}
                  name="quiz"
                  disabled={state.quiz.disabled}
                  handleCreate={handleCreate}
                  placeholder={state.quiz.placeholder}
                  handleOptionSelect={handleOptionSelect}
                />
              </Col>
            </Row>
            <Row style={{ padding: "0px 8px" }}>
              <TabBar
                style={{ width: "100%" }}
                items={itemsQuestion}
                setItems={setItemsQuestion}
                handleUpdateQuestion={handleUpdateQuestion}
              />
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Synthetic;
