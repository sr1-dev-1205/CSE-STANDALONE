import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ChevronRight as ExpandIcon,
  ChevronLeft as CollapseIcon,
  X
} from 'lucide-react';
import { BookOpen, Newspaper, Briefcase } from "lucide-react";
import { Link } from 'react-router-dom';

interface CategoryOption {
  label: string;
  key: string;
}

interface ReusableTableProps {
  data: Record<string, any>[];
  title?: string;
  description?: string;
  showCategory?: boolean;
  categoryOptions?: (string | CategoryOption)[];
  onCategoryChange?: (category: string) => void;
  selectedCategoryKey?: string;
}

const ReusableTable: React.FC<ReusableTableProps> = ({
  data,
  title,
  description,
  showCategory = false,
  categoryOptions = [],
  onCategoryChange,
  selectedCategoryKey = '',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(selectedCategoryKey);
  const [modalContent, setModalContent] = useState<{ title: string; content: string } | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);
  const navigate = useNavigate();

  // ✅ Year filter state
  const [selectedYear, setSelectedYear] = useState('All');
  // ✅ Expand/Collapse state
  const [expanded, setExpanded] = useState(false);

  const itemsPerPage = 10;

  // ✅ Extract unique years from data
  const years = Array.from(new Set(data.map((item) => item.year))).sort((a, b) => b.localeCompare(a));

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => setCurrentPage(1), [searchTerm, selectedCategory, selectedYear]);

  useEffect(() => setSelectedCategory(selectedCategoryKey), [selectedCategoryKey]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    onCategoryChange?.(value);
  };

  const parseDate = (dateStr: string) => {
    if (!dateStr) return new Date(0);

    const formats = [
      // DD-MM-YYYY
      () => {
        const [day, month, year] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
      },
      // MM-DD-YYYY
      () => {
        const [month, day, year] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
      },
      // YYYY-MM-DD
      () => {
        const [year, month, day] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
      },
      () => new Date(dateStr)
    ];

    // Try each format until we get a valid date
    for (const format of formats) {
      try {
        const date = format();
        if (!isNaN(date.getTime())) {
          return date;
        }
      } catch (e) {

      }
    }
    return new Date(0);
  };

  const handleSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key) {
      direction = sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const isDateColumn = sortConfig.key.toLowerCase().includes('date');
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (isDateColumn) {
          // For dates, compare timestamps
          aValue = parseDate(aValue).getTime();
          bValue = parseDate(bValue).getTime();
        } else {
          // Handle non-date values
          if (typeof aValue === 'string') aValue = aValue.toLowerCase();
          if (typeof bValue === 'string') bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  // ✅ Apply year + search filter
  const filteredData = sortedData.filter((item) => {
    const matchesYear = selectedYear === 'All' || item.year === selectedYear;
    const matchesSearch = Object.values(item).some((val) =>
      val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchesYear && matchesSearch;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // ✅ Columns handling
  const allColumns = React.useMemo(() => {
    if (data.length === 0) return [];
    let cols = Object.keys(data[0]).filter((c) => c.toLowerCase() !== 'year');

    // Move s.no. to the front if it exists
    const snoIndex = cols.findIndex(c => c.toLowerCase().includes('sno') || c.toLowerCase().includes('s.no'));
    if (snoIndex > -1) {
      const snoCol = cols.splice(snoIndex, 1)[0];
      cols.unshift(snoCol);
    }
    return cols;
  }, [data]);

  const compactColumns = allColumns.slice(0, 4); // only first 4 columns in collapsed view
  const columns = expanded ? allColumns : compactColumns;

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const getColumnWidth = (columnName: string) => {
    const col = columnName.toLowerCase();
    if (col.includes('sno') || col.includes('s.no')) return 'w-20';
    if (col.includes('date')) return isMobile ? 'min-w-[140px]' : 'min-w-[180px]';
    if (col.includes('volume') || col.includes('issue') || col.includes('pageno')) return isMobile ? 'min-w-[120px]' : 'min-w-[180px]';
    if (col.includes('justification')) return isMobile ? 'min-w-[250px]' : 'min-w-[400px]';
    if (col.includes('problem') || col.includes('statement')) return isMobile ? 'min-w-[200px]' : 'min-w-[300px]';
    if (col.includes('students') || col.includes('team')) return isMobile ? 'min-w-[180px]' : 'min-w-[250px]';
    if (col.includes('conference')) return isMobile ? 'min-w-[180px]' : isTablet ? 'min-w-[220px]' : 'min-w-[300px]';
    if (col.includes('indexed') || col.includes('journal'))
      return isMobile ? 'min-w-[120px]' : isTablet ? 'min-w-[150px]' : 'min-w-[200px]';
    if (col.includes('paper') || col.includes('title'))
      return isMobile ? 'min-w-[200px]' : isTablet ? 'min-w-[250px]' : 'min-w-[350px]';
    return 'min-w-[120px]';
  };

  // ✅ Column name formatter (ALL CAPS)
  const formatColumnName = (col: string): string => {
    // Special handling for volume/issue/pageno column
    if (col.toLowerCase().includes('volume') && col.toLowerCase().includes('issue')) {
      return 'VOLUME/ISSUE/PAGE NO.';
    }

    if (/^[A-Z0-9_]+$/.test(col)) {
      return col.toUpperCase(); // Keep POPSO, SDGS, etc. in uppercase
    }
    let formatted = col.replace(/_/g, ' ');
    formatted = formatted.replace(/([a-z])([A-Z])/g, '$1 $2');
    formatted = formatted.replace(/\b\w/g, (char) => char.toUpperCase());
    return formatted.toUpperCase(); // Convert everything to uppercase
  };

  return (
    <>
      {/* Title & Description */}
      {title && (
        <div className="px-4 sm:px-6 pt-6 text-center mt-4">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-800">{title}</h2>
          <div className="w-32 h-1 bg-yellow-400 rounded-full mx-auto mt-4"></div>
          {description && <p className="mt-2 text-sm sm:text-base md:text-lg text-gray-600">{description}</p>}
        </div>
      )}

      {/* Table container */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-200 w-full mx-auto mt-6 max-w-screen-xl">
        <div className="px-4 sm:px-6 mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
          {/* Category Tabs */}
          {showCategory && categoryOptions.length > 0 && (
            <div className="flex flex-wrap border-b border-gray-300 w-full sm:w-auto gap-2 sm:gap-4 overflow-x-auto pb-2 sm:overflow-visible">
              {categoryOptions
                .filter((option) => {
                  const key = typeof option === 'string' ? option : option.key;
                  return key.toLowerCase() !== 'notable';
                })
                .map((option) => {
                  const key = typeof option === 'string' ? option : option.key;
                  const label =
                    typeof option === 'string'
                      ? /^[A-Z0-9]+$/.test(option)
                        ? option
                        : option.charAt(0).toUpperCase() + option.slice(1).replace(/([A-Z])/g, ' $1')
                      : option.label;
                  const isActive = selectedCategory === key;
                  return (
                    <button
                      key={key}
                      onClick={() => handleCategoryChange(key)}
                      className={`px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold rounded-t-xl transition-all duration-200 ${isActive
                        ? 'bg-amber-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-amber-100 hover:text-amber-700'
                        }`}
                    >
                      {label}
                    </button>
                  );
                })}
            </div>
          )}

          {/* ✅ Year Dropdown */}
          {years.length > 0 && (
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300 text-sm sm:text-base focus:ring-2 focus:ring-amber-400 bg-white"
            >
              <option value="All">All Years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          )}

          {/* Search */}
          <div className="flex justify-end sm:ml-auto w-full sm:w-auto">
            {showSearch ? (
              <div className="flex items-center bg-gray-100 rounded-md px-3 py-1 w-full sm:w-64">
                <Search className="text-gray-500 mr-2" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none focus:outline-none w-full text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setShowSearch(false);
                  }}
                  className="ml-2 text-gray-400 hover:text-red-400 text-sm"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button onClick={() => setShowSearch(true)} className="p-2 rounded-full hover:bg-gray-100">
                <Search className="text-gray-500" size={20} />
              </button>
            )}
          </div>
        </div>


        {/* Responsive Scrollable Table */}
        <div className="px-2 sm:px-4 md:px-6 pb-6 overflow-x-auto">
          <div className="inline-block min-w-full rounded-2xl border border-gray-200">
            <table className="min-w-full border-collapse text-sm md:text-base">
              <thead>
                <tr className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-400 text-white">
                  {columns.map((col, idx) => (
                    <th
                      key={idx}
                      className={`relative px-3 sm:px-4 py-2 sm:py-3 text-center font-semibold break-words 
  ${getColumnWidth(col)} ${isMobile ? 'text-xs' : ''} 
  ${idx === 0 ? 'rounded-tl-2xl' : ''} ${idx === columns.length - 1 ? 'rounded-tr-2xl pr-12' : ''} 
  ${col.toLowerCase().includes('date') ? 'cursor-pointer hover:bg-amber-600' : ''}`}

                      onClick={() => col.toLowerCase().includes('date') && handleSort(col)}
                    >
                      <div className="flex items-center justify-center">
                        {formatColumnName(col)}

                        {col.toLowerCase().includes('date') && (
                          <span className="ml-1">
                            {sortConfig && sortConfig.key === col ? (
                              sortConfig.direction === 'ascending' ? (
                                <ArrowUp size={14} />
                              ) : (
                                <ArrowDown size={14} />
                              )
                            ) : (
                              <ArrowUp size={14} className="opacity-50" />
                            )}
                          </span>
                        )}
                      </div>
                      {/* ✅ Floating expand/collapse button (outside normal header flow) */}
                      {idx === columns.length - 1 && (
                        <div className="absolute -right-[-1.5px] top-1/2 -translate-y-1/2 ">
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // avoid triggering sort
                              setExpanded(!expanded);
                            }}
                            className={`p-1.5 rounded-full shadow-lg transition-colors
        ${expanded
                                ? "bg-orange-500 text-white"
                                : "bg-white text-orange-500 hover:bg-orange-500 hover:text-white"
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


              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((row, rowIndex) => (
                    <tr key={rowIndex} className="even:bg-gray-50 hover:bg-amber-50 transition duration-150">
                      {columns.map((col, colIndex) => (
                        <td
                          key={colIndex}
                          className="px-3 sm:px-4 py-2 sm:py-3 text-center align-top break-words text-[11px] sm:text-xs md:text-sm text-gray-600"
                        >
                          {col.toLowerCase() === 'justification' ? (
                            <div className="text-left">
                              <p className="line-clamp-4 sm:line-clamp-6 text-gray-600">
                                {row[col]}
                              </p>
                              {row[col]?.length > 100 && (
                                <button
                                  onClick={() => setModalContent({ title: formatColumnName(col), content: row[col] })}
                                  className="text-amber-600 hover:text-amber-700 font-semibold text-[10px] sm:text-xs mt-1 transition-colors underline inline-block"
                                >
                                  Read More
                                </button>
                              )}
                            </div>
                          ) : col.toLowerCase() === 'grade' ? (
                            <div className="flex items-center justify-center">
                              {row[col]?.toLowerCase().includes('elite + silver') ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-slate-100 to-slate-200 border-2 border-slate-300 text-slate-700 font-bold text-xs shadow-sm">
                                  <svg className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  <span>Elite + Silver</span>
                                </span>
                              ) : row[col]?.toLowerCase().includes('elite') ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-100 to-amber-100 border-2 border-yellow-400 text-amber-700 font-bold text-xs shadow-sm">
                                  <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  <span>Elite</span>
                                </span>
                              ) : (
                                row[col]
                              )}
                            </div>
                          ) : Array.isArray(row[col])
                            ? row[col].join(', ')
                            : typeof row[col] === 'object' && row[col] !== null
                              ? JSON.stringify(row[col])
                              : row[col]}
                        </td>
                      ))}
                    </tr>
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

        {/* Pagination */}
        <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-between items-center gap-3 rounded-b-3xl">
          <div className="text-xs sm:text-sm text-gray-700">
            Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
            <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of{' '}
            <span className="font-medium">{filteredData.length}</span> results
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1 sm:p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft size={isMobile ? 14 : 16} />
            </button>
            {Array.from({ length: Math.min(totalPages, isMobile ? 3 : 5) }, (_, index) => {
              let pageNum;
              if (totalPages <= (isMobile ? 3 : 5)) {
                pageNum = index + 1;
              } else if (currentPage <= Math.ceil((isMobile ? 3 : 5) / 2)) {
                pageNum = index + 1;
              } else if (currentPage >= totalPages - Math.floor((isMobile ? 3 : 5) / 2)) {
                pageNum = totalPages - ((isMobile ? 3 : 5) - index - 1);
              } else {
                pageNum = currentPage - Math.floor((isMobile ? 3 : 5) / 2) + index;
              }
              return (
                <button
                  key={index}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-md ${currentPage === pageNum
                    ? 'bg-amber-100 text-amber-700 border border-amber-400'
                    : 'text-gray-600 hover:bg-gray-100 border border-transparent'
                    }`}
                >
                  {pageNum}
                </button>
              );
            })}
            {totalPages > (isMobile ? 3 : 5) &&
              currentPage < totalPages - Math.floor((isMobile ? 3 : 5) / 2) && (
                <>
                  <span className="px-1 text-gray-500">...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-md ${currentPage === totalPages
                      ? 'bg-amber-100 text-amber-700 border border-amber-400'
                      : 'text-gray-600 hover:bg-gray-100 border border-transparent'
                      }`}
                  >
                    {totalPages}
                  </button>
                </>
              )}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1 sm:p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight size={isMobile ? 14 : 16} />
            </button>
          </div>
        </div>
      </div>
      {/* Magazine button */}
      <div className="fixed right-0 top-[38%] transform -translate-y-1/2 z-50">
        <button
          onClick={() => navigate("/magazine")}
          className="group flex items-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 w-12 hover:w-40 h-12 rounded-l-xl shadow-lg transition-all duration-300 overflow-hidden"
          title="Magazine"
        >
          {/* Icon always visible, stays at right */}
          <div className="flex-shrink-0 w-12 flex items-center justify-center">
            <BookOpen className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:animate-bounce" />
          </div>

          {/* Text slides in when expanded */}
          <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap font-bold">
            Magazine
          </span>
        </button>
      </div>

      {/* Newsletter button */}
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50">
        <button
          onClick={() => navigate("/newsletter")}
          className="group flex items-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 w-12 hover:w-40 h-12 rounded-l-xl shadow-lg transition-all duration-300 overflow-hidden"
          title="NewsLetter"
        >
          <div className="flex-shrink-0 w-12 flex items-center justify-center">
            <Newspaper className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:animate-bounce" />
          </div>

          <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap font-bold">
            NewsLetter
          </span>
        </button>
      </div>

      {/* Opportunities button - Roll-out style, positioned at top */}
      <div className="fixed right-0 top-[30%] transform -translate-y-1/2 z-50">
        <button
          onClick={() => navigate('/opportunities')}
          className="group flex items-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 w-12 hover:w-40 h-12 rounded-l-xl shadow-lg transition-all duration-300 overflow-hidden"
          title="Opportunities"
        >
          <div className="flex-shrink-0 w-12 flex items-center justify-center">
            <Briefcase className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:animate-bounce" />
          </div>
          <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap font-bold">
            Opportunities
          </span>
        </button>
      </div>

      {/* Full Content Modal */}
      {modalContent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col transform transition-all scale-100 animate-in fade-in zoom-in duration-200"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-amber-50">
              <h3 className="text-xl font-bold text-gray-800 tracking-tight">{modalContent.title}</h3>
              <button
                onClick={() => setModalContent(null)}
                className="p-2 rounded-full hover:bg-white text-gray-500 hover:text-red-500 transition-all duration-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                {modalContent.content}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end bg-gray-50">
              <button
                onClick={() => setModalContent(null)}
                className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default ReusableTable;
