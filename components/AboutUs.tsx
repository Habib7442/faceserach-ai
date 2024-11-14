import React from "react";
import { GlobeIcon, SearchIcon, ShieldCheckIcon, UsersIcon } from "lucide-react";
// import Image from "next/image";

const AboutUs = () => {
  const features = [
    {
      icon: <SearchIcon className="w-6 h-6" />,
      title: "Advanced Face Recognition",
      description: "State-of-the-art AI algorithms that can identify faces from images or videos with exceptional accuracy."
    },
    {
      icon: <GlobeIcon className="w-6 h-6" />,
      title: "Web-Wide Search",
      description: "Comprehensive search across the entire web to find matching faces and their associated information."
    },
    {
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security measures to protect user data and ensure reliable search results."
    },
    {
      icon: <UsersIcon className="w-6 h-6" />,
      title: "Contact Discovery",
      description: "Advanced contact information retrieval system to find email addresses and phone numbers."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200">
              About Us
            </h1>
            <p className="text-xl md:text-2xl text-blue-100/80 max-w-3xl mx-auto">
              FaceSearchAI is pioneering the future of facial recognition and contact discovery through advanced artificial intelligence.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">
              Our Mission
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              At FaceSearchAI, we&apos;re dedicated to making face recognition technology accessible and practical. Our AI-powered platform goes beyond simple facial recognition, offering a comprehensive solution that includes web search, contact discovery, and even creative content generation.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed">
              We understand the importance of connecting people in today&apos;s digital world. Whether you&apos;re looking to find someone&apos;s online presence or verify an identity, our technology makes it possible with just a single image or video.
            </p>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl" />
            <div className="absolute inset-1 bg-slate-900/90 rounded-2xl p-6 backdrop-blur-xl">
              <div className="grid grid-cols-2 gap-4 h-full">
                <div className="space-y-4">
                  <div className="h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg" />
                  <div className="h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg" />
                </div>
                <div className="space-y-4 pt-8">
                  <div className="h-32 bg-gradient-to-br from-pink-500/10 to-blue-500/10 rounded-lg" />
                  <div className="h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">
            What Sets Us Apart
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
            >
              <div className="text-blue-400 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">
            Our Values
          </h2>
          <p className="mt-4 text-xl text-slate-400">
            Built on principles of innovation, security, and user empowerment
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Innovation",
              description: "Constantly pushing the boundaries of what's possible with AI technology."
            },
            {
              title: "Privacy",
              description: "Maintaining the highest standards of data protection and user privacy."
            },
            {
              title: "Accessibility",
              description: "Making advanced technology accessible to everyone who needs it."
            }
          ].map((value, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50"
            >
              <h3 className="text-2xl font-semibold text-white mb-4">{value.title}</h3>
              <p className="text-slate-400">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;