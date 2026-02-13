import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Monitor, Radio, Settings, Building, ArrowRight, Users, BookOpen, Award, Lightbulb, Mail, Target, BarChart2, CheckCircle } from 'lucide-react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { useInView as useInViewHook } from 'react-intersection-observer';
import LazyLoadWrapper from './LazyLoadWrapper';
import DepartmentOutcomes from '../components/DepartmentOutcomes';
import SectionWrapper from './layout/SectionWrapper';
import ObeInput from '../pages/ObeInputs';
import TeachingMethodologyCards from '../components/TeachingMethodologyCards';
import recruiters from '../data/recruiters.json';
import eventsData from '../data/eventsOrganisedData.json';
import ResearchInnovationCarousel from './ResearchInnovationCarousel';

interface Department {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  image: string;
  vision: string;
  mission: string | string[];
  programs: Array<{
    name: string;
    duration: string;
    intake?: string;
    eligibility: string;
  }>;
  hasExternalLink?: boolean;
  externalUrl?: string;
  specializations: string[];
  facilities: string[];
  faculty: Array<{
    id: number;
    name: string;
    designation: string;
    specialization: string;
    experience: string;
    education: string;
    image: string;
    email: string;
    publications: number;
    researchAreas: string[];
    description?: string;
    patents?: number;
    date_of_joining?: string;
  }>;
  obePhilosophy?: {
    description: string;
    principles: Array<{
      title: string;
      description: string;
      icon: React.ComponentType<{ className?: string }>;
    }>;
    processSteps: Array<{
      step: string;
      title: string;
      description: string;
    }>;
  };
  psos: Array<{
    id?: string;
    code?: string;
    title?: string;
    description: string;
  }>;
  peos: Array<{
    id?: string;
    code?: string;
    title?: string;
    description: string;
  }>;
  pos: Array<{
    id?: string;
    code?: string;
    title?: string;
    description: string;
  }>;
  trainingAndPlacement?: {
    description: string;
    topRecruiters: string[];
  };
}

interface DepartmentDetailProps {
  department: Department;
}

const iconMap = {
  Monitor,
  Radio,
  Settings,
  Building,
};

// Premium Animation Variants
const animations = {
  // Fade in from bottom with scale
  fadeInUp: {
    initial: { opacity: 0, y: 60, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
  },
  // Fade in from top
  fadeInDown: {
    initial: { opacity: 0, y: -60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: "easeOut" }
  },
  // Slide in from left with bounce
  slideInLeft: {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    transition: { type: "spring", stiffness: 100, damping: 20 }
  },
  // Slide in from right
  slideInRight: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    transition: { type: "spring", stiffness: 100, damping: 20 }
  },
  // Scale and fade in
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  // Rotate and fade in (for cards)
  rotateIn: {
    initial: { opacity: 0, rotate: -10, scale: 0.9 },
    animate: { opacity: 1, rotate: 0, scale: 1 },
    transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }
  },
  // Stagger children animation
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  // Card hover effect
  cardHover: {
    scale: 1.05,
    y: -10,
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    transition: { duration: 0.3, ease: "easeOut" }
  },
  // Button hover
  buttonHover: {
    scale: 1.05,
    boxShadow: "0 10px 30px rgba(245, 158, 11, 0.4)",
    transition: { duration: 0.2 }
  },
  // Pulse effect
  pulse: {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  }
};

// Default OBE data matching original theme
const defaultOBEData = {
  description: "Our department follows the Outcome-Based Education (OBE) framework that focuses on measuring student performance outcomes (what a student knows and can do) rather than inputs or process.",
  principles: [
    {
      title: "Outcome Focused",
      description: "Curriculum designed backwards from desired outcomes",
      icon: Target
    },
    {
      title: "Student Centered",
      description: "Learning experiences tailored to student needs",
      icon: Users
    },
    {
      title: "Continuous Improvement",
      description: "Regular assessment and curriculum enhancement",
      icon: BarChart2
    },
    {
      title: "Industry Alignment",
      description: "Outcomes matched with workforce requirements",
      icon: CheckCircle
    }
  ],
  processSteps: [
    {
      step: "1",
      title: "Define Outcomes",
      description: "Establish clear program and course outcomes"
    },
    {
      step: "2",
      title: "Design Curriculum",
      description: "Create learning experiences to achieve outcomes"
    },
    {
      step: "3",
      title: "Deliver Instruction",
      description: "Implement effective teaching strategies"
    },
    {
      step: "4",
      title: "Assess Learning",
      description: "Measure outcome achievement systematically"
    },
    {
      step: "5",
      title: "Evaluate & Improve",
      description: "Use data to enhance teaching and learning"
    }
  ]
};

const defaultOutcomes = {
  psos: [
    { code: "PSO1", description: "Apply knowledge of computing fundamentals to solve complex engineering problems." },
    { code: "PSO2", description: "Design and develop software systems using modern tools and technologies." }
  ],
  peos: [
    { code: "PEO1", description: "Graduates will have successful careers in computing industries or pursue higher education." },
    { code: "PEO2", description: "Graduates will demonstrate professional ethics and lifelong learning." }
  ],
  pos: [
    { code: "PO1", description: "Engineering knowledge: Apply mathematics, science and engineering fundamentals." },
    { code: "PO2", description: "Problem analysis: Identify and analyze complex engineering problems." }
  ]
};

// Sample data for Centre of Excellence cards
const excellenceCards = [
  {
    id: 1,
    title: "AI & Machine Learning Lab",
    description: "State-of-the-art facility for artificial intelligence research and development",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    link: "#"
  },
  {
    id: 2,
    title: "Advanced Robotics Center",
    description: "Innovative robotics research with industrial applications",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    link: "#"
  },
  {
    id: 3,
    title: "Data Science Hub",
    description: "Cutting-edge data analytics and visualization center",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    link: "#"
  },
  {
    id: 4,
    title: "IoT Innovation Lab",
    description: "Developing smart solutions for connected devices",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    link: "#"
  },
  {
    id: 5,
    title: "Cybersecurity Center",
    description: "Protecting digital assets with advanced security measures",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    link: "#"
  },
  {
    id: 6,
    title: "Renewable Energy Research",
    description: "Pioneering sustainable energy solutions for the future",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    link: "#"
  }
];

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
  'Greeno Technology',
  'HAsh Agile Technologies',
  'HDB Financial Services',
];

const requestedLogosList = [
  'Amazon',
  'Juspay',
  'Cognizant',
  'Zoho Corporation',
  'Wipro',
  'Rinex Technologies',
  'Flipkart',
  'Axis Bank',
  'Bajaj Finance Limited',
  'SBI Card',
  'Greeno Technology',
  'HAsh Agile Technologies',
  'HDB Financial Services'
];

