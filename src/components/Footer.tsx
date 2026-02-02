import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
} from 'lucide-react';

interface FooterProps {
  collegeName: string;
  contact: {
    address: string;
    phone: string;
    email: string;
    socialMedia: {
      facebook: string;
      twitter: string;
      linkedin: string;
      instagram: string;
      youtube?: string;
    };
  };
}

const Footer: React.FC<FooterProps> = ({ collegeName, contact }) => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Departments', href: '#departments' },
    { name: 'Faculty', href: '#faculty' },
    { name: 'Admissions', href: '#admissions' },
    { name: 'Research', href: '#research' },
    { name: '', href: '#campus' },
  ];

  const academicLinks = [
    { name: 'Academic Calendar', href: '#' },
    { name: 'Examination', href: '#' },
    { name: 'Results', href: '#' },
    { name: 'Library', href: '#' },
    { name: 'E-Learning', href: '#' },
    { name: 'Student Portal', href: '#' },
  ];

  const institutions = [
 
  {
    name: 'Arts and Science',
    color: 'bg-purple-100 text-purple-700 hover:bg-purple-200 hover:scale-105',
    href: '#'
  },
  {
    name: 'Engineering',
    color: 'bg-pink-100 text-pink-700 hover:bg-pink-200 hover:scale-105',
    href: '#'
  },
  {
    name: 'Institute of Technology',
    color: 'bg-orange-100 text-orange-700 hover:bg-orange-200 hover:scale-105',
    href: '#'
  },
  {
    name: 'College of Education',
    color: 'bg-purple-100 text-purple-700 hover:bg-purple-200 hover:scale-105',
    href: '#'
  },
  {
    name: 'Architecture',
    color: 'bg-green-100 text-green-700 hover:bg-green-200 hover:scale-105',
    href: '#'
  },
  {
    name: 'Polytechnic',
    color: 'bg-blue-100 text-blue-700 hover:bg-blue-200 hover:scale-105',
    href: '#'
  },
  {
    name: 'HR Sec. School',
    color: 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200 hover:scale-105',
    href: '#'
  },
  {
    name: 'International School',
    color: 'bg-red-100 text-red-700 hover:bg-red-200 hover:scale-105',
    href: '#'
  },
  {
    name: 'Health Science',
    color: 'bg-green-100 text-green-700 hover:bg-green-200 hover:scale-105',
    href: '#'
  },
  {
    name: 'Kangaroo Kids',
    color: 'bg-orange-100 text-orange-700 hover:bg-orange-200 hover:scale-105',
    href: '#'
  },
  {
    name: 'Nursing',
    color: 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200 hover:scale-105',
    href: '#'
  },
  {
    name: 'Advanced Studies',
    color: 'bg-orange-100 text-orange-700 hover:bg-orange-200 hover:scale-105',
    href: '#'
  }


  ];

  const socialIcons = {
    facebook: Facebook,
    twitter: Twitter,
    linkedin: Linkedin,
    instagram: Instagram,
    youtube: Youtube,
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Our Institutions Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Our Institutions</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {institutions.map((institution, index) => (
              <a
  key={index}
  href={institution.href}
  onClick={(e) => e.preventDefault()}
  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform ${institution.color} cursor-pointer`}
>
  {institution.name}
</a>

            ))}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* College Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-3 mb-6 mt-8">
              <img
                src={`${import.meta.env.BASE_URL}Logo_footer.jpg`}
                alt="College Logo"
                className="h-10 w-10 object-contain rounded-lg p-100"
              />
              </div>
              <div>
              <span className="text-xl font-bold">{collegeName}</span>
            </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Shaping tomorrow's engineers through excellence in education, research, and innovation since 2007.
            </p>
          
            {/* Social Media */}
            <div className="flex space-x-4">
              {Object.entries(contact.socialMedia).map(([platform, url]) => {
                const IconComponent = socialIcons[platform as keyof typeof socialIcons];
                if (!IconComponent) return null;

                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 hover:bg-blue-600 p-2 rounded-lg transition-colors duration-300"
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Academic Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Academics</h3>
            <div className="space-y-3">
              {academicLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300 text-sm">
                  <div>Valley Campus, Pollachi Main Road, Othakkalmandapam (Post), </div>
                  <div>Coimbatore - 641 032, Tamil Nadu, India</div>
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  +91 97152 601184, +91 97151 29797, +91 94438 45599, +91 90470 10006
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">hit.office@hindusthan.net</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Stay Updated</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-sm focus:outline-none focus:border-blue-500"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg text-sm font-medium transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} {collegeName}. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#sitemap" className="hover:text-white transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
