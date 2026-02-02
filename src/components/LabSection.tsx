import React from 'react';
import LabCard from './LabCard';
import cseLabsData from '../data/labs/cseLabs.json'; // Direct CSE labs import

// Types
type Image = { url: string; caption: string };
type Lab = { name: string; images: Image[] };
type CseLabsData = { name: string; subcategories: Lab[] };

interface LabSectionProps {
  departmentName: string;
}

const LabSection: React.FC<LabSectionProps> = ({ departmentName }) => {
  const labs: Lab[] = Array.isArray((cseLabsData as CseLabsData)?.subcategories)
    ? (cseLabsData as CseLabsData).subcategories
    : [];

// Static Data Dictionaries
const LAB_DESCRIPTIONS: Record<string, string> = {
  'Computer Science Lab':
    'Modern computing facility with high-performance systems for programming and software development.',
  'RDBMS Lab':
    'Database lab with enterprise DB servers and tools for SQL and data management.',
  'Network Lab':
    'Hands-on networking with routers, switches, and simulation tools.',
  'Operating System Lab':
    'Multiple OS environments for system programming and administration.',
};

const LAB_FEATURES: Record<string, string[]> = {
  'Computer Science Lab': ['High-performance PCs', 'Multiple IDEs', 'Git/VCS', 'Cloud access'],
  'RDBMS Lab': ['Oracle/MySQL', 'SQL Server', 'ER Modeling', 'Data tools'],
  'Network Lab': ['Cisco gear', 'Simulators', 'Firewall config', 'Wireless setup'],
  'Operating System Lab': ['VMs', 'Linux distros', 'System programming', 'Shell scripting'],
};

const LAB_CAPACITIES: Record<string, number> = {
  'Web Programming Lab': 75,
  'RDBMS Lab': 75,
  'Network Lab': 75,
  'Operating System Lab': 75,
};

const DEFAULT_FEATURES = ['Modern equipment', 'Expert guidance', 'Hands-on learning'];
const DEFAULT_DESCRIPTION = 'State-of-the-art facility designed for hands-on learning with modern equipment.';
const DEFAULT_CAPACITY = 30;

// Helper getters (pure functions)
const getLabDescription = (labName: string): string => LAB_DESCRIPTIONS[labName] || DEFAULT_DESCRIPTION;
const getLabFeatures = (labName: string): string[] => LAB_FEATURES[labName] || DEFAULT_FEATURES;
const getStudentCapacity = (labName: string): number => LAB_CAPACITIES[labName] ?? DEFAULT_CAPACITY;

  if (labs.length === 0) {
    return (
      <section className="bg-gray-50 py-16" id="laboratories">
        <div className="w-full">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 relative inline-block">
              Department Laboratories
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-yellow-500 rounded-full mt-1"></span>
            </h2>
            <p className="text-gray-600 mt-2">
              No lab data found for <strong>{departmentName}</strong>.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-16" id="laboratories">
      <div className="w-full">
        <div className="text-center mb-10">
          <h2 className="text-5xl font-bold text-gray-900">
            Department Laboratories
          </h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-gray-600 text-lg max-w-3xl mx-auto">
            State-of-the-art laboratories equipped with modern technology and tools to provide
            hands-on learning experience in {departmentName}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {labs.map((lab, index) => (
            <LabCard
              key={`${lab.name}-${index}`}
              name={lab.name}
              images={Array.isArray(lab.images) ? lab.images : []}
              description={getLabDescription(lab.name)}
              keyFeatures={getLabFeatures(lab.name)}
              studentCapacity={getStudentCapacity(lab.name)}
            />
          ))}
        </div>

        <div className="text-center bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Experience Our World-Class Facilities
          </h3>
          <p className="text-gray-600 mb-6">
            Schedule a campus visit to explore our laboratories and see how we’re preparing students for the future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-xl font-semibold transition-colors">
              Schedule Campus Visit
            </button>
            <button className="border-2 border-amber-500 text-amber-600 hover:bg-amber-50 px-8 py-3 rounded-xl font-semibold transition-colors">
              Download Lab Manual
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LabSection;
