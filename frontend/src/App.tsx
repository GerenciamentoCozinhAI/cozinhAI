import { Routes, Route } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Confirm from './pages/Confirm';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/confirm" element={<Confirm />} />
      </Routes>
    </div>
  );
}

export default App;