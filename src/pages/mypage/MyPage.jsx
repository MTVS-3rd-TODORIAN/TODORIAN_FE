import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트
import Sidebar from '../../components/Sidebar';
import Header from './Header'; // Header 컴포넌트 임포트
import { getMemberId } from '../../api/member'; // getMemberId 메서드 임포트

const Container = styled.div`
    display: flex;
    flex-direction: row;
    min-height: 100vh;
    background-color: #fff9ef;
`;

const SidebarStyled = styled.div`
    flex-shrink: 0;
    width: 250px; /* 사이드바 너비 설정 */
`;

const Content = styled.div`
    flex-grow: 1; /* 남은 공간을 차지하도록 설정 */
    background-color: #fff9ef;
    padding: 0; /* 기본 패딩 제거 */
    display: flex;
    flex-direction: column;
`;

const MyPage = () => {
    const [memberId, setMemberId] = useState(null); // memberId 상태 관리
    const navigate = useNavigate(); // useNavigate 훅 사용

    useEffect(() => {
        const fetchMemberId = async () => {
            const id = await getMemberId(); // getMemberId 호출
            setMemberId(id); // 상태 업데이트
        };

        fetchMemberId();
    }, []);

    const handleHeaderClick = () => {
        navigate('/another-url'); // 클릭 시 이동할 URL 설정
    };

    return (
        <Container>
            <SidebarStyled>
                <Sidebar />
            </SidebarStyled>

            <Content>
                <Header onClick={handleHeaderClick} /> {/* 클릭 이벤트 핸들러 전달 */}
                <div style={{ padding: '1rem', flexGrow: 1 }}>
                    <h2>마이페이지</h2>
                    {memberId ? (
                        <p>회원 ID: {memberId}</p> // memberId가 있을 때 표시
                    ) : (
                        <p>회원 ID를 로드 중...</p> // 로딩 중 메시지
                    )}
                </div>
            </Content>
        </Container>
    );
};

export default MyPage;