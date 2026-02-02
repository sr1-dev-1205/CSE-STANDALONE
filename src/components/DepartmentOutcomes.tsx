import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Target, Award, BookOpen } from 'lucide-react';

interface Outcome {
  id: string;
  title: string;
  description: string;
}

interface DepartmentOutcomesProps {
  psos: Outcome[];
  peos: Outcome[];
  pos: Outcome[];
  departmentName: string;
}

const DepartmentOutcomes: React.FC<DepartmentOutcomesProps> = ({
  psos,
  peos,
  pos,
  departmentName,
}) => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const renderOutcomes = (outcomes: Outcome[], columns: number = 2) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {outcomes.map((outcome) => (
        <div
          key={outcome.id}
          className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-yellow-300 hover:shadow-md transition-all duration-300 group"
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="bg-yellow-500 text-white px-3 py-1 rounded-full font-bold text-sm">
              {outcome.id}
            </div>
            <h4 className="font-bold text-gray-900 group-hover:text-yellow-700 transition-colors break-words">
              {outcome.title}
            </h4>
            <p className="text-gray-600 leading-relaxed text-sm break-words">
              {outcome.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="px-8 pt-8 pb-4">
        {/* Heading */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center">
            Program Outcomes & Educational Objectives
          </h3>
        </div>

        <div className="space-y-6">
          {/* PSOs & PEOs */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* PSOs */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleAccordion('psos')}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Target className="h-6 w-6 text-blue-600" />
                  <h4 className="text-lg font-bold text-gray-900">
                    Program Specific Outcomes (PSOs)
                  </h4>
                </div>
                {activeAccordion === 'psos' ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {activeAccordion === 'psos' && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-200 pt-6 space-y-4">
                    {psos.map((pso) => (
                      <div
                        key={pso.id}
                        className="bg-blue-50 p-4 rounded-lg border border-blue-200"
                      >
                        <div className="flex flex-col items-center text-center space-y-3">
                          <div className="bg-blue-500 text-white px-3 py-1 rounded-full font-bold text-xs">
                            {pso.id}
                          </div>
                          <h5 className="font-semibold text-gray-900 break-words">
                            {pso.title}
                          </h5>
                          <p className="text-gray-700 text-sm leading-relaxed break-words">
                            {pso.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* PEOs */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleAccordion('peos')}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Award className="h-6 w-6 text-green-600" />
                  <h4 className="text-lg font-bold text-gray-900">
                    Program Educational Objectives (PEOs)
                  </h4>
                </div>
                {activeAccordion === 'peos' ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {activeAccordion === 'peos' && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-200 pt-6 space-y-4">
                    {peos.map((peo) => (
                      <div
                        key={peo.id}
                        className="bg-green-50 p-4 rounded-lg border border-green-200"
                      >
                        <div className="flex flex-col items-center text-center space-y-3">
                          <div className="bg-green-500 text-white px-3 py-1 rounded-full font-bold text-xs">
                            {peo.id}
                          </div>
                          <h5 className="font-semibold text-gray-900 break-words">
                            {peo.title}
                          </h5>
                          <p className="text-gray-700 text-sm leading-relaxed break-words">
                            {peo.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* POs */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleAccordion('pos')}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <BookOpen className="h-6 w-6 text-purple-600" />
                <h4 className="text-lg font-bold text-gray-900">
                  Program Outcomes (POs) - 11 Outcomes
                </h4>
              </div>
              {activeAccordion === 'pos' ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {activeAccordion === 'pos' && (
              <div className="px-6 pb-6">
                <div className="border-t border-gray-200 pt-6">
                  {renderOutcomes(pos, 2)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentOutcomes;
