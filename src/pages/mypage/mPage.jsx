import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

import FriendListModal from '../../components/FriendListModal';
import DeleteAccountModal from '../../components/DeleteAccountModal';

import profileChick from '../../assets/images/myPage/profile_chick.png';
import addFriendIcon from '../../assets/images/myPage/add-friend.png'; // 친구 신청 아이콘
import goldMedal from '../../assets/images/myPage/gold.png';
import silverMedal from '../../assets/images/myPage/silver.png';
import bronzeMedal from '../../assets/images/myPage/bronze.png';
import platinumMedal from '../../assets/images/myPage/platinum.png';
import clockIcon from '../../assets/images/myPage/Clock.png';
import Generic from '../../assets/images/myPage/Generic-avatar.png';
import IconProfile from '../../assets/images/myPage/Icon-profile.png';
import SettingsIcon from '../../assets/images/myPage/Settings-icon.png'; // 설정 아이콘 추가
import Coin from '../../assets/images/myPage/coin.png';
import Point from '../../assets/images/myPage/growing_point.png';
import Arrow from '../../assets/images/common/icon/arrow.png';
import PeopleIcon from '../../assets/images/myPage/people-icon.png'; // 친구 관리 아이콘

// 유저 프로필 이미지 컴포넌트
const UserProfileImage = ({ imageUrl, alt, size }) => (
    <img className="rounded-full" src={imageUrl} alt={alt} style={{ width: size, height: size }} />
);

// 버튼 컴포넌트
const StyledButton = ({ text, bgColor, onClick, icon }) => (
    <button
        className={`px-4 py-2 flex items-center space-x-2 ${bgColor} text-white rounded-lg`}
        onClick={onClick}
    >
        {icon && <img src={icon} alt="" className="w-4 h-4" />}
        <span>{text}</span>
    </button>
);

