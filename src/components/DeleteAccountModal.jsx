import React from 'react';

const DeleteAccountModal = ({ onClose, onDelete }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-[300px]">
                {/* 네모에 감싸인 X 버튼 */}
                <button
                    className="absolute top-2 right-2 bg-white text-black hover:text-gray-500 text-sm w-6 h-6 rounded-full flex items-center justify-center" // 네모 흰색 배경과 X 아이콘 검정색
                    onClick={onClose}
                >
                    &times;
                </button>

                {/* 모달 제목 */}
                <h2 className="text-lg font-bold mb-4 text-black text-center">
                    계정을 삭제하시겠습니까?
                </h2>

                <div className="flex justify-center space-x-4 mt-6">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded text-gray-700 hover:bg-gray-400"
                        onClick={onClose}
                    >
                        No
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => {
                            // 계정 삭제 처리 함수 호출
                            if (onDelete) {
                                onDelete();
                            }
                            onClose(); // 모달 닫기
                        }}
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountModal;
