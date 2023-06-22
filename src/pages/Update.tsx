import React from 'react'
import { useForm } from 'react-hook-form'
import { FormValues } from './Add'
import axios from 'axios'
import { API } from '../services/Api'
import { DevTool } from '@hookform/devtools'
import { useParams, useNavigate } from 'react-router-dom';

export default function Update(): React.ReactNode {
    const {id} = useParams()
    const navigate = useNavigate()
    const form = useForm<FormValues>({
        defaultValues: async () => {
            const response = await axios.get(`${API}/posts/${id}`)
            const data = await response.data
            return {
                title: data.title,
                author: data.author,
                public: data.public
            }
        }
    })
    const { register, control, handleSubmit, formState, reset } = form;
    const { errors } = formState;
    const onSubmit = async (data: FormValues) => {
        console.log("Form submitted", data);
        await axios.put<FormValues>(`${API}/posts/${id}`, data)
        navigate("/")
      };
  return (
    <div className='container mt-5'>
        <h2>Update</h2>
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
  )
}
