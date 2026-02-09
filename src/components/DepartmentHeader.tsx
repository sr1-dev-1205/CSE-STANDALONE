import { Home } from 'lucide-react';

const DepartmentHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-lg">
      <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-18 lg:h-20">
          {/* Home Button */}
          <a
            href="http://hit.edu.in/"
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-white/20 hover:bg-white/30 rounded-md sm:rounded-lg transition-all duration-300 group flex-shrink-0"
            title="Go to HIT Homepage"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline text-xs sm:text-sm md:text-base text-gray-900 font-semibold">Home</span>
          </a>

          {/* Department Title - Responsive text sizing */}
          <h1 className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-white text-center flex-1 px-2 sm:px-3 md:px-4 leading-tight">
            Department of Computer Science and Engineering
          </h1>

          {/* Spacer for balance - Responsive width */}
          <div className="w-10 sm:w-16 md:w-20 lg:w-24 flex-shrink-0"></div>
        </div>
      </div>
    </header>
  );
};

export default DepartmentHeader;
