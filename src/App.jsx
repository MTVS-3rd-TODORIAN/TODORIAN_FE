
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Main from './pages/Main';
import Todo from './pages/todo/Todo';
// Import other components for routing here...

function App() {
  return (
    <Routes>
      <>
        <Route path="/main" element={<Main/>}/>
        <Route path="/today-deal" element={<Todo/>}/>
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