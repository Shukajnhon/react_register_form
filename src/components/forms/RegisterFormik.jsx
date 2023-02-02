import React from "react";
import {Formik, Form, useField, useFormik} from "formik";
import * as yup from "yup";
import InputFormik from "../input/InputFormik";
import RadioFormik from "../radio/RadioFormik";
import CheckboxFormik from "../checkbox/CheckboxFormik";
import DropdownFormik from "../dropdown/DropdownFormik";

const dropdownData = [
  {
    id: 1,
    value: "teacher",
    text: "Teacher",
  },
  {
    id: 2,
    value: "developer",
    text: "Developer",
  },
  {
    id: 3,
    value: "doctor",
    text: "Doctor",
  },
];

//registerSchema validation
const registerSchema = yup.object({
  username: yup.string().required("Please enter your username"),
  email: yup.string().email("Not an email").required("Please enter your email"),
  // pass Matches Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
  password: yup
    .string()
    .min(8, "Your password at least 8 characters, greater")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
      message:
        "Your password at least one uppercase letter, one lowercase letter and one number",
    })
    .required("Please enter your password"),
  //   gender: yup
  //     .string()
  //     .required("Please choose your gender")
  //     .oneOf(["male", "female"], "You can only choose male or female"),
  jobDropdown: yup.string().required("please select your job"),
  termCheckbox: yup
    .boolean()
    .oneOf([true], "Please agree with conditions and terms"),
});
//   .required();

const RegisterFormik = () => {
  return (
    <div>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          gender: "male",
          jobDropdown: "",
          termCheckbox: false,
        }}
        validationSchema={registerSchema}
        onSubmit={(values, {setSubmitting, resetForm}) => {
          setTimeout(() => {
            console.log(JSON.stringify(values, null, 2));
            console.log(values);
            setSubmitting(false);
            resetForm({
              username: "",
              email: "",
              password: "",
              termCheckbox: false,
            });
          }, 3000);
        }}
      >
        {(formik) => {
          const watchGender = formik.values.gender;

          console.log("Rendering formik");

          return (
            <form
              className="max-w-[300px] mx-auto my-10"
              autoComplete="off"
              onSubmit={formik.handleSubmit}
            >
              {/* username */}
              <InputFormik
                name="username"
                placeholder="Enter your username"
                id="username"
                label="Username"
              ></InputFormik>

              {/* email */}
              <InputFormik
                name="email"
                placeholder="Enter your email"
                id="email"
                type="email"
                label="Email"
              ></InputFormik>

              {/* password */}
              <InputFormik
                name="password"
                placeholder="Enter your password"
                id="password"
                type="password"
                label="Password"
              ></InputFormik>

              {/* Gender Radio */}
              <div className="flex flex-col gap-3 mb-5">
                <label className="cursor-pointer ">Gender:</label>
                <div className="flex items-center gap-5">
                  <RadioFormik
                    name="gender"
                    value="male"
                    checked={watchGender === "male"}
                    label="Male"
                  ></RadioFormik>

                  <RadioFormik
                    name="gender"
                    value="female"
                    checked={watchGender === "female"}
                    label="Female"
                  ></RadioFormik>
                </div>
              </div>

              {/* Dropdown */}
              <DropdownFormik
                dataNumber="123"
                labelText="Are you:"
                name="jobDropdown"
                data={dropdownData}
                dropdownLabel="Select your job"
                setValues={formik.setFieldValue}
              ></DropdownFormik>

              {/* Checkbox Terms */}
              <CheckboxFormik id="termCheckbox" name="termCheckbox">
                I accept the terms and conditions
              </CheckboxFormik>

              <button
                type="submit"
                className="w-full p-5 bg-blue-500 text-white rounded-lg mt-5 font-semibold"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? (
                  <div className="w-5 h-5 rounded-full border-2 border-white border-t-2 border-t-transparent mx-auto animate-spin"></div>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

export default RegisterFormik;
