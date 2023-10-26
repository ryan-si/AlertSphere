import React from "react";
import "./HealthTips.css";
import SideBarComponent from "./components/SideBarComponent";
import TopBarComponent from "./components/TopBarComponent";
import useHealthTips from "./hooks/useHealthTips";
import LoadingSpinner from "./components/LoadingSpinnerComponent";

function HealthTips() {
  const {
    eatingData,
    exerciseData,
    eatingLoading,
    exerciseLoading,
    eatingError,
    exerciseError,
  } = useHealthTips();

  if (eatingLoading || exerciseLoading) {
    return (
      <div className="h-screen flex flex-col relative">
        <TopBarComponent />
        <div className="flex flex-1">
          <SideBarComponent />
          {/* <p>Loading...</p> */}
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (eatingError) {
    return <p>Error loading healthy eating tips.</p>;
  }

  if (exerciseError) {
    return <p>Error loading exercise tips.</p>;
  }

  return (
    <div className="h-screen flex flex-col">
      <TopBarComponent />

      <div className="flex flex-1">
        <SideBarComponent />
        <div className="flex-1 p-8 space-y-6 overflow-y-auto">
          <h1 className="text-2xl font-bold mt-4 mb-4">Health Tips</h1>

          <h2 className="text-lg font-bold mt-2">Healthy Eating</h2>
          <div className="grid grid-cols-4 gap-4">
            {eatingData &&
              eatingData.Result.Resources.Resource.map((resource) => (
                <div
                  key={resource.Id}
                  className="card mt-2"
                  onClick={() =>
                    window.open(resource.AccessibleVersion, "_blank")
                  }
                >
                  <img
                    src={resource.ImageUrl}
                    alt={resource.ImageAlt}
                    className="card-image"
                  />
                  <h3 className="text-lg font-bold card-title">
                    {resource.Title}
                  </h3>
                </div>
              ))}
          </div>

          <h2 className="text-lg font-bold mt-2">Exercise</h2>
          <div className="grid grid-cols-4 gap-4">
            {exerciseData &&
              exerciseData.Result.Resources.Resource.map((resource) => (
                <div
                  key={resource.Id}
                  className="card mt-2"
                  onClick={() =>
                    window.open(resource.AccessibleVersion, "_blank")
                  }
                >
                  <img
                    src={resource.ImageUrl}
                    alt={resource.ImageAlt}
                    className="card-image"
                  />
                  <h3 className="text-lg font-bold card-title">
                    {resource.Title}
                  </h3>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthTips;
