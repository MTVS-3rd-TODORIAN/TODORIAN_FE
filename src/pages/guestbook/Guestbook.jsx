import React, { useState, useEffect } from 'react';
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

// Constants for pagination
const postsPerPage = 6;
const totalPosts = 60;
const totalPages = Math.ceil(totalPosts / postsPerPage);

// Styled component for pin images
const Pin = styled.img`
  width: 20px;
  height: 37px;
  position: absolute;
`;

const GuestbookPage = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const segmentWidth = 100 / (totalPages - 1); // Width of each segment for smooth distribution
    const [dragging, setDragging] = useState(false); // Dragging state
    const [startX, setStartX] = useState(0); // Drag start position
    const [currentTranslate, setCurrentTranslate] = useState(0); // Current position of the Handle
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const [modalContent, setModalContent] = useState(null); // Content for modal

    // Function to fetch posts (Placeholder for backend integration)
    const fetchPosts = () => {
        return Array.from({ length: totalPosts }, (_, i) => ({
            id: i + 1,
            message: `Guestbook post #${i + 1}`,
            pin: [YellowPin, GreenPin, BlackPin, BluePin, PurplePin, RedPin][i % 6]
        }));
    };

    // Select posts for the current page based on pagination
    const paginatedPosts = fetchPosts().slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

    // Start drag event handler
    const handleMouseDown = (e) => {
        setDragging(true);
        setStartX(e.clientX - currentTranslate);
    };

    // Dragging event handler
    const handleMouseMove = (e) => {
        if (!dragging) return;
        const newTranslate = Math.min(
            Math.max((e.clientX - startX) / window.innerWidth * 100, 0),
            100
        );
        setCurrentTranslate(newTranslate);
    };

    // End drag and snap to nearest segment
    const handleMouseUp = () => {
        if (!dragging) return;
        setDragging(false);

        // Snap to the nearest segment based on segmentWidth
        const newPage = Math.round(currentTranslate / segmentWidth) + 1;
        setCurrentPage(newPage);
        setCurrentTranslate((newPage - 1) * segmentWidth);
    };

    // Move to the next or previous page on button click
    const goToNextPage = () => {
        setCurrentPage((prevPage) => {
            const nextPage = Math.min(prevPage + 1, totalPages);
            setCurrentTranslate((nextPage - 1) * segmentWidth);
            return nextPage;
        });
    };

    const goToPrevPage = () => {
        setCurrentPage((prevPage) => {
            const prevPageVal = Math.max(prevPage - 1, 1);
            setCurrentTranslate((prevPageVal - 1) * segmentWidth);
            return prevPageVal;
        });
    };

    // Immediate keyboard navigation using left/right arrow keys
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowRight') {
            goToNextPage();
        } else if (e.key === 'ArrowLeft') {
            goToPrevPage();
        }
    };

    // Sync handle position with the current page
    useEffect(() => {
        setCurrentTranslate((currentPage - 1) * segmentWidth);
    }, [currentPage]);

    // Modal functions for edit/delete button
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
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onKeyDown={handleKeyDown}
            tabIndex="0" // Enables keyboard navigation immediately
        >
            {/* Sidebar */}
            <Sidebar />

            {/* Main Container */}
            <div className="flex-grow flex flex-col items-center justify-start px-4 py-6 lg:px-12">
                {/* Header Section with Back Button */}
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
                <div
                    className="w-full max-w-5xl relative flex items-center gap-6 mb-8"
                >
                    {/* Background bar */}
                    <div className="relative h-[16px] w-full bg-[#e8def8] rounded-[16px] overflow-hidden">
                        {/* Progress indicator that fills as handle moves */}
                        <div
                            style={{
                                width: `${currentTranslate}%`,
                            }}
                            className="h-full bg-[#c09bd8] transition-all duration-300 ease-in-out"
                        ></div>
                    </div>

                    {/* Draggable Handle at Start */}
                    <img
                        src={Handle}
                        alt="Handle"
                        onMouseDown={handleMouseDown}
                        onClick={goToPrevPage}
                        style={{
                            transform: `translateX(${currentTranslate}%)`,
                            transition: dragging ? 'none' : 'transform 0.3s ease-in-out',
                            position: 'absolute',
                            top: '-8px',
                            left: '0px',
                            width: '10px',
                            height: '35px',
                        }}
                        className={`z-10 ${dragging ? '' : 'cursor-pointer'}`}
                    />

                    {/* Handle at the End of the Progress Bar */}
                    <img
                        src={Handle}
                        alt="Handle End"
                        onClick={goToNextPage}
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

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                    {paginatedPosts.map((post) => (
                        <div key={post.id} className="w-full h-[294px] flex flex-col items-center">
                            <div className="bg-white w-full h-full p-4 rounded-md shadow-md text-black relative">
                                <div className="text-[13px] font-bold text-center">투두리안</div>
                                <div className="text-[20px] text-center mt-4">{post.message}</div>
                                <img className="rounded-full w-[31px] h-[32px] mt-4" src={post.pin} alt="Pin" />
                                {/* Edit/Delete Buttons */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 flex gap-2">
                                    <button onClick={() => openModal(`Editing post #${post.id}`)} className="bg-[#61b3cb] rounded-[40px] text-white text-sm px-3 py-1">수정</button>
                                    <button onClick={() => openModal(`Deleting post #${post.id}`)} className="bg-[#6183cb] rounded-[40px] text-white text-sm px-3 py-1">삭제</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Absolute Pins */}
                <Pin src={BluePin} alt="Blue Pin" style={{ left: '528px', top: '571px' }} />
                <Pin src={PurplePin} alt="Purple Pin" style={{ left: '532px', top: '171px' }} />
                <Pin src={RedPin} alt="Red Pin" style={{ left: '851px', top: '572px' }} />
                <Pin src={BlackPin} alt="Black Pin" style={{ left: '1185px', top: '174px' }} />

                {/* Modal for Edit/Delete */}
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
