import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import bookmyshowLogo from "../assets/partners/bookmyshow.png";
import districtLogo from "../assets/partners/District.png";
import meraeventsLogo from "../assets/partners/MeraEvents.png";
import nearbuyLogo from "../assets/partners/Nearbuy.png";
import paytmInsiderLogo from "../assets/partners/Paytm-insider.png";
import townscriptLogo from "../assets/partners/Townscript.png";
import { Link } from "react-router-dom";

const partners = [
  {
    name: "BookMyShow",
    logo: bookmyshowLogo,
    image: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=1200&q=80",
    description: "India’s leading entertainment ticketing platform.",
    url: "https://in.bookmyshow.com",
  },
  {
    name: "Paytm Insider",
    logo: paytmInsiderLogo,
    image: "https://images.unsplash.com/photo-1518972559570-7cc1309f3229?auto=format&fit=crop&w=1200&q=80",
    description: "Book concerts and experiences across India.",
    url: "https://insider.in",
  },
  {
    name: "District by Zomato",
    logo: districtLogo,
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80",
    description: "Curated premium events by Zomato.",
    url: "https://www.zomato.com",
  },
  {
    name: "MeraEvents",
    logo: meraeventsLogo,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    description: "Event ticketing for conferences and expos.",
    url: "https://www.meraevents.com",
  },
  {
    name: "Nearbuy",
    logo: nearbuyLogo,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    description: "Discover local deals and experiences.",
    url: "https://www.nearbuy.com",
  },
  {
    name: "Townscript",
    logo: townscriptLogo,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80",
    description: "Ticketing for workshops, marathons, and events.",
    url: "https://www.townscript.com",
  },
];

const OurPartner = () => {
  const [logoErrors, setLogoErrors] = useState({});

  const handleLogoError = (name) => {
    setLogoErrors((prev) => ({ ...prev, [name]: true }));
  };

  return (
    <section className="py-14 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full mb-4">
            Trusted Partners
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            India's Top Ticketing Partners 🇮🇳
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            We collaborate with India's top platforms to deliver seamless booking experiences.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <motion.a
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full flex flex-col">

                {/* IMAGE */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* LOGO */}
                  <div className="absolute bottom-4 left-4 backdrop-blur-md bg-white/90 rounded-xl px-3 py-2 shadow-lg">
                    {!logoErrors[partner.name] ? (
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="h-7 w-auto object-contain"
                        onError={() => handleLogoError(partner.name)}
                      />
                    ) : (
                      <span className="text-xs font-semibold text-gray-700">
                        {partner.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                    {partner.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4">
                    {partner.description}
                  </p>

                  <div className="mt-auto flex items-center gap-1 text-blue-600 text-sm font-semibold group-hover:gap-2 transition-all">
                    Visit Website <FaExternalLinkAlt size={12} />
                  </div>
                </div>

              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
  <p className="text-sm text-gray-500">
    Want to partner with us?{" "}
    <Link
      to="/contact"
      className="text-blue-600 hover:text-blue-700 font-medium"
    >
      Contact us
    </Link>
  </p>
</div>

      </div>
    </section>
  );
};

export default OurPartner;