import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

import paperAirplane from '../../assets/images/farmPage/paperAirplane.png';
import farm1 from '../../assets/images/farmPage/farm1.png';
import farm2 from '../../assets/images/farmPage/farm2.png';
import farm3 from '../../assets/images/farmPage/farm3.png';

// 배경 이미지들
const backgrounds = {
    farm1: farm1,
    farm2: farm2,
    farm3: farm3
};

const Farm = () => {
    const [currentBackground, setCurrentBackground] = useState('farm1');
    const navigate = useNavigate();

    // 방명록 페이지로 이동
    const handleGuestbookNavigation = () => {
        navigate('/guestbook');
    };

    return (
        <div className="relative w-screen h-screen max-w-[1920px] max-h-[1080px] bg-[#fff] mx-auto overflow-hidden">
            <Sidebar /> {/* 사이드바 컴포넌트 */}

            <div className="absolute left-[250px] top-0 w-[calc(100%-250px)] h-full bg-[#8edb98] rounded-2xl overflow-hidden">
                {/* 배경 이미지 표시 */}
                <img
                    className="absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover"
                    src={backgrounds[currentBackground]}  // 선택된 배경 이미지 표시
                    alt="Main Farm"
                />

                {/* 배경 선택 버튼들 */}
                <div className="absolute bottom-4 right-4 flex space-x-4 z-20">
                    {Object.keys(backgrounds).map((background) => (
                        <BackgroundButton
                            key={background}
                            background={background}
                            onClick={() => setCurrentBackground(background)}
                        />
                    ))}
                </div>

                {/* 방명록 남기기 버튼 */}
                <button
                    onClick={handleGuestbookNavigation}
                    className="absolute top-5 right-5 p-4 bg-blue-500 text-white rounded-lg z-20 flex items-center space-x-2"
                >
                    <img src={paperAirplane} alt="Send" className="w-6 h-6" />
                    <span>방명록 남기기</span>
                </button>
            </div>
        </div>
    );
};

// 배경 선택 버튼 컴포넌트
const BackgroundButton = ({ background, onClick }) => {
    return (
        <button onClick={onClick} className="w-24 h-24 bg-blue-200 rounded">
            {`배경 ${background.slice(-1)}`}
        </button>
    );
};

BackgroundButton.propTypes = {
    background: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

Farm.propTypes = {
    방명록_남기기: PropTypes.func.isRequired,
    배경1: PropTypes.func.isRequired,
    배경2: PropTypes.func.isRequired,
    배경3: PropTypes.func.isRequired,
};

export default Farm;
