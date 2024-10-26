import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';

// Importing images
import BlackPin from '../../assets/images/guestbookPage/Black_Pin.png';
import GreenPin from '../../assets/images/guestbookPage/Green_Pin.png';
import BluePin from '../../assets/images/guestbookPage/Blue_Pin.png';
import Handle from '../../assets/images/guestbookPage/Handle.png';
import PurplePin from '../../assets/images/guestbookPage/Purple_Pin.png';
import RedPin from '../../assets/images/guestbookPage/Red_Pin.png';
import Track_dot from '../../assets/images/guestbookPage/Track_dot.png';
import YellowPin from '../../assets/images/guestbookPage/Yellow_Pin.png';
import ArrowIcon from '../../assets/images/common/icon/arrow.png';

// Styled component for pins (optional based on your layout)
const Pin = styled.img`
  width: 20px;
  height: 37px;
  position: absolute;
`;

const GuestbookPage = () => {
    const navigate = useNavigate();

    // Back button handler
    const handleBackClick = () => {
        navigate('/farm');
    };

    return (
        <div className="relative w-full min-h-screen bg-[#fff9ef] flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Container */}
            <div className="flex-grow flex flex-col items-center justify-start px-4 py-6 lg:px-12">

                {/* Header Section with Back Button */}
                <div className="w-full max-w-5xl flex items-center justify-between mb-8">
                    <img
                        className="cursor-pointer hidden lg:block"
                        width="50"
                        height="50"
                        src={ArrowIcon}
                        alt="back"
                        onClick={handleBackClick}
                    />

                    <div className="text-center text-3xl lg:text-5xl font-bold">방명록</div>
                </div>

                {/* Guestbook entries */}
                <div className="w-full max-w-5xl flex items-center gap-[6px] pl-[4px] mb-8">
                    <img src={Handle} alt="Handle" className="w-[4px] h-[44px]" />
                    <div className="relative flex-1 flex flex-col items-end justify-center">
                        <div className="self-stretch h-[16px] bg-[#e8def8] rounded-tl-[2px] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[2px]"></div>
                        <img src={Track_dot} alt="Track dot" className="absolute right-[4px] top-1/2 transform -translate-y-1/2" />
                    </div>
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                    {/* Post 1 */}
                    <div className="w-full h-[294px] flex flex-col items-center">
                        <div className="bg-white w-full h-full p-4 rounded-md shadow-md">
                            <div className="text-[13px] font-bold text-center">투두리안</div>
                            <div className="text-[20px] text-center mt-4">농장이 너무 귀엽네요😆</div>
                            <img className="rounded-full w-[31px] h-[32px] mt-4" src={YellowPin} alt="Yellow Pin" />
                        </div>
                    </div>

                    {/* Post 2 */}
                    <div className="w-full h-[294px] flex flex-col items-center">
                        <div className="bg-white w-full h-full p-4 rounded-md shadow-md">
                            <div className="text-[13px] font-bold text-center">투두리안</div>
                            <div className="text-[20px] text-center mt-4">농장 잘 구경하다 갑니다~!👍</div>
                            <img className="rounded-full w-[31px] h-[32px] mt-4" src={GreenPin} alt="Green Pin" />
                        </div>
                    </div>

                    {/* Post 3 */}
                    <div className="w-full h-[294px] flex flex-col items-center">
                        <div className="bg-white w-full h-full p-4 rounded-md shadow-md">
                            <div className="text-[13px] font-bold text-center">투두리안</div>
                            <div className="text-[20px] text-center mt-4">투두리안 대박입니다!</div>
                            <img className="rounded-full w-[31px] h-[32px] mt-4" src={BlackPin} alt="Black Pin" />
                        </div>
                    </div>

                    {/* Post 4 */}
                    <div className="w-full h-[294px] flex flex-col items-center">
                        <div className="bg-white w-full h-full p-4 rounded-md shadow-md">
                            <div className="text-[13px] font-bold text-center">투두리안</div>
                            <div className="text-[20px] text-center mt-4">계획을 잘 지키세요!</div>
                            <img className="rounded-full w-[31px] h-[32px] mt-4" src={BluePin} alt="Blue Pin" />
                        </div>
                    </div>

                    {/* Post 5 */}
                    <div className="w-full h-[294px] flex flex-col items-center">
                        <div className="bg-white w-full h-full p-4 rounded-md shadow-md">
                            <div className="text-[13px] font-bold text-center">투두리안</div>
                            <div className="text-[20px] text-center mt-4">병아리가 귀여워요!</div>
                            <img className="rounded-full w-[31px] h-[32px] mt-4" src={GreenPin} alt="Green Pin" />
                        </div>
                    </div>

                    {/* Post 6 */}
                    <div className="w-full h-[294px] flex flex-col items-center">
                        <div className="bg-white w-full h-full p-4 rounded-md shadow-md">
                            <div className="text-[13px] font-bold text-center">투두리안</div>
                            <div className="text-[20px] text-center mt-4">농장 잘 구경하다 갑니다~!👍</div>
                            <img className="rounded-full w-[31px] h-[32px] mt-4" src={PurplePin} alt="Purple Pin" />
                        </div>
                    </div>
                </div>

                {/* Pins positioned absolutely */}
                <Pin src={BluePin} alt="Blue Pin" style={{ left: '528px', top: '571px' }} />
                <Pin src={PurplePin} alt="Purple Pin" style={{ left: '532px', top: '171px' }} />
                <Pin src={RedPin} alt="Red Pin" style={{ left: '851px', top: '572px' }} />
                <Pin src={BlackPin} alt="Black Pin" style={{ left: '1185px', top: '174px' }} />

                {/* Example button positioned at the bottom */}
                <div className="absolute right-[1.27%] top-[51.83%] bottom-[45.85%]">
                    <div className="bg-[#61b3cb] rounded-[40px] text-white text-center py-2 px-4">쓰기</div>
                </div>
            </div>
        </div>
    );
};

export default GuestbookPage;
