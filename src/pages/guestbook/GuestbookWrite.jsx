import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

import ArrowIcon from '../../assets/images/common/icon/arrow.png';

const GuestbookWrite = () => {
    const navigate = useNavigate();
    const [content, setContent] = useState(''); // 방명록 내용 상태
    const [username, setUsername] = useState(''); // 사용자 닉네임 상태

    // 백엔드에서 사용자 닉네임 가져오기
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // 닉네임 데이터 가져오기 예시
                // const response = await fetch('/api/user/profile');
                // const data = await response.json();
                // setUsername(data.username);

                // 임시 데이터로 설정
                setUsername('todorian');
            } catch (error) {
                console.error('사용자 데이터를 불러오는 중 오류가 발생했습니다.', error);
            }
        };

        fetchUserData();
    }, []);

    // 글 남기기 함수
    const handleSave = async () => {
        try {
            // 백엔드로 글 데이터 전송
            await fetch('/api/guestbook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content, username }),
            });

            // 저장 후 방명록 페이지로 이동
            navigate('/guestbook2');
        } catch (error) {
            console.error('방명록을 저장하는 중 오류가 발생했습니다.', error);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#fff9ef]">
            <Sidebar />

            <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
                {/* 뒤로 가기 버튼 - 화면 왼쪽 상단에 고정 */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 w-10 h-10"
                >
                    <img src={ArrowIcon} alt="뒤로 가기" className="w-full h-full" />
                </button>

                {/* 방명록 작성 영역 */}
                <div className="bg-[#adc3df38] border-2 border-[#adc3df] rounded-lg shadow-lg p-8 w-full max-w-lg space-y-6 text-center">

                    {/* 사용자 닉네임 표시 */}
                    <div className="bg-white p-4 rounded-md text-xl font-semibold shadow-sm">
                        {username}
                    </div>

                    {/* 방명록 글 입력 섹션 */}
                    <div className="bg-white p-4 rounded-md shadow-sm">
                        <textarea
                            className="w-full h-80 resize-none border-none outline-none p-2 text-base"
                            placeholder="방명록 내용을 입력하세요..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>

                    {/* 버튼 섹션 */}
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={() => navigate('/guestbook')}
                            className="py-2 px-6 bg-[#528ccb] text-white rounded-full"
                        >
                            취소
                        </button>
                        <button
                            onClick={handleSave}
                            className="py-2 px-6 bg-[#61b3cb] text-white rounded-full"
                        >
                            남기기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuestbookWrite;
