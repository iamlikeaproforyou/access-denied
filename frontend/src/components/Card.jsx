import React from 'react'

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
            <button className='read-more'>read more</button>
        </div>
    )
}

export default Card