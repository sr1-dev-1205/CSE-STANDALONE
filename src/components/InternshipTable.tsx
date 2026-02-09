import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  X
} from 'lucide-react';

interface InternshipTableProps {
  data: Record<string, any>[];
  title?: string;
  description?: string;
}

const InternshipTable: React.FC<InternshipTableProps> = ({
  data,
  title,
  description,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  // Year filter state
  const [selectedYear, setSelectedYear] = useState('All');

  const itemsPerPage = 10;

  // Extract unique years from data - filter out undefined/null
  const years = Array.from(
    new Set(
      data
        .map((item) => item.year)
        .filter((year) => year !== undefined && year !== null && year !== '')
    )
  ).sort((a, b) => b.localeCompare(a));

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => setCurrentPage(1), [searchTerm, selectedYear]);

  // Apply year + search filter
  const filteredData = data.filter((item) => {
    const matchesYear = selectedYear === 'All' || item.year === selectedYear;
    const matchesSearch = Object.values(item).some((val) =>
      val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchesYear && matchesSearch;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Define specific columns for internship table
  const columns = [
    { key: 'sno', label: 'S.No.' },
    { key: 'registerNumber', label: 'Register Number' },
    { key: 'name', label: 'Name of the Student' },
    { key: 'domain', label: 'Internship Domain' },
    { key: 'company', label: 'Company Name' },
    { key: 'duration', label: 'Duration', render: (item: any) => `${item.from} - ${item.to}` }
  ];

  const isMobile = windowWidth < 768;

  const formatColumnName = (name: string) => {
    return name
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = isMobile ? 3 : 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage < maxVisibleButtons - 1) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded-md text-sm ${currentPage === i
            ? 'bg-amber-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-amber-100'
            }`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="relative bg-white">
      {/* Back Button */}
      <div className="hidden md:flex">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center text-amber-600 hover:text-amber-700 font-medium"
        >
          <ChevronLeft className="mr-1" size={20} />
          Back
        </button>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-400 text-white px-4 sm:px-6 py-6 rounded-t-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold">{title || 'Internships'}</h2>
        {description && <p className="mt-2 text-sm sm:text-base opacity-90">{description}</p>}
      </div>

      {/* Filters */}
      <div className="bg-white px-4 sm:px-6 py-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Year Filter */}
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

      {/* Table */}
      <div className="px-2 sm:px-4 md:px-6 pb-6 overflow-x-auto">
        <div className="inline-block min-w-full rounded-2xl border border-gray-200">
          <table className="min-w-full border-collapse text-sm md:text-base">
            <thead>
              <tr className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-400 text-white">
                {columns.map((col, idx) => (
                  <th
                    key={col.key}
                    className={`px-3 sm:px-4 py-2 sm:py-3 text-center font-semibold break-words ${isMobile ? 'text-xs' : ''
                      } ${idx === 0 ? 'rounded-tl-2xl' : ''} ${idx === columns.length - 1 ? 'rounded-tr-2xl' : ''
                      }`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className="even:bg-gray-50 hover:bg-amber-50 transition duration-150 border-b border-gray-100"
                  >
                    {columns.map((col: any) => (
                      <td
                        key={col.key}
                        className="px-3 sm:px-4 py-3 text-center text-gray-700"
                      >
                        {col.render ? col.render(item) : (item[col.key] || '-')}
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
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-4 border-t">
          <span className="text-sm text-gray-600 mb-2 sm:mb-0">
            Page {currentPage} of {totalPages} ({filteredData.length} total entries)
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-md bg-gray-200 text-gray-700 hover:bg-amber-100 disabled:opacity-50"
            >
              <ChevronLeft size={20} />
            </button>
            {renderPaginationButtons()}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md bg-gray-200 text-gray-700 hover:bg-amber-100 disabled:opacity-50"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipTable;
