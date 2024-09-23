import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const Farm = () => {
    const [currentBackground, setCurrentBackground] = useState('farm1'); // 배경 상태 관리
    const navigate = useNavigate(); // useNavigate 훅 사용

    // 방명록 페이지로 이동하는 함수
    const handleGuestbookNavigation = () => {
        navigate('/guestbook');
    };

    // 배경을 변경하는 함수
    const handleBackgroundChange = (background) => {
        setCurrentBackground(background);
    };

    return (
        <div className="relative w-screen h-screen max-w-[1920px] max-h-[1080px] bg-[#fff] mx-auto overflow-hidden">
            <Sidebar /> {/* 사이드바 컴포넌트 */}
            <div className="absolute left-[250px] top-0 w-full h-full bg-[#8edb98] rounded-2xl overflow-hidden">
                {/* 배경 이미지 표시 */}
                <img
                    className="absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover"
                    src={`/assets/images/farmPage/${currentBackground}.png`}
                    alt="Main Farm"
                />

                {/* 배경 선택 버튼들 */}
                <div className="absolute bottom-4 right-4 flex space-x-4 z-10">
                    <button onClick={() => handleBackgroundChange('farm1')} className="w-24 h-24 bg-blue-200 rounded">배경 1</button>
                    <button onClick={() => handleBackgroundChange('farm2')} className="w-24 h-24 bg-green-200 rounded">배경 2</button>
                    <button onClick={() => handleBackgroundChange('farm3')} className="w-24 h-24 bg-red-200 rounded">배경 3</button>
                </div>

                {/* 방명록 남기기 버튼 */}
                <button onClick={handleGuestbookNavigation} className="absolute top-5 right-5 p-2 bg-blue-500 text-white rounded-lg z-10">
                    방명록 남기기
                </button>
            </div>
        </div>
    );
};

Farm.propTypes = {
    방명록_남기기: PropTypes.func.isRequired,
    배경1: PropTypes.func.isRequired,
    배경2: PropTypes.func.isRequired,
    배경3: PropTypes.func.isRequired
};

export default Farm;
