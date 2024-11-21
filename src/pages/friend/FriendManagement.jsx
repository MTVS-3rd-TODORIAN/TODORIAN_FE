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
        { email: 'user1@example.com', nickname: '투두리안1', status: 'pending' },
        { email: 'user2@example.com', nickname: '투두리안2', status: 'pending' },
    ]);

    const [receivedRequests, setReceivedRequests] = useState([
        { email: 'hyejin@example.com', nickname: '김혜진', status: 'received' },
        { email: 'user4@example.com', nickname: '두리안', status: 'received' },
    ]);

    // 친구 상태 관리
    const [friends, setFriends] = useState([]); // 친구 목록

    // 모달 상태
    const [selectedFriend, setSelectedFriend] = useState(null); // 선택된 친구
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 여부
    const [acceptedFriend, setAcceptedFriend] = useState(null); // 방금 수락한 친구 표시용

    // 이메일에서 아이디 추출 함수
    const getEmailId = (email) => {
        return email.split('@')[0]; // '@' 앞부분만 반환
    };

    const handleAcceptFriend = () => {
        if (selectedFriend) {
            // 방금 수락한 친구 상태 저장 (버튼에 표시)
            setAcceptedFriend(selectedFriend);

            // 1초 후 친구 요청을 수락하고 목록에서 제거
            setTimeout(() => {
                // 요청받은 친구를 친구 목록에 추가
                setFriends((prev) => [...prev, selectedFriend]);

                // 요청받은 목록에서 제거
                setReceivedRequests((prev) =>
                    prev.filter((friend) => friend.email !== selectedFriend.email)
                );

                // 방금 수락한 친구 초기화
                setAcceptedFriend(null);
            }, 1000);

            console.log(`친구 요청 수락: ${selectedFriend.nickname}`);

            // 모달 닫기
            setIsModalOpen(false);
            setSelectedFriend(null);
        }
    };

    const handleRejectFriend = () => {
        // 모달 닫기
        setIsModalOpen(false);
        setSelectedFriend(null);
    };

    const handleOpenModal = (friend) => {
        setSelectedFriend(friend);
        setIsModalOpen(true);
    };

    const handleSearch = () => {
        console.log(`Searching for: ${searchTerm}`);
    };

    const handleResetSearch = () => {
        setSearchTerm('');
    };

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
                        onClick={() => navigate(-1)}
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
                            {requestedFriends.map((friend) => (
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
                            {receivedRequests.map((friend) => (
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
                                    <button
                                        onClick={() => handleOpenModal(friend)}
                                        className={`ml-auto flex items-center ${friends.some((f) => f.email === friend.email)
                                            ? 'bg-[#7A80B4]'
                                            : friend === acceptedFriend
                                                ? 'bg-[#7A80B4]'
                                                : 'bg-[#bc6cb8]'
                                            } text-white py-2 px-4 rounded-lg`}
                                        disabled={friends.some((f) => f.email === friend.email) || friend === acceptedFriend}
                                    >
                                        <img src={addFriend} alt="Add" className="w-5 h-5 mr-2" />
                                        {friend === acceptedFriend
                                            ? '친구됨'
                                            : friends.some((f) => f.email === friend.email)
                                                ? '친구됨'
                                                : '친구 요청 받음'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 모달 */}
            {isModalOpen && selectedFriend && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h2 className="text-xl font-semibold mb-4 text-black">친구 요청</h2>
                        <p className="mb-4 text-black">{selectedFriend.nickname}님의 요청을 수락하시겠습니까?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleAcceptFriend}
                                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                            >
                                네
                            </button>
                            <button
                                onClick={handleRejectFriend}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                            >
                                아니요
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FriendManagement;
