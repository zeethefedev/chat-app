import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/generics/Button';

function About() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">About Chat App</h1>
        
        <div className="space-y-6 text-gray-600">
          <p className="text-lg">
            Chat App is a modern real-time messaging platform built with React and Firebase, 
            designed to provide a seamless communication experience.
          </p>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Real-time messaging</li>
              <li>Secure authentication</li>
              <li>Clean and intuitive interface</li>
              <li>Responsive design</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tech Stack</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>React for UI</li>
              <li>Firebase for backend services</li>
              <li>Redux for state management</li>
              <li>Tailwind CSS for styling</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <Button
            label="Get Started"
            onClick={() => navigate('/login')}
          />
          <Button
            label="Back to Home"
            onClick={() => navigate('/')}
            style={{
              backgroundColor: 'transparent',
              color: '#3B82F6',
              border: '1px solid #3B82F6'
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default About;