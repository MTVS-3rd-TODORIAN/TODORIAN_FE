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
import Friend from './pages/friend/Friend';
import MyPage from './pages/mypage/MyPage';
import Coins from './pages/mypage/Coins';
import Account from './pages/mypage/Account';

// import Guestbook from './pages/guestbook/Guestbook';
import LadderGame from './pages/game/LadderGame';
import mPage from './pages/mypage/mPage';
import Weekly from './pages/weekly/weekly';
// Import other components for routing here...

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/main" element={<Main />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/game" element={<GameBrowser />} />
      <Route path="/today-deal" element={<Todo />} />
      <Route path="/calendar" element={<Weekly />} />
      <Route path="/closet" element={<Inventory />} />
      <Route path="/farm" element={<Farm />} />
      {/* <Route path="/guestbook" element={<Guestbook />} /> */}
      <Route path="/game/ladder" element={<LadderGame />} />
      <Route path="/friends" element={<Friend />} />
      <Route path="/mypage" element={<mPage />} />
      <Route path="/my-page" element={<MyPage />} />
      <Route path="/coins" element={<Coins />} />
      <Route path="/account" element={<Account />} />
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