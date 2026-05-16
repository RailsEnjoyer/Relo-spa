import '../App.css'
import { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import LoadingError from '../components/errors/ApiLoadingError';
import GuestHeader from '../components/GuestHeader';

import GuestListings from '../components/GuestListings';

const BASE_API_LINK = 'http://localhost:3001/v1';

function GuestListingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch(`${BASE_API_LINK}/guest_space/listings`)
      .then(res => res.json())
      .then(data => {
        setListings(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <GuestHeader/>
      <div className="loader-wrapper">
        {isLoading ? (
          <Loader/>
          ) : error ? (
          <LoadingError/>
          ) : (
          <GuestListings listings = {listings}/>
        )}
      </div>
    </>
  )
}

export default GuestListingsPage;
