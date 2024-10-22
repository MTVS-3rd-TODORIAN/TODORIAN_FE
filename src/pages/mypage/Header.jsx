import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 스타일 정의
const HeaderContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center; /* 중앙 정렬 */
    padding: 0; /* 패딩 제거 */
    background-color: #e0f7fa; /* 상단 바 색상 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
`;

const MenuContainer = styled.div`
    display: flex;
    width: 100%; /* 전체 너비 사용 */
`;

const MenuItem = styled.div`
    flex: 1; /* 각 항목이 동일한 비율로 크기 조정 */
    padding: 0.75rem 0; /* 상하 패딩 */
    background-color: #f0f4f8; /* 버튼 배경색 변경 */ 
    border: 1px solid #e0e0e0; /* 메뉴 항목 테두리 */
    border-radius: 0; /* 모서리 둥글기 제거 */
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
        background-color: #b2ebf2; /* 호버 색상 */
    }

    /* 텍스트 중앙 정렬 */
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Header = () => {
    const navigate = useNavigate();

    const handleMenuClick = (path) => {
        console.log('Navigating to:', path);
        navigate(path);
    };

    return (
        <HeaderContainer>
            <MenuContainer>
                <MenuItem onClick={() => handleMenuClick('/coins')}>
                    코인
                </MenuItem>
                <MenuItem onClick={() => handleMenuClick('/account')}>
                    계정
                </MenuItem>
                <MenuItem onClick={() => handleMenuClick('/settings')}>
                    설정
                </MenuItem>
                <MenuItem onClick={() => handleMenuClick('/notifications')}>
                    알림
                </MenuItem>
                <MenuItem onClick={() => handleMenuClick('/help')}>
                    도움말
                </MenuItem>
            </MenuContainer>
        </HeaderContainer>
    );
};

export default Header;