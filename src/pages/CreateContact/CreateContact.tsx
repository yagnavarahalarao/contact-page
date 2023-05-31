import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createContact } from "../../redux-slice/contactSlice";

export type FormDataType = {
  firstName: string;
  lastName: string;
  status: "active" | "inActive";
};

function CreateContact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      status: "inActive",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: FormDataType) => {
    dispatch(createContact(data));
    navigate("/contact");
  };

  return (
    <div className="flex flex-col justify-center items-center w-full border-l-2 ">
      <Link to="/contact">
        <div>
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 my-2 border border-blue-500 hover:border-transparent rounded">
            Back
          </button>
        </div>
      </Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-8 border-2 p-36">
          <div>
            <label htmlFor="firstname">First Name : </label>
            <input
              type="text"
              className="border-2 border-black pl-2"
              {...register("firstName", { required: true })}
            />
            {errors.firstName && (
              <span className="text-red-900">first Name is required</span>
            )}
          </div>
          <div>
            <label htmlFor="lastname">Last Name : </label>
            <input
              type="text"
              className="border-2 border-black pl-2"
              {...register("lastName", { required: true })}
            />
            {errors.lastName && (
              <span className="text-red-900">Last Name is required</span>
            )}
          </div>
          <div className="flex">
            <label>Status : </label>
            <div className="pl-10">
              <input
                type="radio"
                className="border-2 border-black"
                value="active"
                {...register("status")}
              />
              <label> Active </label>
              <br />
              <input
                type="radio"
                className="border-2 border-black"
                value="inActive"
                {...register("status")}
              />
              <label htmlFor="lastname"> Inactive </label>
            </div>
          </div>
          <div className="flex justify-center">
            <input
              type="submit"
              className="border-2 px-8 border-black rounded"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateContact;
