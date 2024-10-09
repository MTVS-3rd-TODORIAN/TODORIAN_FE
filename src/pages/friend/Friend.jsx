import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';
import SearchResults from './SearchResults';

import animar5 from '../../assets/images/friendPage/animal5.png';
import magnifyingGlassIcon from '../../assets/images/common/icon/magnifying-glass.png';
import closeIcon from '../../assets/images/common/icon/close.png';
import arrowIcon from '../../assets/images/common/icon/arrow.png';
import friendVectorIcon from '../../assets/images/common/icon/friend-vector.png';

// Roboto 폰트를 적용한 컨테이너 스타일
const FriendContainer = styled.div`
    font-family: 'Roboto', sans-serif;
`;

const ActionButton = ({ onClick, iconSrc, label }) => (
    <button
        onClick={onClick}
        className="w-full h-full bg-[#61b3cb] rounded-[10px] flex items-center justify-center space-x-2 hover:bg-[#51a3bb] transition-colors"
    >
        <img width="17" height="19" src={iconSrc} alt="icon" />
        <span className="text-[17px] leading-[22px] font-extrabold text-[#fff]">
            {label}
        </span>
    </button>
);

const Friend = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [showResults, setShowResults] = useState(false);

    const handleFriendManagementClick = () => {
        navigate('/friend-management');
    };

    const handleBackClick = () => {
        navigate('/main');
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        setShowResults(value.trim().length > 0);
    };

    const handleResetSearch = () => {
        setSearchQuery('');
        setShowResults(false);
    };

    return (
        <FriendContainer className="relative w-full min-h-screen flex flex-col lg:flex-row bg-[#fff9ef]">
            <Sidebar className="flex-shrink-0 w-full lg:w-[250px]" />

            <div className="relative flex-grow bg-[#fff9ef] p-4 md:p-6 lg:p-10 rounded-bl-[10px] overflow-hidden flex flex-col items-center">
                {/* Header */}
                <div className="w-full max-w-5xl flex items-center justify-between mb-8">
                    <img
                        className="cursor-pointer hidden lg:block"
                        width="50"
                        height="50"
                        src={arrowIcon}
                        alt="back"
                        onClick={handleBackClick}
                    />
                    <div className="text-xl md:text-2xl lg:text-4xl font-semibold text-[#000]">
                        🔍 친구 찾기
                    </div>
                    <div className="w-[120px] md:w-[140px] lg:w-[173px] h-[44px]">
                        <ActionButton
                            onClick={handleFriendManagementClick}
                            iconSrc={friendVectorIcon}
                            label="친구 관리"
                        />
                    </div>
                </div>

                {/* 검색창 */}
                <div className="w-full max-w-3xl flex items-center gap-2 py-2 px-4 bg-[#7676801f] rounded-[10px] mb-12 relative">
                    <img width="15" height="15" src={magnifyingGlassIcon} alt="search icon" />
                    <input
                        type="text"
                        placeholder="닉네임 or 아이디"
                        value={searchQuery}
                        onChange={handleSearch}
                        className="flex-1 bg-transparent text-[15px] md:text-[17px] leading-[22px] text-[#3c3c4399] focus:outline-none"
                    />
                    {searchQuery && (
                        <button
                            onClick={handleResetSearch}
                            className="absolute right-4 bg-transparent border-none p-0 outline-none focus:outline-none"
                        >
                            <img src={closeIcon} alt="reset search" width="15" height="15" />
                        </button>
                    )}
                </div>

                {/* 검색 결과가 없을 때만 이미지와 설명 텍스트를 표시 */}
                {!showResults && (
                    <>
                        {/* Image and Divider */}
                        <div className="relative w-full max-w-5xl flex flex-col items-center">
                            <div className="w-full border-t border-[#000] mb-12"></div>
                            <img className="w-[90%] md:w-[75%] max-w-lg" src={animar5} alt="farm animals" />
                        </div>

                        {/* 설명 텍스트 */}
                        <div className="w-full max-w-3xl text-center mt-12">
                            <p className="text-[18px] md:text-[20px] font-semibold text-[#000]">
                                친구와 소통하며 친구네 농장에도 놀러가보세요! <br />
                            </p>
                            <p className="text-[14px] md:text-[16px] font-medium text-[#143434] mt-8">
                                과연 친구는 얼마나 투두리스트를 지켰을지? <br />
                                궁금하다면.. 친구네 농장으로 GOGO🚀🛸✈️
                            </p>
                        </div>
                    </>
                )}

                {/* 검색 결과 표시 */}
                {showResults && <SearchResults searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
            </div>
        </FriendContainer>
    );
};

export default Friend;
