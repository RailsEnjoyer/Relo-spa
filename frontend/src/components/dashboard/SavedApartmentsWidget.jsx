import { useState, useEffect } from "react";
import { apiFetch } from "../../utils/apiFetch";

import LoadingError from "../errors/ApiLoadingError";
import Loader from "../Loader";

const SavedApartmentsWidget = () => {
  const [savedListings, setSavedListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiFetch(`/listings?page=1`)
      .then(res => res.json())
      .then(data => {
        setSavedListings(data?.extra?.listings.slice(0, 2));
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="saved-apartments-container">
      <h2>Saved Apartments</h2>

      {isLoading ? (
        <Loader/>
      ) : error ? (
        <LoadingError/>
      ) : (
        <div className="saved-apartments-grid">
          {savedListings.map((listing) => (
            <div key={listing.id} className="apartment-card">
              <img src={listing.image_urls[0]} alt={listing.title} className="apartment-image" />

              <div className="apartment-details">
                <div className="apartment-title">{listing.title}</div>
                <div className="apartment-rent">${listing.rent_price}/mo • {listing.bedrooms} Bed, {listing.bathrooms} Bath</div>
                <span className="match-badge">Match: 94%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SavedApartmentsWidget;
