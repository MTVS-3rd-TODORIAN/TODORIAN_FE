import React, { useEffect, useState } from 'react';

const FriendListModal = ({ onClose, onNavigateToFarm }) => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        // TODO: 친구 목록 API 호출하여 데이터를 가져오기
        fetch('/api/friends') // API 요청 코드 수정 필요
            .then((response) => response.json())
            .then((data) => setFriends(data))
            .catch((error) => console.error('Error fetching friends:', error));
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-[#333333] p-4 rounded-lg w-[400px] h-[600px] overflow-y-auto">
                <button className="absolute top-2 right-2 text-white" onClick={onClose}>
                    &times;
                </button>
                <h2 className="text-white text-center font-bold mb-4">친구</h2>
                <div className="space-y-4">
                    {friends.map((friend) => (
                        <div
                            key={friend.id}
                            className="flex items-center justify-between bg-[#444444] p-2 rounded-lg"
                        >
                            <div className="flex items-center">
                                <img
                                    src={friend.profileImage}
                                    alt={friend.nickname}
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <p className="text-white font-bold">{friend.nickname}</p>
                                    <p className="text-gray-400">@{friend.username}</p>
                                </div>
                            </div>
                            <button
                                className="px-4 py-2 bg-[#7AB48C] text-white rounded-lg"
                                onClick={() => onNavigateToFarm(friend.id)}
                            >
                                농장가기
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FriendListModal;
