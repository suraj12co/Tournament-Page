import React from 'react'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-900 relative">
        <div className="flex-grow pt-4 pb-20 overflow-y-auto">
          <AppRoutes basename="/" />
          <Footer />
        </div>
        <div>
        </div>
        <Navbar className="fixed bottom-0 left-0 right-0" />
      </div>
    </>
  );
}

export default App;
