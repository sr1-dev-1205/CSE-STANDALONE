import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import { 
  BookOpen, 
  FlaskConical, 
  Lightbulb, 
  Calendar, 
  Handshake, 
  Building2,
  ChevronLeft,
  Award,
  Users,
  Target
} from 'lucide-react';

const SDGInitiatives: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageLayout
      title="SDG Initiatives - CSE Department"
      description="Evidence of Addressing Sustainable Development Goals in Computer Science and Engineering"
    >
      <div className="min-h-screen bg-gray-50 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto -mt-32 pt-8">
          {/* Back Button - Yellow Arrow Style */}
          <button
            onClick={() => navigate(-1)}
            className="mb-2 w-12 h-12 flex items-center justify-center rounded-full bg-yellow-500 hover:bg-yellow-600 text-white transition-all duration-300 hover:scale-110 shadow-lg group"
            aria-label="Back to Department"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Header Section */}
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Sustainable Development Goals
            </h1>
            <div className="w-32 h-1 bg-yellow-400 rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              The Computer Science and Engineering (CSE) Department actively integrates Sustainable Development Goals (SDGs) 
              into various academic and research activities, ensuring that students develop technology-driven solutions to 
              address real-world challenges.
            </p>
          </div>

          {/* 17 SDG Goals Image */}
          <div className="mb-6 bg-white rounded-2xl shadow-lg p-4">
            <img
              src={`${import.meta.env.BASE_URL}SDG/17goalsofSDG.png`}
              alt="17 Goals of SDG"
              className="w-full h-auto max-h-64 object-contain rounded-xl"
            />
          </div>

          {/* Introduction */}
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl shadow-lg p-6 mb-8 border border-yellow-200">
            <p className="text-gray-700 leading-relaxed text-lg">
              Through curriculum enhancements, research projects, industry collaborations, and institutional initiatives, 
              the department actively contributes to sustainable development while fostering responsible innovation and 
              ethical computing. Through interdisciplinary projects, sustainable computing practices, and community-driven 
              initiatives, the department continuously evaluates and enhances its contribution toward global sustainability, 
              aligning with its commitment to academic excellence and societal impact.
            </p>
          </div>

          {/* 1. SDG in Curriculum */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <BookOpen className="w-8 h-8 text-yellow-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">1. SDG in Curriculum</h2>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
              <p className="text-gray-700 leading-relaxed mb-4">
                The department has seamlessly integrated SDG-related topics across multiple courses, including Problem Solving 
                and Programming in C, Advanced C Programming and Data Structures I, Introduction to IoT and Embedded Programming, 
                and Internship/Inplant Training. In C programming, sustainability concepts such as code optimization, code 
                reusability, and energy-efficient computing are emphasized to promote efficient and responsible software development.
              </p>

              {/* Curriculum Image */}
              <div className="mb-4 flex justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}SDG/unitedNationsLogo.png`}
                  alt="SDG Integration in Curriculum"
                  className="w-auto h-32 object-contain rounded-xl"
                />
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Table 3.6.1: List of sample subjects with SDG relevance as Case study/Complex Engineering Problems
                </h3>
                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-yellow-500 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-bold uppercase">S.No.</th>
                      <th className="px-6 py-3 text-left text-sm font-bold uppercase">Subject Name</th>
                      <th className="px-6 py-3 text-left text-sm font-bold uppercase">Casestudy/Complex Engineering Problems</th>
                      <th className="px-6 py-3 text-left text-sm font-bold uppercase">SDG Relevance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-yellow-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900">01</td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">Soft Computing</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Fuzzy Logic-Based Smart Climate Control for Energy-Efficient Office Environments</td>
                      <td className="px-6 py-4 text-sm text-gray-700">SDGs 3, 7, 9, 11, 12, 13</td>
                    </tr>
                    <tr className="hover:bg-yellow-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900">02</td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">Cryptography and Network Security</td>
                      <td className="px-6 py-4 text-sm text-gray-700">DDoS Attacks on an E-Commerce Platform During Peak Shopping Seasons</td>
                      <td className="px-6 py-4 text-sm text-gray-700">SDGs 9</td>
                    </tr>
                    <tr className="hover:bg-yellow-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900">03</td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">Machine Learning</td>
                      <td className="px-6 py-4 text-sm text-gray-700">AI-Driven Early Detection and Risk Stratification for Sepsis in Hospitals</td>
                      <td className="px-6 py-4 text-sm text-gray-700">SDGs 3, 9, 10</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 2. SDG in Research/Capstone Projects */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <FlaskConical className="w-8 h-8 text-yellow-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">2. SDG in Research/Capstone Projects</h2>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
              <p className="text-gray-700 leading-relaxed mb-4">
                The department actively engages in research and capstone projects that contribute to sustainable development. 
                Students have undertaken various SDG-aligned projects, demonstrating innovation and social impact. Additionally, 
                faculty members have developed an IoT-empowered Automated Solar Grass Cutter, which has received recognition in 
                an international journal, further highlighting the department's commitment to sustainable technology solutions.
              </p>

              {/* Research Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <img
                  src={`${import.meta.env.BASE_URL}SDG/grassCutterImage.png`}
                  alt="Solar Grass Cutter"
                  className="w-full h-48 object-contain rounded-xl shadow-md bg-gray-50"
                />
                <img
                  src={`${import.meta.env.BASE_URL}SDG/Grass Cutter Publication.png`}
                  alt="Grass Cutter Publication"
                  className="w-full h-48 object-contain rounded-xl shadow-md bg-gray-50"
                />
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Table 3.6.2: Sample list of Research/Capstone projects in relevance to SDG
                </h3>
                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-yellow-500 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-bold uppercase">S.No.</th>
                      <th className="px-4 py-3 text-left text-sm font-bold uppercase">Project Title</th>
                      <th className="px-4 py-3 text-left text-sm font-bold uppercase">Done by</th>
                      <th className="px-4 py-3 text-left text-sm font-bold uppercase">Team Details</th>
                      <th className="px-4 py-3 text-left text-sm font-bold uppercase">SDG Relevance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-yellow-50 transition-colors">
                      <td className="px-4 py-4 text-sm text-gray-900">01</td>
                      <td className="px-4 py-4 text-sm text-gray-900 font-medium">IoT-empowered Automated Solar Grass Cutter</td>
                      <td className="px-4 py-4 text-sm text-gray-700">Faculty</td>
                      <td className="px-4 py-4 text-sm text-gray-700">Mr.K.Murugan, Dr.A.Jameer Basha</td>
                      <td className="px-4 py-4 text-sm text-gray-700">SDGs 7, 9, 11, 12, 13</td>
                    </tr>
                    <tr className="hover:bg-yellow-50 transition-colors">
                      <td className="px-4 py-4 text-sm text-gray-900">02</td>
                      <td className="px-4 py-4 text-sm text-gray-900 font-medium">Smart Parking Android Application</td>
                      <td className="px-4 py-4 text-sm text-gray-700">Students</td>
                      <td className="px-4 py-4 text-sm text-gray-700">Kaviarasan.R, Irfan Rahim.Z, Imran Khan.S</td>
                      <td className="px-4 py-4 text-sm text-gray-700">SDGs 9, 11</td>
                    </tr>
                    <tr className="hover:bg-yellow-50 transition-colors">
                      <td className="px-4 py-4 text-sm text-gray-900">03</td>
                      <td className="px-4 py-4 text-sm text-gray-900 font-medium">Intelligent Crop Recommendations using Machine Learning</td>
                      <td className="px-4 py-4 text-sm text-gray-700">Students</td>
                      <td className="px-4 py-4 text-sm text-gray-700">Asritha Chidella, Gowthami Kurapati</td>
                      <td className="px-4 py-4 text-sm text-gray-700">SDGs 2, 9, 12</td>
                    </tr>
                    <tr className="hover:bg-yellow-50 transition-colors">
                      <td className="px-4 py-4 text-sm text-gray-900">04</td>
                      <td className="px-4 py-4 text-sm text-gray-900 font-medium">Smart Agriculture Using IOT</td>
                      <td className="px-4 py-4 text-sm text-gray-700">Students</td>
                      <td className="px-4 py-4 text-sm text-gray-700">P Manogna, Lokesh Mpt, Vengadesh J</td>
                      <td className="px-4 py-4 text-sm text-gray-700">SDGs 2, 9, 12, 15</td>
                    </tr>
                    <tr className="hover:bg-yellow-50 transition-colors">
                      <td className="px-4 py-4 text-sm text-gray-900">05</td>
                      <td className="px-4 py-4 text-sm text-gray-900 font-medium">Hydroponic Greenhouse Farming System (TNSCST PROJECT)</td>
                      <td className="px-4 py-4 text-sm text-gray-700">Students</td>
                      <td className="px-4 py-4 text-sm text-gray-700">Sikha G Jayan, Shilpa K P, Vaishnav, Shinas</td>
                      <td className="px-4 py-4 text-sm text-gray-700">SDGs 2, 6, 9, 12, 13</td>
                    </tr>
                    <tr className="hover:bg-yellow-50 transition-colors">
                      <td className="px-4 py-4 text-sm text-gray-900">06</td>
                      <td className="px-4 py-4 text-sm text-gray-900 font-medium">AI-Powered X-Ray Image Captioning System</td>
                      <td className="px-4 py-4 text-sm text-gray-700">Students</td>
                      <td className="px-4 py-4 text-sm text-gray-700">Karthick S, Kishore Rjanath Nikash K</td>
                      <td className="px-4 py-4 text-sm text-gray-700">SDGs 3, 9, 10, 17</td>
                    </tr>
                    <tr className="hover:bg-yellow-50 transition-colors">
                      <td className="px-4 py-4 text-sm text-gray-900">07</td>
                      <td className="px-4 py-4 text-sm text-gray-900 font-medium">Automated Drainage Monitoring System</td>
                      <td className="px-4 py-4 text-sm text-gray-700">Students</td>
                      <td className="px-4 py-4 text-sm text-gray-700">Kamaleshwari R, Kaviyasri J, Akshaya E, Kavin Kumar P</td>
                      <td className="px-4 py-4 text-sm text-gray-700">SDGs 3, 6, 9, 11, 13</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 3. SDG in Mini/Minor Projects */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Lightbulb className="w-8 h-8 text-yellow-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">3. SDG in Mini/Minor Projects</h2>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Students have successfully developed impactful projects that contribute to sustainable development. One such 
                project, Precision Blade Edge Decision submitted to L&T TECHgium, addresses key challenges in industrial 
                manufacturing, resource optimization, and environmental sustainability. This project enhances cutting-edge 
                precision in manufacturing, reducing material waste, improving energy efficiency, and ensuring the longevity 
                of tools, thereby aligning with multiple Sustainable Development Goals (SDGs 3, 9, 12, 13).
              </p>

              <div className="flex justify-center">
                <img
                  src={`${import.meta.env.BASE_URL}SDG/Sample Model of Precision Blade Edge Decision.png`}
                  alt="Precision Blade Edge Decision Model"
                  className="w-auto max-w-full h-56 object-contain rounded-xl shadow-md bg-gray-50"
                />
              </div>
            </div>
          </section>

          {/* 4. SDG in International/National Events */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Calendar className="w-8 h-8 text-yellow-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">4. SDG in International/National Events and Symposiums</h2>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                The department frequently hosts symposiums, webinars, and guest lectures on SDG-driven themes, including 
                Sustainable AI, Smart Cities, and Ethical Computing. Additionally, students actively participate in hackathons, 
                workshops, innovation challenges, and coding competitions focused on sustainability, covering areas like 
                Cybersecurity and Ethical Hacking (SDGs 4, 9, 11, 16), and more.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <img
                  src={`${import.meta.env.BASE_URL}SDG/events1.png`}
                  alt="Cybersecurity and Ethical Hacking Workshop"
                  className="w-full h-48 object-contain rounded-xl shadow-md bg-gray-50"
                />
                <img
                  src={`${import.meta.env.BASE_URL}SDG/events2.png`}
                  alt="SDG Events and Workshops"
                  className="w-full h-48 object-contain rounded-xl shadow-md bg-gray-50"
                />
              </div>
            </div>
          </section>

          {/* 5. SDG in Industry Collaborations */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Handshake className="w-8 h-8 text-yellow-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">5. SDG in Industry Collaborations</h2>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                The department has established strategic partnerships with industries and startups, leading to hands-on projects 
                in clean technology, smart agriculture, and digital healthcare. Internship programs offer students exposure to 
                real-world applications of sustainable supply chains, carbon footprint reduction, and green computing. 
                Industry-sponsored projects focus on energy-efficient computing, responsible AI, and ethical data management, 
                aligning with sustainable development objectives.
              </p>

              {/* Table */}
              <div className="overflow-x-auto">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Table 3.6.3: Sample list of project proposals applied to MSMEs in relevance to SDG
                </h3>
                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-yellow-500 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-bold uppercase">S.No.</th>
                      <th className="px-4 py-3 text-left text-sm font-bold uppercase">Category</th>
                      <th className="px-4 py-3 text-left text-sm font-bold uppercase">Project Title</th>
                      <th className="px-4 py-3 text-left text-sm font-bold uppercase">Student Details</th>
                      <th className="px-4 py-3 text-left text-sm font-bold uppercase">SDG Relevance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-yellow-50 transition-colors">
                      <td className="px-4 py-4 text-sm text-gray-900">01</td>
                      <td className="px-4 py-4 text-sm text-gray-700">MSME</td>
                      <td className="px-4 py-4 text-sm text-gray-900 font-medium">Empowering Farmers Reaching Consumers</td>
                      <td className="px-4 py-4 text-sm text-gray-700">Sujith D, Tamil Mani N, Sivaram G, Sanjay Kumar RS</td>
                      <td className="px-4 py-4 text-sm text-gray-700">SDGs 2, 8, 9, 12</td>
                    </tr>
                    <tr className="hover:bg-yellow-50 transition-colors">
                      <td className="px-4 py-4 text-sm text-gray-900">02</td>
                      <td className="px-4 py-4 text-sm text-gray-700">MSME</td>
                      <td className="px-4 py-4 text-sm text-gray-900 font-medium">Maximizing Efficiency with Process Mining</td>
                      <td className="px-4 py-4 text-sm text-gray-700">Arshad Khan S, Harish S, Sanjaj S, Balaji BL, Dinesh M</td>
                      <td className="px-4 py-4 text-sm text-gray-700">SDGs 8, 9, 12</td>
                    </tr>
                    <tr className="hover:bg-yellow-50 transition-colors">
                      <td className="px-4 py-4 text-sm text-gray-900">03</td>
                      <td className="px-4 py-4 text-sm text-gray-700">IIC - YUKTI 2.0</td>
                      <td className="px-4 py-4 text-sm text-gray-900 font-medium">Energy Efficient Integrated Water Aquaculture System</td>
                      <td className="px-4 py-4 text-sm text-gray-700">Abdul Rahim R (Team Lead)</td>
                      <td className="px-4 py-4 text-sm text-gray-700">SDGs 6, 7, 9, 12, 14</td>
                    </tr>
                    <tr className="hover:bg-yellow-50 transition-colors">
                      <td className="px-4 py-4 text-sm text-gray-900">04</td>
                      <td className="px-4 py-4 text-sm text-gray-700">IIC - YUKTI 2.0</td>
                      <td className="px-4 py-4 text-sm text-gray-900 font-medium">Hybrid Outdoor Air purifier</td>
                      <td className="px-4 py-4 text-sm text-gray-700">Kishorkanth K (Team Lead)</td>
                      <td className="px-4 py-4 text-sm text-gray-700">SDGs 3, 11, 13, 15</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 6. SDG in Institutional Practices */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Building2 className="w-8 h-8 text-yellow-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">6. SDG in Institutional Practices</h2>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                The department has implemented various sustainable practices within the institution, including paperless 
                documentation, energy-efficient computing labs, and digital learning platforms like Google Classroom, E-campus 
                ERP, and LMS. Additionally, community outreach initiatives, such as IGEN Green Day, led by students and faculty 
                under the HITECH Green Club, have actively promoted environmental awareness. This initiative earned the 
                prestigious IGEN SDG ACTION Winner Award in recognition of its impact.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <img
                  src={`${import.meta.env.BASE_URL}SDG/igenaward1.png`}
                  alt="IGEN SDG Award 1"
                  className="w-full h-48 object-contain rounded-xl shadow-md bg-gray-50"
                />
                <img
                  src={`${import.meta.env.BASE_URL}SDG/igenaward2.png`}
                  alt="IGEN SDG Award 2"
                  className="w-full h-48 object-contain rounded-xl shadow-md bg-gray-50"
                />
                <img
                  src={`${import.meta.env.BASE_URL}SDG/igenevent1.png`}
                  alt="IGEN Event 1"
                  className="w-full h-48 object-contain rounded-xl shadow-md bg-gray-50"
                />
                <img
                  src={`${import.meta.env.BASE_URL}SDG/igenevent2.png`}
                  alt="IGEN Event 2"
                  className="w-full h-48 object-contain rounded-xl shadow-md bg-gray-50"
                />
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 rounded-2xl shadow-2xl p-6 text-center text-white">
            <Award className="w-12 h-12 mx-auto mb-3" />
            <h2 className="text-2xl font-bold mb-3">Commitment to Sustainability</h2>
            <p className="text-base leading-relaxed max-w-4xl mx-auto">
              Through these comprehensive initiatives, the CSE Department demonstrates its unwavering commitment to 
              integrating sustainable development goals across all aspects of education, research, and institutional 
              practices, preparing students to be responsible global citizens and innovative problem solvers.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SDGInitiatives;
