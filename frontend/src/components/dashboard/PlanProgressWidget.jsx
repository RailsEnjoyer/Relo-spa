const PlanProgressWidget = ({plan}) => {
  if (!plan) return null;

  const formattedDate =
    new Date(plan.move_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="plan-progress-container">
      <h1>{plan.title}</h1>
      <p>{formattedDate}</p>
    </div>
  )
}

export default PlanProgressWidget;
