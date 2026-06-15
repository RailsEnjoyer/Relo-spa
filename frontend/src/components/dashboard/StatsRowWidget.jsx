const StatsRowWidget = ({plan}) => {
  if (!plan) return null;

  return (
    <div className="stats-row-container">
      <div>
        Saved Apartments
        <p>12</p>
      </div>
      <div>
        Budget
        <p>${plan.monthly_rent_budget}</p>
      </div>
      <div>
        Tasks
        <p>17</p>
      </div>
      <div>
        Comparisons
        <p>3</p>
      </div>
    </div>
  )
}

export default StatsRowWidget;
