import React from "react";
import {useState} from "react";
import {useWatch} from "react-hook-form";
import useClickOutSide from "../../hooks/useClickOutSide";

const DropdownHook = ({control, setValue, name, data, dropdownLabel}) => {
  const {show, setShow, nodeRef} = useClickOutSide();

  //   useWatch({
  //     control,
  //     name: "jobDropdown",
  //     defaultValue: "",
  //   });
  //   console.log(jobValue);

  const handleClickDropdown = (e) => {
    // console.log(e.target.textContent);
    setValue(name, e.target.dataset.value);
    setShow(false);
    setLabel(e.target.textContent);
  };

  const [label, setLabel] = useState(dropdownLabel);

  return (
    <div className="relative" ref={nodeRef}>
      <div
        className="p-5 rounded-lg border border-gray-100 bg-white flex items-center justify-between cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <span>{label}</span>
      </div>
      <div
        className={`absolute top-full left-0 w-full rounded-lg bg-white ${
          show ? "" : "opacity-0 invisible"
        }`}
      >
        {data.map((item, index) => {
          {
            /* console.log(item); */
          }
          return (
            <div
              className="p-5 cursor-pointer hover:bg-gray-100"
              onClick={handleClickDropdown}
              data-value={item.value}
              key={item.id}
            >
              {item.text}
            </div>
          );
        })}
        {/* <div
          className="p-5 cursor-pointer hover:bg-gray-100"
          onClick={handleClickDropdown}
          data-value="teacher"
        >
          Teacher
        </div>
        <div
          className="p-5 cursor-pointer hover:bg-gray-100"
          onClick={handleClickDropdown}
          data-value="developer"
        >
          Developer
        </div>
        <div
          className="p-5 cursor-pointer hover:bg-gray-100"
          onClick={handleClickDropdown}
          data-value="doctor"
        >
          Doctor
        </div> */}
      </div>
    </div>
  );
};

export default DropdownHook;
