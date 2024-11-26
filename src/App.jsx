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

import Guestbook from './pages/guestbook/Guestbook';
import LadderGame from './pages/game/LadderGame';
import MPage from './pages/mypage/mPage';
import Weekly from './pages/weekly/weekly';
import Bob from './pages/bob/Bob';
import FriendProfile from './pages/friend/FriendProfile';
import GuestbookWrite from './pages/guestbook/GuestbookWrite';
import FriendManagement from './pages/friend/FriendManagement';

import AdminLogin from './pages/admin/Login';
import AdminPoints from './pages/admin/Points';
import Profile from './pages/mypage/Profile';

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
      <Route path="/feed" element={<Bob />} />
      <Route path="/guestbook" element={<Guestbook />} />
      <Route path="/game/ladder" element={<LadderGame />} />
      <Route path="/friends" element={<Friend />} />
      <Route path="/mypage" element={<MPage />} />
      <Route path="/my-page" element={<MyPage />} />
      <Route path="/coins" element={<Coins />} />
      <Route path="/account" element={<Account />} />
      <Route path="/friend/:friendId" element={<FriendProfile />} /> {/* 친구 프로필 페이지 경로 추가 */}
      <Route path="/guestbook/write" element={<GuestbookWrite />} /> 
      <Route path="/friend-management" element={<FriendManagement />} />
      <Route path='/admin/login' element={<AdminLogin />} />
      <Route path='/admin/points' element={<AdminPoints />} />
      <Route path='/profile' element={<Profile />} />
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
