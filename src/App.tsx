import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import DepartmentPage from './pages/DepartmentPage';
import ResearchInnovationPage from './pages/ResearchInnovationPage';
import EventsOrganisedPage from './pages/EventsOrganisedPage';
import CseLatestEvents from './pages/CseLatestEvents';
import DataTable from './pages/DataTable';
import InnovationPolicy from './pages/InnovationPolicy';
import MagazinePage from './pages/MagazinePage';
import NewsLetterPage from './pages/NewsLetterPage';
import InnovativeMethods from './pages/InnovativeMethods';
import RecruitersPage from './pages/RecruitersPage';
import TrainingDetailsPage from './pages/TrainingDetailsPage';
import AcademicCal from './pages/AcademicCal';
import OpportunitiesPage from './pages/OpportunitiesPage';
import DepartmentHeader from './components/DepartmentHeader';
import NewsTicker from './components/NewsTicker';
import Footer from './components/Footer';

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
      </div>
      <Footer collegeName="Hindusthan Institute of Technology" contact={contactInfo} />
    </BrowserRouter>
  );
}

export default App;
