import ListingCard from '../components/ListingCard'

const GuestListings = ({listings}) => {
  return (
    <div>
      {listings.map(listing => (
        <ListingCard
          key={listing.id}
          title={listing.title}
          status={listing.status}
          sqft={listing.sqft}
          rating={listing.rating}
          buy_price={listing.buy_price}
          imageUrls={listing.image_urls}
        />
      ))}
    </div>
  )
};

export default GuestListings;