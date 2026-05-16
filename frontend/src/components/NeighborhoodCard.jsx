const NeighborhoodCard = ({
  neighborhoodName,
  costOfLiving,
  neighborhoodWalkabilityScore,
  neighborhoodCrimeIndex
}) => {
  return (
    <div>
      <h4>{neighborhoodName}</h4>
      <p>Cost of Living {costOfLiving}</p>
      <p>Walkability Score {neighborhoodWalkabilityScore}</p>
      <p>Safety {neighborhoodCrimeIndex}</p>
    </div>
  )
};

export default NeighborhoodCard;