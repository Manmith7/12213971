import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShortnerForm from './components/ShortnerForm';
import RedirectHandler from './components/Redirect.jsx';
import ShortnerStats from './components/ShortnerStats';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShortnerForm />} />
        <Route path="/stats" element={<ShortnerStats />} />
        <Route path="/:shortcode" element={<RedirectHandler />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
