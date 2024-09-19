import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logoImg from '../assets/images/common/logo.png'; 

const SidebarContainer = styled.div`
  background-color: #d0e6f6;
  width: 250px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <SidebarContainer>
      <Logo src={logoImg} onClick={() => navigate('/main')} alt="Logo" />
      <SidebarButton onClick={() => navigate('/today-deal')}>오늘의 할일</SidebarButton>
      <SidebarButton onClick={() => navigate('/calendar')}>달력 확인</SidebarButton>
      <SidebarButton onClick={() => navigate('/feed')}>밥 주러 가기</SidebarButton>
      <SidebarButton onClick={() => navigate('/farm')}>농장 가기</SidebarButton>
      <SidebarButton onClick={() => navigate('/closet')}>옷장 가기</SidebarButton>
      <SidebarButton onClick={() => navigate('/store')}>상점 방문</SidebarButton>
      <SidebarButton onClick={() => navigate('/game')}>게임 하러 가기</SidebarButton>
      <SidebarButton onClick={() => navigate('/mypage')}>마이 페이지</SidebarButton>
    </SidebarContainer>
  );
};

export default Sidebar;
