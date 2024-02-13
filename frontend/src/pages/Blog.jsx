import React from 'react'
import data from '../data'
import { useParams } from 'react-router-dom';

const Blog = () => {
  const { id } = useParams('id')
  const blog = data[id-1];
  return (
    <div className='blog'>
        <div>
            <img src={`${blog.image}`} alt=""/>
        </div>
        <div>
            <h2>{blog.heading}</h2>
            <p>{blog.para}</p>
            <p>{blog.longpara}</p>
        </div>
    </div>
  )
}

export default Blog