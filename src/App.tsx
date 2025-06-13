import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/layout/Layout';

import SignInPage from './pages/SignInPage';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';



function App() {
  useEffect(() => {
    document.title = 'Triksha - AI-Powered Health Wearable';
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage/>} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
       
        
      </Route>
    </Routes>
  );
}

export default App;