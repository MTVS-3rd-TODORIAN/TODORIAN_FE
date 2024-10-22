import React from 'react';
import { useNavigate } from 'react-router-dom';
import profileChick from '../../assets/images/myPage/profile_chick.png';
import Sidebar from '../../components/Sidebar';
import addFriendIcon from '../../assets/images/myPage/add-friend.png';
import goldMedal from '../../assets/images/myPage/gold.png';
import silverMedal from '../../assets/images/myPage/silver.png';
import bronzeMedal from '../../assets/images/myPage/bronze.png';
import platinumMedal from '../../assets/images/myPage/platinum.png';

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

const mPage = () => {
    const navigate = useNavigate();

    // 버튼 클릭 시 경로 이동
    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="flex h-screen w-full bg-[#fff9ef]">
            {/* 사이드바 */}
            <Sidebar />

            {/* 메인 컨테이너 */}
            <div className="flex-grow flex flex-col items-center p-6">
                {/* 상단 프로필 섹션 */}
                <div className="flex flex-col items-center mb-8">
                    <UserProfileImage imageUrl={profileChick} alt="프로필 이미지" size={150} />
                    <h1 className="mt-4 text-3xl font-bold">투두리안</h1>
                    <p className="text-lg text-gray-500">ToDorian</p>
                    <p className="text-sm text-black">2024년 8월 가입</p>
                    <p className="text-sm text-black">친구 N명</p>
                </div>

                {/* 버튼 섹션 */}
                <div className="flex space-x-4 mb-6">
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

                {/* 친구 목록 */}
                <div className="w-full max-w-lg bg-[#fffcf8] rounded-lg border border-gray-300 p-4 mb-8">
                    <h2 className="text-center text-xl font-bold mb-4">친구 목록</h2>
                    <div className="flex items-center justify-between mb-4">
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
                    <div className="flex items-center justify-between mb-4">
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
                    <div className="flex items-center justify-between mb-4">
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

                {/* 하단 섹션 - 역대엔딩 */}
                <div className="w-full max-w-2xl mb-8">
                    <h2 className="text-xl font-bold mb-4">역대엔딩</h2>
                    <div className="flex justify-between">
                        <UserProfileImage imageUrl={profileChick} alt="역대엔딩 이미지" size={100} />
                        <UserProfileImage imageUrl={profileChick} alt="역대엔딩 이미지" size={100} />
                        <UserProfileImage imageUrl={profileChick} alt="역대엔딩 이미지" size={100} />
                    </div>
                </div>

                {/* 메달 섹션 */}
                <div className="w-full max-w-2xl">
                    <h2 className="text-xl font-bold mb-4">메달</h2>
                    <div className="flex justify-between">
                        <img src={bronzeMedal} alt="Bronze Medal" className="w-24 h-24" />
                        <img src={silverMedal} alt="Silver Medal" className="w-24 h-24" />
                        <img src={goldMedal} alt="Gold Medal" className="w-24 h-24" />
                        <img src={platinumMedal} alt="Platinum Medal" className="w-24 h-24" />
                    </div>
                </div>

                {/* 하단 버튼 - 계정 삭제 */}
                <div className="mt-10">
                    <StyledButton
                        text="계정 삭제하기"
                        bgColor="bg-[#ea7f8d]"
                        onClick={() => handleNavigation('/delete-account')}
                    />
                </div>
            </div>
        </div>
    );
};

export default mPage;
