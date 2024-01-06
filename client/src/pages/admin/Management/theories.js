import { useEffect, useState } from "react";
import { Col, Row, message } from "antd";
import FormTitle from "../../../components/form/FormTitle";
import FormSelect from "../../../components/form/FormSelect";
import ManageTheories from "../../../components/ui/ManageTheories";
import { getData } from "../../../services/apiService";
import {
  createSubject,
  deleteSubject,
  updateSubject,
} from "../../../services/subjectApiService";
import {
  createChapter,
  deleteChapter,
  updateChapter,
} from "../../../services/chapterApiService";
import {
  createTheory,
  updateTheory,
  deleteTheory,
  createLesson,
  updateLesson,
  deleteLesson,
} from "../../../services/theoryApiService";

const Theories = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [data, setData] = useState({
    dataClass: [],
    dataSubject: [],
    dataMethod: [],
    dataChapter: [],
    dataTheories: [],
  });

  const [state, setState] = useState({
    subject: { disabled: true, placeholder: "Vui lòng chọn lớp" },
    chapter: { disabled: true, placeholder: "Vui lòng chọn môn học" },
    theory: { disabled: true, placeholder: "Vui lòng chọn chương học" },
  });

  const [dataSelected, setDataSelected] = useState({
    class: "",
    subjectId: "",
    subject: "",
    method: "",
    chapterId: "",
    chapter: "",
    theoryId: "",
  });

  const [itemsLesson, setItemsLesson] = useState([]);

  // Handle data item
  const handleDataItem = (dataInput) => {
    console.log("items in create", dataInput);
  };

  const handleOptionSelect = (isOption) => {
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
        if (method.method === "Ôn tập lý thuyết") {
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
            subjectId: isOption.option._id,
            subject: isOption.option.subject_name,
            method: method.method,
          }));
        }
      });
    }
    if (isOption.option.chapter_name !== undefined) {
      setData((prev) => ({ ...prev, dataTheories: isOption.option.theories }));
      setState((prev) => ({
        ...prev,
        theory: { disabled: false, placeholder: "Chọn bài học" },
      }));
      setDataSelected((prev) => ({
        ...prev,
        chapterId: isOption.option._id,
        chapter: isOption.option.chapter_name,
      }));
    }
    if (isOption.option.theory_name !== undefined) {
      setItemsLesson(isOption.option.lessons);
      setDataSelected((prev) => ({
        ...prev,
        theoryId: isOption.option._id,
      }));
    }
  };

  // Handle API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Fetch data class
    let res = await getData();

    if (res.status === 200) {
      setData((prev) => ({ ...prev, dataClass: res.data }));
    } else {
      messageApi.open({
        type: "error",
        content: "Lỗi lấy dữ liệu !!!",
      });
    }
  };

  // Handle API Modul
  const initData = () => {
    setData({
      dataClass: [],
      dataSubject: [],
      dataMethod: [],
      dataChapter: [],
      dataTheories: [],
    });
    setState({
      subject: { disabled: true, placeholder: "Vui lòng chọn lớp" },
      chapter: { disabled: true, placeholder: "Vui lòng chọn môn học" },
      theory: { disabled: true, placeholder: "Vui lòng chọn chương học" },
    });
  };

  const handleCreate = async (data, name) => {
    switch (name) {
      case "subject":
        const resSubject = await createSubject({
          classIds: [1, 2, 3, 4, 5],
          subject_name: data,
          methods: [
            {
              method: "Làm trắc nghiệm",
              method_img:
                "data:image/png;base64,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",
            },
            {
              method: "Ôn tập lý thuyết",
              method_img:
                "data:image/png;base64,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",
            },
            {
              method: "Làm bài thi",
              method_img:
                "data:image/png;base64,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",
            },
          ],
        });
        if (resSubject.status !== 201) {
          messageApi.open({
            type: "error",
            content: "Có lỗi !!!",
          });
          return;
        }
        if (resSubject.status === 201) {
          messageApi.open({
            type: "success",
            content: "Thêm mới thành công",
          });
          fetchData();
          initData();
        }
        break;

      case "chapter":
        const resChapter = await createChapter({
          chapter_name: data,
          classId: dataSelected.class,
          subject: dataSelected.subject,
          method: dataSelected.method,
        });
        if (resChapter.status !== 201) {
          messageApi.open({
            type: "error",
            content: "Có lỗi !!!",
          });
          return;
        }
        if (resChapter.status === 201) {
          messageApi.open({
            type: "success",
            content: "Thêm mới thành công",
          });
          fetchData();
          initData();
        }

        break;

      case "theory":
        const resTheory = await createTheory({
          theory_name: data,
          classId: dataSelected.class,
          subject: dataSelected.subject,
          chapter: dataSelected.chapter,
        });
        if (resTheory.status !== 201) {
          messageApi.open({
            type: "error",
            content: "Có lỗi !!!",
          });
          return;
        }
        if (resTheory.status === 201) {
          messageApi.open({
            type: "success",
            content: "Thêm mới thành công",
          });
          fetchData();
          initData();
        }

        break;

      default:
        break;
    }
  };

  const handleUpdate = async (data, name) => {
    switch (name) {
      case "subject":
        const resSubject = await updateSubject(dataSelected.subjectId, {
          classIds: [1, 2, 3, 4, 5],
          subject_name: data,
          methods: [
            {
              method: "Làm trắc nghiệm",
              method_img:
                "data:image/png;base64,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",
            },
            {
              method: "Ôn tập lý thuyết",
              method_img:
                "data:image/png;base64,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",
            },
            {
              method: "Làm bài thi",
              method_img:
                "data:image/png;base64,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",
            },
          ],
        });
        if (resSubject.status !== 200) {
          messageApi.open({
            type: "error",
            content: "Có lỗi !!!",
          });
          return;
        }
        if (resSubject.status === 200) {
          fetchData();
          messageApi.open({
            type: "success",
            content: "Chỉnh sửa thành công",
          });
          initData();
        }
        break;

      case "chapter":
        const resChapter = await updateChapter(dataSelected.chapterId, {
          chapter_name: data,
          classId: dataSelected.class,
          subject: dataSelected.subject,
          method: dataSelected.method,
        });
        if (resChapter.status !== 200) {
          messageApi.open({
            type: "error",
            content: "Có lỗi !!!",
          });
          return;
        }
        if (resChapter.status === 200) {
          messageApi.open({
            type: "success",
            content: "Chỉnh sửa thành công",
          });
          fetchData();
          initData();
        }

        break;

      case "theory":
        const resTheory = await updateTheory(dataSelected.theoryId, {
          theory_name: data,
          classId: dataSelected.class,
          subject: dataSelected.subject,
          chapter: dataSelected.chapter,
        });
        if (resTheory.status !== 200) {
          messageApi.open({
            type: "error",
            content: "Có lỗi !!!",
          });
          return;
        }
        if (resTheory.status === 200) {
          messageApi.open({
            type: "success",
            content: "Chỉnh sửa thành công",
          });
          fetchData();
          initData();
        }

        break;

      default:
        break;
    }
  };

  const handleDelete = async (name) => {
    switch (name) {
      case "subject":
        const resSubject = await deleteSubject(dataSelected.subjectId);
        if (resSubject.status !== 200) {
          messageApi.open({
            type: "error",
            content: "Có lỗi !!!",
          });
          return;
        }
        if (resSubject.status === 200) {
          fetchData();
          messageApi.open({
            type: "success",
            content: "Xóa thành công",
          });
          initData();
        }
        break;

      case "chapter":
        const resChapter = await deleteChapter(dataSelected.chapterId);
        if (resChapter.status !== 200) {
          messageApi.open({
            type: "error",
            content: "Có lỗi !!!",
          });
          return;
        }
        if (resChapter.status === 200) {
          messageApi.open({
            type: "success",
            content: "Xóa thành công",
          });
          fetchData();
          initData();
        }

        break;

      case "theory":
        const resTheory = await deleteTheory(dataSelected.theoryId);
        if (resTheory.status !== 200) {
          messageApi.open({
            type: "error",
            content: "Có lỗi !!!",
          });
          return;
        }
        if (resTheory.status === 200) {
          messageApi.open({
            type: "success",
            content: "Xóa thành công",
          });
          fetchData();
          initData();
        }

        break;

      default:
        break;
    }
  };

  // // Handle API Questions
  // const handleCreateQuestion = async (
  //   questionId,
  //   dataQuestion,
  //   options,
  //   answer
  // ) => {
  //   const res = await createQuestion(dataSelected.quizId, {
  //     questionId: questionId,
  //     question_name: dataQuestion.question_name,
  //     question_img:
  //       dataQuestion.question_img !== undefined
  //         ? dataQuestion.question_img.file.thumbUrl
  //         : "",
  //     options: options,
  //     suggest: dataQuestion.suggest,
  //     answer: answer,
  //   });
  //   if (res.status !== 201) {
  //     messageApi.open({
  //       type: "error",
  //       content: "Có lỗi !!!",
  //     });
  //     return;
  //   }
  //   if (res.status === 201) {
  //     messageApi.open({
  //       type: "success",
  //       content: "Thêm mới thành công",
  //     });
  //     fetchData();
  //   }
  // };

  // const handleUpdateQuestion = async (
  //   questionId,
  //   dataQuestion,
  //   options,
  //   answer
  // ) => {
  //   const res = await updateQuestion(dataSelected.quizId, {
  //     questionId: questionId,
  //     question_name: dataQuestion.question_name,
  //     question_img:
  //       dataQuestion.question_img !== undefined
  //         ? dataQuestion.question_img.file.thumbUrl
  //         : "",
  //     options: options,
  //     suggest: dataQuestion.suggest,
  //     answer: answer,
  //   });
  //   if (res.status !== 200) {
  //     messageApi.open({
  //       type: "error",
  //       content: "Có lỗi !!!",
  //     });
  //     return;
  //   }
  //   if (res.status === 200) {
  //     messageApi.open({
  //       type: "success",
  //       content: "Cập nhật thành công",
  //     });
  //     fetchData();
  //   }
  // };

  // const handleDeleteQuestion = async (questionId) => {
  //   const res = await deleteQuestion(dataSelected.quizId, questionId);
  //   if (res.status !== 200) {
  //     messageApi.open({
  //       type: "error",
  //       content: "Có lỗi !!!",
  //     });
  //     return;
  //   }
  //   if (res.status === 200) {
  //     messageApi.open({
  //       type: "success",
  //       content: "Xóa thành công",
  //     });
  //     fetchData();
  //   }
  // };

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={24}>
          <div
            style={{
              minHeight: "860px",
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
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
                  name="class"
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
                  name="subject"
                  items={data.dataSubject}
                  disabled={state.subject.disabled}
                  placeholder={state.subject.placeholder}
                  handleCreate={handleCreate}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
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
                  name="chapter"
                  items={data.dataChapter}
                  disabled={state.chapter.disabled}
                  placeholder={state.chapter.placeholder}
                  handleCreate={handleCreate}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
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
                  name="theory"
                  items={data.dataTheories}
                  disabled={state.theory.disabled}
                  placeholder={state.theory.placeholder}
                  handleCreate={handleCreate}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                  handleOptionSelect={handleOptionSelect}
                />
              </Col>
            </Row>
            <ManageTheories dataContent={itemsLesson} />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Theories;
