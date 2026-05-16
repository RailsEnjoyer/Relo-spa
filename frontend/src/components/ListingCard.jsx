const ListingCard = ({
  title,
  status,
  sqft,
  rating,
  buy_price,
  imageUrls
}) => {
  return (
    <div>
      <h4>{title}</h4>
      <p>Status: {status}</p>
      <p>Size: {sqft} sqft.</p>
      <p>Seller's rating: {rating}</p>
      <p>${buy_price} USD</p>
      <p>todo {imageUrls} todo</p>
    </div>
  )
}

export default ListingCard;
