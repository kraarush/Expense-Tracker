import React from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import Herosection from './Herosection'
import Features from './Features'
import Discover from './Discover'

const Home = () => {

  return (
    <div>
      <Navbar/>
      <Herosection/>
      <Features/>
      <Discover/>
      <Footer/>
    </div>
  )
}

export default Home