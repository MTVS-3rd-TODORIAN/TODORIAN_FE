import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';

// Importing images
// 이미지 파일들 임포트
import BlackPin from '../../assets/images/guestbookPage/Black_Pin.png';
import GreenPin from '../../assets/images/guestbookPage/Green_Pin.png';
import BluePin from '../../assets/images/guestbookPage/Blue_Pin.png';
import Handle from '../../assets/images/guestbookPage/Handle.png';
import PurplePin from '../../assets/images/guestbookPage/Purple_Pin.png';
import RedPin from '../../assets/images/guestbookPage/Red_Pin.png';
import Track_dot from '../../assets/images/guestbookPage/Track_dot.png';
import YellowPin from '../../assets/images/guestbookPage/Yellow_Pin.png';
import ArrowIcon from '../../assets/images/common/icon/arrow.png';

// Constants for pagination
// 페이징을 위한 상수들
const postsPerPage = 6; // Number of posts per page | 한 페이지당 표시할 포스트 수
const totalPosts = 60;  // Total example posts | 총 포스트 수 예시 (실제 데이터에 맞춰 조정)
const totalPages = Math.ceil(totalPosts / postsPerPage); // Total pages calculation | 총 페이지 수 계산

// Styled component for pin images
// 핀 이미지에 대한 스타일 컴포넌트
const Pin = styled.img`
  width: 20px;
  height: 37px;
  position: absolute;
`;

