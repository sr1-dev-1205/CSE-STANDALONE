import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const DepartmentHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Home Button */}
          <a
            href="http://hit.edu.in/"
            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-300 group"
            title="Go to HIT Homepage"
          >
            <Home className="w-5 h-5 text-gray-900 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline text-gray-900 font-semibold">Home</span>
          </a>

          {/* Department Title */}
          <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-white text-center flex-1 px-4">
            Department of Computer Science and Engineering
          </h1>

          {/* Spacer for balance */}
          <div className="w-20 sm:w-24"></div>
        </div>
      </div>
    </header>
  );
};

export default DepartmentHeader;
