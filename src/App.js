import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Exhibitions from './pages/Exhibitions';
import News from './pages/News';
import NewsDetail from './pages/NewsDetails';
import Info from './pages/Info';
import Shop from './pages/Shop';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/exhibitions" element={<Exhibitions />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/info" element={<Info />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </Router>
  );
}

export default App;
