import React from 'react'
import { Link } from 'react-router-dom'
const Card = ({data}) => {
    return (
        <div className="card">
            <div>
                <img src={`${data.image}`} alt="" />
            </div>
            <div>
                <h3>{data.heading}</h3>
                <p>{data.para}</p>
            </div>
            <Link to={`/blog/${data.id}`}><button className='read-more'>read more</button></Link>
        </div>
    )
}

export default Card