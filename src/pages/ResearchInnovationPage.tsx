import { useState, useEffect, Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  DollarSign,
  Clock,
  Lightbulb,
  FileText,
  Award,
  Briefcase,
  ChevronRight,
  ArrowRight,
  Building2,
  Calendar,
  Target,
  ChevronLeft,
  ChevronRight as ExpandIcon,
  ChevronLeft as CollapseIcon,
} from "lucide-react";
import PageLayout from "../components/layout/PageLayout";

// ==================== Type Definitions ====================

interface Column {
  key: string;
  label: string;
}

interface TableProps {
  items: any[];
  selectedYear?: string;
  type?: string;
}

interface PaginationConfig {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  filteredItemsLength: number;
}

// ==================== Constants ====================

const ITEMS_PER_PAGE = 10;

const iconMap = {
  DollarSign,
  Clock,
  Lightbulb,
  FileText,
  Award,
  Briefcase,
};

const fieldIconMap: Record<string, any> = {
  funding: DollarSign,
  fundingAgency: Building2,
  funding_agency: Building2,
  status: Clock,
  duration: Calendar,
  year: Calendar,
  years: Calendar,
  client: Building2,
  amount: DollarSign,
  type: FileText,
  journal: FileText,
  conference: FileText,
  impactFactor: Target,
  location: Building2,
  patentNumber: Award,
  filingDate: Calendar,
  impact: Target,
};

const EXCLUDE_FIELDS = ["title", "description", "authors", "author"];

// ==================== Utility Functions ====================

const extractUniqueYears = (items: any[], yearKey: string = 'year'): string[] => {
  return Array.from(new Set(items.map((item) => String(item[yearKey]))))
    .sort((a, b) => {
      const yearA = parseInt(a.split('-')[0]);
      const yearB = parseInt(b.split('-')[0]);
      return yearB - yearA;
    });
};

const filterItemsByYear = (items: any[], selectedYear: string, yearKey: string = 'year'): any[] => {
  return selectedYear === 'All' 
    ? items 
    : items.filter((item) => String(item[yearKey]) === selectedYear);
};

const groupItemsByYear = (items: any[], yearKey: string = 'year'): Record<string, any[]> => {
  return items.reduce((acc: any, item: any) => {
    const yearStr = String(item[yearKey]);
    if (!acc[yearStr]) {
      acc[yearStr] = [];
    }
    acc[yearStr].push(item);
    return acc;
  }, {});
};

const sortYearsDescending = (years: string[]): string[] => {
  return years.sort((a, b) => {
    const yearA = parseInt(a.split('-')[0]);
    const yearB = parseInt(b.split('-')[0]);
    return yearB - yearA;
  });
};

const calculatePagination = (
  filteredItems: any[],
  currentPage: number,
  itemsPerPage: number = ITEMS_PER_PAGE
): { paginatedItems: any[]; config: PaginationConfig } => {
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  return {
    paginatedItems,
    config: {
      currentPage,
      totalPages,
      startIndex,
      endIndex,
      filteredItemsLength: filteredItems.length,
    },
  };
};

const formatFieldName = (key: string): string => {
  const displayKey = key
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .trim();
  return displayKey.charAt(0).toUpperCase() + displayKey.slice(1);
};

// ==================== Column Configurations ====================

const SEED_MONEY_COLUMNS: Column[] = [
  { key: 'serialNo', label: 'S.N.' },
  { key: 'facultyName', label: 'FACULTY NAME' },
  { key: 'title', label: 'PROJECT TITLE / SUPPORTOR ACTIVITY' },
  { key: 'duration', label: 'DURATION' },
  { key: 'amount', label: 'AMOUNT (LACS)' },
  { key: 'amountUtilized', label: 'AMOUNT UTILIZED IN (LACS)' },
  { key: 'outcomes', label: 'OUTCOMES OF THE PROJECT' },
];

const PATENTS_COLUMNS: Column[] = [
  { key: 'serialNo', label: 'S.N.' },
  { key: 'facultyName', label: 'FACULTY NAME' },
  { key: 'title', label: 'TITLE OF THE PATENT' },
  { key: 'applicationNo', label: 'APPLICATION NO.' },
  { key: 'dateOfFiling', label: 'DATE OF FILING' },
  { key: 'status', label: 'STATUS' },
];