const MPage = () => {
    const navigate = useNavigate();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isFriendListModalOpen, setIsFriendListModalOpen] = useState(false);
    const [friendRequestStatus, setFriendRequestStatus] = useState('친구 신청');
    const [joinDate, setJoinDate] = useState(''); // 가입일 상태
    const [friendCount, setFriendCount] = useState(0); // 친구 수 상태

    // 백엔드에서 가입일 및 친구 수 가져오기
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // 가입일 데이터 가져오기
                // const joinDateResponse = await fetch('/api/user/join-date');
                // const joinDateData = await joinDateResponse.json();
                // setJoinDate(joinDateData.joinDate);

                // 친구 수 데이터 가져오기
                // const friendCountResponse = await fetch('/api/user/friend-count');
                // const friendCountData = await friendCountResponse.json();
                // setFriendCount(friendCountData.count);

                // 임시 데이터
                setJoinDate('2024년 8월');
                setFriendCount(5); // 예시로 친구 수 5명으로 설정
            } catch (error) {
                console.error('데이터를 불러오는 중 오류가 발생했습니다.', error);
            }
        };

        fetchUserData();
    }, []);

    // 프로필로 이동하는 함수
    const goToProfile = () => {
        navigate('/profile');
    };

    // 메인 페이지로 이동하는 함수
    const goToMain = () => {
        navigate('/main');
    };

    // 설정 페이지로 이동하는 함수
    const goToSettings = () => {
        navigate('/my-page');
    };

    // 친구 관리 페이지로 이동
    const handleNavigation = (path) => {
        navigate(path);
    };

    // 친구 목록 모달 열기
    const openFriendListModal = () => setIsFriendListModalOpen(true);

    // 친구 목록 모달 닫기
    const closeFriendListModal = () => setIsFriendListModalOpen(false);

    // 특정 친구의 농장 페이지로 이동
    const navigateToFarm = (friendId) => {
        navigate(`/farm/${friendId}`);
    };

    // 특정 친구의 프로필 페이지로 이동
    const handleFriendClick = (friendId) => {
        navigate(`/friend/${friendId}`);
    };

    // 계정 삭제 모달 열기
    const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    // 계정 삭제 모달 닫기
    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    // 친구 신청 버튼 클릭 시 상태 업데이트
    const handleFriendRequest = () => {
        setFriendRequestStatus('친구 요청중');
        // TODO: API 요청으로 친구 요청 상태를 백엔드에 저장
    };

    // 친구 목록 데이터 (임시)
    const displayedFriends = [
        { profileImage: profileChick, nickname: '투두리안', userId: 'kim_hyejin' },
        { profileImage: profileChick, nickname: '차은우', userId: 'cha_eunwoo' },
        { profileImage: profileChick, nickname: '배수지', userId: 'bae_suzy' }
    ];

    return (
        <div className="flex h-screen w-full bg-[#fff9ef] relative">
            <Sidebar />

            {/* 설정 아이콘 위치 */}
            <img
                src={SettingsIcon}
                alt="설정 아이콘"
                className="absolute top-4 right-4 w-8 h-8 cursor-pointer"
                onClick={goToSettings}
            />

            {/* 메인 컨텐츠 및 친구 목록을 2:1로 나누는 레이아웃 */}
            <div className="flex w-full">
                <div className="relative w-2/3 p-6 flex flex-col items-center space-y-6 lg:space-y-8 overflow-y-auto bg-[#fff9ef]">
                    <img
                        src={Arrow}
                        alt="뒤로 가기"
                        className="absolute top-4 left-4 lg:top-6 lg:left-6 cursor-pointer"
                        width="50"
                        height="50"
                        onClick={goToMain}
                    />

                    <div className="relative flex flex-row items-center space-x-4 lg:space-x-6">
                        <UserProfileImage imageUrl={profileChick} alt="프로필 이미지" size={100} />
                        <div className="flex flex-col items-start">
                            <div className="relative">
                                <h1 className="text-2xl lg:text-3xl font-bold text-black">투두리안</h1>
                                <p className="text-lg lg:text-xl text-gray-500 text-black">ToDorian</p>
                                <img
                                    src={IconProfile}
                                    alt="Profile Icon"
                                    className="absolute top-0 right-[-30px] w-6 h-6 cursor-pointer"
                                    onClick={goToProfile}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 가입일 및 친구 수 */}
                    <div className="flex flex-col items-start space-y-2 mt-2">
                        <div className="flex items-center space-x-2">
                            <img src={clockIcon} alt="가입일" className="w-6 h-6" />
                            <p className="text-sm lg:text-base text-black">{joinDate} 가입</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <img src={Generic} alt="친구 수" className="w-6 h-6" />
                            <p className="text-sm lg:text-base text-black">친구 {friendCount}명</p>
                        </div>
                    </div>

                    <div className="flex space-x-4 mt-4">
                        <StyledButton
                            text={friendRequestStatus}
                            icon={addFriendIcon}
                            bgColor={friendRequestStatus === '친구 요청중' ? 'bg-[#7AB48C]' : 'bg-[#528ccb]'}
                            onClick={handleFriendRequest}
                        />
                        <StyledButton
                            text="친구 관리"
                            icon={PeopleIcon}
                            bgColor="bg-[#61b3cb]"
                            onClick={() => handleNavigation('/friend-management')}
                        />
                        <StyledButton
                            text="신고하기"
                            bgColor="bg-[#ae7fea]"
                            onClick={() => handleNavigation('/report')}
                        />
                    </div>

                    {/* 구분선 */}
                    <div className="w-full border-t-2 border-gray-500 my-6"></div>

                    {/* 역대 엔딩 섹션 */}
                    <div className="w-full max-w-4xl">
                        <h2 className="text-xl lg:text-2xl font-bold mb-4 text-black">역대 엔딩</h2>
                        <div className="flex justify-around">
                            {/* TODO: API 연동하여 유저 엔딩 데이터 가져오기 */}
                            <UserProfileImage imageUrl={profileChick} alt="역대 엔딩" size={80} />
                            <UserProfileImage imageUrl={profileChick} alt="역대 엔딩" size={80} />
                            <UserProfileImage imageUrl={profileChick} alt="역대 엔딩" size={80} />
                        </div>
                        <div className="mt-4 w-full px-8">
                            <input type="range" min="0" max="100" className="w-full slider" />
                        </div>
                    </div>

                    {/* 구분선 */}
                    <div className="w-full border-t-2 border-gray-500 my-6"></div>

                    {/* 메달 섹션 */}
                    <div className="w-full max-w-4xl">
                        <h2 className="text-xl lg:text-2xl font-bold mb-4 text-black">메달</h2>
                        <div className="flex justify-between">
                            {/* TODO: API 연동하여 메달 데이터 가져오기 */}
                            <img src={bronzeMedal} alt="Bronze Medal" className="w-20 h-20 lg:w-24 lg:h-24" />
                            <img src={silverMedal} alt="Silver Medal" className="w-20 h-20 lg:w-24 lg:h-24" />
                            <img src={goldMedal} alt="Gold Medal" className="w-20 h-20 lg:w-24 lg:h-24" />
                            <img src={platinumMedal} alt="Platinum Medal" className="w-20 h-20 lg:w-24 lg:h-24" />
                        </div>
                        <div className="mt-4 w-full px-8">
                            <input type="range" min="0" max="100" className="w-full slider" />
                        </div>
                    </div>
                </div>

                {/* 친구 목록 및 코인 섹션 */}
                <div className="w-1/3 bg-[#fff9ef] p-6 flex flex-col items-center space-y-4">
                    {/* 코인 및 성장 포인트 섹션 */}
                    <div className="flex justify-center items-center space-x-4 mb-4 w-full">
                        <div className="flex items-center space-x-2">
                            <img src={Point} alt="성장 포인트" className="w-8 h-8" />
                            <p className="text-xl font-bold text-black">100</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <img src={Coin} alt="코인" className="w-8 h-8" />
                            <p className="text-xl font-bold text-black">100</p>
                        </div>
                    </div>

                    <StyledButton
                        text="코인 내역 조회"
                        bgColor="bg-[#f1a545]"
                        onClick={() => navigate('/coins')}
                    />

                    <h2 className="text-xl lg:text-2xl font-bold text-black">친구 목록</h2>
                    <div className="border border-gray-400 rounded-lg p-4 w-full space-y-4">
                        {displayedFriends.map((friend, index) => (
                            <div key={index} className="flex items-center justify-between w-full border-b border-gray-300 pb-4">
                                <div className="flex items-center space-x-2">
                                    <UserProfileImage imageUrl={friend.profileImage || profileChick} alt="친구 이미지" size={50} />
                                    <div>
                                        <p className="text-lg font-bold text-black cursor-pointer" onClick={() => handleFriendClick(friend.userId)}>
                                            {friend.nickname}
                                        </p>
                                        <p className="text-gray-500 cursor-pointer" onClick={() => handleFriendClick(friend.userId)}>
                                            @{friend.userId}
                                        </p>
                                    </div>
                                </div>
                                <StyledButton
                                    text="농장가기"
                                    bgColor="bg-[#5fc86b]"
                                    onClick={() => navigateToFarm(friend.userId)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 계정 삭제 모달 */}
            {isDeleteModalOpen && <DeleteAccountModal onClose={closeDeleteModal} />}
            {isFriendListModalOpen && (
                <FriendListModal friends={displayedFriends} onClose={closeFriendListModal} onNavigateToFarm={navigateToFarm} />
            )}

            {/* 계정 삭제 버튼 */}
            <div className="absolute right-10 bottom-10 lg:right-8 lg:bottom-8 sm:right-6 sm:bottom-6">
                <StyledButton
                    text="계정 삭제하기"
                    bgColor="bg-[#ea7f8d]"
                    onClick={openDeleteModal}
                />
            </div>
        </div>
    );
};

export default MPage;
