import NeighborhoodCard from './NeighborhoodCard';

const GuestNeighborhoods = ({neighborhoods}) => {
  return (
    <div className="neighborhoods-section">
      {neighborhoods.map(neighborhood => (
        <NeighborhoodCard
          key={neighborhood.id}
          neighborhoodName={neighborhood.neighborhood_name}
          costOfLiving={neighborhood.neighborhood_cost_of_living}
          neighborhoodWalkabilityScore={neighborhood.neighborhood_walkability_score}
          neighborhoodCrimeIndex={neighborhood.neighborhood_crime_index}
        />
      ))}
    </div>
  )
};

export default GuestNeighborhoods;
