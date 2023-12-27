import { useEffect, useState } from "react";
import { Col, Row } from "antd";
import FormTitle from "../../../components/form/FormTitle";
import FormSelect from "../../../components/form/FormSelect";
import { getData } from "../../../services/apiService";
import ManageTheories from "../../../components/ui/ManageTheories";

const Theories = () => {
  const [data, setData] = useState({
    dataClass: [],
    dataSubject: [],
    dataChapter: [],
    dataTheories: [],
  });

  const [state, setState] = useState({
    subject: { disabled: true, placeholder: "Vui lòng chọn lớp" },
    chapter: { disabled: true, placeholder: "Vui lòng chọn môn học" },
    theory: { disabled: true, placeholder: "Vui lòng chọn chương học" },
  });

  const [dataBreadcrumb, setDataBreadcrumb] = useState([]);
  const [itemsQuestion, setItemsQuestion] = useState([]);

  // Handle data item
  const handleDataItem = (dataInput) => {
    console.log("items in create", dataInput);
  };

  const handleOptionSelect = (isOption) => {
    setDataBreadcrumb([...dataBreadcrumb, isOption.label]);

    if (isOption.option.class_name !== undefined) {
      setData((prev) => ({ ...prev, dataSubject: isOption.option.subjects }));
      setState((prev) => ({
        ...prev,
        subject: { disabled: false, placeholder: "Chọn môn học" },
      }));
    }

    if (isOption.option.subject_name !== undefined) {
      isOption.option.methods.forEach((method) => {
        console.log("method", method);
        if (method.method === "Ôn tập lý thuyết") {
          setData((prev) => ({
            ...prev,
            dataChapter: method.chapters,
          }));
          setState((prev) => ({
            ...prev,
            chapter: { disabled: false, placeholder: "Chọn chương học" },
          }));
        }
      });
    }
    if (isOption.option.chapter_name !== undefined) {
      setData((prev) => ({ ...prev, dataTheories: isOption.option.theories }));
      setState((prev) => ({
        ...prev,
        theory: { disabled: false, placeholder: "Chọn câu hỏi" },
      }));
    }
    if (isOption.option.theory_name !== undefined) {
      setItemsQuestion(isOption.option.lessons);
    }
  };

  // Handle API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Fetch data class
    let result = await getData();

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
      <Row>
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
                  placeholder="Lựa chọn lớp học"
                  handleDataItem={handleDataItem}
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
                  disabled={state.subject.disabled}
                  placeholder={state.subject.placeholder}
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
                  disabled={state.chapter.disabled}
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
                  items={data.dataTheories}
                  disabled={state.theory.disabled}
                  placeholder={state.theory.placeholder}
                  handleOptionSelect={handleOptionSelect}
                />
              </Col>
            </Row>

            <ManageTheories dataContent={itemsQuestion} />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Theories;