const GuestbookPage = () => {
    const navigate = useNavigate(); // Navigation hook for page redirection | 페이지 이동을 위한 네비게이션 훅
    const [currentPage, setCurrentPage] = useState(1); // Current page | 현재 페이지 상태
    const segmentWidth = 100 / (totalPages - 1); // Width of each segment for smooth distribution | 각 세그먼트의 너비 계산

    // State variables for dragging functionality | 드래그 기능을 위한 상태 변수
    const [dragging, setDragging] = useState(false); // Dragging state | 드래그 상태
    const [startX, setStartX] = useState(0); // Start position for dragging | 드래그 시작 위치
    const [currentTranslate, setCurrentTranslate] = useState(0); // Current handle position | 현재 핸들 위치
    const [showModal, setShowModal] = useState(false); // Modal visibility state | 모달 표시 상태
    const [modalContent, setModalContent] = useState(null); // Content for modal | 모달 내용

    // Function to fetch posts from the backend (Placeholder)
    // 백엔드 서버에서 게시글을 불러오는 함수 (예시용)
    const fetchPosts = () => {
        // Placeholder: Replace with actual backend API call
        // 예시: 실제 백엔드 API 호출로 대체 예정
        return Array.from({ length: totalPosts }, (_, i) => ({
            id: i + 1,
            message: `Guestbook post #${i + 1}`,
            pin: [YellowPin, GreenPin, BlackPin, BluePin, PurplePin, RedPin][i % 6] // Assign pins with different colors | 색상별 핀 할당
        }));
    };

    // Select posts for the current page based on pagination
    // 현재 페이지에 맞는 포스트 선택
    const paginatedPosts = fetchPosts().slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

    // Event handler for starting drag
    // 드래그 시작 핸들러
    const handleMouseDown = (e) => {
        setDragging(true);
        setStartX(e.clientX); // Record the starting drag position | 드래그 시작 위치 기록
        setCurrentTranslate((currentPage - 1) * segmentWidth); // Move to the current page position | 현재 페이지 위치로 이동
    };

    // Event handler during drag
    // 드래그 중 이벤트 핸들러
    const handleMouseMove = (e) => {
        if (!dragging) return; // Stop if not dragging | 드래그 중이 아닐 때 멈춤
        const deltaX = e.clientX - startX; // Calculate drag distance | 드래그 거리 계산
        const newTranslate = Math.min(
            Math.max((currentPage - 1) * segmentWidth + deltaX, 0), // Constrain movement within bounds | 이동을 범위 내로 제한
            100
        );
        setCurrentTranslate(newTranslate); // Update handle position | 핸들 위치 업데이트
    };

    // Event handler to end dragging and snap to closest segment
    // 드래그 종료 및 가장 가까운 세그먼트로 스냅하기 위한 이벤트 핸들러
    const handleMouseUp = () => {
        if (!dragging) return;
        setDragging(false);

        // Snap to the nearest segment based on segmentWidth
        // segmentWidth를 기준으로 가장 가까운 세그먼트로 스냅
        const newPage = Math.round(currentTranslate / segmentWidth) + 1;
        setCurrentPage(newPage);
        setCurrentTranslate((newPage - 1) * segmentWidth); // Update to the snapped page position | 스냅된 위치로 업데이트
    };

    // Keyboard navigation using left/right arrow keys
    // 왼쪽/오른쪽 화살표 키를 이용한 키보드 네비게이션
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowRight') {
            setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages)); // Move to the next page | 다음 페이지로 이동
        } else if (e.key === 'ArrowLeft') {
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Move to the previous page | 이전 페이지로 이동
        }
    };

    // Update `currentTranslate` when `currentPage` changes
    // currentPage 변경 시 currentTranslate 업데이트
    useEffect(() => {
        setCurrentTranslate((currentPage - 1) * segmentWidth);
    }, [currentPage]);

    // Modal functions for edit/delete button
    // 수정/삭제 버튼을 위한 모달 함수
    const openModal = (content) => {
        setModalContent(content);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalContent(null);
    };

    return (
        <div
            className="relative w-full min-h-screen bg-[#fff9ef] flex"
            onMouseUp={handleMouseUp}
            onKeyDown={handleKeyDown}
            tabIndex="0" // Enables keyboard navigation | 키보드 네비게이션 가능하도록 설정
        >
            {/* Sidebar */}
            {/* 사이드바 */}
            <Sidebar />

            {/* Main Container */}
            {/* 메인 컨테이너 */}
            <div className="flex-grow flex flex-col items-center justify-start px-4 py-6 lg:px-12">
                {/* Header Section with Back Button */}
                {/* 상단 헤더 (뒤로가기 버튼 포함) */}
                <div className="w-full max-w-5xl flex items-center justify-center mb-8 relative">
                    <img
                        className="cursor-pointer hidden lg:block absolute left-0"
                        width="50"
                        height="50"
                        src={ArrowIcon}
                        alt="back"
                        onClick={() => navigate('/farm')}
                    />

                    <div className="text-center text-3xl lg:text-5xl font-bold text-black">방명록</div>
                </div>

                {/* Progress bar with Handle */}
                {/* 핸들이 포함된 진행 바 */}
                <div
                    className="w-full max-w-5xl relative flex items-center gap-6 mb-8"
                    onMouseMove={handleMouseMove}
                >
                    {/* Background bar */}
                    {/* 배경 바 */}
                    <div className="relative h-[16px] w-full bg-[#e8def8] rounded-[16px] overflow-hidden">
                        {/* Progress indicator that fills as handle moves */}
                        {/* 핸들 이동에 따라 채워지는 진행 표시 */}
                        <div
                            style={{
                                width: `${currentTranslate}%`, // Handle position dynamically adjusts width | 핸들 위치에 따라 너비 조정
                            }}
                            className="h-full bg-[#c09bd8] transition-all duration-300 ease-in-out"
                        ></div>
                    </div>

                    {/* Draggable Handle */}
                    {/* 드래그 가능한 핸들 */}
                    <img
                        src={Handle}
                        alt="Handle"
                        onMouseDown={handleMouseDown}
                        style={{
                            transform: `translateX(${currentTranslate}%)`, // Adjust position based on handle | 핸들 위치에 따라 위치 조정
                            transition: dragging ? 'none' : 'transform 0.3s ease-in-out',
                            position: 'absolute',
                            top: '-8px',
                            left: '0px',
                            width: '10px',
                            height: '35px',
                        }}
                        className="cursor-pointer z-10"
                    />
                </div>

                {/* Posts Grid */}
                {/* 포스트 그리드 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                    {paginatedPosts.map((post) => (
                        <div key={post.id} className="w-full h-[294px] flex flex-col items-center">
                            <div className="bg-white w-full h-full p-4 rounded-md shadow-md text-black relative">
                                <div className="text-[13px] font-bold text-center">투두리안</div>
                                <div className="text-[20px] text-center mt-4">{post.message}</div>
                                <img className="rounded-full w-[31px] h-[32px] mt-4" src={post.pin} alt="Pin" />
                                {/* Edit/Delete Buttons */}
                                {/* 수정/삭제 버튼 */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 flex gap-2">
                                    <button onClick={() => openModal(`Editing post #${post.id}`)} className="bg-[#61b3cb] rounded-[40px] text-white text-sm px-3 py-1">수정</button>
                                    <button onClick={() => openModal(`Deleting post #${post.id}`)} className="bg-[#6183cb] rounded-[40px] text-white text-sm px-3 py-1">삭제</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Absolute Pins */}
                {/* 위치 지정된 핀 */}
                <Pin src={BluePin} alt="Blue Pin" style={{ left: '528px', top: '571px' }} />
                <Pin src={PurplePin} alt="Purple Pin" style={{ left: '532px', top: '171px' }} />
                <Pin src={RedPin} alt="Red Pin" style={{ left: '851px', top: '572px' }} />
                <Pin src={BlackPin} alt="Black Pin" style={{ left: '1185px', top: '174px' }} />

                {/* Modal for Edit/Delete */}
                {/* 수정/삭제 모달 */}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                            <p>{modalContent}</p>
                            <button onClick={closeModal} className="mt-4 bg-[#61b3cb] text-white px-4 py-2 rounded">
                                닫기
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GuestbookPage;
