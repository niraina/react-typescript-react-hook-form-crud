import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import axios from "axios"
import { API } from "../services/Api";

export type FormValues = {
    title: string;
    author: string;
    public: boolean;
};

export default function Add() {
  const form = useForm<FormValues>({});
  const { register, control, handleSubmit, formState, reset } = form;

//   const { name, ref, onChange, onBlur } = register("title");

  const { errors } = formState;

  const onSubmit = async (data: FormValues) => {
    console.log("Form submitted", data);
    await axios.post<FormValues>(`${API}/posts`, data)
    reset();
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            {...register("title", {
              required: {
                value: true,
                message: "Title is required",
              },
            })}
          />
          <p>{errors.title?.message}</p>
        </div>
        <div className="mb-3">
          <label htmlFor="author">Author</label>
          <input type="text" className="form-control" id="author" {...register("author", {
              required: {
                value: true,
                message: "author is required",
              },
            })}/>
        </div>
        <div className="mb-3">
          <input type="checkbox" id="public" {...register("public")}/>
          <label htmlFor="public">Author</label>
        </div>
        <button type="submit" className="btn btn-primary">Enregistrer</button>
      </form>
      <DevTool control={control}/>
    </div>
  );
}
