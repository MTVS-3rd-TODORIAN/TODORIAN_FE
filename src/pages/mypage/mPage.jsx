import React from 'react';
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

    // 버튼 클릭 시 경로 이동
    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="flex h-screen w-full bg-[#fff9ef] relative">
            {/* 사이드바 */}
            <Sidebar />

            {/* 메인 컨텐츠 및 친구 목록을 2:1로 나누는 레이아웃 */}
            <div className="flex w-full">
                {/* 메인 컨테이너 (화면의 2/3 차지) */}
                <div className="w-2/3 p-6 flex flex-col items-center space-y-6 lg:space-y-8 overflow-y-auto bg-[#fff9ef]">
                    {/* 프로필 섹션 */}
                    <div className="flex flex-col items-center space-y-2 lg:space-y-4">
                        <UserProfileImage imageUrl={profileChick} alt="프로필 이미지" size={100} />
                        <h1 className="mt-4 text-2xl lg:text-3xl font-bold">투두리안</h1>
                        <p className="text-lg lg:text-xl text-gray-500">ToDorian</p>

                        {/* 변경된 레이아웃 - 왼쪽 정렬 */}
                        <div className="flex flex-col items-start space-y-2 mt-2">
                            <div className="flex items-center space-x-2">
                                <img src={clockIcon} alt="가입일" className="w-6 h-6" />
                                <p className="text-sm lg:text-base">2024년 8월 가입</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <img src={Generic} alt="친구" className="w-6 h-6" />
                                <p className="text-sm lg:text-base">친구 N명</p>
                            </div>
                        </div>
                    </div>

                    {/* 버튼 섹션 */}
                    <div className="flex space-x-4">
                        <StyledButton
                            text="친구 신청"
                            bgColor="bg-[#528ccb]"
                            onClick={() => handleNavigation('/friend-request')}
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

                    {/* 역대 엔딩 섹션 */}
                    <div className="w-full max-w-4xl">
                        <h2 className="text-xl lg:text-2xl font-bold mb-4">역대 엔딩</h2>
                        <div className="flex justify-around">
                            <UserProfileImage imageUrl={profileChick} alt="역대 엔딩" size={80} />
                            <UserProfileImage imageUrl={profileChick} alt="역대 엔딩" size={80} />
                            <UserProfileImage imageUrl={profileChick} alt="역대 엔딩" size={80} />
                        </div>
                    </div>

                    {/* 메달 섹션 */}
                    <div className="w-full max-w-4xl">
                        <h2 className="text-xl lg:text-2xl font-bold mb-4">메달</h2>
                        <div className="flex justify-between">
                            <img src={bronzeMedal} alt="Bronze Medal" className="w-20 h-20 lg:w-24 lg:h-24" />
                            <img src={silverMedal} alt="Silver Medal" className="w-20 h-20 lg:w-24 lg:h-24" />
                            <img src={goldMedal} alt="Gold Medal" className="w-20 h-20 lg:w-24 lg:h-24" />
                            <img src={platinumMedal} alt="Platinum Medal" className="w-20 h-20 lg:w-24 lg:h-24" />
                        </div>
                    </div>
                </div>

                {/* 친구 목록 (화면의 1/3 차지) */}
                <div className="w-1/3 bg-[#fff9ef] p-6 flex flex-col items-center space-y-4">
                    <h2 className="text-xl lg:text-2xl font-bold">친구 목록</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center space-x-2">
                                <UserProfileImage imageUrl={profileChick} alt="친구 이미지" size={50} />
                                <p className="text-lg font-bold">투두리안</p>
                            </div>
                            <StyledButton
                                text="농장가기"
                                bgColor="bg-[#5fc86b]"
                                onClick={() => handleNavigation('/farm')}
                            />
                        </div>

                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center space-x-2">
                                <UserProfileImage imageUrl={profileChick} alt="친구 이미지" size={50} />
                                <p className="text-lg font-bold">차은우</p>
                            </div>
                            <StyledButton
                                text="농장가기"
                                bgColor="bg-[#5fc86b]"
                                onClick={() => handleNavigation('/farm')}
                            />
                        </div>

                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center space-x-2">
                                <UserProfileImage imageUrl={profileChick} alt="친구 이미지" size={50} />
                                <p className="text-lg font-bold">배수지</p>
                            </div>
                            <StyledButton
                                text="농장가기"
                                bgColor="bg-[#5fc86b]"
                                onClick={() => handleNavigation('/farm')}
                            />
                        </div>

                        <p className="text-center text-blue-600 cursor-pointer">N명 더 보기</p>
                    </div>
                </div>
            </div>

            {/* 계정 삭제 버튼 - 반응형으로 고정되도록 설정 */}
            <div className="absolute right-10 bottom-10 lg:right-8 lg:bottom-8 sm:right-6 sm:bottom-6">
                <StyledButton
                    text="계정 삭제하기"
                    bgColor="bg-[#ea7f8d]"
                    onClick={() => handleNavigation('/delete-account')}
                />
            </div>
        </div>
    );
};

export default MPage;
