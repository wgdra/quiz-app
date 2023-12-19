import { useState } from "react";
import CollapseCustomize from "./CollapseCustomize";

const CollapseList = ({ ...props }) => {
  const { dataChapter, dataTheory, setDataContent } = props;

  const [isHovered, setIsHovered] = useState(null);
  const [theoryName, setTheoryName] = useState(dataTheory.theory_name);

  const handleClickCollapseList = (theory_name, lessons) => {
    setTheoryName(theory_name);
    setDataContent(lessons);
  };

  const items = dataChapter.map((chapter, index) => {
    const childrenItem = (theory) => {
      return theory.map((item, index) => {
        return (
          <a
            key={index}
            style={{
              display: "block",
              margin: 10,
              color:
                item.theory_name === theoryName &&
                item.chapter === dataTheory.chapter
                  ? "#44A500"
                  : isHovered === index
                  ? "#44A500"
                  : "black",
              textDecoration: isHovered === index && "underline",
            }}
            onMouseOver={() => setIsHovered(index)}
            onMouseOut={() => setIsHovered(null)}
            onClick={() =>
              handleClickCollapseList(item.theory_name, item.lessons)
            }
          >
            {item.theory_name}
          </a>
        );
      });
    };

    return {
      key: index,
      label: chapter.chapter_name,
      children: childrenItem(chapter.theories),
    };
  });
  return <CollapseCustomize accordion items={items} />;
};

export default CollapseList;
