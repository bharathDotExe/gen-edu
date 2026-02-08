
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import SubjectPage from './pages/SubjectPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subject/:id" element={<SubjectPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
