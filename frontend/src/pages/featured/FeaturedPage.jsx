import { useEffect, useState } from 'react';
import { apiFetch } from '../../utils/apiFetch';
import ListingCard from '../../components/listings/ListingCard';
import Loader from '../../components/Loader';
import ApiReturnedError from '../../components/errors/ApiReturnedError';
import './FeaturedPage.css'

const FeaturedPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [featuredListings, setFeaturedListings] = useState([])
  const savedIds = new Set(featuredListings.map(l => l.id));
  const [removedIds, setRemovedIds] = useState(new Set());

  const removeFromFeatured = (id) => {
    setRemovedIds(prev => new Set([...prev, id]));
  };

  const addToFeatured = (id) => {
    setRemovedIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const visibleListings = featuredListings.filter(l => !removedIds.has(l.id));

  useEffect(() => {
    apiFetch(`/saved_listings`)
      .then(res => res.json())
      .then(data => {
        const fetchedFeaturedListings = data?.extra?.listings || [];
        setFeaturedListings(fetchedFeaturedListings);
        setIsLoading(false);
      })
      .catch(err => {
        setApiError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="loader-container full-page">
        <Loader />
      </div>
    );
  }

  if (apiError) {
    return <ApiReturnedError />;
  }

  return (
    <>
      <section className="container featured-wrapper">
        <div>
          {visibleListings.map(listing => (
            <ListingCard
              key={listing.id}
              id={listing.id}
              title={listing.title}
              bathrooms={listing.bathrooms}
              bedrooms={listing.bedrooms}
              rent_price={listing.rent_price}
              imageUrls={listing.image_urls}
              saved={{ ids: savedIds, onLike: addToFeatured, onRemove: removeFromFeatured }}
            />
          ))}
        </div>
      </section>
    </>
  )
};

export default FeaturedPage;
