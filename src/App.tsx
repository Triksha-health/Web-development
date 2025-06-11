import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/layout/Layout';
import HomePage from './pages/Homepage';



function App() {
  useEffect(() => {
    document.title = 'Triksha - AI-Powered Health Wearable';
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
       
        
      </Route>
    </Routes>
  );
}

export default App;