import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

// 이미지 import
import magnifyingGlassIcon from '../../assets/images/common/icon/magnifying-glass.png';
import closeIcon from '../../assets/images/common/icon/close.png';
import arrowIcon from '../../assets/images/common/icon/arrow.png';
import addFriend from '../../assets/images/common/icon/add-friend.png';

const FriendManagement = () => {
    const navigate = useNavigate();

    // 검색어 상태
    const [searchTerm, setSearchTerm] = useState('');

    // 친구 요청 상태
    const [requestedFriends, setRequestedFriends] = useState([
        { email: 'hyejin@example.com', nickname: '김혜진', status: 'pending' },
        { email: 'user2@example.com', nickname: '고대권', status: 'pending' },
        { email: 'user3@example.com', nickname: '김채호', status: 'pending' },
        { email: 'user4@example.com', nickname: '서주현', status: 'pending' },
        { email: 'user5@example.com', nickname: '황인욱', status: 'pending' }
    ]);

    const [receivedRequests, setReceivedRequests] = useState([
        { email: 'hyejin@example.com', nickname: '김혜진', status: 'received' },
        { email: 'user6@example.com', nickname: '고대권', status: 'received' },
        { email: 'user7@example.com', nickname: '김채호', status: 'received' },
        { email: 'user8@example.com', nickname: '서주현', status: 'received' },
        { email: 'user9@example.com', nickname: '황인욱', status: 'received' }
    ]);

    // 이메일에서 아이디 추출 함수
    const getEmailId = (email) => {
        return email.split('@')[0]; // '@' 앞부분만 반환
    };

    const handleSearch = () => {
        console.log(`Searching for: ${searchTerm}`);
        // 백엔드 연동 시, 이곳에서 API 호출로 검색 처리
    };

    const handleBackClick = () => {
        navigate(-1); // 뒤로 가기
    };

    const handleResetSearch = () => {
        setSearchTerm('');
    };

    // 검색 필터 적용
    const filteredRequestedFriends = requestedFriends.filter((friend) =>
        friend.nickname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredReceivedRequests = receivedRequests.filter((friend) =>
        friend.nickname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-[#fff9ef]">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 max-w-7xl mx-auto p-8">
                {/* Header */}
                <div className="flex items-center space-x-4 mb-8">
                    <img
                        className="cursor-pointer hidden lg:block"
                        width="50"
                        height="50"
                        src={arrowIcon}
                        alt="back"
                        onClick={handleBackClick}
                    />
                    <h1 className="text-3xl font-semibold text-black">🔍 친구 관리</h1>
                </div>

                {/* 검색창 */}
                <div className="flex items-center bg-[#7676801f] p-4 rounded-lg mb-6">
                    <img src={magnifyingGlassIcon} alt="Search Icon" className="w-6 h-6 mr-4" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="닉네임으로 검색"
                        className="flex-grow bg-transparent outline-none text-lg text-black"
                    />
                    {searchTerm && (
                        <button
                            onClick={handleResetSearch}
                            className="p-0 bg-transparent border-none outline-none focus:outline-none"
                        >
                            <img src={closeIcon} alt="Clear" className="w-6 h-6" />
                        </button>
                    )}
                </div>

                {/* 친구 요청 섹션 가로 배치 */}
                <div className="flex justify-between gap-8">
                    {/* 내가 요청한 친구 */}
                    <div className="w-1/2">
                        <div className="text-2xl font-medium mb-4 text-black">내가 요청한 친구</div>
                        <div className="border border-gray-300 rounded-lg p-4 space-y-4">
                            {filteredRequestedFriends.map((friend) => (
                                <div key={friend.email} className="flex items-center space-x-4">
                                    <img
                                        src={addFriend}
                                        alt="Friend"
                                        className="w-12 h-12 rounded-full bg-gray-200"
                                    />
                                    <div>
                                        <div className="font-bold text-lg text-black">{friend.nickname}</div>
                                        <div className="text-gray-500">@{getEmailId(friend.email)}</div>
                                    </div>
                                    <button className="ml-auto flex items-center bg-[#7ab48c] text-white py-2 px-4 rounded-lg">
                                        <img src={addFriend} alt="Add" className="w-5 h-5 mr-2" />
                                        친구 요청중
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 내가 요청받은 친구 */}
                    <div className="w-1/2">
                        <div className="text-2xl font-medium mb-4 text-black">내가 요청받은 친구</div>
                        <div className="border border-gray-300 rounded-lg p-4 space-y-4">
                            {filteredReceivedRequests.map((friend) => (
                                <div key={friend.email} className="flex items-center space-x-4">
                                    <img
                                        src={addFriend}
                                        alt="Friend"
                                        className="w-12 h-12 rounded-full bg-gray-200"
                                    />
                                    <div>
                                        <div className="font-bold text-lg text-black">{friend.nickname}</div>
                                        <div className="text-gray-500">@{getEmailId(friend.email)}</div>
                                    </div>
                                    <button className="ml-auto flex items-center bg-[#bc6cb8] text-white py-2 px-4 rounded-lg">
                                        <img src={addFriend} alt="Add" className="w-5 h-5 mr-2" />
                                        친구 요청 받음
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FriendManagement;
