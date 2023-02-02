import {useField} from "formik";
import React from "react";
import {useEffect} from "react";
import {useState} from "react";
import useClickOutSide from "../../hooks/useClickOutSide";

const DropdownFormik = ({name, data, dropdownLabel, setValues, ...props}) => {
  const {show, setShow, nodeRef} = useClickOutSide(dropdownLabel);
  const [label, setLabel] = useState(dropdownLabel);
  // console.log("setValues:", setValues);
  // console.log("dropdownLabel:", dropdownLabel);

  const [field, meta] = useField(name);

  const handleClickDropdown = (e) => {
    // console.log(e.target.textContent);
    setShow(false);
    setLabel(e.target.textContent);
    setValues(name, e.target.dataset.value);
  };

  // the dropdownLabel changed when Submitting and reset
  useEffect(() => {
    if (field.value === "") setLabel(dropdownLabel);
  }, [field.value]);

  return (
    <div className="flex flex-col gap-3 mb-5">
      <label className="cursor-pointer">{props.labelText}</label>
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
          {data &&
            data.length > 0 &&
            data.map((item, index) => {
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
        </div>
      </div>

      {meta.touched && meta.error && (
        <p className="text-red-500 text-sm">{meta.error}</p>
      )}
    </div>
  );
};

export default DropdownFormik;
