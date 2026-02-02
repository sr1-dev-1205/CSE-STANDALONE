import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import SectionWrapper from '../components/layout/SectionWrapper';
import recruitersData from '../data/recruiters.json';

interface Recruiter {
  name: string;
  logo?: string;
}

const famousRecruitersOrder: string[] = [
  'Amazon',
  'Juspay',
  'Cognizant',
  'Zoho Corporation',
  'Wipro',
  'Rinex Technologies',
  'Google',
  'Microsoft',
  'TCS',
  'Turing',
  'Vivnovation',
  'CTS GENC NEXT',
  'Infosys',
  'Accenture',
  'LTIMindtree',
  'Hexaware Technologies',
  'HCL Tech',
  'L&T',
  'Goldman Sachs',
  'Thoughtworks',
  'Qualcomm',
  'Capgemini',
  'MRF Limited',
  'Flipkart',
  'Axis Bank',
  'Bajaj Finance Limited',
  'SBI Card',
  'UST Global',
];

const sortedRecruiters: Recruiter[] = [...(recruitersData as Recruiter[])].sort((a, b) => {
  const indexA = famousRecruitersOrder.indexOf(a.name);
  const indexB = famousRecruitersOrder.indexOf(b.name);

  const isAFamous = indexA !== -1;
  const isBFamous = indexB !== -1;

  if (isAFamous && isBFamous) {
    return indexA - indexB;
  }

  if (isAFamous) return -1;
  if (isBFamous) return 1;

  return a.name.localeCompare(b.name);
});

const companyDomainOverrides: Record<string, string> = {
  'Amazon': 'amazon.com',
  'Wipro': 'wipro.com',
  'Cognizant': 'cognizant.com',
  'Zoho Corporation': 'zoho.com',
  'Hexaware Technologies': 'hexaware.com',
  'HCL Tech': 'hcltech.com',
  'L&T': 'larsentoubro.com',
  'Goldman Sachs': 'goldmansachs.com',
  'Thoughtworks': 'thoughtworks.com',
  'Qualcomm': 'qualcomm.com',
  'Capgemini': 'capgemini.com',
  'Flipkart': 'flipkart.com',
  'Axis Bank': 'axisbank.com',
  'Bajaj Finance Limited': 'bajajfinserv.in',
  'SBI Card': 'sbicard.com',
  'UST Global': 'ust.com',
};

function buildDomainFromName(name: string): string | undefined {
  const override = companyDomainOverrides[name];
  if (override) return override;

  const cleaned = name
    .toLowerCase()
    .replace(/\([^)]*\)/g, '')
    .replace(/[^a-z0-9]/g, '')
    .trim();

  if (!cleaned) return undefined;
  return `${cleaned}.com`;
}

function getCompanyEnrichLogoUrl(companyName: string): string | undefined {
  if (companyName === 'Amazon') {
    return `${import.meta.env.BASE_URL}logos/amazon.png`;
  }
  if (companyName === 'QSpiders') {
    return `${import.meta.env.BASE_URL}logos/qspiders.png`;
  }
  const token = 'pk_K8u3uM3kQMik6ox3R29MqA';
  const encodedName = encodeURIComponent(companyName);
  return `https://img.logo.dev/name/${encodedName}?token=${token}`;
}

const RecruitersPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <PageLayout
      title="Top Recruiters - Hindusthan Institute of Technology"
      description="Explore all our campus recruiters and industry partners who offer opportunities to our students."
    >
      {/* Back Button (standardized size) */}
      <button
        onClick={() => navigate(-1)}
        className="group fixed top-[200px] left-9 z-50 w-12 h-12 rounded-full bg-yellow-500 shadow-lg flex items-center justify-center cursor-pointer hover:bg-yellow-600 transition-all duration-300"
        aria-label="Back"
      >
        <ChevronLeft className="w-6 h-6 text-black" strokeWidth={3} />
        <span className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded bg-black text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Back
        </span>
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-32">
        <SectionWrapper lazy lazyHeight="200px" lazyDelay={300} className="-mt-12">
          <div className="text-center mb-10">
            <h1 className="text-4.2xl sm:text-5xl font-bold text-gray-900 mb-4">Our Recruiters</h1>
            <div className="w-32 h-1 bg-yellow-400 rounded-full mx-auto mt-2 mb-4"></div>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              We are partnered with leading companies across IT, core engineering, finance and emerging tech
              domains who regularly visit our campus for recruitment.
            </p>
            <p className="mt-3 text-sm text-gray-500">
              Total Companies: <span className="font-semibold">{sortedRecruiters.length}</span>
            </p>
          </div>
        </SectionWrapper>

        <SectionWrapper lazy lazyHeight="600px" lazyDelay={400}>
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
              {sortedRecruiters.map((company) => {
                const logoUrl = getCompanyEnrichLogoUrl(company.name);
                return (
                  <div
                    key={company.name}
                    className="flex flex-col items-center justify-center bg-gray-50 rounded-xl border border-gray-200 p-3 sm:p-4 hover:border-yellow-300 hover:shadow-md transition-all"
                  >
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt={company.name}
                        className="w-14 h-14 sm:w-16 sm:h-16 object-contain mb-2 sm:mb-3"
                      />
                    ) : (
                      <div className="w-14 h-14 sm:w-16 sm:h-16 mb-2 sm:mb-3 rounded-full flex items-center justify-center bg-yellow-100 text-yellow-700 font-bold text-lg">
                        {company.name.charAt(0)}
                      </div>
                    )}
                    <p className="text-center text-[11px] sm:text-xs font-medium text-gray-800 leading-snug">
                      {company.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </SectionWrapper>

        {/* Call to Action */}
        <div className="mt-12 mb-8 max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-8 sm:px-10 sm:py-12 md:py-14 rounded-xl sm:rounded-2xl text-center text-white">
            <h2 className="text-lg sm:text-xl md:text-3xl font-bold mb-2 sm:mb-4">
              Join Our Educational Legacy
            </h2>
            <p className="text-sm sm:text-base md:text-lg mb-5 sm:mb-6 md:mb-8 opacity-90 max-w-2xl mx-auto px-2">
              Be part of an institution that has been shaping futures
              for over three decades
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-2">
              <button className="bg-white text-gray-900 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-200 w-full sm:w-auto">
                Explore Programs
              </button>
              <button className="border-2 border-white text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition duration-200 w-full sm:w-auto">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default RecruitersPage;
