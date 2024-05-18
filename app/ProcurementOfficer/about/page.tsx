// app/about/page.tsx
import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">About Inventory Management</h1>

      <div className="space-y-6">
        <p>
        Inventory Management was founded in 2020 by a team of passionate supply chain experts with a shared vision: 
          to simplify inventory management and empower businesses to thrive in the digital age. 
        </p>

        <p>
          We understand the complexities and challenges that businesses face in managing their inventory. 
          That's why we've developed a cutting-edge, user-friendly platform that streamlines inventory tracking, 
          forecasting, and optimization. Our mission is to help businesses of all sizes reduce costs, improve efficiency, 
          and make informed decisions that drive growth.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800">Our Team</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <img src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" alt="" className="w-48 h-48 object-cover rounded-md" />
            <h3 className="text-lg font-medium text-gray-800 mt-2">MD Sakib Hasan</h3>
            <p className="text-gray-600">CEO & Co-Founder</p>
          </div>
          <div>
            <img src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" alt="David Kim" className="w-48 h-48 object-cover rounded-md" />
            <h3 className="text-lg font-medium text-gray-800 mt-2">Kazi Abdur Rahaman</h3>
            <p className="text-gray-600">CTO & Co-Founder</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
