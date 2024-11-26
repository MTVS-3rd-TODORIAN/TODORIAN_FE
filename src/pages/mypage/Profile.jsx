import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

import Arrow from "../../assets/images/common/icon/arrow.png";
import Eye from "../../assets/images/common/icon/eye.png";
import Pencil from "../../assets/images/common/icon/pencil.png";
import Close from "../../assets/images/common/icon/close.png";

const Profile = () => {
    const [nickname, setNickname] = useState(""); // 닉네임 상태
    const [currentPassword, setCurrentPassword] = useState(""); // 현재 비밀번호 상태
    const [newPassword, setNewPassword] = useState(""); // 새 비밀번호 상태
    const [confirmPassword, setConfirmPassword] = useState(""); // 새 비밀번호 확인 상태
    const [passwordError, setPasswordError] = useState(false); // 비밀번호 불일치 에러 상태
    const [profileImage, setProfileImage] = useState(null); // 프로필 사진 상태
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [isChanged, setIsChanged] = useState(false); // 변경 여부 상태
    const [showNewPassword, setShowNewPassword] = useState(false); // 새 비밀번호 표시 여부
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 비밀번호 확인 표시 여부

    const navigate = useNavigate(); // 네비게이션 객체 생성

    // 뒤로 가기 핸들러
    const handleGoBack = () => {
        navigate("/mypage");
    };

    // 프로필 사진 변경 핸들러
    const handleProfileImageChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setProfileImage(reader.result);
            reader.readAsDataURL(file);
            setIsChanged(true); // 변경 상태 설정
        }
    };

    // 비밀번호 확인 핸들러
    const handleConfirmPassword = (value) => {
        setConfirmPassword(value);
        setPasswordError(newPassword !== value); // 비밀번호 불일치 여부 확인
        setIsChanged(true); // 변경 상태 설정
    };

    // 변경 사항 저장 핸들러
    const handleSaveChanges = () => {
        if (passwordError) {
            alert("새 비밀번호가 일치하지 않습니다.");
            return;
        }

        if (!isChanged) {
            alert("변경된 내용이 없습니다.");
            return;
        }

        const formData = {
            nickname,
            currentPassword,
            newPassword,
            profileImage,
        };

        console.log("저장된 데이터:", formData);

        setIsModalOpen(true); // 모달 열기
        setTimeout(() => setIsModalOpen(false), 2000); // 2초 후 모달 닫기

        // TODO: 백엔드 API 호출 로직 추가
    };

    return (
        <div className="flex w-full h-screen">
            {/* Sidebar (세로 배치) */}
            <Sidebar className="w-[250px] h-full bg-gray-100" />

            {/* 메인 컨텐츠 */}
            <div className="flex-1 bg-[#fff9ef] overflow-auto p-4 md:p-8 relative">
                {/* 뒤로 가기 버튼 */}
                <img
                    src={Arrow}
                    alt="뒤로 가기"
                    className="absolute top-4 left-4 lg:top-6 lg:left-6 cursor-pointer"
                    width="40"
                    height="40"
                    onClick={handleGoBack}
                />

                {/* 프로필 제목 */}
                <h1 className="text-xl md:text-2xl font-extrabold text-center text-black mb-6">
                    프로필
                </h1>

                {/* 프로필 사진 */}
                <div className="flex justify-center items-center mb-6 relative">
                    <div
                        className="w-24 h-24 md:w-32 md:h-32 bg-[#d9d9d9] rounded-full overflow-hidden relative"
                        style={{ overflow: "visible", position: "relative", zIndex: 5 }}
                    >
                        {profileImage ? (
                            <img
                                src={profileImage}
                                alt="프로필"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-[#666] flex justify-center items-center h-full text-sm">
                                이미지 없음
                            </span>
                        )}
                        <label
                            className="absolute top-1 right-1 p-1 bg-gray-300 rounded-full shadow cursor-pointer"
                            style={{ zIndex: 10 }}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleProfileImageChange}
                            />
                            <img
                                src={Pencil}
                                alt="프로필 변경"
                                className="w-5 h-5"
                                style={{ zIndex: 11, position: "relative" }}
                            />
                        </label>
                    </div>
                </div>

                {/* 이메일 */}
                <div className="mb-4">
                    <label className="block text-sm md:text-base font-semibold mb-1 text-black">
                        이메일
                    </label>
                    <input
                        type="text"
                        value="todorian@gmail.com"
                        readOnly
                        className="w-full bg-gray-200 text-gray-600 rounded px-3 py-2"
                    />
                </div>

                {/* 닉네임 */}
                <div className="mb-4 relative">
                    <label className="block text-sm md:text-base font-semibold mb-1 text-black">
                        닉네임
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            value={nickname}
                            onChange={(e) => {
                                setNickname(e.target.value);
                                setIsChanged(true); // 변경 상태 설정
                            }}
                            className="w-full bg-gray-100 text-black rounded px-3 py-2"
                        />
                        <button
                            onClick={() => setNickname("")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                            <img src={Close} alt="초기화" className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* 현재 비밀번호 */}
                <div className="mb-4 relative">
                    <label className="block text-sm md:text-base font-semibold mb-1 text-black">
                        현재 비밀번호
                    </label>
                    <div className="relative">
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => {
                                setCurrentPassword(e.target.value);
                                setIsChanged(true); // 변경 상태 설정
                            }}
                            className="w-full bg-gray-100 text-black rounded px-3 py-2"
                        />
                        <button
                            onClick={() => setCurrentPassword("")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                            <img src={Close} alt="초기화" className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* 새 비밀번호 */}
                <div className="mb-4 relative">
                    <label className="block text-sm md:text-base font-semibold mb-1 text-black">
                        새 비밀번호
                    </label>
                    <div className="relative">
                        <input
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                                setIsChanged(true); // 변경 상태 설정
                            }}
                            className="w-full bg-gray-100 text-black rounded px-3 py-2"
                        />
                        <button
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                            <img
                                src={Eye}
                                alt="비밀번호 보기"
                                className="w-5 h-5"
                            />
                        </button>
                    </div>
                </div>

                {/* 새 비밀번호 확인 */}
                <div className="mb-6 relative">
                    <label className="block text-sm md:text-base font-semibold mb-1 text-black">
                        비밀번호 확인
                    </label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => handleConfirmPassword(e.target.value)}
                            className={`w-full rounded px-3 py-2 ${passwordError ? "bg-red-100" : "bg-gray-100"
                                } text-black`}
                        />
                        <button
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                            <img
                                src={Eye}
                                alt="비밀번호 보기"
                                className="w-5 h-5"
                            />
                        </button>
                    </div>
                    {passwordError && (
                        <p className="text-red-500 text-sm mt-1">
                            비밀번호가 일치하지 않습니다.
                        </p>
                    )}
                </div>

                {/* 저장 버튼 */}
                <div className="text-center">
                    <button
                        onClick={handleSaveChanges}
                        className={`px-4 py-2 text-white text-sm md:text-base rounded ${passwordError || !isChanged
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500"
                            }`}
                        disabled={passwordError || !isChanged}
                    >
                        변경 사항 저장
                    </button>
                </div>
            </div>

            {/* 저장 완료 모달 */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-lg text-center">
                        <h2 className="text-base md:text-lg font-semibold">
                            변경 사항이 저장되었습니다.
                        </h2>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
