import React from "react";
import {useForm} from "react-hook-form";
import CheckboxHook from "../checkbox/CheckboxHook";
import DropdownHook from "../dropdown/DropdownHook";
import InputHook from "../input/InputHook";
import RadioHook from "../radio/RadioHook";

import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    username: yup.string().required("Please enter your username"),
    email: yup
      .string()
      .email("Not an email")
      .required("Please enter your email"),
    // pass Matches Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
    password: yup
      .string()
      .min(8, "Your password at least 8 characters, greater")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
        message:
          "Your password at least one uppercase letter, one lowercase letter and one number",
      })
      .required("Please enter your password"),
    gender: yup
      .string()
      .required("Please choose your gender")
      .oneOf(["male", "female"], "You can only choose male or female"),
    jobDropdown: yup.string().required("please select your job"),
    termCheckbox: yup
      .boolean()
      .required("Please agree with conditions and terms"),
  })
  .required();

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

const RegisterHook = () => {
  const {
    register,
    handleSubmit,
    formState: {errors, isValid, isSubmitting, isSubmitSuccessful},
    control,
    setValue,
    watch,
    reset,
  } = useForm({
    //resolver: yupResolver(schema),
    // mode: "onChange",
    defaultValues: {
      gender: "male",
    },
  });

  console.log(errors);

  const onSubmitHandler = (values) => {
    if (!isValid) return;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        console.log("isValid:", isValid, values);

        reset({
          username: "",
          email: "",
          password: "",
          gender: "male",
          jobDropdown: "",
          termCheckbox: false,
        });
      }, 3000);
    });
  };

  const watchGender = watch("gender");
  console.log(watchGender);
  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="max-w-[300px] mx-auto my-10"
      autoComplete="off"
    >
      {/* username */}
      <div className="flex flex-col gap-3 mb-5">
        <label className="cursor-pointer" htmlFor="username">
          Username:
        </label>
        <InputHook
          control={control}
          name="username"
          placeholder="Enter your username"
          id="username"
          type="text"
        ></InputHook>
        {errors?.username?.message && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}
        {/* <p className="text-red-500 text-sm">Please enter your username</p> */}
      </div>
      {/* email */}
      <div className="flex flex-col gap-3 mb-5">
        <label className="cursor-pointer" htmlFor="email">
          Email:
        </label>
        <InputHook
          control={control}
          name="email"
          placeholder="Enter your email"
          id="email"
          type="email"
        ></InputHook>
        {errors?.email?.message && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* password */}
      <div className="flex flex-col gap-3 mb-5">
        <label className="cursor-pointer" htmlFor="password">
          Password:
        </label>
        <InputHook
          control={control}
          name="password"
          placeholder="Enter your password"
          id="password"
          type="password"
        ></InputHook>
        {errors?.password?.message && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      {/* Gender */}
      <div className="flex flex-col gap-3 mb-5">
        <label className="cursor-pointer">Gender:</label>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-x-3">
            <RadioHook
              name="gender"
              value="male"
              control={control}
              checked={watchGender === "male"}

              // defaultChecked={true}
            ></RadioHook>
            <span>Male</span>
          </div>
          <div className="flex items-center gap-x-3">
            <RadioHook
              name="gender"
              value="female"
              control={control}
              checked={watchGender === "female"}
            ></RadioHook>
            <span>Female</span>
          </div>
        </div>
        {errors?.gender?.message && (
          <p className="text-red-500 text-sm">{errors.gender.message}</p>
        )}
      </div>
      {/* Dropdown */}
      <div className="flex flex-col gap-3 mb-5">
        <label className="cursor-pointer">Are you:</label>
        <DropdownHook
          control={control}
          name="jobDropdown"
          setValue={setValue}
          data={dropdownData}
          dropdownLabel="Please choose your job"
        ></DropdownHook>
        {errors?.jobDropdown?.message && (
          <p className="text-red-500 text-sm">{errors.jobDropdown.message}</p>
        )}
      </div>

      {/* Checkbox Terms */}
      <div className="flex flex-col gap-3">
        <CheckboxHook
          control={control}
          text="I accept the terms and conditions"
          name="termCheckbox"
        ></CheckboxHook>
        {errors?.termCheckbox?.message && (
          <p className="text-red-500 text-sm">{errors.termCheckbox.message}</p>
        )}
      </div>

      <button
        className={`w-full p-5 bg-blue-500 text-white rounded-lg mt-5 font-semibold ${
          isSubmitting ? "opacity-50" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="w-5 h-5 rounded-full border-2 border-white border-t-2 border-t-transparent mx-auto animate-spin"></div>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};

export default RegisterHook;
