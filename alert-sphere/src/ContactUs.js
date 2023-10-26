import React from "react";
import TopBarComponent from "./components/TopBarComponent";
import SideBarComponent from "./components/SideBarComponent";

function ContactUs() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <TopBarComponent />

      <div className="flex flex-grow">
        <SideBarComponent />

        <div className="p-8 flex-grow bg-white rounded-l-lg shadow-md w-[300px] space-y-8">
          <h1 className="text-4xl font-bold mb-6 text-gray-700 border-b pb-4">
            Contact Us
          </h1>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Company Background
              </h2>
              <p className="text-gray-700 leading-relaxed">
                AlertSphere is developed by EngiLion, a software company
                dedicated to empowering individuals to take control of their
                health and safety. Our team of experienced developers leverages
                technology to provide users with the information they need to
                make informed decisions in the face of disease outbreaks,
                weather events, and other emergencies. By focusing on prevention
                and early action, AlertSphere aims to help users stay one step
                ahead. Our easy-to-use platform delivers vital alerts and health
                guidance when and where users need it most. EngiLion is
                committed to creating software that enables people worldwide to
                live their healthiest, safest, and most informed lives.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Software Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed">
                AlertSphere is a health and emergency alert software that helps
                users stay informed about situations that may impact their daily
                lives. Through an interactive map, users can view the locations
                of disease outbreaks, clinics, and emergencies in their area.
                Customizable alerts notify users of new cases, weather events,
                health tips, and critical warnings published by authorities.
                Advanced filtering allows users to focus on the information most
                relevant to their needs. By enabling users to take a proactive
                approach to health and safety, AlertSphere aims to provide vital
                peace of mind. Whether at home or on the go, AlertSphere
                delivers the critical information users need to take control of
                their wellbeing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Contact Details
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li className="text-gray-700">
                  Email: support@alertsphere.com
                </li>
                <li className="text-gray-700">Phone: +1 (312) 456-7891</li>
                <li className="text-gray-700">
                  Address: 456 Tech Park Drive, Tech City, TC 54321
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
