import React, { useState, useRef } from "react";
import Select from "react-select";

const TableRow = ({ rowIndex }) => {
  const label1Options = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
  ];

  const [label2Options, setLabel2Options] = useState([
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
    { value: "Option 4", label: "Option 4" },
  ]);

  const [selectedLabel1, setSelectedLabel1] = useState(null);
  const [selectedLabel2, setSelectedLabel2] = useState([]);

  const inputRef = useRef(null); // Ref for the input field

  const addNewLabel2Option = (newOption) => {
    if (newOption.trim() !== "") {
      const option = { value: newOption, label: newOption };
      setLabel2Options((prevOptions) => [...prevOptions, option]);
    }
  };

  return (
    <tr>
      <td>
        <Select
          options={label1Options}
          value={selectedLabel1}
          onChange={setSelectedLabel1}
          placeholder="Select Option"
        />
      </td>
      <td>
        <Select
          options={label2Options}
          isMulti
          value={selectedLabel2}
          onChange={setSelectedLabel2}
          placeholder="Select Options"
        />
        <div className="add-option">
          <input
            ref={inputRef}
            type="text"
            placeholder="Add new item"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addNewLabel2Option(e.target.value);
                e.target.value = ""; // Clear input after adding
              }
            }}
          />
          <button
            onClick={() => {
              const newOption = inputRef.current.value;
              addNewLabel2Option(newOption);
              inputRef.current.value = ""; // Clear input after adding
            }}
          >
            +Add
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
