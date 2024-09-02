
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Main from './pages/Main';
// Import other components for routing here...

function App() {
  return (
    <Routes>
      <>
        <Route path="/main" element={<Main/>}/>
      </>
    </Routes>
  );
}

export default function MainApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}