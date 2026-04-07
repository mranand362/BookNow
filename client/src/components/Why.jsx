import React from 'react';
import { useNavigate } from "react-router-dom";
import { FaBuilding, FaUniversity, FaShip, FaChalkboardTeacher, FaArrowRight } from 'react-icons/fa';

const Why = () => {
  const navigate = useNavigate();
  const categories = [
    {
      title: 'Organizers / Promoters',
      description:
        'A stellar software that takes away the issue of ticket selling, allowing organizers to seamlessly scan the tickets using our App and get money directly from every sale.',
      icon: <FaBuilding className="text-xl" />,
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Event organizers working together',
      link: '/organizers',
    },
    {
      title: 'Venues',
      description:
        'Versatile seating arrangements to cater to events of any size and venue, offering a seamless setup that quickly breaks down sections and assigns varying prices for different days.',
      icon: <FaChalkboardTeacher className="text-xl" />,
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Modern event venue with stage lighting',
      link: '/venues',
    },
    {
      title: 'Schools',
      description:
        'Elevate your school events with ease with our software that streamlines the process for any event size, ensuring each child gets a ticket to the end-of-year show with complete simplicity.',
      icon: <FaUniversity className="text-xl" />,
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      alt: 'Students performing on stage',
      link: '/schools',
    },
    {
      title: 'Tours & Experiences',
      description:
        'A user-friendly platform allowing you to focus on what you do best while we fill up your boat trips, daily excursions, and restaurant crawls.',
      icon: <FaShip className="text-xl" />,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'Boat tour on crystal clear water',
      link: '/tours',
    },
  ];

  return (
    <section
      className="relative py-20 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 text-xs font-semibold tracking-wider text-white bg-blue-600/80 rounded-full mb-4">
            WHO WE SERVE
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Empowering Every Experience
          </h2>
          <p className="text-base text-white/90 max-w-2xl mx-auto">
            From concert organizers to school administrators, our platform adapts to your needs.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl mb-3 text-white shadow-sm">
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {category.description}
                </p>
                <button
                  onClick={() => navigate("/learn-more")}
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors group/btn"
                >
                  Learn More
                  <FaArrowRight className="text-sm transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Why;