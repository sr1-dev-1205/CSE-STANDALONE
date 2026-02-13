import React, { useState } from 'react';
import { Quote, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Testimonial {
    name: string;
    batch: string;
    position: string;
    company: string;
    testimonial: string;
    image: string; // placeholder path
}

const getImageUrl = (path: string) => {
    return `${import.meta.env.BASE_URL}${path.startsWith('/') ? path.slice(1) : path}`;
};

const testimonials: Testimonial[] = [
    {
        name: "Prabhakaran.V.M",
        batch: "B.E CSE [2009 – 2013]",
        position: "Founder & CEO",
        company: "Visaithalam Solutions",
        testimonial: "I am happy to share my experience as a Department of CSE student at Hindusthan Institute of Technology. My time here has been nothing short of transformative, providing me with the skills, knowledge, and experiences that will certainly determine the course of my future. The campus itself has acted as a source of inspiration. The cutting-edge facilities, including cutting-edge labs and a well-stocked library, have proven invaluable in my academic endeavors. I cannot express how grateful I am to the teachers and other staff members for their constant support. Their mentoring and support have been important in molding my academic and personal growth. They have inspired me to think critically, to challenge preconceptions, and to strive for greatness. I am honored to have graduated from this esteemed institution, and I am thankful for the opportunities it has provided me.",
        image: getImageUrl("images/testimonial/prabha.png")
    },
    {
        name: "H Abdul Rahman",
        batch: "B.E CSE | 2015-2019",
        position: "Web Developer",
        company: "Logic Information Systems Pvt Ltd.",
        testimonial: "Hindusthan Institute of Technology is a good college with better career Opportunities. Placements get even more awesome year by year. Teaching methodologies are modern & latest equipments are used in practical's. This institution always supports their students for doing something good\" I am grateful for my experience here.",
        image: getImageUrl("images/testimonial/Abdhul.png")
    },
    {
        name: "Kesavan S",
        batch: "B.E CSE [2015 – 2019]",
        position: "Staff Engineer",
        company: "Odessa Technologies",
        testimonial: "I got great support from the Department team. My experience at Hindusthan Institute of Technology has been amazing and memorable. The mentors helped me enhance my academic and interpersonal skills. I am thankful to the Department for providing a platform to upscale my skills and an opportunity to showcase them.",
        image: getImageUrl("images/testimonial/kesavan.png")
    },
    {
        name: "Charles R",
        batch: "B.E CSE [2015 – 2019]",
        position: "Sr. Graphic Designer",
        company: "Valtech Group of Companies",
        testimonial: "My experience at Hindusthan Institute of Technology has been a pleasant one right from the beginning. During placements, the department was extremely helpful and helped me streamline the whole process smoothly. There was guidance provided at every step.",
        image: getImageUrl("images/testimonial/jeevan.png")
    },
    {
        name: "S.M.Jeevan",
        batch: "B.E CSE [2016 – 2020]",
        position: "Software Developer",
        company: "Gabriels Technology Solutions",
        testimonial: "I am eternally grateful for the time I spent at Hindusthan Institute of Technology's Computer Science Department. The instructive curriculum, supportive community, and exposure to cutting-edge technology have all contributed to my development as a student and as an individual. The college has inspired me to focus on my interest \"Music\" in addition to technology. I treasure every time I spent at college and will remember them for the rest of my life.",
        image: getImageUrl("images/testimonial/jeevan.png")
    },
    {
        name: "Pranav P",
        batch: "B.E CSE [2019 – 2023]",
        position: "CEO",
        company: "Kryptonite Solutions",
        testimonial: "I felt right at home into a community of dedicated professors and fellow students who shared my interest for technology and innovation. The department promoted a culture of lifelong learning. Guest lectures by industry experts, seminars, and networking events provided me with information on the most recent trends and developments in the area. I was also given the opportunity to intern at Face-to-Face institute encouraged my entrepreneurial spirit, and I am now an entrepreneur. \"Kryptonite Infotech\" is my own company. I am honored to have graduated from such a prestigious and forward-thinking department, and I look forward to contribute to the profession that has given me so much.",
        image: getImageUrl("images/testimonial/pranov.png")
    },
    {
        name: "Ms. DHIVYAPRIYA S G.",
        batch: "B.E CSE [2019 – 2023]",
        position: "Senior Associate Engineer",
        company: "ATOS Global IT Services and Solutions",
        testimonial: "I am excited to share my experience as an HITECH student. These last few years have been an extraordinary journey of personal development, learning, and progress. One feature that distinguishes HITECH is its emphasis on hands-on learning. The well-equipped laboratories and workshops allowed me to apply academic knowledge to real-world circumstances. In addition, the college lays a great focus on holistic development. Extracurricular activities, clubs, and events have helped to broaden my horizons beyond academics. My education, encouragement, and experiences here have provided a solid basis for my future pursuits. I am convinced that the skills and information I have gained here will be useful in my professional engineering career.",
        image: getImageUrl("images/testimonial/dhivya.png")
    }
];

const TestimonialPage = () => {
    const navigate = useNavigate();
    const [expandedStates, setExpandedStates] = useState<{ [key: number]: boolean }>({});

    const toggleReadMore = (index: number) => {
        setExpandedStates(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
            {/* Back Button */}
            <div className="fixed top-[200px] left-9 z-50">
                <div
                    className="group relative w-12 h-12 rounded-full bg-yellow-500 shadow-lg flex items-center justify-center cursor-pointer hover:bg-yellow-600 transition-all duration-300"
                    onClick={() => navigate(-1)}
                >
                    <svg
                        className="w-5 h-5 text-black"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                        Back
                    </div>
                </div>
            </div>

            {/* Header Section */}
            <div className="pt-16 pb-8 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                        Student Testimonials
                    </h1>
                    <div className="w-32 h-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full mb-6" />
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Hear from our successful alumni who have transformed their careers through
                        quality education and industry-focused training at Hindusthan Institute of Technology.
                    </p>
                </div>
            </div>

            {/* Testimonials Grid */}
            <div className="max-w-7xl mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    {testimonials.map((testimonial, index) => {
                        const isExpanded = !!expandedStates[index];
                        const maxLength = 210;
                        const isLong = testimonial.testimonial.length > maxLength;
                        const displayedText = isExpanded || !isLong
                            ? testimonial.testimonial
                            : testimonial.testimonial.slice(0, maxLength) + "...";

                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col h-full"
                            >
                                <div className="p-8 flex-1 flex flex-col">
                                    {/* Header with Image and Info */}
                                    <div className="flex items-start gap-6 mb-6">
                                        {/* Profile Image */}
                                        <div className="flex-shrink-0">
                                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-gradient-to-br from-yellow-400 to-orange-500 p-1 shadow-lg">
                                                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                                                    <img
                                                        src={testimonial.image}
                                                        alt={testimonial.name}
                                                        className="w-full h-full object-cover rounded-lg"
                                                        onError={(e) => {
                                                            // Fallback for placeholder images
                                                            e.currentTarget.style.display = 'none';
                                                            e.currentTarget.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-gray-400 text-3xl font-bold">${testimonial.name.charAt(0)}</div>`;
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Student Info */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 group-hover:text-yellow-600 transition-colors">
                                                {testimonial.name}
                                            </h3>
                                            <p className="text-sm font-semibold text-yellow-600 mb-2">
                                                {testimonial.batch}
                                            </p>
                                            <div className="space-y-1">
                                                <p className="text-sm font-semibold text-gray-700">
                                                    {testimonial.position}
                                                </p>
                                                <p className="text-sm text-gray-600 font-medium">
                                                    {testimonial.company}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quote Icon */}
                                    <div className="mb-4">
                                        <Quote className="w-8 h-8 text-yellow-400 opacity-50" />
                                    </div>

                                    {/* Testimonial Text */}
                                    <div className="relative flex-1">
                                        <p className={`text-gray-700 leading-relaxed text-justify text-sm sm:text-base ${!isExpanded ? 'line-clamp-4 lg:line-clamp-none' : ''}`}>
                                            {displayedText}
                                        </p>

                                        {isLong && (
                                            <button
                                                onClick={() => toggleReadMore(index)}
                                                className="mt-4 flex items-center gap-1 text-yellow-600 font-bold text-sm hover:text-yellow-700 transition-colors"
                                            >
                                                {isExpanded ? (
                                                    <>Read Less <ChevronUp className="w-4 h-4" /></>
                                                ) : (
                                                    <>Read More <ChevronDown className="w-4 h-4" /></>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Bottom Accent */}
                                <div className="h-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Call to Action */}
            <div className="max-w-7xl mx-auto px-4 pb-16">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-12 sm:px-12 sm:py-16 rounded-2xl text-center text-white shadow-2xl">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                        Join Our Success Stories
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl mb-8 opacity-95 max-w-2xl mx-auto">
                        Be part of an institution that has been shaping futures and creating industry leaders
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-200 shadow-lg w-full sm:w-auto">
                            Explore Programs
                        </button>
                        <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition duration-200 w-full sm:w-auto">
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialPage;
