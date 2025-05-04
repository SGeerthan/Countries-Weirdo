import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";

function MyFavourite() {
  const [favorites, setFavorites] = useState([]);
  const [countryImages, setCountryImages] = useState({});

  useEffect(() => {
    const fetchFavorites = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const favoritesRef = collection(db, "Users", user.uid, "userFavorites");
      const snapshot = await getDocs(favoritesRef);

      const favoritesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFavorites(favoritesData);
      
      const countryNames = favoritesData.map(fav => fav.country);
      const images = {};

      for (const country of countryNames) {
        try {
          const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
          const data = await response.json();
          if (data && data[0] && data[0].flags) {
            images[country] = data[0].flags.png;
          }
        } catch (error) {
          console.error(`Failed to fetch flag for ${country}`, error);
        }
      }

      setCountryImages(images);
    };

    fetchFavorites();
  }, []);

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">My Favourite Countries</h2>
      {favorites.length === 0 ? (
        <p className="text-gray-500 text-center">No favorites added yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((fav) => (
            <div
              key={fav.id}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={countryImages[fav.country] || 'https://via.placeholder.com/150'}
                  alt={`${fav.country} flag`}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{fav.country}</h3>
              </div>
              <p className="text-sm sm:text-base"><strong>Rating:</strong> {fav.rating}/5</p>
              <p className="text-sm sm:text-base"><strong>Comment:</strong> {fav.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyFavourite;
