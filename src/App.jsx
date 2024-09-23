import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import SignUp from './pages/User/SignUp';
import Login from './pages/User/Login';
import Main from './pages/Main';
import GameBrowser from './pages/game/Game';
import Todo from './pages/todo/Todo';
import Inventory from './pages/inventory/Inventory';
import Home from './pages/Home';
import Farm from './pages/farm/Farm';
// import Guestbook from './pages/guestbook/Guestbook';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/main" element={<Main />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/game" element={<GameBrowser />} />
      <Route path="/today-deal" element={<Todo />} />
      <Route path="/closet" element={<Inventory />} />
      <Route path="/farm" element={<Farm />} />
      {/* <Route path="/guestbook" element={<Guestbook />} /> */}
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
