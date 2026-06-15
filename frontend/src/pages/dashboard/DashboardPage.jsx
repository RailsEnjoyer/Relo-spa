import { apiFetch } from '../../utils/apiFetch';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Loader  from '../../components/Loader';
import ApiReturnedError from '../../components/errors/ApiReturnedError';
import './DashboardPage.css'
import PlanProgressWidget from '../../components/dashboard/PlanProgressWidget'
import StatsRowWidget from '../../components/dashboard/StatsRowWidget'
import SavedApartmentsWidget from '../../components/dashboard/SavedApartmentsWidget'


function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [plans, setPlans] = useState(null);
  const [activePlan, setActivePlan] = useState(null);

  useEffect(() => {
    apiFetch(`/dashboard`)
      .then(res => res.json())
      .then(data => {
        const fetchedPlans = data?.extra?.relocation_plans || [];
        setPlans(fetchedPlans);

        if (fetchedPlans.length > 0) {
          setActivePlan(fetchedPlans[0]);
        }

        setIsLoading(false);
      })
      .catch(err => {
        setApiError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      {apiError && <ApiReturnedError />}
      {plans.length === 0 ? (
        <>
          <h1>You don't have Relocation Plans yet {`:(`}</h1>
          <Link to="/planner" className="">Create now</Link>
        </>
      ) : (
        <div className="dashboard-page-wrapper">
          <div className="dashboard-header">
            <h1>My Relocation Plans</h1>

            <select value={'todo'} style={{ padding: '8px', borderRadius: '4px' }}>
              {plans.map((plan) => (
                <option key={plan.id} value={plan.id}>{plan.title}</option>
              ))}
            </select>

            <Link to="/plans/{:id}" className="">Plan Settings</Link>
          </div>

          <div className="dashboard-grid">
            <PlanProgressWidget plan = {activePlan}/>
            <div className="map-placeholder">Interactive Map</div>
            <StatsRowWidget plan = {activePlan}/>
          </div>
          <div className="saved-listings-wrapper">
            <SavedApartmentsWidget/>
          </div>
        </div>
      )}
    </>
  )
}

export default DashboardPage;
