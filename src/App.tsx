import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import DepartmentHeader from './components/DepartmentHeader';
import NewsTicker from './components/NewsTicker';
import Footer from './components/Footer';

// Eager load: Critical path (home page)
import DepartmentPage from './pages/DepartmentPage';

// Lazy load: Secondary pages
const ResearchInnovationPage = lazy(() => import('./pages/ResearchInnovationPage'));
const EventsOrganisedPage = lazy(() => import('./pages/EventsOrganisedPage'));
const CseLatestEvents = lazy(() => import('./pages/CseLatestEvents'));
const DataTable = lazy(() => import('./pages/DataTable'));
const InnovationPolicy = lazy(() => import('./pages/InnovationPolicy'));
const MagazinePage = lazy(() => import('./pages/MagazinePage'));
const NewsLetterPage = lazy(() => import('./pages/NewsLetterPage'));
const InnovativeMethods = lazy(() => import('./pages/InnovativeMethods'));
const RecruitersPage = lazy(() => import('./pages/RecruitersPage'));
const TrainingDetailsPage = lazy(() => import('./pages/TrainingDetailsPage'));
const AcademicCal = lazy(() => import('./pages/AcademicCal'));
const OpportunitiesPage = lazy(() => import('./pages/OpportunitiesPage'));

// Loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
  </div>
);

// Component to handle scroll restoration
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const contactInfo = {
    address: "Valley Campus, Pollachi Main Road, Othakkalmandapam (Post), Coimbatore - 641 032, Tamil Nadu, India",
    phone: "+91 97152 601184",
    email: "hit.office@hindusthan.net",
    socialMedia: {
      facebook: "https://www.facebook.com/hindusthaninstitute",
      twitter: "https://twitter.com/hindusthaninst",
      linkedin: "https://www.linkedin.com/school/hindusthan-institute-of-technology/",
      instagram: "https://www.instagram.com/hindusthan_institute/",
      youtube: "https://www.youtube.com/@HindusthanInstituteofTechnology"
    }
  };

  return (
    <BrowserRouter basename="/cse">
      <ScrollToTop />
      <DepartmentHeader />
      <NewsTicker />
      <div className="pt-28 sm:pt-32">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<DepartmentPage />} />
            <Route path="/department/:departmentId" element={<DepartmentPage />} />
            <Route path="/research-innovation" element={<ResearchInnovationPage />} />
            <Route path="/events-organised" element={<EventsOrganisedPage />} />
            <Route path="/latest-event" element={<CseLatestEvents />} />
            <Route path="/innovation-policy" element={<InnovationPolicy />} />
            <Route path="/magazine" element={<MagazinePage />} />
            <Route path="/newsletter" element={<NewsLetterPage />} />
            <Route path="/innovative-methods" element={<InnovativeMethods />} />
            <Route path="/recruiters" element={<RecruitersPage />} />
            <Route path="/training-details" element={<TrainingDetailsPage />} />
            <Route path="/academic-calendar" element={<AcademicCal />} />
            <Route path="/opportunities" element={<OpportunitiesPage />} />
            <Route path="/datatable/:section" element={<DataTable />} />
          </Routes>
        </Suspense>
      </div>
      <Footer collegeName="Hindusthan Institute of Technology" contact={contactInfo} />
    </BrowserRouter>
  );
}

export default App;
