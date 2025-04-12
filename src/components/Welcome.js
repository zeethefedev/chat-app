import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './generics/Button';

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Chat App</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Join our community and start chatting with friends and colleagues in real-time.
      </p>
      <div className="space-x-4">
        <Button
          label="Sign In"
          onClick={() => navigate('/login')}
        />
        <Button
          label="Learn More"
          onClick={() => navigate('/about')}
          style={{
            backgroundColor: 'transparent',
            color: '#3B82F6',
            border: '1px solid #3B82F6'
          }}
        />
      </div>
    </div>
  );
}

export default Welcome;