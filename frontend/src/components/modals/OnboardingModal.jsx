import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../utils/apiFetch';
import Loader from '../../components/Loader';
import ApiReturnedError from '../../components/errors/ApiReturnedError';
import { useAuth } from '../../contexts/AuthContext';

import mapImg from '../../assets/landing_map.png';
import safetyImg from '../../assets/green-safe-badge.png';
import { CloseIcon } from '../../components/ui/Icons';
import SearchableSelect from '../../components/ui/SearchableSelect';

import './OnboardingModal.css';

const OnboardingModal = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isCitiesLoading, setIsCitiesLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const { setUser } = useAuth();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    apiFetch(`/states`)
      .then(res => res.json())
      .then(data => {
        setStates(data.extra.states || [])
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        // setIsLoading(false);
      })
      .catch(err => {
        setApiError(err.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!selectedState) return;

    apiFetch(`/cities?state_id=${selectedState}`)
      .then(res => res.json())
      .then(data => {
        setCities(data.extra?.cities || []);
        setIsCitiesLoading(false);
      })
      .catch(err => {
        setApiError(err.message);
        setIsCitiesLoading(false);
      });

  }, [selectedState]);

  const handleFullSubmit = () => {
    if (!selectedState || !selectedCity) {
      alert("Please select both state and city!");
      return;
    }

    setIsSubmitting(true);

    apiFetch('/user', {
      method: 'PUT',
      body: JSON.stringify({
        state_id: selectedState,
        city_id: selectedCity
      })
    })
    .then(res => res.json())
    .then(data => {
      setUser(data.extra.user);
    })
    .catch(err => {
      alert(`Failed to save profile: ${err}`);
      setIsSubmitting(false);
    });
  };

  if (isLoading) {
    return createPortal(
      <div className="modal-overlay">
        <Loader />
      </div>,
      document.body
    );
  }

  return createPortal(
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          {apiError && <ApiReturnedError />}
          <button className="modal-close-btn" onClick={() => navigate('/')}>
            <CloseIcon />
          </button>
          <div className="modal-illustration">
            <img src={mapImg} alt="Destination" />
          </div>

          <h2>Help us personalize your<br/>relocation experience</h2>
          <p className="modal-description">
            To calculate moving costs more accurately and provide better recommendations, please enter your current city and state.
          </p>
          <p className="modal-subtext">
            You can update this information anytime in your profile settings.
          </p>

          <div className="modal-form">
            <div className="form-group">
              <label>State</label>
              <SearchableSelect
                options={states.map(state => ({ value: state.id, label: state.name }))}
                value={selectedState}
                onChange={(val) => {
                  setSelectedState(val);
                  setCities([]);
                  setSelectedCity('');
                  setIsCitiesLoading(true);
                }}
                placeholder="Select your state"
                disabled={false}
                isLoading={false}
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <SearchableSelect
                options={cities.map(city => ({ value: city.id, label: city.name }))}
                value={selectedCity}
                onChange={(val) => setSelectedCity(val)}
                placeholder={!selectedState ? 'Please, choose state first...' : 'Select your city'}
                disabled={!selectedState || isCitiesLoading}
                isLoading={isCitiesLoading}
              />
            </div>
            <button className="btn-primary full-width modal-submit-btn" onClick={handleFullSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Continue'}
            </button>
          </div>

          <div className="modal-footer">
            <img src={safetyImg} alt="Secure" />
            <span>Your information is secure and will never be shared.</span>
          </div>

        </div>
      </div>
    </>,
    document.body
  );
};

export default OnboardingModal;
