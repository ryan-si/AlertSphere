import React from "react";
import TopBarComponent from "./components/TopBarComponent";
import SideBarComponent from "./components/SideBarComponent";

function ContactUs() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <TopBarComponent />

      <div className="flex flex-grow">
        <SideBarComponent />

        <div className="p-8 flex-grow bg-white rounded-l-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-gray-700 border-b pb-4">
            Contact Us
          </h1>

          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4 text-black">
              Company Background
            </h2>
            <p className="mb-6 text-black">
              AlertSphere is developed by Group 17, a software company dedicated
              to empowering individuals to take control of their health and
              safety. Our team of experienced developers leverages technology to
              provide users with the information they need to make informed
              decisions in the face of disease outbreaks, weather events, and
              other emergencies. By focusing on prevention and early action,
              AlertSphere aims to help users stay one step ahead. Our
              easy-to-use platform delivers vital alerts and health guidance
              when and where users need it most. Group 17 is committed to
              creating software that enables people worldwide to live their
              healthiest, safest, and most informed lives.
            </p>

            <h2 className="text-2xl font-bold mb-4 text-black">
              Software Introduction
            </h2>
            <p className="mb-6 text-black">
              AlertSphere is a health and emergency alert software that helps
              users stay informed about situations that may impact their daily
              lives. Through an interactive map, users can view the locations of
              disease outbreaks, clinics, and emergencies in their area.
              Customizable alerts notify users of new cases, weather events,
              health tips, and critical warnings published by authorities.
              Advanced filtering allows users to focus on the information most
              relevant to their needs. By enabling users to take a proactive
              approach to health and safety, AlertSphere aims to provide vital
              peace of mind. Whether at home or on the go, AlertSphere delivers
              the critical information users need to take control of their
              wellbeing.
            </p>

            <h2 className="text-2xl font-bold mb-4 text-black">
              Contact Details
            </h2>
            <ul className="list-disc pl-5">
              <li className="mb-3 text-black">Email: example@example.com</li>
              <li className="mb-3 text-black">Phone: (123) 456-7890</li>
              <li className="mb-3 text-black">
                Address: 123 Example Street, Example City, EX 12345
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
