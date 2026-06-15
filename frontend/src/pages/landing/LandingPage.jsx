import './Landing.css'
import { useState, useEffect } from 'react';
import FeatureCard from '../../components/landing/FeatureCard';
import Hero from '../../components/landing/Hero';
import Loader from '../../components/Loader';
import GuestNeighborhoods from '../../components/guest_space/GuestNeighborhoods';
import LoadingError from '../../components/errors/ApiLoadingError';

import mapImg from '../../assets/landing_map.png';
import marksImg from '../../assets/landing_marks.png';
import houseImg from '../../assets/landing_house.png';
import GuestListings from '../../components/guest_space/GuestListings';
import GuestTimeline from '../../components/guest_space/GuestTimeline';

function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [neighborhoods, setNeighborhoods] = useState([]);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/guest_space/landing_neighborhoods`).then(res => res.json()),
      fetch(`${import.meta.env.VITE_API_URL}/guest_space/landing_listings`).then(res => res.json())
    ])
    .then(([neighborhoodsData, listingsData]) => {
      setNeighborhoods(neighborhoodsData);
      setListings(listingsData);
      setIsLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Hero/>

      <section className="features-section">
        <div className="container features-flex">
          <FeatureCard
            imgSrc={mapImg}
            title="Compare Locations"
            description="Evaluate cities and neighborhoods"
          />

          <div className="vertical-divider"></div>

          <FeatureCard
            imgSrc={houseImg}
            title="Find the Perfect Place"
            description="Search & track apartments"
          />

          <div className="vertical-divider"></div>

          <FeatureCard
            imgSrc={marksImg}
            title="Manage Your Move"
            description="Organize your relocation steps"
          />
        </div>
      </section>

      <section className="explore-section">
        <div className="container">
          {isLoading ? (
            <Loader/>
            ) : error ? (
            <LoadingError/>
            ) : (
            <GuestNeighborhoods neighborhoods = {neighborhoods}/>
          )}
        </div>
      </section>

      <section className="compare-apartments-section">
        <div className="container">
          {isLoading ? (
            <Loader/>
            ) : error ? (
            <LoadingError/>
            ) : (
            <GuestListings listings = {listings}/>
          )}
        </div>
      </section>

      <section className="timeline-section">
        <div className="container">
          {
            <GuestTimeline/>
          }
        </div>
      </section>
    </>
  )
}

export default LandingPage;
