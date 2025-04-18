import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">About Ethical Supply Chain Tracker</h1>
      
      <div className="prose prose-lg">
        <p className="text-gray-600 mb-6">
          Ethical Supply Chain Tracker is a decentralized application built on the Internet Computer
          that enables transparent tracking of product supply chains. Our mission is to promote
          ethical sourcing and manufacturing practices by providing a verifiable record of a
          product's journey from raw materials to final delivery.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">1. Product Registration</h3>
            <p className="text-gray-600">
              Manufacturers register their products with detailed information about materials,
              sourcing, and certifications.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">2. Supply Chain Tracking</h3>
            <p className="text-gray-600">
              Each step in the supply chain is recorded on the blockchain, creating an immutable
              history of the product's journey.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">3. Consumer Verification</h3>
            <p className="text-gray-600">
              Consumers can verify the ethical claims of products by scanning QR codes or
              entering product IDs.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Benefits</h2>
        <ul className="list-disc list-inside text-gray-600 mb-8">
          <li className="mb-2">Transparent supply chain visibility</li>
          <li className="mb-2">Verifiable ethical claims</li>
          <li className="mb-2">Improved consumer trust</li>
          <li className="mb-2">Incentive for ethical business practices</li>
          <li className="mb-2">Decentralized and tamper-proof records</li>
        </ul>

        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get Started</h2>
          <p className="text-gray-600 mb-4">
            Join us in creating a more transparent and ethical supply chain ecosystem.
          </p>
          <Link
            to="/login"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About; 