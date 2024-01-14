const BoxContentTheory = ({ ...props }) => {
  const { dataContent } = props;
  return (
    <div
      style={{
        background: "#ffffff",
        minHeight: 720,
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        padding: "12px 32px",
      }}
    >
      {dataContent &&
        dataContent.length > 0 &&
        dataContent.map((content, index) => {
          return (
            <div key={index} style={{ marginBottom: 30 }}>
              <h2
                style={{
                  margin: "0px 0px 16px 0px",
                  color: "#EC8E00",
                  textDecoration: "underline",
                }}
              >
                {content.lesson_title}
              </h2>
              {content.lesson_content.length > 0 &&
                content.lesson_content.map((lesson, index) => {
                  return (
                    <div
                      key={index}
                      style={{ fontSize: "1.2em", marginBottom: 16 }}
                    >
                      <p
                        style={{
                          fontWeight: "bold",
                          margin: "10px 0px",
                        }}
                      >
                        {lesson.content}
                      </p>
                      {lesson.content_img !== "" && (
                        <img
                          src={lesson.content_img}
                          style={{ marginLeft: 58 }}
                        />
                      )}
                      <div>
                        {lesson.descriptions.length > 0 &&
                          lesson.descriptions.map((description) => {
                            return (
                              description.description_content !== "" && (
                                <>
                                  <p style={{ margin: "10px 8px" }}>
                                    {description.description_content}
                                  </p>
                                  {description.description_img !== "" && (
                                    <img
                                      src={description.description_img}
                                      style={{ marginLeft: 58 }}
                                    />
                                  )}
                                </>
                              )
                            );
                          })}
                      </div>
                      <div>
                        {lesson.example.length > 0 &&
                          lesson.example.map((ex) => {
                            return (
                              ex.example_content !== "" && (
                                <>
                                  <p style={{ margin: "10px 0px" }}>
                                    <span style={{ fontWeight: "bold" }}>
                                      Ví dụ:{" "}
                                    </span>
                                    {ex.example_content}
                                  </p>
                                  <img
                                    src={ex.example_img}
                                    style={{ marginLeft: 58 }}
                                  />
                                </>
                              )
                            );
                          })}
                        {lesson.solution &&
                          lesson.solution.length > 0 &&
                          lesson.solution.map((solution) => {
                            return (
                              solution.solution_content !== "" && (
                                <>
                                  <p style={{ margin: "10px 0px" }}>
                                    <span style={{ fontWeight: "bold" }}>
                                      Đáp án:{" "}
                                    </span>
                                    {solution.solution_content}
                                  </p>
                                  {solution.solution_img !== "" && (
                                    <img
                                      src={solution.solution_img}
                                      style={{ marginLeft: 58 }}
                                    />
                                  )}
                                </>
                              )
                            );
                          })}
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
};

export default BoxContentTheory;
