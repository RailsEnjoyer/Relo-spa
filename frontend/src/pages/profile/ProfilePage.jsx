import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import './ProfilePage.css'

function ProfilePage() {
  const { user, logout } = useAuth();

  return (
    <div className="profile-wrapper container">
      <h1>Profile</h1>
      <h2>Hi, {user.email_address}! </h2>
      <div><Link to="/featured" className="">Featured Listings</Link></div>
      <div><Link to="/" className="btn-signin" onClick={logout}>Log out</Link></div>
    </div>
  );
}

export default ProfilePage;
