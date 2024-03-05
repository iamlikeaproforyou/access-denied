import React from 'react'
import { useParams } from 'react-router-dom';
import useDataById from '../hooks/requestDataById';

import Error from '../components/error';

const Blog = () => {
  const { id } = useParams('id')
  const blog = useDataById(id);
  if(!blog.error){
    return (
      <div className='blog'>
        <div>
          <img src={`${blog.image}`} alt="" />
        </div>
        <div>
          <h2>{blog.heading}</h2>
          <p>{blog.para}</p>
          <p>{blog.longpara}</p>
        </div>
      </div>
    )
  }
  else{
    return(
      <Error error={blog.error} />
    )
  }
  
}

export default Blog