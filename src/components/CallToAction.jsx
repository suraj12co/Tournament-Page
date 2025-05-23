import React from 'react';

function CallToAction() {
  return (
    <section id="register" className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-center">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-4">Ready to Compete?</h2>
        <p className="text-xl mb-8">Sign up now and secure your spot in the E-Sport Elite Tournament!</p>
        <button className="bg-white text-purple-600 hover:bg-gray-200 font-bold py-3 px-6 rounded-lg transition duration-300">
          Join Now
        </button>
      </div>
    </section>
  );
}

export default CallToAction;