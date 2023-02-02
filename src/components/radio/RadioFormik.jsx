import React from "react";
import {useField} from "formik";

const RadioFormik = ({...props}) => {
  const [field, meta] = useField(props.name);
  //   console.log()
  return (
    <div className="flex items-center gap-x-3">
      <label className="cursor-pointer custom-radio">
        <input
          {...field}
          type="radio"
          value={props.value}
          checked={props.checked}
          className="hidden"
        />
        <div className="bg-white w-full h-full rounded-full"></div>
      </label>
      <span>{props.label}</span>
    </div>
  );
};

export default RadioFormik;
