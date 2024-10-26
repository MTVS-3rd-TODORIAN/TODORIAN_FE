// Importing necessary modules and components
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

// Styled component for pins (optional based on your layout)
const Pin = styled.img`
  width: 20px;
  height: 37px;
  position: absolute;
`;

// Main component
const GuestbookPage = () => {
    const navigate = useNavigate();

    return (
        <div className="relative w-full min-h-screen bg-[#fff9ef]">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Container */}
            <div className="relative w-full h-full z-10 flex flex-col items-center justify-center px-4 py-6 lg:px-12">

            {/* Guestbook entries */}
            <div className="absolute left-[28.89%] right-[11.86%] top-[2%] flex items-center gap-[6px] pl-[4px] z-10">
                <img src={Handle} alt="Handle" className="w-[4px] h-[44px]" />
                <div className="relative flex-1 flex flex-col items-end justify-center">
                    <div className="self-stretch h-[16px] bg-[#e8def8] rounded-tl-[2px] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[2px]"></div>
                    <img src={Track_dot} alt="Track dot" className="absolute right-[4px] top-1/2 transform -translate-y-1/2" />
                </div>
            </div>
        </div>

            {/* Post 1 */}
            <div className="absolute left-[421px] top-[189px] w-[256px] h-[294px] flex">
                <div className="bg-white w-full h-full"></div>
                <div className="absolute left-[7.74%] top-[14.36%] text-[13px] font-bold text-center">투두리안</div>
                <div className="absolute left-[0.62%] top-[39.8%] text-[20px] text-center">농장이 너무 귀엽네요😆</div>
                <img className="absolute top-[10%] left-[5%] rounded-full w-[31px] h-[32px]" src={YellowPin} alt="Yellow Pin" />
            </div>

            {/* Post 2 */}
            <div className="absolute left-[745px] top-[194px] w-[261px] h-[294px] flex">
                <div className="bg-white w-full h-full"></div>
                <div className="absolute left-[10.99%] top-[12.79%] text-[13px] font-bold text-center">투두리안</div>
                <div className="absolute left-[2.64%] top-[41.84%] text-[20px] text-center">농장 잘 구경하다 갑니다~!👍</div>
                <img className="absolute left-[4.92%] top-[10.44%] rounded-full w-[31px] h-[32px]" src={GreenPin} alt="Green Pin" />
            </div>

            {/* Post 3 */}
            <div className="absolute left-[745px] top-[194px] w-[261px] h-[294px] flex">
                <div className="bg-white w-full h-full"></div>
                <div className="absolute left-[13.99%] top-[10.79%] text-[13px] font-bold text-center">투두리안</div>
                <div className="absolute left-[4.64%] top-[43.84%] text-[20px] text-center">농장 잘 구경하다 갑니다~!👍</div>
                <img className="absolute left-[.92%] top-[10.44%] rounded-full w-[31px] h-[32px]" src={GreenPin} alt="Green Pin" />
            </div>

            {/* Post 4 */}
            <div className="absolute left-[745px] top-[194px] w-[261px] h-[294px] flex">
                <div className="bg-white w-full h-full"></div>
                <div className="absolute left-[10.99%] top-[12.79%] text-[13px] font-bold text-center">투두리안</div>
                <div className="absolute left-[2.64%] top-[41.84%] text-[20px] text-center">농장 잘 구경하다 갑니다~!👍</div>
                <img className="absolute left-[4.92%] top-[10.44%] rounded-full w-[31px] h-[32px]" src={GreenPin} alt="Green Pin" />
            </div>

            {/* Post 5 */}
            <div className="absolute left-[745px] top-[194px] w-[261px] h-[294px] flex">
                <div className="bg-white w-full h-full"></div>
                <div className="absolute left-[10.99%] top-[12.79%] text-[13px] font-bold text-center">투두리안</div>
                <div className="absolute left-[2.64%] top-[41.84%] text-[20px] text-center">농장 잘 구경하다 갑니다~!👍</div>
                <img className="absolute left-[4.92%] top-[10.44%] rounded-full w-[31px] h-[32px]" src={GreenPin} alt="Green Pin" />
            </div>

            {/* Post 6 */}
            <div className="absolute left-[745px] top-[194px] w-[261px] h-[294px] flex">
                <div className="bg-white w-full h-full"></div>
                <div className="absolute left-[10.99%] top-[12.79%] text-[13px] font-bold text-center">투두리안</div>
                <div className="absolute left-[2.64%] top-[41.84%] text-[20px] text-center">농장 잘 구경하다 갑니다~!👍</div>
                <img className="absolute left-[4.92%] top-[10.44%] rounded-full w-[31px] h-[32px]" src={GreenPin} alt="Green Pin" />
            </div>

            {/* Pins positioned absolutely */}
            <Pin src={BluePin} alt="Blue Pin" style={{ left: '528px', top: '571px' }} />
            <Pin src={PurplePin} alt="Purple Pin" style={{ left: '532px', top: '171px' }} />
            <Pin src={RedPin} alt="Red Pin" style={{ left: '851px', top: '572px' }} />
            <Pin src={BlackPin} alt="Black Pin" style={{ left: '1185px', top: '174px' }} />

            {/* Example buttons at the bottom */}
            <div className="absolute left-[91.69%] right-[1.27%] top-[51.83%] bottom-[45.85%]">
                <div className="bg-[#61b3cb] rounded-[40px] text-white text-center py-2">쓰기</div>
            </div>
        </div>
    );
};

export default GuestbookPage;
