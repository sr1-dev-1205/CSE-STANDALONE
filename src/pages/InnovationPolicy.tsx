import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';

const InnovationPolicy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white pt-12 px-4 sm:px-6 md:px-10 lg:px-20 font-sans">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-3 leading-tight">
          <span className="text-slate-900">Innovation</span>{' '}
          <span className="text-black-300">&</span>{' '}
          <span className="text-slate-900">Start-Up Policy</span>
        </h1>
        <div className="mt-4 flex justify-center">
          <div className="h-1 w-28 bg-yellow-500 rounded-full" />
        </div>
        <p className="mt-6 text-base sm:text-lg text-gray-700 max-w-3xl mx-auto">
          At Hindusthan Institute of Technology, we champion a vibrant ecosystem of innovation,
          ideation, and entrepreneurial growth. Our policies are meticulously designed to empower
          students and faculty alike to explore, develop, and implement transformative ideas with
          real-world impact.
        </p>
      </div>

      {/* First Card: Image on Right */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-8 max-w-5xl mx-auto mb-12">
        {/* Left - Description */}
        <div className="w-full lg:w-[58%] max-w-[500px]">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-2 rounded-lg bg-yellow-100 text-yellow-600">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                HITECH Innovation & Start-Up Policy 2021
              </h3>
              <p className="text-gray-800 text-[15.5px] leading-relaxed mb-4">
               This comprehensive policy serves as a guiding framework for both faculty and students who aspire to transform their innovative ideas into successful entrepreneurial ventures. It clearly outlines the institutional structure, incubation processes, and strategic mechanisms in place to support the launch and growth of startups from within the college ecosystem. From ideation to execution, the policy provides detailed insights into funding opportunities, mentorship access, resource allocation, legal guidance, and collaboration channels. By encouraging innovation-driven entrepreneurship, the institution empowers individuals to navigate the startup journey confidently, bridging the gap between academic knowledge and real-world application with sustained institutional support.
              </p>
              <a
                href={`${import.meta.env.BASE_URL}pdf/startup.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-700 font-semibold hover:underline"
              >
                View Full Policy →
              </a>
            </div>
          </div>
        </div>

        {/* Right - Image Card */}
        <div className="bg-[#FFFBEA] border border-yellow-300 rounded-2xl p-3 shadow-md w-full lg:w-[40%] max-w-[450px]">
          <img
            src={`${import.meta.env.BASE_URL}images/startup_policy.jpg`}
            alt="HITECH Startup Policy"
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>
      </div>

      {/* Second Card: Image on Left (Reversed Layout) */}
      <div className="flex flex-col lg:flex-row-reverse items-start justify-between gap-8 max-w-5xl mx-auto">
        {/* Right (reversed) - Description */}
        <div className="w-full lg:w-[58%] max-w-[500px]">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-2 rounded-lg bg-yellow-100 text-yellow-600">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                National Innovation & Startup Policy 2019
              </h3>
              <p className="text-gray-800 text-[15.5px] leading-relaxed mb-4">
                Issued by the Ministry of Education, this comprehensive framework is designed to align institutional efforts with the broader national goals of fostering innovation, entrepreneurship, and technological advancement. It lays the foundation for a structured and strategic approach to nurturing startups and research-driven ventures within academic environments. The framework emphasizes the importance of establishing robust incubation centers, streamlining access to funding opportunities, and implementing effective intellectual property (IP) management systems. By integrating these key components, the policy encourages institutions to become catalysts for socio-economic growth and self-reliance, supporting students and faculty in transforming their ideas into impactful, market-ready solutions.


              </p>
              <a
                href={`${import.meta.env.BASE_URL}pdf/national_policy.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-700 font-semibold hover:underline"
              >
                Read National Policy →
              </a>
            </div>
          </div>
        </div>

        {/* Left (reversed) - Image Card */}
        <div className="bg-[#FFFBEA] border border-yellow-300 rounded-2xl p-3 shadow-md w-full lg:w-[40%] max-w-[450px]">
          <img
            src={`${import.meta.env.BASE_URL}images/national_policy.jpg`}
            alt="National Startup Policy"
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-yellow-500 to-orange-500 p-8 sm:p-12 rounded-2xl text-center text-white mt-20 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Join Our Educational Legacy</h2>
        <p className="text-base sm:text-xl mb-8 opacity-90 max-w-3xl mx-auto">
          Be part of an institution that has been shaping futures through innovation and academic
          excellence for over three decades.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/department/cse')}
            className="bg-white text-slate-900 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Explore Programs
          </button>
          <button
            onClick={() => navigate('/contact')}
            className="border-2 border-white text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-slate-900 transition-colors"
          >
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};
export default InnovationPolicy;