const CONSULTANCY_COLUMNS: Column[] = [
  { key: 'serialNo', label: 'S.N.' },
  { key: 'pi_name', label: 'PI NAME' },
  { key: 'co_pi_names', label: 'CO-PI NAMES' },
  { key: 'project_title', label: 'PROJECT TITLE' },
  { key: 'funding_agency', label: 'FUNDING AGENCY' },
  { key: 'duration', label: 'DURATION' },
  { key: 'amount_rs', label: 'AMOUNT (RS)' },
];

const FUNDED_PROJECT_COLUMNS: Column[] = [
  { key: 'serialNo', label: 'S.N.' },
  { key: 'projectTitle', label: 'PROJECT TITLE' },
  { key: 'fundingAgency', label: 'FUNDING AGENCY' },
  { key: 'principalInvestigator', label: 'PRINCIPAL INVESTIGATOR' },
  { key: 'coPrincipalInvestigator', label: 'CO-PRINCIPAL INVESTIGATOR' },
  { key: 'projectDuration', label: 'PROJECT DURATION' },
  { key: 'sanctionedAmount', label: 'SANCTIONED AMOUNT' },
  { key: 'status', label: 'STATUS' },
];

const SEMINAR_GRANT_COLUMNS: Column[] = [
  { key: 'serialNo', label: 'S.N.' },
  { key: 'eventTitle', label: 'EVENT TITLE' },
  { key: 'fundingAgency', label: 'FUNDING AGENCY' },
  { key: 'coordinator', label: 'COORDINATOR' },
  { key: 'eventDate', label: 'EVENT DATE' },
  { key: 'sanctionedAmount', label: 'SANCTIONED AMOUNT' },
  { key: 'status', label: 'STATUS' },
];

const getPublicationColumns = (type: string): Column[] => {
  if (type === 'book-chapter') {
    return [
      { key: 'serialNo', label: 'S.N.' },
      { key: 'title', label: 'BOOK TITLE' },
      { key: 'bookTitle', label: 'BOOK CHAPTER' },
      { key: 'authors', label: 'AUTHOR NAME' },
      { key: 'isbn', label: 'ISBN NUMBER' },
      { key: 'publisher', label: 'PUBLISHER NAME' },
      { key: 'status', label: 'STATUS' },
    ];
  } else if (type === 'conference') {
    return [
      { key: 'serialNo', label: 'S.N.' },
      { key: 'authors', label: 'FACULTY NAME' },
      { key: 'conference', label: 'CONFERENCE NAME' },
      { key: 'indexedIn', label: 'INDEXED IN' },
      { key: 'title', label: 'PAPER TITLE' },
      { key: 'year', label: 'MONTH & YEAR' },
    ];
  } else {
    return [
      { key: 'serialNo', label: 'S.N.' },
      { key: 'authors', label: 'FACULTY NAME' },
      { key: 'journal', label: 'JOURNAL NAME' },
      { key: 'indexedIn', label: 'INDEXING' },
      { key: 'title', label: 'PAPER TITLE' },
      { key: 'publicationDetails', label: 'PUBLICATION DETAILS' },
      { key: 'monthYear', label: 'MONTH & YEAR' },
    ];
  }
};

// ==================== Reusable Components ====================

