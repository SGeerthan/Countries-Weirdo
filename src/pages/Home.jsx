import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Body from '../components/Body'
import LandingPage from '../components/LandingPage'
import AboutUs from '../components/AboutUs'

function Home() {
  return (
    <>
      <Header />
      <LandingPage/>
      <AboutUs/>
      <Footer />
    </>
  )
}

export default Home
