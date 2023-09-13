import { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Input, Tag } from "antd";

const ExpertiesTag = ({ expertiesArea, setExpertiesAreas }) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  const handleClose = (removedTag) => {
    const newTags = expertiesArea.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setExpertiesAreas(newTags);
  };
  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    if (inputValue && expertiesArea.indexOf(inputValue) === -1) {
      setExpertiesAreas([...expertiesArea, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };
  const forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span
        key={tag}
        style={{
          display: "inline-block",
        }}
      >
        {tagElem}
      </span>
    );
  };
  const tagChild = expertiesArea.map(forMap);
  const tagPlusStyle = {
    borderStyle: "dashed",
    padding: "10px",
  };
  return (
    <>
      <div
        style={{
          marginBottom: 8,
        }}
      >
        {tagChild}
      </div>
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={{
            padding: "10px",
            borderRadius: "3px",
          }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag onClick={showInput} style={tagPlusStyle}>
          <PlusOutlined /> Experties Area
        </Tag>
      )}
    </>
  );
};
export default ExpertiesTag;
