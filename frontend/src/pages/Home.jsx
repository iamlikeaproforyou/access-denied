import React from 'react'
import Card from '../components/Card'
import useData from '../hooks/useData'

const Home = () => {
  const data = useData();
  
  return (
    <div className='cards-container'>
      {data.map((index) => {
        return <Card data={index} key={index.id} />
      })}
    </div>
  )
  
}

export default Home