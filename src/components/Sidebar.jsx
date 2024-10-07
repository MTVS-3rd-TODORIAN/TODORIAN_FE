import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/auth';
import { getMemberProfile } from '../api/member';
import styled from 'styled-components';

import logoImg from '../assets/images/common/logo.png'; 
import profileImg from '../assets/images/common/profile.png'; 

const SidebarContainer = styled.div`
  background-color: #d0e6f6;
  width: 250px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  width: 140px;
  margin-bottom: 20px;
  border-radius: 20px;
  &:hover {
    background-color: #c4d7f2;
  }
`;

const SidebarButton = styled.button`
  background: none;
  border: none;
  width: 100%;
  padding: 10px 0;
  margin: 8px 0;
  border-radius: 20px;
  font-size: 18px;
  cursor: pointer;
  font-weight: bold;
  color: #333;
  &:hover {
    background-color: #c4d7f2;
  }
`;

const ProfileSection = styled.div`
  position: relative;
  width: 100%;
  text-align: center; 
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  cursor: pointer;
  margin-right: 10px;
  &:hover {
    background-color: #c4d7f2;
  }
`;

const Nickname = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  &:hover {
    color: #666;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

const DropdownButton = styled(SidebarButton)`
  width: 200px;
  margin: 5px 0;
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [nickname, setNickname] = useState(''); // 닉네임 상태 추가
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      const res = await logout();
      console.log('Logout successful:', res);
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  // 닉네임을 받아오는 API 호출
  const getProfile = async () => {
    try {
      const response = await getMemberProfile();
      if (response?.success && response?.response?.nickName) {
        setNickname(response.response.nickName); // 받아온 닉네임을 상태에 저장
      } else {
        console.error('Invalid profile response:', response);
      }
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    }
  };

  useEffect(() => {
    getProfile(); // 컴포넌트 마운트 시 프로필 정보 불러오기
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <SidebarContainer>
      <LogoContainer>
        <Logo src={logoImg} onClick={() => navigate('/main')} alt="Logo" />
        <SidebarButton onClick={() => navigate('/today-deal')}>오늘의 할일</SidebarButton>
        <SidebarButton onClick={() => navigate('/calendar')}>달력 확인</SidebarButton>
        <SidebarButton onClick={() => navigate('/farm')}>농장 가기</SidebarButton>
        <SidebarButton onClick={() => navigate('/store')}>상점 방문</SidebarButton>
        <SidebarButton onClick={() => navigate('/game')}>게임 하러 가기</SidebarButton>
      </LogoContainer>

      <ProfileSection ref={dropdownRef}>
        <ProfileImage src={profileImg} alt="Profile" onClick={toggleDropdown} />
        <Nickname onClick={toggleDropdown}>{nickname || '닉네임 로딩 중...'}</Nickname> {/* 닉네임 출력 */}
        <DropdownMenu show={showDropdown}>
          <DropdownButton onClick={() => navigate('/mypage')}>마이 페이지</DropdownButton>
          <DropdownButton onClick={() => navigate('/feed')}>밥 주러 가기</DropdownButton>
          <DropdownButton onClick={() => navigate('/closet')}>옷장 가기</DropdownButton>
          <DropdownButton onClick={handleLogout}>로그아웃</DropdownButton>
        </DropdownMenu>
      </ProfileSection>
    </SidebarContainer>
  );
};

export default Sidebar;