// Year Filter Dropdown Component
const YearFilter: React.FC<{
  years: string[];
  selectedYear: string;
  onYearChange: (year: string) => void;
}> = ({ years, selectedYear, onYearChange }) => {
  if (years.length <= 1) return null;

  return (
    <div className="flex justify-end mb-4">
      <select
        value={selectedYear}
        onChange={(e) => onYearChange(e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-300 text-sm sm:text-base focus:ring-2 focus:ring-amber-400 bg-white shadow-sm hover:border-amber-400 transition-colors"
      >
        <option value="All">All Years</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

// Table Header Component
const TableHeader: React.FC<{
  columns: Column[];
  expanded: boolean;
  onToggleExpand: () => void;
}> = ({ columns, expanded, onToggleExpand }) => (
  <thead>
    <tr className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-400 text-white">
      {columns.map((col, idx) => (
        <th
          key={col.key}
          className={`relative px-3 sm:px-4 py-3 text-center font-semibold text-xs sm:text-sm ${
            idx < columns.length - 1 ? 'border-r border-amber-300' : ''
          } ${idx === 0 ? 'rounded-tl-2xl' : ''} ${
            idx === columns.length - 1 ? 'rounded-tr-2xl pr-12' : ''
          }`}
        >
          {col.label}
          {idx === columns.length - 1 && (
            <div className="absolute -right-[-1.5px] top-1/2 -translate-y-1/2">
              <button
                onClick={onToggleExpand}
                className={`p-1.5 rounded-full shadow-lg transition-colors ${
                  expanded
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-orange-500 hover:bg-orange-500 hover:text-white'
                }`}
              >
                {expanded ? (
                  <CollapseIcon className="w-3.5 h-3.5" />
                ) : (
                  <ExpandIcon className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          )}
        </th>
      ))}
    </tr>
  </thead>
);

// Table Cell Content Renderer
const renderCellContent = (item: any, colKey: string, tableType?: string): React.ReactNode => {
  const value = item[colKey];

  // Status badge for patents and publications
  if (colKey === 'status') {
    const isGranted = value?.toLowerCase().includes('granted');
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs sm:text-sm font-semibold ${
          isGranted
            ? 'bg-green-100 text-green-700 border border-green-200'
            : 'bg-blue-100 text-blue-700 border border-blue-200'
        }`}
      >
        {value}
      </span>
    );
  }

  // Array handling for co-PI names
  if (colKey === 'co_pi_names' && Array.isArray(value)) {
    return value.join(', ');
  }

  return value;
};

// Pagination Component
const Pagination: React.FC<{
  config: PaginationConfig;
  onPageChange: (page: number) => void;
}> = ({ config, onPageChange }) => {
  const { currentPage, totalPages, startIndex, endIndex, filteredItemsLength } = config;

  if (totalPages <= 1) return null;

  const renderPageButtons = () => {
    const buttons = [];
    const maxButtons = Math.min(totalPages, 5);

    for (let i = 0; i < maxButtons; i++) {
      let pageNum: number;
      if (totalPages <= 5) {
        pageNum = i + 1;
      } else if (currentPage <= 3) {
        pageNum = i + 1;
      } else if (currentPage >= totalPages - 2) {
        pageNum = totalPages - (4 - i);
      } else {
        pageNum = currentPage - 2 + i;
      }

      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(pageNum)}
          className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-md ${
            currentPage === pageNum
              ? 'bg-amber-100 text-amber-700 border border-amber-400'
              : 'text-gray-600 hover:bg-gray-100 border border-transparent'
          }`}
        >
          {pageNum}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-center gap-3 rounded-2xl border border-gray-200">
      <div className="text-xs sm:text-sm text-gray-700">
        Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
        <span className="font-medium">{Math.min(endIndex, filteredItemsLength)}</span> of{' '}
        <span className="font-medium">{filteredItemsLength}</span> results
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="p-1 sm:p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} />
        </button>
        {renderPageButtons()}
        {totalPages > 5 && currentPage < totalPages - 2 && (
          <>
            <span className="px-1 text-gray-500">...</span>
            <button
              onClick={() => onPageChange(totalPages)}
              className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-md ${
                currentPage === totalPages
                  ? 'bg-amber-100 text-amber-700 border border-amber-400'
                  : 'text-gray-600 hover:bg-gray-100 border border-transparent'
              }`}
            >
              {totalPages}
            </button>
          </>
        )}
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-1 sm:p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

// Generic Data Table Component
const DataTable: React.FC<{
  items: any[];
  allColumns: Column[];
  leftAlignKeys?: string[];
  yearKey?: string;
  tableType?: string;
}> = ({ items, allColumns, leftAlignKeys = ['title'], yearKey = 'year', tableType }) => {
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [expanded, setExpanded] = useState(false);

  const years = extractUniqueYears(items, yearKey);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedYear]);

  const filteredItems = filterItemsByYear(items, selectedYear, yearKey);
  const { paginatedItems, config } = calculatePagination(filteredItems, currentPage);
  const itemsByYear = groupItemsByYear(paginatedItems, yearKey);
  const sortedYears = sortYearsDescending(Object.keys(itemsByYear));

  const compactColumns = allColumns.slice(0, 4);
  const columns = expanded ? allColumns : compactColumns;

  return (
    <div className="space-y-4">
      <YearFilter years={years} selectedYear={selectedYear} onYearChange={setSelectedYear} />

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full rounded-2xl border border-gray-200 shadow-lg">
          <table className="min-w-full border-collapse">
            <TableHeader columns={columns} expanded={expanded} onToggleExpand={() => setExpanded(!expanded)} />
            <tbody>
              {sortedYears.length > 0 ? (
                sortedYears.map((year) => (
                  <Fragment key={year}>
                    {itemsByYear[year].map((item: any, index: number) => (
                      <tr
                        key={`${year}-${index}`}
                        className="even:bg-gray-50 hover:bg-amber-50 transition duration-150 border-b border-gray-100"
                      >
                        {columns.map((col, colIdx) => {
                          const isLeftAlign = leftAlignKeys.includes(col.key);
                          return (
                            <td
                              key={col.key}
                              className={`px-3 sm:px-4 py-3 ${
                                isLeftAlign ? 'text-left' : 'text-center'
                              } text-gray-700 text-sm ${
                                colIdx < columns.length - 1 ? 'border-r border-gray-100' : ''
                              } ${isLeftAlign ? 'leading-relaxed font-medium' : ''}`}
                            >
                              {renderCellContent(item, col.key, tableType)}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="py-6 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination config={config} onPageChange={setCurrentPage} />
    </div>
  );
};

// ==================== Specific Table Components ====================

const SeedMoneyTable: React.FC<TableProps> = ({ items }) => (
  <DataTable
    items={items}
    allColumns={SEED_MONEY_COLUMNS}
    leftAlignKeys={['title', 'outcomes']}
  />
);

const PatentsTable: React.FC<TableProps> = ({ items }) => (
  <DataTable
    items={items}
    allColumns={PATENTS_COLUMNS}
    leftAlignKeys={['title']}
    tableType="patents"
  />
);

const ConsultancyTable: React.FC<TableProps> = ({ items }) => (
  <DataTable
    items={items}
    allColumns={CONSULTANCY_COLUMNS}
    leftAlignKeys={['project_title']}
  />
);

const FundedProjectTable: React.FC<TableProps> = ({ items }) => (
  <DataTable
    items={items}
    allColumns={FUNDED_PROJECT_COLUMNS}
    leftAlignKeys={['projectTitle', 'principalInvestigator', 'coPrincipalInvestigator']}
    yearKey="status"
  />
);

const SeminarGrantTable: React.FC<TableProps> = ({ items }) => (
  <DataTable
    items={items}
    allColumns={SEMINAR_GRANT_COLUMNS}
    leftAlignKeys={['eventTitle', 'coordinator']}
    yearKey="status"
  />
);




const PublicationTable: React.FC<TableProps> = ({ items, type = 'book-chapter', selectedYear = 'All' }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedYear]);

  const filteredItems = filterItemsByYear(items, selectedYear);
  const { paginatedItems, config } = calculatePagination(filteredItems, currentPage);
  const itemsByYear = groupItemsByYear(paginatedItems);
  const sortedYears = sortYearsDescending(Object.keys(itemsByYear));

  const allColumns = getPublicationColumns(type);
  const compactColumns = allColumns.slice(0, 4);
  const columns = expanded ? allColumns : compactColumns;

  const leftAlignKeys = ['title', 'authors', 'bookTitle', 'conference', 'indexedIn', 'journal', 'publicationDetails'];

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full rounded-2xl border border-gray-200 shadow-lg">
          <table className="min-w-full border-collapse">
            <TableHeader columns={columns} expanded={expanded} onToggleExpand={() => setExpanded(!expanded)} />
            <tbody>
              {sortedYears.length > 0 ? (
                sortedYears.map((year) => (
                  <Fragment key={year}>
                    {itemsByYear[year].map((item: any, index: number) => (
                      <tr
                        key={`${year}-${index}`}
                        className="even:bg-gray-50 hover:bg-amber-50 transition duration-150 border-b border-gray-100"
                      >
                        {columns.map((col, colIdx) => {
                          const isLeftAlign = leftAlignKeys.includes(col.key);
                          return (
                            <td
                              key={col.key}
                              className={`px-3 sm:px-4 py-3 ${
                                isLeftAlign ? 'text-left' : 'text-center'
                              } text-gray-700 text-sm ${
                                colIdx < columns.length - 1 ? 'border-r border-gray-100' : ''
                              } ${isLeftAlign ? 'leading-relaxed font-medium' : ''}`}
                            >
                              {renderCellContent(item, col.key, 'publication')}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="py-6 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination config={config} onPageChange={setCurrentPage} />
    </div>
  );
};

// Research Card Component
const ResearchCard: React.FC<{ item: any }> = ({ item }) => {
  return (
    <div className="flex-shrink-0 w-96 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-yellow-400">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          {item.year && (
            <span className="bg-yellow-500 text-white px-4 py-1.5 rounded-md text-sm font-bold">
              {item.year}
            </span>
          )}
          {item.status && (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              item.status === 'Active' || item.status === 'Ongoing'
                ? 'bg-green-100 text-green-700'
                : item.status === 'Completed'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700'
            }`}>
              {item.status}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-gray-900 leading-tight mb-3 line-clamp-2">
          {item.title}
        </h3>
        <div className="border-b-2 border-yellow-500 w-16 mb-4"></div>

        {(item.authors || item.author) && (
          <div className="mb-3">
            <p className="text-sm font-semibold text-yellow-600 uppercase mb-2">Faculty/Researchers</p>
            <div className="space-y-1 text-gray-700 text-sm">
              {item.authors
                ? item.authors.map((author: string, idx: number) => (
                    <p key={idx}>{author}</p>
                  ))
                : <p>{item.author}</p>}
            </div>
          </div>
        )}

        {item.description && (
          <div className="mb-3">
            <p className="text-sm font-semibold text-yellow-600 uppercase mb-2">Description</p>
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{item.description}</p>
          </div>
        )}

        {item.fundingAgency && (
          <div className="mb-3">
            <p className="text-sm font-semibold text-yellow-600 uppercase mb-2">Funding Agency</p>
            <p className="text-gray-700 text-sm">{item.fundingAgency}</p>
          </div>
        )}

        {item.funding && (
          <div className="mb-3">
            <p className="text-sm font-semibold text-yellow-600 uppercase mb-2">Funding</p>
            <p className="text-gray-700 text-sm font-semibold">{item.funding}</p>
          </div>
        )}

        {item.duration && (
          <div className="mb-3">
            <p className="text-sm font-semibold text-yellow-600 uppercase mb-2">Duration</p>
            <p className="text-gray-700 text-sm">{item.duration}</p>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-gray-200">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-600 transition-all duration-200">
            <span>View Details</span>
            <ArrowRight className="w-4 h-4 transition-transform hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== Main Page Component ====================

const ResearchInnovationPage: React.FC = () => {
  const [tabs, setTabs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>("seed-money");
  const [publicationCategory, setPublicationCategory] = useState<string>("book-chapter");
  const [publicationYear, setPublicationYear] = useState<string>("All");
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("../data/researchInnovationData.json").then((data) => {
      const enrichedTabs = data.tabs.map((tab: any) => ({
        ...tab,
        icon: iconMap[tab.icon as keyof typeof iconMap] || FileText,
      }));
      setTabs(enrichedTabs);
    });
  }, []);

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  const renderTabContent = () => {
    if (!activeTabData) return null;

    switch (activeTab) {
      case "seed-money":
        return <SeedMoneyTable items={activeTabData.content.items} />;
      case "patent":
        return <PatentsTable items={activeTabData.content.items} />;
      case "consultancy":
        return <ConsultancyTable items={activeTabData.content.items} />;
      case "fund_project":
        return <FundedProjectTable items={activeTabData.content.items} />;
      case "seminar_grant":
        return <SeminarGrantTable items={activeTabData.content.items} />;
      case "publication":
        if (activeTabData.content.hasDropdown) {
          return (
            <PublicationTable
              items={activeTabData.content.categories[publicationCategory].items}
              type={publicationCategory}
              selectedYear={publicationYear}
            />
          );
        }
        return null;
      default:
        return (
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                ref={scrollRef}
                className="flex animate-scroll-left gap-6 pb-4"
                onMouseEnter={() => {
                  const element = scrollRef.current;
                  if (element) {
                    element.style.animationPlayState = 'paused';
                  }
                }}
                onMouseLeave={() => {
                  const element = scrollRef.current;
                  if (element) {
                    element.style.animationPlayState = 'running';
                  }
                }}
              >
                {[...activeTabData.content.items, ...activeTabData.content.items].map((item: any, index: number) => (
                  <ResearchCard key={index} item={item} />
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <PageLayout
      title="Research & Innovation - CSE Department"
      description="Research projects, innovations, publications, patents and consultancy services"
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

      <div className="w-full px-4 sm:px-6 lg:px-8 pb-12 max-w-7xl mx-auto mt-[-60px]">

        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
            Research & Innovation
          </h1>
          <div className="w-32 h-1 bg-yellow-400 rounded-full mx-auto mb-2"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our cutting-edge research projects, innovative solutions, publications,
            patents, and consultancy services driving technological advancement
          </p>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex sm:flex-wrap overflow-x-auto sm:overflow-visible no-scrollbar">
              {tabs.map((tab: any) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center flex-shrink-0 min-w-[150px] sm:min-w-0 sm:flex-1 space-x-2 px-3 sm:px-6 py-3 sm:py-4 font-medium transition-all duration-200 border-b-2 ${
                    activeTab === tab.id
                      ? "text-yellow-600 border-yellow-500 bg-yellow-50"
                      : "text-gray-600 border-transparent hover:text-yellow-600 hover:bg-yellow-50"
                  }`}
                >
                  {tab.icon && <tab.icon className="h-5 w-5" />}
                  <span className="text-sm sm:text-base">{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 sm:p-8">
            {activeTabData && (
              <div className="space-y-3">
                <div className="mb-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {activeTabData.content.title}
                  </h2>
                </div>

                {/* Publication Category and Year Filters */}
                {activeTab === "publication" && activeTabData.content.hasDropdown && (
                  <div className="flex flex-col sm:flex-row justify-end gap-3 mb-6">
                    <select
                      value={publicationCategory}
                      onChange={(e) => {
                        setPublicationCategory(e.target.value);
                        setPublicationYear("All");
                      }}
                      className="px-4 py-2 rounded-lg border border-gray-300 text-sm sm:text-base focus:ring-2 focus:ring-yellow-400 bg-white shadow-sm hover:border-yellow-400 transition-colors"
                    >
                      <option value="book-chapter">Book Chapter</option>
                      <option value="conference">Conference</option>
                      <option value="journal">Journal</option>
                    </select>

                    <select
                      value={publicationYear}
                      onChange={(e) => setPublicationYear(e.target.value)}
                      className="px-4 py-2 rounded-lg border border-gray-300 text-sm sm:text-base focus:ring-2 focus:ring-yellow-400 bg-white shadow-sm hover:border-yellow-400 transition-colors"
                    >
                      <option value="All">All Years</option>
                      {(Array.from(
                        new Set(
                          activeTabData.content.categories[publicationCategory].items.map(
                            (item: any) => String(item.year)
                          )
                        )
                      ) as string[])
                        .sort((a: string, b: string) => parseInt(b) - parseInt(a))
                        .map((year: string) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                    </select>
                  </div>
                )}

                {renderTabContent()}
              </div>
            )}
          </div>
        </div>
        {/* Call to Action */}
        <div className="mt-12 mb-8 max-w-7xl mx-auto px-4">
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

export default ResearchInnovationPage;
