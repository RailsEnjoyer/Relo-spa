import { Link } from 'react-router-dom';

const GuestHeader = () => {
  return (
    <div>
      <span><Link to="/" className="header-button">Main page</Link></span>
      <span><Link to="/guest/listings" className="header-button">Listings</Link></span>
    </div>
  )
}

export default GuestHeader;