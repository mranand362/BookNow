import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-gray-100 text-gray-700 px-6 md:px-20 py-14">

      {/* TOP SECTION */}
      <div className="grid md:grid-cols-4 gap-10">

        {/* ABOUT */}
        <div>
          <h3 className="font-semibold  text-black mb-4">About us</h3>
          <ul className="space-y-2 text-sm ">
            <button className="hover:underline cursor-pointer" onClick={() => navigate("/about")}>
              Our story
            </button>
           
           
            
          </ul>
          <ul>
            <button className="hover:underline cursor-pointer" onClick={() => navigate("/jobs")}>
              Jobs
            </button>
          </ul>
          <ul>
            <button className="hover:underline cursor-pointer" onClick={() => navigate("/events")}>
              <li>Find events</li>
            </button>
          </ul>
          <ul>
             <button className="hover:underline cursor-pointer" onClick={() => navigate("/partners")}>
              Partners with us
            </button>
          </ul>
        </div>

        {/* HOST EVENTS */}
        <div>
          <h3 className="font-semibold text-black mb-4">Host events</h3>
          <ul className="space-y-2 text-sm">
            <li>Create event</li>
            <li>Pricing</li>
            <li>Features</li>
            <li>Developers</li>
            <li>Attractions</li>
            <li>Clubs</li>
          </ul>
        </div>

        {/* HELP */}
        <div>
          <h3 className="font-semibold text-black mb-4">Get help</h3>
          <ul className="space-y-2 text-sm">
            <li>Help center (FAQs)</li>
            <li>Contact us</li>
            <li>Where are my tickets?</li>
            <li>Contact the event organizer</li>
            <li>Can I get a refund?</li>
          </ul>
        </div>

        {/* LANGUAGE */}
        <div className="flex md:justify-end items-start">
          <select className="border border-gray-400 rounded-lg px-4 py-2 bg-white">
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>

      </div>

      {/* LINE */}
      <div className="border-t border-gray-300 my-10"></div>

      {/* BOTTOM SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        {/* LEFT */}
        <div className="text-sm text-gray-600">
          <span className="font-semibold text-blue-600">BookNow</span> / a ticketmaster company
        </div>

        {/* CENTER LINKS */}
        <div className="text-xs text-gray-600 text-center">
          Terms and conditions | Terms of Use | Privacy Policy | Cookie Policy | © 2026
        </div>

        {/* RIGHT ICONS */}
        <div className="flex gap-4 text-gray-600 text-lg">
          <FaTwitter className="cursor-pointer hover:text-black" />
          <FaFacebookF className="cursor-pointer hover:text-black" />
          <FaLinkedinIn className="cursor-pointer hover:text-black" />
        </div>

      </div>


    </footer>
  );
};

export default Footer;