import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FormDataType } from "../CreateContact/CreateContact";
import { editContact } from "../../redux-slice/contactSlice";
import { RootState } from "../../store";
import Button from "../../Components/Button/Button";

function EditContact() {
  const { contacts, editIndex } = useSelector(
    (state: RootState) => state.contact
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { firstName, lastName, status } = contacts[editIndex];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataType>({
    defaultValues: {
      firstName,
      lastName,
      status,
    },
  });

  const onSubmit = (data: FormDataType) => {
    dispatch(editContact(data));
    navigate("/contact");
  };
  return (
    <div className="flex flex-col justify-center items-center w-full border-l-2 ">
      <Link to="/contact">
        <div>
          <Button text="Back" type="secondary" />
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

export default EditContact;
