import React from 'react'
import UserHeader from '../components/UserHeader'
import MyFavourite from '../components/MyFavourite'
import Footer from '../components/Footer'

function MyFavouriteCountry() {
  return (
    <>
     <div className="flex flex-col min-h-screen">
      <UserHeader />
      <main className="flex-grow">
        <MyFavourite />
      </main>
      <Footer />
    </div>
    </>
  )
}

export default MyFavouriteCountry
