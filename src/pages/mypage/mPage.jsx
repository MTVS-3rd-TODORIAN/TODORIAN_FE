import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profileChick from '../../assets/images/myPage/profile_chick.png';
import Sidebar from '../../components/Sidebar';
import addFriendIcon from '../../assets/images/myPage/add-friend.png';
import goldMedal from '../../assets/images/myPage/gold.png';
import silverMedal from '../../assets/images/myPage/silver.png';
import bronzeMedal from '../../assets/images/myPage/bronze.png';
import platinumMedal from '../../assets/images/myPage/platinum.png';
import clockIcon from '../../assets/images/myPage/Clock.png';
import Generic from '../../assets/images/myPage/Generic-avatar.png';
import IconProfile from '../../assets/images/myPage/Icon-profile.png';
import Coin from '../../assets/images/myPage/coin.png';
import Point from '../../assets/images/myPage/growing_point.png';
import Arrow from '../../assets/images/common/icon/arrow.png';
import DeleteAccountModal from '../../components/DeleteAccountModal';

// 유저 프로필 이미지 컴포넌트
const UserProfileImage = ({ imageUrl, alt, size }) => (
    <img className="rounded-full" src={imageUrl} alt={alt} style={{ width: size, height: size }} />
);

// 버튼 컴포넌트
const StyledButton = ({ text, bgColor, onClick }) => (
    <button
        className={`px-4 py-2 ${bgColor} text-white rounded-lg`}
        onClick={onClick}
    >
        {text}
    </button>
);

const MPage = () => {
    const navigate = useNavigate();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [friendRequestStatus, setFriendRequestStatus] = useState('친구 신청');

    // 프로필로 이동하는 함수
    const goToProfile = () => {
        navigate('/profile');
    };

    // 메인 페이지로 이동하는 함수
    const goToMain = () => {
        navigate('/main');
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

    return (
        <div className="flex h-screen w-full bg-[#fff9ef] relative">
            <Sidebar />

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

                    <div className="flex flex-col items-start space-y-2 mt-2">
                        <div className="flex items-center space-x-2">
                            <img src={clockIcon} alt="가입일" className="w-6 h-6" />
                            <p className="text-sm lg:text-base text-black">2024년 8월 가입</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <img src={Generic} alt="친구" className="w-6 h-6" />
                            <p className="text-sm lg:text-base text-black">친구 N명</p>
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <StyledButton
                            text={friendRequestStatus}
                            bgColor={friendRequestStatus === '친구 요청중' ? 'bg-[#7AB48C]' : 'bg-[#528ccb]'}
                            onClick={handleFriendRequest}
                        />
                        <StyledButton
                            text="친구 관리"
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
                    <div className="flex justify-center items-center space-x-6 mb-6">
                        <div className="flex items-center space-x-2">
                            <img src={Point} alt="머니 봉투" className="w-8 h-8" />
                            <p className="text-xl font-bold text-black">100</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <img src={Coin} alt="코인" className="w-8 h-8" />
                            <p className="text-xl font-bold text-black">100</p>
                        </div>
                    </div>

                    <h2 className="text-xl lg:text-2xl font-bold text-black">친구 목록</h2>
                    <div className="border border-gray-400 rounded-lg p-4 w-full space-y-4">
                        <div className="flex items-center justify-between w-full border-b border-gray-300 pb-4">
                            <div className="flex items-center space-x-2">
                                <UserProfileImage imageUrl={profileChick} alt="친구 이미지" size={50} />
                                <div>
                                    <p className="text-lg font-bold text-black">투두리안</p>
                                    <p className="text-gray-500">@김혜진</p>
                                </div>
                            </div>
                            <StyledButton
                                text="농장가기"
                                bgColor="bg-[#5fc86b]"
                                onClick={() => handleNavigation('/farm')}
                            />
                        </div>
                        {/* 추가 친구 목록 */}
                        <p className="text-center text-blue-600 cursor-pointer">N명 더 보기</p>
                    </div>
                </div>
            </div>

            <div className="absolute right-10 bottom-10 lg:right-8 lg:bottom-8 sm:right-6 sm:bottom-6">
                <StyledButton
                    text="계정 삭제하기"
                    bgColor="bg-[#ea7f8d]"
                    onClick={openDeleteModal}
                />
            </div>

            {/* 계정 삭제 모달 */}
            {isDeleteModalOpen && (
                <DeleteAccountModal onClose={closeDeleteModal} />
            )}
        </div>
    );
};

export default MPage;
