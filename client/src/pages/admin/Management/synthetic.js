import { useEffect, useState } from "react";
import { Col, Row } from "antd";
import FormTitle from "../../../components/form/FormTitle";
import FormSelect from "../../../components/form/FormSelect";
import BreadCrumb from "../../../components/ui/BreadCrumb";
import TabBar from "../../../components/ui/TabBar";
import ImgQuestion from "../../../assets/images/img-question.png";

const Synthetic = () => {
  const [data, setData] = useState({
    dataClass: [],
    dataSubject: [],
    dataChapter: [],
    dataQuiz: [],
  });

  const [dataBreadcrumb, setDataBreadcrumb] = useState([]);
  const [itemsQuestion, setItemsQuestion] = useState([]);

  // Data test
  const itemsClass = [
    {
      id: 1,
      name: "Lớp 1",
    },
    {
      id: 2,
      name: "Lớp 2",
    },
  ];

  const itemsSubject = [
    {
      id: 1,
      name: "Môn Toán",
    },
    {
      id: 2,
      name: "Tiếng Việt",
    },
  ];

  const itemsChapter = [
    {
      id: 1,
      name: "Chương 1: CÁC SỐ ĐẾN 10. HÌNH VUÔNG, HÌNH TRÒN, HÌNH TAM GIÁC",
    },
    {
      id: 2,
      name: "Chương 2",
    },
  ];

  const itemsQuiz = [
    {
      id: 1,
      name: "Bài 1: Nhiều hơn, ít hơn",
      thumbnail: "",
      quiz: [
        {
          id: 1,
          question: "Câu 1: Các hình trong đáp án nào có nhiều đồ vật hơn ?",
          question_image: "",
          options: ["A", "B", "C", "D"],
          answer: 3,
          suggest: "Đại lượng nào còn thừa thì đại lượng đó nhiều hơn",
        },
        {
          id: 2,
          question: "Câu 2: Các hình trong đáp án nào có ít đồ vật hơn ?",
          question_image: "",
          options: ["hi", "he", "C", "D"],
          answer: 1,
          suggest:
            "Xếp tương ứng từng đồ vật với nhau, đại lượng nào thiếu thì đại lượng đó ít hơn.",
        },
        {
          id: 3,
          question: "Câu 3: Chọn đáp án có nhiều đồ vật hơn ?",
          question_image: "",
          options: ["A", "B", "C", "D"],
          answer: 3,
          suggest: "Xác định hình có nhiều đồ vật hơn.",
        },
        {
          id: 4,
          question: "Câu 4: Hình nào có ít con vật hơn ?",
          question_image: "",
          options: ["A", "B", "C", "D"],
          answer: 2,
          suggest: "Đếm số lượng con vật.",
        },
        {
          id: 5,
          question:
            "Câu 5: Đáp án nào dưới đây bằng với số quả dâu tây trong hình ?",
          question_image: "",
          options: ["A", "B", "C", "D"],
          answer: 4,
          suggest: "Đếm số quả dâu tây, rồi đếm số quả của từng đáp án.",
        },
      ],
    },
    {
      id: 2,
      name: "Bài 2: Hình vuông, hình tròn, hình tam giác",
      thumbnail: "",
      quiz: [
        {
          id: 1,
          question: "Câu 1: kkk ?",
          question_image: "",
          options: ["hi", "hu", "C", "D"],
          answer: 3,
          suggest: "Đại lượng nào còn thừa thì đại lượng đó nhiều hơn",
        },
        {
          id: 2,
          question: "Câu 2: Các hình trong đáp án nào có ít đồ vật hơn ?",
          question_image: "",
          options: ["A", "B", "C", "D"],
          answer: 1,
          suggest:
            "Xếp tương ứng từng đồ vật với nhau, đại lượng nào thiếu thì đại lượng đó ít hơn.",
        },
        {
          id: 3,
          question: "Câu 3: Chọn đáp án có nhiều đồ vật hơn ?",
          question_image: "",
          options: ["A", "B", "C", "D"],
          answer: 3,
          suggest: "Xác định hình có nhiều đồ vật hơn.",
        },
        {
          id: 4,
          question: "Câu 4: Hình nào có ít con vật hơn ?",
          question_image: "",
          options: ["A", "B", "C", "D"],
          answer: 2,
          suggest: "Đếm số lượng con vật.",
        },
        {
          id: 5,
          question:
            "Câu 5: Đáp án nào dưới đây bằng với số quả dâu tây trong hình ?",
          question_image: "",
          options: ["A", "B", "C", "D"],
          answer: 4,
          suggest: "Đếm số quả dâu tây, rồi đếm số quả của từng đáp án.",
        },
      ],
    },
    {
      id: 3,
      name: "Bài 3: Các số 1, 2, 3, 4, 5",
    },
    {
      id: 4,
      name: "Bài 4: Bé hơn, lớn hơn, bằng",
    },
    {
      id: 5,
      name: "Bài 5: Số 10",
    },
  ];

  // Handle data item
  const handleDataItem = (dataInput) => {
    console.log("items in create", dataInput);
  };

  const handleOptionSelect = (options) => {
    console.log("option", options);
    setDataBreadcrumb([...dataBreadcrumb, options.option.name]);
    if (options.option.quiz) {
      setItemsQuestion(options.option.quiz);
    }
  };

  // Handle API
  useEffect(() => {
    fetchDataClass();
    fetchDataSubject();
    fetchDataChapter();
    fetchDataQuiz();
  }, []);

  const fetchDataClass = async () => {
    // Fetch data class
    setData((prev) => ({ ...prev, dataClass: itemsClass }));
  };

  const fetchDataSubject = async () => {
    // Fetch data subject
    setData((prev) => ({ ...prev, dataSubject: itemsSubject }));
  };

  const fetchDataChapter = async () => {
    // Fetch data chapter
    setData((prev) => ({ ...prev, dataChapter: itemsChapter }));
  };

  const fetchDataQuiz = async () => {
    // Fetch data quiz
    setData((prev) => ({ ...prev, dataQuiz: itemsQuiz }));
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
                  handleOptionSelect={handleOptionSelect}
                />
              </Col>
              <Col className="gutter-row" span={12}>
                <FormTitle
                  title="Danh sách chương học"
                  fontSize="1.1em"
                  background="#0092ff"
                  margin="0px 0px 8px 0px"
                />

                <FormSelect
                  items={data.dataChapter}
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