const sortedRecruiters = [...(recruiters as any)].sort((a, b) => {
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

const placementStats = [
  {
    year: "2023-2024",
    placed: "108+",
    highest: "6.40 LPA",
    average: "3.29 LPA",
    companies: "41+",
    description: "Exceptional performance with multiple premium offers from top-tier tech companies."
  },
  {
    year: "2022-2023",
    placed: "85+",
    highest: "7.00 LPA",
    average: "3.59 LPA",
    companies: "26+",
    description: "Strong placement drive with consistent records in core and IT sectors."
  },
  {
    year: "2021-2022",
    placed: "53+",
    highest: "4.00 LPA",
    average: "3.35 LPA",
    companies: "16+",
    description: "Steady growth in placements with students securing roles in emerging technologies."
  }
];

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
    .replace(/\([^)]*\)/g, '') // remove text in parentheses
    .replace(/[^a-z0-9]/g, '') // keep alphanumeric only
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

const DepartmentDetail: React.FC<DepartmentDetailProps> = ({ department }) => {
  const navigate = useNavigate();
  const departmentWithDefaults = {
    ...department,
    obePhilosophy: department.obePhilosophy || defaultOBEData,
    psos: department.psos || defaultOutcomes.psos,
    peos: department.peos || defaultOutcomes.peos,
    pos: department.pos || defaultOutcomes.pos
  };

  const IconComponent = iconMap[department.icon as keyof typeof iconMap] || Monitor;

  // Placement section tabs: Home, CSE Specialized, Placement Team, Recruiters, Training, Industrial Partners
  const [activePlacementTab, setActivePlacementTab] = useState<'home' | 'cse-specialized' | 'team' | 'recruiters' | 'training' | 'partners'>('home');
  const [isPlacementExpanded, setIsPlacementExpanded] = useState(false);
  const [activePartnerTab, setActivePartnerTab] = useState<'igenuine' | 'sixprases' | 'terv'>('igenuine');

  // Carousel state and ref
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  // Industry carousel state
  const industryCarouselRef = useRef<HTMLDivElement>(null);

  // Events carousel ref
  const eventsCarouselRef = useRef<HTMLDivElement>(null);

  // Events year filter state
  const [selectedEventsYear, setSelectedEventsYear] = useState<string>('2024-25');

  // Handle automatic scrolling
  useEffect(() => {
    if (!autoScroll) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % (excellenceCards.length - 2));
    }, 5000);

    return () => clearInterval(interval);
  }, [autoScroll]);

  // Handle manual navigation
  const goToIndex = (index: number) => {
    setCurrentIndex(index);
    setAutoScroll(false);
    setTimeout(() => setAutoScroll(true), 10000); // Resume auto-scroll after 10 seconds
  };

  // Calculate visible cards
  const visibleCards = excellenceCards.slice(currentIndex, currentIndex + 3);
  // Handle wrap-around for the last cards
  const remainingCards = 3 - visibleCards.length;
  if (remainingCards > 0) {
    visibleCards.push(...excellenceCards.slice(0, remainingCards));
  }

  const getImageUrl = (img: string) => {
    if (!img) return '';
    if (img.startsWith('http')) return img;
    // Remove 'public/' or leading '/' if present
    const cleanPath = img.replace(/^public\//, '').replace(/^\//, '');
    return `${import.meta.env.BASE_URL}${cleanPath}`;
  };

  return (
    <div className="space-y-8">
      {/* Department Header */}
      <div id="about-department" className="scroll-mt-32">
        <LazyLoadWrapper height="250px" delay={500}>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative h-[280px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px]">
              {/* Background Image with Overlay */}
              <img
                src={getImageUrl(department.image)}
                alt={department.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />

              {/* Top-left Icon & Badge */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-5 md:top-5 md:left-6 flex items-center gap-2 sm:gap-3 md:gap-4">
                {/* Icon */}
                <div className="bg-white/95 p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl shadow-lg backdrop-blur-sm">
                  <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-yellow-600" />
                </div>

                {/* Badge */}
                <div className="bg-yellow-500 text-gray-900 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md backdrop-blur-sm">
                  {department.shortName}
                </div>
              </div>

              {/* Hero Content */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 text-white">
                <div className="max-w-4xl space-y-2 sm:space-y-3 md:space-y-4">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight shadow-sm">{department.name}</h1>
                  <p className="text-sm sm:text-base md:text-lg lg:text-sl text-gray-200 leading-relaxed max-w-3xl drop-shadow-md line-clamp-2 sm:line-clamp-none">
                    {department.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </LazyLoadWrapper>
      </div>

      {/* Programs Offered - Immediately after About Department */}
      <div className="mt-10 sm:mt-12 md:mt-14 mb-4">
        <LazyLoadWrapper height="250px" delay={500}>
          <div className="bg-white p-5 sm:p-6 md:p-7 lg:p-8 rounded-2xl shadow-lg">
            <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6">Programs Offered</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {department.programs.map((program, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 hover:border-yellow-300 hover:shadow-md transition-all duration-300 group">
                  <h5 className="font-bold text-gray-900 mb-3 group-hover:text-yellow-700 transition-colors">{program.name}</h5>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div><span className="font-medium">Duration:</span> {program.duration}</div>
                    {program.intake && <div><span className="font-medium">Intake:</span> {program.intake}</div>}
                    <div><span className="font-medium">Eligibility:</span> {program.eligibility}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </LazyLoadWrapper>
      </div>

      {/* Vision & Mission */}
      <div id="department-vision-mission" className="scroll-mt-32">
        <LazyLoadWrapper height="180px" delay={500}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mt-10 sm:mt-12 md:mt-16 lg:mt-20">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center space-x-2">
                <Award className="h-6 w-6 text-yellow-500" />
                <span>Vision</span>
              </h4>
              <p className="text-gray-700 leading-relaxed">{department.vision}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-yellow-500" />
                <span>Mission</span>
              </h4>

              <div className="text-gray-700 leading-relaxed space-y-3">
                {Array.isArray(department.mission) ? (
                  department.mission.map((point: string, index: number) => {
                    const [label, ...rest] = point.split(":");
                    return (
                      <p key={index} className="text-sm">
                        <span className="font-semibold">{label}:</span> {rest.join(":").trim()}
                      </p>
                    );
                  })
                ) : (
                  <p className="text-sm">{department.mission}</p>
                )}
              </div>
            </div>
          </div>
        </LazyLoadWrapper>
      </div>

      {/* Program Outcomes */}
      <div id="psos-peos-pos" className="mt-16 mb-0 scroll-mt-32">
        <LazyLoadWrapper height="400px" delay={600}>
          <DepartmentOutcomes
            psos={department.psos.map(item => ({
              id: (item.id || item.code || '') as string,
              title: (item.title || '') as string,
              description: item.description
            }))}
            peos={department.peos.map(item => ({
              id: (item.id || item.code || '') as string,
              title: (item.title || '') as string,
              description: item.description
            }))}
            pos={department.pos.map(item => ({
              id: (item.id || item.code || '') as string,
              title: (item.title || '') as string,
              description: item.description
            }))}
            departmentName={department.name}
          />
        </LazyLoadWrapper>
      </div>

      {/* Combined OBE Section - OBE Philosophy + OBE Inputs */}
      <div id="obe" className="scroll-mt-32 mt-0">
        <LazyLoadWrapper height="800px" delay={500}>
          <div className="bg-white p-12 rounded-2xl shadow-lg text-center mb-12">
            <h4 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">OBE Philosophy</h4>
            <div className="w-32 h-1 bg-[#f59e0b] rounded-full mx-auto mb-6"></div>
            <p className="text-gray-700 mb-8 leading-relaxed">
              {departmentWithDefaults.obePhilosophy.description}
            </p>

            {/* OBE Principles */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {departmentWithDefaults.obePhilosophy.principles.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:border-yellow-300 transition-colors duration-300">
                    <div className="w-16 h-16 rounded-lg bg-yellow-50 flex items-center justify-center mb-4 text-yellow-600">
                      <Icon className="h-8 w-8" />
                    </div>
                    <h5 className="font-bold text-gray-900 mb-2">{principle.title}</h5>
                    <p className="text-gray-600 text-sm">{principle.description}</p>
                  </div>
                );
              })}
            </div>

            {/* OBE Process */}
            <div className="relative">
              <div className="hidden lg:block absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -translate-y-1/2"></div>
              <div className="grid lg:grid-cols-5 gap-6">
                {departmentWithDefaults.obePhilosophy.processSteps.map((step, index) => (
                  <div key={index} className="relative z-10">
                    <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
                      <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">
                        {step.step}
                      </div>
                      <h5 className="font-bold text-gray-900 mt-2 mb-2">{step.title}</h5>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </LazyLoadWrapper>

        {/* OBE Inputs - Combined within the same section */}
        <LazyLoadWrapper height="600px" delay={500}>
          <ObeInput />
        </LazyLoadWrapper>
      </div>
      {/* New Centre of Excellence Section - COMMENTED OUT */}
      {/*
      <div id="centres-of-excellence" className="scroll-mt-32">
        <LazyLoadWrapper height="400px" delay={500}>
          <div className="bg-white p-12 rounded-2xl shadow-lg text-center mb-12">
          <h4 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Centres of Excellence</h4>
          <div className="w-32 h-1 bg-[#f59e0b] rounded-full mx-auto mb-6"></div>
          <div className="relative">
            {*/}
      {/* Carousel */}
      {/*
            <div 
              ref={carouselRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ease-in-out"
            >
              {visibleCards.map((card) => (
                <div key={card.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={getImageUrl(card.image)}
                      alt={card.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h5 className="font-bold text-lg text-gray-900 mb-2">{card.title}</h5>
                    <p className="text-gray-600 mb-4">{card.description}</p>
                    <a 
                      href={card.link}
                      className="text-yellow-600 hover:text-yellow-700 font-medium text-sm flex items-center space-x-1 group"
                    >
                      <span>Explore Center</span>
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
            */}
      {/* Navigation Dots */}
      {/*
            <div className="flex justify-center mt-8 space-x-2">
              {excellenceCards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-yellow-500' : 'bg-gray-300'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            */}
      {/* View More Button */}
      {/*
            <div className="text-center mt-8">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center space-x-2 mx-auto shadow-md">
                <span>View All Centres</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </LazyLoadWrapper>
      </div>
      */}

      {/* Innovative Teaching Methodology Section */}
      <div id="teaching-methodology" className="scroll-mt-32">
        <LazyLoadWrapper height="600px" delay={500}>
          <TeachingMethodologyCards departmentName="CSE Department" />
          <div className="text-center mt-6 sm:mt-8 px-2">
            <button
              onClick={() => navigate('/innovative-methods')}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              View all Innovative Teaching Methodologies →
            </button>
          </div>
        </LazyLoadWrapper>
      </div>

      {/* Research & Innovation Section with Auto-Transitioning Carousel */}
      <div id="research-innovation" className="scroll-mt-32">
        <LazyLoadWrapper height="600px" delay={500}>
          <ResearchInnovationCarousel navigate={navigate} />
        </LazyLoadWrapper>
      </div>

      {/* Placements Section */}
      <div id="placements" className="scroll-mt-32">
        <LazyLoadWrapper height="300px" delay={500}>
          <div className="bg-white p-12 rounded-2xl shadow-lg">
            <h4 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 text-center">Placements</h4>
            <div className="w-32 h-1 bg-[#f59e0b] rounded-full mx-auto mb-6"></div>
            <p className="text-gray-600 text-center mb-8">
              Our students achieve excellent placement records with leading companies across industries.
            </p>

            {/* Placement section tabs - Display all options without scrollbar */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex flex-wrap justify-center sm:justify-between gap-1 sm:gap-2">
                {[
                  { id: 'home', label: 'Home', icon: 'fas fa-user' },
                  { id: 'cse-specialized', label: 'CSE Specialized Training', icon: 'fas fa-laptop-code' },
                  { id: 'partners', label: 'Industrial Partners', icon: 'fas fa-handshake' },
                  { id: 'team', label: 'Placement Team', icon: 'fas fa-users' },
                  { id: 'recruiters', label: 'Recruiters', icon: 'fas fa-building' },
                  { id: 'training', label: 'Training', icon: 'fas fa-chalkboard-teacher' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActivePlacementTab(tab.id as 'home' | 'cse-specialized' | 'partners' | 'team' | 'recruiters' | 'training')}
                    className={`flex items-center justify-center space-x-1.5 sm:space-x-2 px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm lg:text-base font-bold transition-all duration-200 border-b-4 whitespace-nowrap ${tab.id === 'cse-specialized'
                      ? activePlacementTab === tab.id
                        ? "text-violet-700 border-violet-700 bg-violet-100"
                        : "text-violet-500 border-transparent hover:text-violet-700 hover:bg-violet-50"
                      : activePlacementTab === tab.id
                        ? "text-yellow-600 border-yellow-500 bg-yellow-50"
                        : "text-gray-600 border-transparent hover:text-yellow-600 hover:bg-yellow-50"
                      }`}
                  >
                    <i className={`${tab.icon} text-sm sm:text-base lg:text-lg`}></i>
                    <span className="inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>


            {activePlacementTab === 'home' && (
              <div className="mt-4">

                {/* Yearly Statistics Cards */}
                <div className="mt-12">
                  <h6 className="text-2xl font-bold text-gray-900 mb-8 text-center">Yearly Placement Highlights</h6>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {placementStats.map((stat, index) => (
                      <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:border-yellow-400 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                        <div className="flex items-center justify-between mb-4">
                          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Academic Year</span>
                          <span className="text-gray-900 font-bold">{stat.year}</span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors">Placement Statistics</h3>

                        <div className="space-y-4 mb-6 flex-grow">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                              <Users className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 font-semibold uppercase">Students Placed</p>
                              <p className="text-base font-bold text-gray-900">{stat.placed} Students</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                              <Award className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 font-semibold uppercase">Highest Salary</p>
                              <p className="text-base font-bold text-gray-900">Rs. {stat.highest}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                              <BarChart2 className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 font-semibold uppercase">Average Salary</p>
                              <p className="text-base font-bold text-gray-900">Rs. {stat.average}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                              <Building className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 font-semibold uppercase">Top Recruiters</p>
                              <p className="text-base font-bold text-gray-900">{stat.companies} Companies</p>
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 italic border-t border-gray-100 pt-4 leading-relaxed line-clamp-2 mt-auto">
                          "{stat.description}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activePlacementTab === 'cse-specialized' && (
              <div className="mt-4">
                <h5 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:text-center">CSE Specialized Industrial Training</h5>

                <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 sm:p-6 md:p-8 rounded-2xl border-2 border-purple-200 mb-6 sm:mb-8">
                  <div className="text-center max-w-3xl mx-auto">
                    <h6 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Exclusive Training for CSE Students</h6>
                    <p className="text-gray-700 leading-relaxed mb-4 text-center sm:text-left">
                      Specialized training programs designed exclusively for Computer Science Engineering students,
                      delivered by external technical experts from leading industry organizations.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-graduation-cap text-purple-600"></i>
                        <span className="font-semibold">Expert Instructors</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-certificate text-purple-600"></i>
                        <span className="font-semibold">Industry Certifications</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-users text-purple-600"></i>
                        <span className="font-semibold">Semester-wise Learning</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3rd Semester Programs */}
                <h6 className="text-2xl font-bold text-gray-900 mb-6 text-center">3rd Semester Programs</h6>
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  {/* Quantumnique - 3rd Sem */}
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-purple-500">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <img
                          src="https://img.logo.dev/quantumniquesolutions.com?token=pk_K8u3uM3kQMik6ox3R29MqA"
                          alt="Quantumnique"
                          className="h-20 w-20 object-contain"
                        />
                        <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">3rd Sem</span>
                      </div>

                      <h6 className="text-2xl font-bold text-gray-900 mb-2">Quantumnique</h6>
                      <div className="border-b-2 border-yellow-500 w-16 mb-4"></div>

                      <div className="mb-4">
                        <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Training Program</p>
                        <p className="text-gray-700 text-base">Java Programming & Advanced Data Structures</p>
                      </div>

                      <div className="mb-4">
                        <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Course Modules</p>
                        <ul className="space-y-1 text-sm text-gray-700">
                          <li>• Core Java Programming Fundamentals</li>
                          <li>• Object-Oriented Programming Concepts</li>
                          <li>• Advanced Data Structures (Trees, Graphs, Heaps)</li>
                          <li>• Algorithm Design & Analysis</li>
                          <li>• Problem Solving & Coding Practice</li>
                        </ul>
                      </div>

                      <div className="mb-4">
                        <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Duration & Mode</p>
                        <p className="text-gray-700 text-base">3 Months | Offline Classroom</p>
                      </div>

                      <div className="mb-4">
                        <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Target Students</p>
                        <p className="text-gray-700 text-base">3rd Semester CSE Students Only</p>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          <strong>Certification:</strong> Quantumnique Certified Java & Data Structures Specialist
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* IgenuineLearning - 3rd Sem */}
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-blue-500">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <img
                          src="https://img.logo.dev/igenuinelearning.com?token=pk_K8u3uM3kQMik6ox3R29MqA"
                          alt="IgenuineLearning"
                          className="h-20 w-20 object-contain"
                        />
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">3rd Sem</span>
                      </div>

                      <h6 className="text-2xl font-bold text-gray-900 mb-2">IgenuineLearning</h6>
                      <div className="border-b-2 border-yellow-500 w-16 mb-4"></div>

                      <div className="mb-4">
                        <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Training Program</p>
                        <p className="text-gray-700 text-base">Java Programming & Advanced Data Structures</p>
                      </div>

                      <div className="mb-4">
                        <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Course Modules</p>
                        <ul className="space-y-1 text-sm text-gray-700">
                          <li>• Java Syntax, Data Types & Control Flow</li>
                          <li>• Classes, Objects & Inheritance</li>
                          <li>• Stacks, Queues, Linked Lists</li>
                          <li>• Binary Trees, AVL Trees, B-Trees</li>
                          <li>• Graph Algorithms & Dynamic Programming</li>
                        </ul>
                      </div>

                      <div className="mb-4">
                        <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Duration & Mode</p>
                        <p className="text-gray-700 text-base">3 Months | Offline Classroom</p>
                      </div>

                      <div className="mb-4">
                        <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Target Students</p>
                        <p className="text-gray-700 text-base">3rd Semester CSE Students Only</p>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          <strong>Certification:</strong> IgenuineLearning Java & Advanced DS Certificate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4th Semester Program */}
                <h6 className="text-2xl font-bold text-gray-900 mb-6 text-center">4th Semester Program</h6>
                <div className="max-w-2xl mx-auto">
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-indigo-500">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <img
                          src="https://img.logo.dev/quantumniquesolutions.com?token=pk_K8u3uM3kQMik6ox3R29MqA"
                          alt="Quantumnique"
                          className="h-20 w-20 object-contain"
                        />
                        <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-bold">4th Sem</span>
                      </div>

                      <h6 className="text-2xl font-bold text-gray-900 mb-2">Quantumnique</h6>
                      <div className="border-b-2 border-indigo-500 w-16 mb-4"></div>

                      <div className="mb-4">
                        <p className="text-sm font-semibold text-indigo-600 uppercase mb-2">Training Program</p>
                        <p className="text-gray-700 text-base">Database Management & Analysis of Algorithms</p>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-semibold text-indigo-600 uppercase mb-2">Course Modules</p>
                        <ul className="space-y-1 text-sm text-gray-700">
                          <li>• Relational Database Design & Normalization</li>
                          <li>• SQL Queries & Database Operations</li>
                          <li>• Indexing, Transactions & Concurrency Control</li>
                          <li>• Algorithm Complexity Analysis (Big O, Theta, Omega)</li>
                          <li>• Divide & Conquer, Greedy, Dynamic Programming</li>
                          <li>• Graph Algorithms & NP-Completeness</li>
                        </ul>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-semibold text-indigo-600 uppercase mb-2">Duration & Mode</p>
                        <p className="text-gray-700 text-base">3 Months | Offline Classroom</p>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-semibold text-indigo-600 uppercase mb-2">Target Students</p>
                        <p className="text-gray-700 text-base">4th Semester CSE Students Only</p>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          <strong>Certification:</strong> Quantumnique DBMS & Algorithm Analysis Expert
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activePlacementTab === 'partners' && (
              <div className="mt-4">
                <h5 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:text-center">Industrial Training Partners</h5>

                {/* Partner Cards Grid - Responsive columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                  {/* IgenuineLearning 2025 */}
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-yellow-500">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <img src="https://img.logo.dev/igenuinelearning.com?token=pk_K8u3uM3kQMik6ox3R29MqA" alt="IgenuineLearning" className="h-20 w-20 object-contain" />
                        <span className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">2025</span>
                      </div>

                      <h6 className="text-2xl font-bold text-gray-900 mb-2">IgenuineLearning</h6>
                      <div className="border-b-2 border-yellow-500 w-16 mb-4"></div>

                      <div className="mb-4">
                        <p className="text-sm font-semibold text-yellow-600 uppercase mb-2">Training Program</p>
                        <p className="text-gray-700 text-base">Full Stack Java Development</p>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-semibold text-yellow-600 uppercase mb-2">Course Modules</p>
                        <ul className="space-y-1 text-sm text-gray-700">
                          <li>• Java Fundamentals & OOP</li>
                          <li>• Frontend: HTML5, CSS3, React.js</li>
                          <li>• Backend: Spring Boot, Hibernate</li>
                          <li>• Database: MySQL, MongoDB</li>
                          <li>• DevOps: Docker, AWS, CI/CD</li>
                        </ul>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-semibold text-yellow-600 uppercase mb-2">Duration & Mode</p>
                        <p className="text-gray-700 text-base">6 Months | Offline Classroom</p>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-semibold text-yellow-600 uppercase mb-2">Target Students</p>
                        <p className="text-gray-700 text-base">5th to 7th Semester Students</p>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          <strong>Certification:</strong> Industry-recognized Full Stack Java Developer
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Six Phrase 2024 */}
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-yellow-500">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <img src="https://img.logo.dev/sixphrase.com?token=pk_K8u3uM3kQMik6ox3R29MqA" alt="Six Phrase" className="h-20 w-20 object-contain" />
                        <span className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">2024</span>
                      </div>

                      <h6 className="text-2xl font-bold text-gray-900 mb-2">Six Phrase</h6>
                      <div className="border-b-2 border-yellow-500 w-16 mb-4"></div>

                      <div className="mb-4">
                        <p className="text-sm font-semibold text-yellow-600 uppercase mb-2">Training Program</p>
                        <p className="text-gray-700 text-base">Full Stack Java Development</p>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-semibold text-yellow-600 uppercase mb-2">Course Phases</p>
                        <ul className="space-y-1 text-sm text-gray-700">
                          <li>• Core & Advanced Java, DSA</li>
                          <li>• Web: TypeScript, Angular/React</li>
                          <li>• Spring Ecosystem & Microservices</li>
                          <li>• Database: SQL, NoSQL (MongoDB)</li>
                          <li>• Testing: JUnit, Docker, Kubernetes</li>
                        </ul>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-semibold text-yellow-600 uppercase mb-2">Duration & Mode</p>
                        <p className="text-gray-700 text-base">5 Months | Offline Classroom</p>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-semibold text-yellow-600 uppercase mb-2">Target Students</p>
                        <p className="text-gray-700 text-base">5th to 7th Semester Students</p>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          <strong>Certification:</strong> Six Phrase Certified Full Stack Java Developer
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Terv 2023 */}
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-yellow-500">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <img src="https://img.logo.dev/terv.pro?token=pk_K8u3uM3kQMik6ox3R29MqA" alt="Terv" className="h-20 w-20 object-contain" />
                        <span className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">2023</span>
                      </div>

                      <h6 className="text-2xl font-bold text-gray-900 mb-2">Terv</h6>
                      <div className="border-b-2 border-yellow-500 w-16 mb-4"></div>

                      <div className="mb-4">
                        <p className="text-sm font-semibold text-yellow-600 uppercase mb-2">Training Program</p>
                        <p className="text-gray-700 text-base">Full Stack Java Development</p>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-semibold text-yellow-600 uppercase mb-2">Course Units</p>
                        <ul className="space-y-1 text-sm text-gray-700">
                          <li>• Java Foundation & OOP Principles</li>
                          <li>• Frontend: HTML, CSS, React.js</li>
                          <li>• Backend: Spring Framework, REST</li>
                          <li>• Database: MySQL, Hibernate, JPA</li>
                          <li>• Deployment: Docker, AWS Cloud</li>
                        </ul>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-semibold text-yellow-600 uppercase mb-2">Duration & Mode</p>
                        <p className="text-gray-700 text-base">4 Months | Offline Classroom</p>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-semibold text-yellow-600 uppercase mb-2">Target Students</p>
                        <p className="text-gray-700 text-base">5th to 7th Semester Students</p>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          <strong>Certification:</strong> Terv Full Stack Java Development Certificate
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed Syllabus Section Removed - All info now in cards */}
              </div>
            )}

            {activePlacementTab === 'recruiters' && (
              <div className="mt-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-2">
                  <div>
                    <h5 className="text-2xl sm:text-3xl font-bold text-gray-900">Industry Giants & Placement Partners</h5>
                    <p className="text-gray-500 mt-1">Leading multi-national corporations who regularly visit our campus for recruitment drives</p>
                  </div>
                  <div className="bg-yellow-50 px-4 py-2 rounded-xl border border-yellow-200 self-start sm:self-center">
                    <p className="text-sm font-semibold text-yellow-700">
                      Networked with <span className="text-xl font-bold text-yellow-600">{sortedRecruiters.length}+</span> Global Recruiters
                    </p>
                  </div>
                </div>

                <div className="relative overflow-hidden py-10 scale-110">
                  <div className="flex animate-scroll gap-12 hover:[animation-play-state:paused] transition-all duration-300 items-center">
                    {/* First set of logos */}
                    {sortedRecruiters.slice(0, 30).map((company) => {
                      const logoUrl = getCompanyEnrichLogoUrl(company.name);
                      return (
                        <div
                          key={company.name}
                          className="flex-shrink-0 w-44 group transition-all duration-300 flex flex-col items-center justify-center p-2"
                        >
                          <div className="h-28 flex items-center justify-center mb-3 w-full">
                            {logoUrl ? (
                              <img
                                src={logoUrl}
                                alt={company.name}
                                className="max-h-full max-w-full object-contain transition-all duration-300 transform group-hover:scale-110"
                                loading="lazy"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.onerror = null;
                                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=FEF3C7&color=92400E&font-size=0.33&bold=true&size=128`;
                                }}
                              />
                            ) : (
                              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-yellow-100 text-yellow-700 font-bold text-2xl">
                                {company.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <p className="text-center text-sm font-bold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                            {company.name}
                          </p>
                        </div>
                      );
                    })}
                    {/* Duplicate set for seamless scrolling */}
                    {sortedRecruiters.slice(0, 30).map((company) => {
                      const logoUrl = getCompanyEnrichLogoUrl(company.name);
                      return (
                        <div
                          key={`${company.name}-dup`}
                          className="flex-shrink-0 w-44 group transition-all duration-300 flex flex-col items-center justify-center p-2"
                        >
                          <div className="h-28 flex items-center justify-center mb-3 w-full">
                            {logoUrl ? (
                              <img
                                src={logoUrl}
                                alt={company.name}
                                className="max-h-full max-w-full object-contain transition-all duration-300 transform group-hover:scale-110"
                                loading="lazy"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.onerror = null;
                                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=FEF3C7&color=92400E&font-size=0.33&bold=true&size=128`;
                                }}
                              />
                            ) : (
                              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-yellow-100 text-yellow-700 font-bold text-2xl">
                                {company.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <p className="text-center text-sm font-bold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                            {company.name}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="text-center mt-12 bg-gray-50 p-8 rounded-3xl border border-dashed border-gray-300">
                  <h6 className="text-xl font-bold text-gray-900 mb-2">Want to explore all our recruitment partners?</h6>
                  <p className="text-gray-500 mb-6 max-w-lg mx-auto">Browse our complete list of recruiters including top-tier Fortune 500 companies and growing startups.</p>
                  <button
                    onClick={() => navigate('/recruiters')}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-bold bg-yellow-500 text-gray-900 hover:bg-yellow-600 transition-all duration-300 hover:scale-105 shadow-lg group"
                  >
                    <span>Explore Full Recruiter Network</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {activePlacementTab === 'team' && (
              <div className="mt-4">
                <h5 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:text-center">
                  TRAINING AND PLACEMENT CELL
                </h5>

                {/* Placement Coordinators Table */}
                <div className="mb-6 sm:mb-8">
                  <h6 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 text-center sm:text-left">Placement Coordinators from Placement Cell</h6>
                  <div className="overflow-x-auto">
                    <div className="inline-block min-w-full rounded-2xl border border-gray-200">
                      <table className="min-w-full border-collapse text-sm md:text-base">
                        <thead>
                          <tr className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-400 text-white">
                            <th className="px-3 sm:px-4 py-2 sm:py-3 text-center font-semibold w-16 rounded-tl-2xl">#</th>
                            <th className="px-3 sm:px-4 py-2 sm:py-3 text-center font-semibold">NAME</th>
                            <th className="px-3 sm:px-4 py-2 sm:py-3 text-center font-semibold rounded-tr-2xl">DESIGNATION</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="even:bg-gray-50 hover:bg-amber-50 transition duration-150">
                            <td className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs md:text-sm text-gray-600">1</td>
                            <td className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs md:text-sm text-gray-600">Mr.M.Bhuvanesh</td>
                            <td className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs md:text-sm text-gray-600">Placement Coordinator</td>
                          </tr>
                          <tr className="even:bg-gray-50 hover:bg-amber-50 transition duration-150">
                            <td className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs md:text-sm text-gray-600">2</td>
                            <td className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs md:text-sm text-gray-600">Mr.K.Vignesh</td>
                            <td className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs md:text-sm text-gray-600">Placement Coordinator</td>
                          </tr>
                          <tr className="even:bg-gray-50 hover:bg-amber-50 transition duration-150">
                            <td className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs md:text-sm text-gray-600">3</td>
                            <td className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs md:text-sm text-gray-600">Mr.R.Vigensh</td>
                            <td className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs md:text-sm text-gray-600">Placement Coordinator</td>
                          </tr>
                          <tr className="even:bg-gray-50 hover:bg-amber-50 transition duration-150">
                            <td className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs md:text-sm text-gray-600">4</td>
                            <td className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs md:text-sm text-gray-600">Ms.Gopika</td>
                            <td className="px-3 sm:px-4 py-2 sm:py-3 text-center text-xs md:text-sm text-gray-600">Placement Coordinator</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activePlacementTab === 'training' && (
              <div className="mt-4">
                <h5 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:text-center">Training & Skill Development</h5>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 sm:p-6 md:p-8 rounded-2xl">
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed text-center mb-4 sm:mb-6">
                    Intensive training programs on aptitude, programming, communication, and interview skills
                    are conducted regularly to make students industry-ready. Our comprehensive training approach
                    ensures students are well-prepared for campus recruitment and corporate environments.
                  </p>

                  <div className="text-center">
                    <button
                      onClick={() => navigate('/training-details')}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-base font-semibold bg-yellow-500 text-gray-900 hover:bg-yellow-600 transition-all duration-200 hover:scale-105 shadow-md"
                    >
                      <span>See More</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Global Auto-scrolling Recruiters - Always Visible (Restricted to Requested Logos) */}
            <div className="relative overflow-hidden py-12 mt-12 bg-gray-50/50 rounded-3xl border border-gray-100">
              <div className="flex animate-scroll gap-16 hover:[animation-play-state:paused] transition-all duration-300 items-center">
                {/* First set of logos */}
                {recruiters
                  .filter((rec: any) => requestedLogosList.includes(rec.name))
                  .map((company: any) => {
                    const logoUrl = getCompanyEnrichLogoUrl(company.name);
                    return (
                      <div
                        key={company.name}
                        className="flex-shrink-0 group transition-all duration-300 flex flex-col items-center justify-center"
                      >
                        <div className="h-24 w-40 flex items-center justify-center mb-3">
                          {logoUrl ? (
                            <img
                              src={logoUrl}
                              alt={company.name}
                              className="max-h-full max-w-full object-contain transition-all duration-300 transform group-hover:scale-110"
                              loading="lazy"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=FEF3C7&color=92400E&font-size=0.33&bold=true&size=128`;
                              }}
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-yellow-100 text-yellow-700 font-bold text-2xl">
                              {company.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <p className="text-center text-xs font-bold text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {company.name}
                        </p>
                      </div>
                    );
                  })}
                {/* Duplicate set for seamless scrolling */}
                {recruiters
                  .filter((rec: any) => requestedLogosList.includes(rec.name))
                  .map((company: any) => {
                    const logoUrl = getCompanyEnrichLogoUrl(company.name);
                    return (
                      <div
                        key={`${company.name}-dup`}
                        className="flex-shrink-0 group transition-all duration-300 flex flex-col items-center justify-center"
                      >
                        <div className="h-24 w-40 flex items-center justify-center mb-3">
                          {logoUrl ? (
                            <img
                              src={logoUrl}
                              alt={company.name}
                              className="max-h-full max-w-full object-contain transition-all duration-300 transform group-hover:scale-110"
                              loading="lazy"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=FEF3C7&color=92400E&font-size=0.33&bold=true&size=128`;
                              }}
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-yellow-100 text-yellow-700 font-bold text-2xl">
                              {company.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <p className="text-center text-xs font-bold text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {company.name}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </LazyLoadWrapper>
      </div>

      {/* Industry Oriented Training Section */}
      <div id="industry" className="scroll-mt-32">
        <LazyLoadWrapper height="400px" delay={500}>
          <div className="bg-white p-6 sm:p-8 md:p-12 rounded-2xl shadow-lg">
            <h4 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 text-center">Industry Oriented Training</h4>
            <div className="w-32 h-1 bg-[#f59e0b] rounded-full mx-auto mb-6"></div>
            <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Collaborations with leading tech companies to provide industry-relevant training and certifications to our students.
            </p>

            {/* Scrolling Programs Carousel */}
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  ref={industryCarouselRef}
                  className="flex animate-scroll-left gap-6 pb-4"
                  onMouseEnter={() => {
                    // Pause the CSS animation when hovering
                    const element = industryCarouselRef.current;
                    if (element) {
                      element.style.animationPlayState = 'paused';
                    }
                  }}
                  onMouseLeave={() => {
                    // Resume the CSS animation when leaving
                    const element = industryCarouselRef.current;
                    if (element) {
                      element.style.animationPlayState = 'running';
                    }
                  }}
                >
                  {/* Capgemini & ICT Academy Programs - Consolidated */}
                  <div className="flex-shrink-0 w-72 sm:w-80 md:w-96 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-yellow-400">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <img
                            src="https://img.logo.dev/capgemini.com?token=pk_K8u3uM3kQMik6ox3R29MqA"
                            alt="Capgemini"
                            className="h-10 w-auto object-contain"
                          />
                          <span className="text-gray-400 font-bold">+</span>
                          <img
                            src="https://img.logo.dev/ictacademy.in?token=pk_K8u3uM3kQMik6ox3R29MqA"
                            alt="ICT Academy"
                            className="h-10 w-auto object-contain"
                          />
                        </div>
                        <span className="bg-yellow-500 text-white px-4 py-1.5 rounded-md text-sm font-bold">Multiple</span>
                      </div>

                      <img
                        src={`${import.meta.env.BASE_URL}industry oriented/capgemini.jpg`}
                        alt="Capgemini Programs"
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />

                      <h5 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">Capgemini & ICT Academy Training Programs</h5>
                      <div className="border-b-2 border-yellow-500 w-16 mb-4"></div>

                      <div className="mb-3">
                        <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Programs Offered</p>
                        <div className="text-gray-700 text-sm space-y-3">
                          <div>
                            <p className="font-bold text-base">1. Women Empowerment Program (2024)</p>
                            <p className="pl-4 text-sm">• Data Science and Big Data Analytics for final year students (CSE, ECE, IT)</p>
                          </div>

                          <div>
                            <p className="font-bold text-base">2. Women Transformation Program (2023)</p>
                            <p className="pl-4 text-sm">• Leadership skills, technical expertise, and professional development</p>
                          </div>

                          <div>
                            <p className="font-bold text-base">3. Data Science & Big Data Analytics (420 Hours)</p>
                            <p className="pl-4 text-sm">• 51 students trained • Joint certification • Free for women students</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          <strong>Partners:</strong> Capgemini & ICT Academy
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Microsoft Cybersecurity */}
                  <div className="flex-shrink-0 w-72 sm:w-80 md:w-96 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-yellow-400">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <img
                            src="https://img.logo.dev/microsoft.com?token=pk_K8u3uM3kQMik6ox3R29MqA"
                            alt="Microsoft"
                            className="h-10 w-auto object-contain"
                          />
                          <span className="text-gray-400 font-bold">+</span>
                          <img
                            src="https://img.logo.dev/ictacademy.in?token=pk_K8u3uM3kQMik6ox3R29MqA"
                            alt="ICT Academy"
                            className="h-10 w-auto object-contain"
                          />
                        </div>
                        <span className="bg-yellow-500 text-white px-4 py-1.5 rounded-md text-sm font-bold">2022-23</span>
                      </div>

                      <img
                        src={`${import.meta.env.BASE_URL}industry oriented/microsoft cybersecurty.jpg`}
                        alt="Cyber Shiksha Program"
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />

                      <h5 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">Microsoft Cybersecurity - Cyber Shiksha</h5>
                      <div className="border-b-2 border-yellow-500 w-16 mb-4"></div>

                      <div className="mb-3">
                        <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Program Overview</p>
                        <p className="text-gray-700 text-base leading-relaxed">
                          "Cyber Shiksha for Educators and Students" - A CSR Initiative of Microsoft Philanthropy implemented by ICT Academy from 23.07.22 to 04.02.23.
                        </p>
                      </div>

                      <div className="mb-3">
                        <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Focus Areas</p>
                        <ul className="text-gray-700 text-base space-y-1">
                          <li>• Cybersecurity Fundamentals</li>
                          <li>• Ethical Hacking</li>
                          <li>• Network Security</li>
                          <li>• Digital Safety</li>
                        </ul>
                      </div>

                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          <strong>Initiative:</strong> Microsoft Philanthropy & ICT Academy
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Microsoft Power BI */}
                  <div className="flex-shrink-0 w-72 sm:w-80 md:w-96 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-yellow-400">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <img
                            src="https://img.logo.dev/microsoft.com?token=pk_K8u3uM3kQMik6ox3R29MqA"
                            alt="Microsoft"
                            className="h-10 w-auto object-contain"
                          />
                          <span className="text-gray-400 font-bold">+</span>
                          <img
                            src="https://img.logo.dev/ictacademy.in?token=pk_K8u3uM3kQMik6ox3R29MqA"
                            alt="ICT Academy"
                            className="h-10 w-auto object-contain"
                          />
                        </div>
                        <span className="bg-yellow-500 text-white px-4 py-1.5 rounded-md text-sm font-bold">2025</span>
                      </div>

                      <img
                        src={`${import.meta.env.BASE_URL}industry oriented/Microsoft Powerbi.png`}
                        alt="Power BI Training"
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />

                      <h5 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">Microsoft Power BI Training Program</h5>
                      <div className="border-b-2 border-yellow-500 w-16 mb-4"></div>

                      <div className="mb-3">
                        <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Program Details</p>
                        <p className="text-gray-700 text-base leading-relaxed">
                          Training conducted by certified trainers from ICT Academy. Learn to transform raw data into meaningful insights through interactive dashboards, reports, and analytics.
                        </p>
                      </div>

                      <div className="mb-3">
                        <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Training Info</p>
                        <ul className="text-gray-700 text-base space-y-1">
                          <li>• <strong>Class:</strong> III Year CSE and AI&DS</li>
                          <li>• <strong>Students:</strong> 50</li>
                          <li>• <strong>Date:</strong> 15.09.2025 to 19.09.2025 (5 days)</li>
                        </ul>
                      </div>

                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          <strong>Partners:</strong> Microsoft & ICT Academy
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* UiPath RPA */}
                  <div className="flex-shrink-0 w-72 sm:w-80 md:w-96 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-yellow-400">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <img
                          src="https://img.logo.dev/uipath.com?token=pk_K8u3uM3kQMik6ox3R29MqA"
                          alt="UiPath"
                          className="h-12 w-auto object-contain"
                        />
                        <span className="bg-yellow-500 text-white px-4 py-1.5 rounded-md text-sm font-bold">2025</span>
                      </div>

                      <img
                        src={`${import.meta.env.BASE_URL}industry oriented/UiPath.png`}
                        alt="UiPath RPA Training"
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />

                      <h5 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">UiPath Robotic Process Automation Training</h5>
                      <div className="border-b-2 border-yellow-500 w-16 mb-4"></div>

                      <div className="mb-3">
                        <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Program Objective</p>
                        <p className="text-gray-700 text-base leading-relaxed">
                          Equip students with hands-on skills in automation, workflow design, and RPA tools. Learn to automate repetitive business tasks using UiPath Studio.
                        </p>
                      </div>

                      <div className="mb-3">
                        <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Training Info</p>
                        <ul className="text-gray-700 text-base space-y-1">
                          <li>• <strong>Class:</strong> IV Year CSE, AI&DS, and IT</li>
                          <li>• <strong>Students:</strong> 50</li>
                          <li>• <strong>Date:</strong> 08.09.2025 to 12.09.2025 (5 days)</li>
                        </ul>
                      </div>

                      <div className="mb-3">
                        <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Key Topics</p>
                        <ul className="text-gray-700 text-base space-y-1">
                          <li>• UiPath Studio & Workflow Design</li>
                          <li>• Screen & Data Scraping</li>
                          <li>• Exception Handling & Debugging</li>
                        </ul>
                      </div>

                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          <strong>Platform:</strong> UiPath RPA
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* IBM Naalaiya Thiran */}
                  <div className="flex-shrink-0 w-72 sm:w-80 md:w-96 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-yellow-400">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <img
                          src="https://img.logo.dev/ibm.com?token=pk_K8u3uM3kQMik6ox3R29MqA"
                          alt="IBM"
                          className="h-12 w-auto object-contain"
                        />
                        <span className="bg-yellow-500 text-white px-4 py-1.5 rounded-md text-sm font-bold">HX 8001</span>
                      </div>

                      <img
                        src={`${import.meta.env.BASE_URL}industry oriented/ibm.jpg`}
                        alt="Naalaiya Thiran Program"
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />

                      <h5 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">IBM Naalaiya Thiran - Professional Readiness</h5>
                      <div className="border-b-2 border-yellow-500 w-16 mb-4"></div>

                      <div className="mb-3">
                        <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Course Code: HX 8001</p>
                        <p className="text-gray-700 text-base font-semibold mb-2">
                          Professional Readiness for Innovation, Employability and Entrepreneurship
                        </p>
                      </div>

                      <div className="mb-3">
                        <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Project Details</p>
                        <p className="text-gray-700 text-base">
                          <strong>Project Title:</strong> Crude Oil Price Prediction<br />
                          <strong>Team ID:</strong> PNT2022TMID10413
                        </p>
                      </div>

                      <div className="mb-3">
                        <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Focus Areas</p>
                        <ul className="text-gray-700 text-base space-y-1">
                          <li>• Innovation & Creativity</li>
                          <li>• Employability Skills</li>
                          <li>• Entrepreneurship Development</li>
                          <li>• Professional Development</li>
                        </ul>
                      </div>

                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          <strong>Program:</strong> Naalaiya Thiran by IBM
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Duplicate cards for seamless loop */}
                  {/* Capgemini & ICT Academy Programs - Duplicate */}
                  <div className="flex-shrink-0 w-72 sm:w-80 md:w-96 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-yellow-400">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <img
                            src="https://img.logo.dev/capgemini.com?token=pk_K8u3uM3kQMik6ox3R29MqA"
                            alt="Capgemini"
                            className="h-10 w-auto object-contain"
                          />
                          <span className="text-gray-400 font-bold">+</span>
                          <img
                            src="https://img.logo.dev/ictacademy.in?token=pk_K8u3uM3kQMik6ox3R29MqA"
                            alt="ICT Academy"
                            className="h-10 w-auto object-contain"
                          />
                        </div>
                        <span className="bg-yellow-500 text-white px-4 py-1.5 rounded-md text-sm font-bold">Multiple</span>
                      </div>

                      <img
                        src={`${import.meta.env.BASE_URL}industry oriented/capgemini.jpg`}
                        alt="Capgemini Programs"
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />

                      <h5 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">Capgemini & ICT Academy Training Programs</h5>
                      <div className="border-b-2 border-yellow-500 w-16 mb-4"></div>

                      <div className="mb-3">
                        <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Programs Offered</p>
                        <div className="text-gray-700 text-sm space-y-3">
                          <div>
                            <p className="font-bold text-base">1. Women Empowerment Program (2024)</p>
                            <p className="pl-4 text-sm">• Data Science and Big Data Analytics for final year students (CSE, ECE, IT)</p>
                          </div>

                          <div>
                            <p className="font-bold text-base">2. Women Transformation Program (2023)</p>
                            <p className="pl-4 text-sm">• Leadership skills, technical expertise, and professional development</p>
                          </div>

                          <div>
                            <p className="font-bold text-base">3. Data Science & Big Data Analytics (420 Hours)</p>
                            <p className="pl-4 text-sm">• 51 students trained • Joint certification • Free for women students</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          <strong>Partners:</strong> Capgemini & ICT Academy
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Microsoft Cybersecurity - Duplicate */}
                  <div className="flex-shrink-0 w-72 sm:w-80 md:w-96 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-yellow-400">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <img
                            src="https://img.logo.dev/microsoft.com?token=pk_K8u3uM3kQMik6ox3R29MqA"
                            alt="Microsoft"
                            className="h-10 w-auto object-contain"
                          />
                          <span className="text-gray-400 font-bold">+</span>
                          <img
                            src="https://img.logo.dev/ictacademy.in?token=pk_K8u3uM3kQMik6ox3R29MqA"
                            alt="ICT Academy"
                            className="h-10 w-auto object-contain"
                          />
                        </div>
                        <span className="bg-yellow-500 text-white px-4 py-1.5 rounded-md text-sm font-bold">2022-23</span>
                      </div>

                      <img
                        src={`${import.meta.env.BASE_URL}industry oriented/microsoft cybersecurty.jpg`}
                        alt="Cyber Shiksha Program"
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />

                      <h5 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">Microsoft Cybersecurity - Cyber Shiksha</h5>
                      <div className="border-b-2 border-yellow-500 w-16 mb-4"></div>

                      <div className="mb-3">
                        <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Program Overview</p>
                        <p className="text-gray-700 text-base leading-relaxed">
                          "Cyber Shiksha for Educators and Students" - A CSR Initiative of Microsoft Philanthropy implemented by ICT Academy from 23.07.22 to 04.02.23.
                        </p>
                      </div>

                      <div className="mb-3">
                        <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Focus Areas</p>
                        <ul className="text-gray-700 text-base space-y-1">
                          <li>• Cybersecurity Fundamentals</li>
                          <li>• Ethical Hacking</li>
                          <li>• Network Security</li>
                          <li>• Digital Safety</li>
                        </ul>
                      </div>

                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          <strong>Initiative:</strong> Microsoft Philanthropy & ICT Academy
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Microsoft Power BI - Duplicate */}
                  <div className="flex-shrink-0 w-72 sm:w-80 md:w-96 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-yellow-400">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <img
                            src="https://img.logo.dev/microsoft.com?token=pk_K8u3uM3kQMik6ox3R29MqA"
                            alt="Microsoft"
                            className="h-10 w-auto object-contain"
                          />
                          <span className="text-gray-400 font-bold">+</span>
                          <img
                            src="https://img.logo.dev/ictacademy.in?token=pk_K8u3uM3kQMik6ox3R29MqA"
                            alt="ICT Academy"
                            className="h-10 w-auto object-contain"
                          />
                        </div>
                        <span className="bg-yellow-500 text-white px-4 py-1.5 rounded-md text-sm font-bold">2025</span>
                      </div>

                      <img
                        src={`${import.meta.env.BASE_URL}industry oriented/Microsoft Powerbi.png`}
                        alt="Power BI Training"
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />

                      <h5 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">Microsoft Power BI Training Program</h5>
                      <div className="border-b-2 border-yellow-500 w-16 mb-4"></div>

                      <div className="mb-3">
                        <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Program Details</p>
                        <p className="text-gray-700 text-base leading-relaxed">
                          Training conducted by certified trainers from ICT Academy. Learn to transform raw data into meaningful insights through interactive dashboards, reports, and analytics.
                        </p>
                      </div>

                      <div className="mb-3">
                        <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Training Info</p>
                        <ul className="text-gray-700 text-base space-y-1">
                          <li>• <strong>Class:</strong> III Year CSE and AI&DS</li>
                          <li>• <strong>Students:</strong> 50</li>
                          <li>• <strong>Date:</strong> 15.09.2025 to 19.09.2025 (5 days)</li>
                        </ul>
                      </div>

                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          <strong>Partners:</strong> Microsoft & ICT Academy
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* UiPath RPA - Duplicate */}
                  <div className="flex-shrink-0 w-72 sm:w-80 md:w-96 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-yellow-400">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <img
                          src="https://img.logo.dev/uipath.com?token=pk_K8u3uM3kQMik6ox3R29MqA"
                          alt="UiPath"
                          className="h-12 w-auto object-contain"
                        />
                        <span className="bg-yellow-500 text-white px-4 py-1.5 rounded-md text-sm font-bold">2025</span>
                      </div>

                      <img
                        src={`${import.meta.env.BASE_URL}industry oriented/UiPath.png`}
                        alt="UiPath RPA Training"
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />

                      <h5 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">UiPath Robotic Process Automation Training</h5>
                      <div className="border-b-2 border-yellow-500 w-16 mb-4"></div>

                      <div className="mb-3">
                        <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Program Objective</p>
                        <p className="text-gray-700 text-base leading-relaxed">
                          Equip students with hands-on skills in automation, workflow design, and RPA tools. Learn to automate repetitive business tasks using UiPath Studio.
                        </p>
                      </div>

                      <div className="mb-3">
                        <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Training Info</p>
                        <ul className="text-gray-700 text-base space-y-1">
                          <li>• <strong>Class:</strong> IV Year CSE, AI&DS, and IT</li>
                          <li>• <strong>Students:</strong> 50</li>
                          <li>• <strong>Date:</strong> 08.09.2025 to 12.09.2025 (5 days)</li>
                        </ul>
                      </div>

                      <div className="mb-3">
                        <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Key Topics</p>
                        <ul className="text-gray-700 text-base space-y-1">
                          <li>• UiPath Studio & Workflow Design</li>
                          <li>• Screen & Data Scraping</li>
                          <li>• Exception Handling & Debugging</li>
                        </ul>
                      </div>

                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          <strong>Platform:</strong> UiPath RPA
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* IBM Naalaiya Thiran - Duplicate */}
                  <div className="flex-shrink-0 w-72 sm:w-80 md:w-96 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-yellow-400">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <img
                          src="https://img.logo.dev/ibm.com?token=pk_K8u3uM3kQMik6ox3R29MqA"
                          alt="IBM"
                          className="h-12 w-auto object-contain"
                        />
                        <span className="bg-yellow-500 text-white px-4 py-1.5 rounded-md text-sm font-bold">HX 8001</span>
                      </div>

                      <img
                        src={`${import.meta.env.BASE_URL}industry oriented/ibm.jpg`}
                        alt="Naalaiya Thiran Program"
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />

                      <h5 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">IBM Naalaiya Thiran - Professional Readiness</h5>
                      <div className="border-b-2 border-yellow-500 w-16 mb-4"></div>

                      <div className="mb-3">
                        <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Course Code: HX 8001</p>
                        <p className="text-gray-700 text-base font-semibold mb-2">
                          Professional Readiness for Innovation, Employability and Entrepreneurship
                        </p>
                      </div>

                      <div className="mb-3">
                        <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Project Details</p>
                        <p className="text-gray-700 text-base">
                          <strong>Project Title:</strong> Crude Oil Price Prediction<br />
                          <strong>Team ID:</strong> PNT2022TMID10413
                        </p>
                      </div>

                      <div className="mb-3">
                        <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Focus Areas</p>
                        <ul className="text-gray-700 text-base space-y-1">
                          <li>• Innovation & Creativity</li>
                          <li>• Employability Skills</li>
                          <li>• Entrepreneurship Development</li>
                          <li>• Professional Development</li>
                        </ul>
                      </div>

                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          <strong>Program:</strong> Naalaiya Thiran by IBM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {[0, 1, 2, 3, 4].map((index) => (
                  <button
                    key={index}
                    className="h-2.5 w-2.5 rounded-full bg-gray-300 hover:bg-yellow-400 transition-colors"
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </LazyLoadWrapper>
      </div>

      {/* Events Organised Section */}
      <div id="events-organised" className="scroll-mt-32">
        <LazyLoadWrapper height="400px" delay={500}>
          <div className="bg-white p-6 sm:p-8 md:p-12 rounded-2xl shadow-lg">
            <h4 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 text-center">Events Organised</h4>
            <div className="w-32 h-1 bg-[#f59e0b] rounded-full mx-auto mb-6"></div>
            <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
              Professional societies and clubs regularly organizing technical events, workshops, seminars, and hackathons to enhance student learning and industry exposure.
            </p>

            {/* Year Filter Pills */}
            <div className="flex justify-center gap-3 mb-8 flex-wrap">
              {['2024-25', '2023-24', '2022-23', '2021-22'].map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedEventsYear(year)}
                  className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${selectedEventsYear === year
                    ? 'bg-yellow-500 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-yellow-100 hover:text-yellow-700'
                    }`}
                >
                  {year}
                </button>
              ))}
            </div>

            {/* Scrolling Events Carousel */}
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  ref={eventsCarouselRef}
                  className="flex animate-scroll-left gap-6 pb-4"
                  onMouseEnter={() => {
                    const element = eventsCarouselRef.current;
                    if (element) {
                      element.style.animationPlayState = 'paused';
                    }
                  }}
                  onMouseLeave={() => {
                    const element = eventsCarouselRef.current;
                    if (element) {
                      element.style.animationPlayState = 'running';
                    }
                  }}
                >
                  {/* Show events filtered by selected year and with images */}
                  {eventsData.events
                    .filter(event => event.year === selectedEventsYear && event.image)
                    .map((event, index) => (
                      <div key={`event-${selectedEventsYear}-${index}`} className="flex-shrink-0 w-72 sm:w-80 md:w-96 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-yellow-400">
                        <div className="p-6">
                          {/* Society Badge and Level Badge */}
                          <div className="flex items-center justify-between mb-4">
                            <span className="bg-yellow-500 text-white px-4 py-1.5 rounded-md text-sm font-bold">
                              {event.society}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${event.level.includes('National')
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                              }`}>
                              {event.level}
                            </span>
                          </div>

                          {/* Event Image */}
                          {event.image && (
                            <img
                              src={getImageUrl(event.image)}
                              alt={event.eventName}
                              className="w-full h-48 object-cover rounded-lg mb-4"
                              loading="lazy"
                            />
                          )}

                          {/* Event Title */}
                          <h5 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">{event.eventName}</h5>
                          <div className="border-b-2 border-yellow-500 w-16 mb-4"></div>

                          {/* Event Description */}
                          {(event as any).description && (
                            <div className="mb-3">
                              <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Event Overview</p>
                              <p className="text-gray-700 text-base leading-relaxed">
                                {(event as any).description}
                              </p>
                            </div>
                          )}

                          {/* Event Highlights */}
                          {(event as any).highlights && (event as any).highlights.length > 0 && (
                            <div className="mb-3">
                              <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Key Highlights</p>
                              <ul className="text-gray-700 text-base space-y-1">
                                {(event as any).highlights.map((highlight: string, idx: number) => (
                                  <li key={idx}>• {highlight}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Event Date and Year */}
                          <div className="pt-3 border-t border-gray-200">
                            {event.date && (
                              <p className="text-sm text-gray-600 mb-1">
                                <strong>Date:</strong> {event.date}
                              </p>
                            )}
                            <p className="text-sm text-gray-600">
                              <strong>Academic Year:</strong> {event.year}
                            </p>
                            {(event as any).resourcePerson && (
                              <p className="text-sm text-gray-600 mt-2">
                                <strong>Resource Person:</strong> {(event as any).resourcePerson}
                              </p>
                            )}
                            {(event as any).coordinator && (
                              <p className="text-sm text-gray-600 mt-1">
                                <strong>Coordinator:</strong> {(event as any).coordinator}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                  {/* Duplicate cards for seamless loop */}
                  {eventsData.events
                    .filter(event => event.year === selectedEventsYear && event.image)
                    .map((event, index) => (
                      <div key={`event-dup-${selectedEventsYear}-${index}`} className="flex-shrink-0 w-72 sm:w-80 md:w-96 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-yellow-400">
                        <div className="p-6">
                          {/* Society Badge and Level Badge */}
                          <div className="flex items-center justify-between mb-4">
                            <span className="bg-yellow-500 text-white px-4 py-1.5 rounded-md text-sm font-bold">
                              {event.society}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${event.level.includes('National')
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                              }`}>
                              {event.level}
                            </span>
                          </div>

                          {/* Event Image */}
                          {event.image && (
                            <img
                              src={getImageUrl(event.image)}
                              alt={event.eventName}
                              className="w-full h-48 object-cover rounded-lg mb-4"
                              loading="lazy"
                            />
                          )}

                          {/* Event Title */}
                          <h5 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">{event.eventName}</h5>
                          <div className="border-b-2 border-yellow-500 w-16 mb-4"></div>

                          {/* Event Description */}
                          {(event as any).description && (
                            <div className="mb-3">
                              <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Event Overview</p>
                              <p className="text-gray-700 text-base leading-relaxed">
                                {(event as any).description}
                              </p>
                            </div>
                          )}

                          {/* Event Highlights */}
                          {(event as any).highlights && (event as any).highlights.length > 0 && (
                            <div className="mb-3">
                              <p className="text-base font-semibold text-yellow-600 uppercase mb-2">Key Highlights</p>
                              <ul className="text-gray-700 text-base space-y-1">
                                {(event as any).highlights.map((highlight: string, idx: number) => (
                                  <li key={idx}>• {highlight}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Event Date and Year */}
                          <div className="pt-3 border-t border-gray-200">
                            {event.date && (
                              <p className="text-sm text-gray-600 mb-1">
                                <strong>Date:</strong> {event.date}
                              </p>
                            )}
                            <p className="text-sm text-gray-600">
                              <strong>Academic Year:</strong> {event.year}
                            </p>
                            {(event as any).resourcePerson && (
                              <p className="text-sm text-gray-600 mt-2">
                                <strong>Resource Person:</strong> {(event as any).resourcePerson}
                              </p>
                            )}
                            {(event as any).coordinator && (
                              <p className="text-sm text-gray-600 mt-1">
                                <strong>Coordinator:</strong> {(event as any).coordinator}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* View All Events Button */}
            <div className="text-center mt-8">
              <button
                onClick={() => navigate('/events-organised')}
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-lg inline-flex items-center gap-2"
              >
                <span>View All Events</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </LazyLoadWrapper>
      </div>

    </div>
  );
};

export default DepartmentDetail;