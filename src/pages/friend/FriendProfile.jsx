import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

import profileChick from '../../assets/images/myPage/profile_chick.png';
import goldMedal from '../../assets/images/myPage/gold.png';
import silverMedal from '../../assets/images/myPage/silver.png';
import bronzeMedal from '../../assets/images/myPage/bronze.png';
import platinumMedal from '../../assets/images/myPage/platinum.png';
import clockIcon from '../../assets/images/myPage/Clock.png';
import Generic from '../../assets/images/myPage/Generic-avatar.png';
import Coin from '../../assets/images/myPage/coin.png';
import Point from '../../assets/images/myPage/growing_point.png';
import Arrow from '../../assets/images/common/icon/arrow.png';

// 유저 프로필 이미지 컴포넌트
const UserProfileImage = ({ imageUrl, alt, size }) => (
    <img className="rounded-full" src={imageUrl} alt={alt} style={{ width: size, height: size }} />
);

const FriendProfile = () => {
    const navigate = useNavigate();
    const { friendId } = useParams();
    const [friendData, setFriendData] = useState({});
    const [friendCount, setFriendCount] = useState(0); // 친구 수 상태
    const [joinDate, setJoinDate] = useState(''); // 가입일 상태

    // 백엔드에서 친구의 데이터 가져오기
    useEffect(() => {
        const fetchFriendData = async () => {
            try {
                // 친구 프로필 데이터 가져오기
                // const response = await fetch(`/api/friend/${friendId}`);
                // const data = await response.json();
                // setFriendData(data);
                // setJoinDate(data.joinDate);
                // setFriendCount(data.friendCount);

                // 임시 데이터
                setFriendData({
                    nickname: '친구 닉네임',
                    profileImage: profileChick,
                    bio: '친구의 소개글이 여기에 표시됩니다.',
                });
                setJoinDate('2024년 8월');
                setFriendCount(5);
            } catch (error) {
                console.error('친구 데이터를 불러오는 중 오류가 발생했습니다.', error);
            }
        };

        fetchFriendData();
    }, [friendId]);

    // 메인 페이지로 이동하는 함수
    const goToMain = () => {
        navigate('/main');
    };

    return (
        <div className="flex h-screen w-full bg-[#fff9ef] relative">
            <Sidebar />

            {/* 메인 컨텐츠 영역 */}
            <div className="flex flex-col w-full">
                <div className="relative w-full p-6 flex flex-col items-center space-y-6 lg:space-y-8 overflow-y-auto bg-[#fff9ef]">
                    <img
                        src={Arrow}
                        alt="뒤로 가기"
                        className="absolute top-4 left-4 lg:top-6 lg:left-6 cursor-pointer"
                        width="50"
                        height="50"
                        onClick={goToMain}
                    />

                    <div className="relative flex flex-row items-center space-x-4 lg:space-x-6">
                        <UserProfileImage imageUrl={friendData.profileImage || profileChick} alt="프로필 이미지" size={100} />
                        <div className="flex flex-col items-start">
                            <h1 className="text-2xl lg:text-3xl font-bold text-black">{friendData.nickname}</h1>
                            <p className="text-lg lg:text-xl text-gray-500 text-black">{friendData.bio}</p>
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

                    {/* 코인 및 성장 포인트 섹션 */}
                    <div className="flex justify-center items-center space-x-4 my-6 w-full">
                        <div className="flex items-center space-x-2">
                            <img src={Point} alt="성장 포인트" className="w-8 h-8" />
                            <p className="text-xl font-bold text-black">100</p> {/* 예시 값 */}
                        </div>
                        <div className="flex items-center space-x-2">
                            <img src={Coin} alt="코인" className="w-8 h-8" />
                            <p className="text-xl font-bold text-black">100</p> {/* 예시 값 */}
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
                    </div>

                    {/* 구분선 */}
                    <div className="w-full border-t-2 border-gray-500 my-6"></div>

                    {/* 친구 목록으로 이동 버튼 */}
                    <button
                        onClick={() => navigate('/friends')}
                        className="px-6 py-3 mt-4 bg-[#61b3cb] text-white rounded-lg"
                    >
                        친구 목록 보기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FriendProfile;
