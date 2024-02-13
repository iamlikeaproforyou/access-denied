import React from 'react'
import Card from '../components/Card'
import data from '../data'

const Home = () => {
  return (
    <div className='cards-container'>
      {data.map((index) => {
        return <Card data={index} key={index.id}/>
      })}
    </div>
  )
}

export default Home