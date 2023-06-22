import React, { useState, useEffect } from 'react'
import { API } from '../services/Api'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

type PostsType = {
  id: number,
  title: string,
  author: string,
  public: boolean
}

export default function Posts(): React.ReactNode {
  const [posts, setPosts] = useState<PostsType[]>([])

  const fetchPosts = async () => {
    const response = await axios.get<PostsType[]>(`${API}/posts`)
    const data: PostsType[] = await response.data
    setPosts(data)
  }

  const handleDelete = async (id: number) => {
    await axios.delete(`${API}/posts/${id}`)
    console.log("delete success !!!");
    fetchPosts();
  }
  useEffect(() => {
    fetchPosts()
  }, [])
  
  return (
    <div className='container mt-5'>
      <h2>List posts</h2>
      <ul>
        {
          posts.map((post: PostsType) => (
            <li className='mb-3' key={post.id}>{post.id} - {post.title} - {post.author} - {post.public ? "yes" : "no"}
              <NavLink to={"/update/" + post.id} className="btn btn-warning ms-2">update</NavLink>
              <button onClick={() => handleDelete(post.id)} className='btn btn-danger ms-2'>Supprimer</button>
            </li>
          ))
        }
      </ul>
      <NavLink to="/add" className="btn btn-primary">Ajouter</NavLink>
    </div>
  )
}
