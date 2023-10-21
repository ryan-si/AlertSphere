import React from 'react';
import './HealthTips.css';
import SideBarComponent from "./components/SideBarComponent";
import TopBarComponent from "./components/TopBarComponent";
import useHealthTips from './hooks/useHealthTips';

function HealthTips() {
  const {
    eatingData,
    exerciseData,
    eatingLoading,
    exerciseLoading,
    eatingError,
    exerciseError
  } = useHealthTips();


  if (eatingLoading || exerciseLoading) {
    return <p>Loading...</p>;
  }

  if (eatingError) {
    return <p>Error loading healthy eating tips.</p>;
  }

  if (exerciseError) {
    return <p>Error loading exercise tips.</p>;
  }
  return (
    <div className="HealthTips">
      <SideBarComponent />
      <TopBarComponent />

      <h1 className="text-2xl font-bold mt-4 mb-4">Health Tips</h1>
      <div className="tips mt-4">
        <div className="tips">
          <h2 className="text-lg font-bold mt-2">Healthy Eating</h2>
          {eatingData && eatingData.Result.Resources.Resource.map(resource => (
            <div key={resource.Id} className="card mt-2" onClick={() => window.open(resource.AccessibleVersion, "_blank")}>
              <img src={resource.ImageUrl} alt={resource.ImageAlt} className="card-image" />
              <h3 className="text-lg font-bold card-title">{resource.Title}</h3>
            </div>
          ))}
        </div>
        <h2 className="text-lg font-bold mt-2">Exercise</h2>
        {exerciseData && exerciseData.Result.Resources.Resource.map(resource => (
          <div key={resource.Id} className="card mt-2" onClick={() => window.open(resource.AccessibleVersion, "_blank")}>
            <img src={resource.ImageUrl} alt={resource.ImageAlt} className="card-image" />
            <h3 className="text-lg font-bold card-title">{resource.Title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HealthTips;
