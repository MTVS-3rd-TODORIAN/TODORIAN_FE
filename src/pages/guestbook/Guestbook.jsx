import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';

// Importing images | 이미지 가져오기
import BlackPin from '../../assets/images/guestbookPage/Black_Pin.png';
import GreenPin from '../../assets/images/guestbookPage/Green_Pin.png';
import BluePin from '../../assets/images/guestbookPage/Blue_Pin.png';
import Handle from '../../assets/images/guestbookPage/Handle.png';
import PurplePin from '../../assets/images/guestbookPage/Purple_Pin.png';
import RedPin from '../../assets/images/guestbookPage/Red_Pin.png';
import YellowPin from '../../assets/images/guestbookPage/Yellow_Pin.png';
import ArrowIcon from '../../assets/images/common/icon/arrow.png';

// Constants for pagination | 페이지네이션에 필요한 상수
const postsPerPage = 6; // Number of posts per page | 페이지당 포스트 수
const totalPosts = 60; // Total number of posts | 전체 포스트 수
const totalPages = Math.ceil(totalPosts / postsPerPage); // Calculate total pages | 전체 페이지 수 계산

const GuestbookPage = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1); // Current page state | 현재 페이지 상태
    const segmentWidth = 100 / (totalPages - 1); // Width of each segment for smooth distribution | 진행 바에서 각 구간의 너비
    const [dragging, setDragging] = useState(false); // Dragging state | 드래그 상태
    const [startX, setStartX] = useState(0); // Start position for dragging | 드래그 시작 위치
    const [currentTranslate, setCurrentTranslate] = useState(0); // Current position of the handle | 핸들의 현재 위치
    const [showModal, setShowModal] = useState(false); // Modal visibility state | 모달 표시 상태
    const [modalContent, setModalContent] = useState(null); // Content for modal | 모달에 표시할 내용

    // Function to fetch posts (Placeholder for backend integration) | 게시물 가져오는 함수 (백엔드 연동 예정)
    const fetchPosts = () => {
        return Array.from({ length: totalPosts }, (_, i) => ({
            id: i + 1,
            message: `Guestbook post #${i + 1}`, // Example post message | 게시물 메시지
            username: '투두리안', // Example username | 사용자 이름
            date: '2024.10.26', // Example date | 날짜
            profileImage: null, // Placeholder for profile image | 프로필 이미지 자리 표시
            pin: [YellowPin, GreenPin, BlackPin, BluePin, PurplePin, RedPin][i % 6] // Assigning different pins | 서로 다른 핀 배정
        }));
    };

    // Select posts for the current page based on pagination | 현재 페이지에 해당하는 게시물 선택
    const paginatedPosts = fetchPosts().slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

    // Start drag event handler | 드래그 시작 이벤트 핸들러
    const handleMouseDown = (e) => {
        setDragging(true); // Set dragging state to true | 드래그 상태 설정
        setStartX(e.clientX - currentTranslate); // Record start position relative to translate | 상대 위치 기준으로 시작 위치 기록
    };

    // Dragging event handler | 드래그 중 이벤트 핸들러
    const handleMouseMove = (e) => {
        if (!dragging) return; // If not dragging, exit | 드래그 중이 아니면 종료
        const newTranslate = Math.min(
            Math.max((e.clientX - startX) / window.innerWidth * 100, 0),
            100
        );
        setCurrentTranslate(newTranslate); // Update handle position | 핸들의 위치 업데이트
    };

    // End drag and snap to nearest segment | 드래그 종료 후 가장 가까운 구간으로 스냅
    const handleMouseUp = () => {
        if (!dragging) return; // If not dragging, exit | 드래그 중이 아니면 종료
        setDragging(false); // Set dragging state to false | 드래그 상태 해제

        const newPage = Math.round(currentTranslate / segmentWidth) + 1; // Calculate new page | 새로운 페이지 계산
        setCurrentPage(newPage); // Update current page | 현재 페이지 업데이트
        setCurrentTranslate((newPage - 1) * segmentWidth); // Snap handle to new position | 핸들을 새로운 위치로 스냅
    };

    // Move to the next page | 다음 페이지로 이동
    const goToNextPage = () => {
        setCurrentPage((prevPage) => {
            const nextPage = Math.min(prevPage + 1, totalPages); // Calculate next page | 다음 페이지 계산
            setCurrentTranslate((nextPage - 1) * segmentWidth); // Update handle position | 핸들 위치 업데이트
            return nextPage; // Return new page number | 새로운 페이지 반환
        });
    };

    // Move to the previous page | 이전 페이지로 이동
    const goToPrevPage = () => {
        setCurrentPage((prevPage) => {
            const prevPageVal = Math.max(prevPage - 1, 1); // Calculate previous page | 이전 페이지 계산
            setCurrentTranslate((prevPageVal - 1) * segmentWidth); // Update handle position | 핸들 위치 업데이트
            return prevPageVal; // Return new page number | 새로운 페이지 반환
        });
    };

    // Immediate keyboard navigation using left/right arrow keys | 좌우 화살표 키를 사용한 즉각적인 키보드 네비게이션
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowRight') { // Right arrow key press | 오른쪽 화살표 키
            goToNextPage(); // Go to next page | 다음 페이지로 이동
        } else if (e.key === 'ArrowLeft') { // Left arrow key press | 왼쪽 화살표 키
            goToPrevPage(); // Go to previous page | 이전 페이지로 이동
        }
    };

    // Sync handle position with the current page | 현재 페이지에 맞춰 핸들 위치 동기화
    useEffect(() => {
        setCurrentTranslate((currentPage - 1) * segmentWidth); // Update translate based on page | 페이지에 맞춰 위치 업데이트
    }, [currentPage]);

    // Modal functions for edit/delete button | 수정/삭제 버튼을 위한 모달 함수
    const openModal = (content) => {
        setModalContent(content); // Set modal content | 모달 내용 설정
        setShowModal(true); // Show modal | 모달 표시
    };

    const closeModal = () => {
        setShowModal(false); // Hide modal | 모달 숨기기
        setModalContent(null); // Clear modal content | 모달 내용 초기화
    };

    return (
        <div
            className="relative w-full min-h-screen bg-[#fff9ef] flex"
            onMouseUp={handleMouseUp} // Handle drag end | 드래그 종료 핸들러
            onMouseLeave={handleMouseUp} // End drag if mouse leaves the window | 마우스가 창 밖으로 나가면 드래그 종료
            onMouseMove={handleMouseMove} // Track mouse movement for dragging | 드래그 중 마우스 이동 추적
            onKeyDown={handleKeyDown} // Handle keyboard navigation | 키보드 네비게이션 처리
            tabIndex="0" // Enable keyboard focus | 키보드 포커스 가능하도록 설정
        >
            {/* Sidebar | 사이드바 */}
            <Sidebar />

            {/* Main Container | 메인 컨테이너 */}
            <div className="flex-grow flex flex-col items-center justify-start px-4 py-6 lg:px-12">
                {/* Header Section with Back Button | 뒤로 가기 버튼이 있는 상단 헤더 섹션 */}
                <div className="w-full max-w-5xl flex items-center justify-center mb-8 relative">
                    <img
                        className="cursor-pointer hidden lg:block absolute left-0"
                        width="50"
                        height="50"
                        src={ArrowIcon}
                        alt="back"
                        onClick={() => navigate('/farm')} // Navigate back to farm | 농장 페이지로 이동
                    />

                    <div className="text-center text-3xl lg:text-5xl font-bold text-black">방명록</div>
                </div>

                {/* Progress bar with Handle | 핸들이 있는 진행 바 */}
                <div className="w-full max-w-5xl relative flex items-center gap-6 mb-8">
                    {/* Background bar | 배경 바 */}
                    <div className="relative h-[16px] w-full bg-[#e8def8] rounded-[16px] overflow-hidden">
                        {/* Progress indicator that fills as handle moves | 핸들 이동에 따라 채워지는 진행 표시 */}
                        <div
                            style={{
                                width: `${currentTranslate}%`, // Adjust progress bar fill based on handle position | 핸들 위치에 따른 진행 바 채우기
                            }}
                            className="h-full bg-[#c09bd8] transition-all duration-300 ease-in-out"
                        ></div>
                    </div>

                    {/* Draggable Handle at Start | 시작 위치의 드래그 가능한 핸들 */}
                    <img
                        src={Handle}
                        alt="Handle"
                        onMouseDown={handleMouseDown} // Start dragging on mouse down | 마우스 다운 시 드래그 시작
                        onClick={goToPrevPage} // Move to previous page on click | 클릭 시 이전 페이지로 이동
                        style={{
                            transform: `translateX(${currentTranslate}%)`, // Adjust position based on handle | 핸들 위치에 따라 위치 조정
                            transition: dragging ? 'none' : 'transform 0.3s ease-in-out',
                            position: 'absolute',
                            top: '-8px',
                            left: '0px',
                            width: '10px',
                            height: '35px',
                        }}
                        className={`z-10 ${dragging ? '' : 'cursor-pointer'}`} // Toggle cursor during drag | 드래그 중 커서 전환
                    />

                    {/* Handle at the End of the Progress Bar | 진행 바 끝 위치의 핸들 */}
                    <img
                        src={Handle}
                        alt="Handle End"
                        onClick={goToNextPage} // Move to next page on click | 클릭 시 다음 페이지로 이동
                        style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '0px',
                            width: '10px',
                            height: '35px',
                            cursor: 'pointer',
                        }}
                        className="z-10"
                    />
                </div>

                {/* Posts Grid | 게시물 그리드 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                    {paginatedPosts.map((post) => (
                        <div key={post.id} className="w-full h-[294px] flex flex-col items-center">
                            <div className="bg-white w-full h-full p-4 rounded-md shadow-md text-black relative">
                                {/* Enlarged Pin on Top | 상단에 있는 확대된 핀 */}
                                <img
                                    src={post.pin}
                                    alt="Pin"
                                    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30px] h-[30px]"
                                />
                                {/* Post Header: Profile Image, Username, Date, and Post Number | 게시물 헤더: 프로필 이미지, 사용자 이름, 날짜, 게시물 번호 */}
                                <div className="flex items-center justify-between mb-2 mt-6">
                                    <div className="flex items-center space-x-2">
                                        {post.profileImage ? (
                                            <img src={post.profileImage} alt="User Profile" className="w-8 h-8 rounded-full" />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                                        )}
                                        <span className="font-bold text-[13px]">{post.username}</span>
                                    </div>
                                    <span className="text-[10px] text-gray-500">{post.date}</span>
                                </div>
                                <div className="text-gray-500 text-xs absolute top-2 left-2">{`NO.${post.id}`}</div>

                                <div className="text-[20px] text-center mt-4">{post.message}</div>

                                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 flex gap-2">
                                    <button onClick={() => openModal(`Editing post #${post.id}`)} className="bg-[#90D05F] rounded-[40px] text-white text-sm px-3 py-1">수정</button>
                                    <button onClick={() => openModal(`Deleting post #${post.id}`)} className="bg-[#6183cb] rounded-[40px] text-white text-sm px-3 py-1">삭제</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Write Button in Bottom Right Corner | 오른쪽 하단 고정 쓰기 버튼 */}
                <div className="fixed bottom-6 right-6">
                    <div
                        className="bg-[#61b3cb] rounded-[40px] w-[70px] h-[70px] flex items-center justify-center shadow-lg cursor-pointer"
                        onClick={() => navigate('/guestbook/write')}
                    >
                        <span className="text-white font-semibold text-lg">쓰기</span>
                    </div>
                </div>

                {/* Modal for Edit/Delete | 수정/삭제 모달 */}
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
