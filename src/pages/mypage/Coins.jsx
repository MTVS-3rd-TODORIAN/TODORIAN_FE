import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { getCoinListByMemberId } from '../../api/coin';
import { getMemberId } from '../../api/member';

// 스타일 정의
const Container = styled.div`
    display: flex;
    flex-direction: row;
    min-height: 100vh;
    background-color: #f7f9fc; /* 부드러운 배경색 */
`;

const SidebarStyled = styled.div`
    flex-shrink: 0;
    width: 250px;
`;

const Content = styled.div`
    flex-grow: 1;
    background-color: #fff;
    padding: 0;
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background-color: #e0f7fa;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MenuContainer = styled.div`
    display: flex;
    width: 100%;
`;

const MenuItem = styled.div`
    flex: 1;
    padding: 0.75rem 0;
    background-color: #f0f4f8;
    border: 1px solid #e0e0e0;
    cursor: pointer;
    transition: background 0.3s;
    text-align: center;
    border-radius: 5px;

    &:hover {
        background-color: #b2ebf2;
    }
`;

const CoinListContainer = styled.div`
    padding: 1rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const CoinItem = styled.div`
    padding: 1rem;
    background: linear-gradient(135deg, #e0f7fa, #80deea); /* 그라데이션 배경 */
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #004d40; /* 텍스트 색상 */
`;

const CoinDate = styled.span`
    font-weight: bold;
    font-size: 1.1rem;
`;

const CoinAmount = styled.span`
    font-size: 1.5rem;
    font-weight: bold;
    color: #d32f2f; /* 진한 빨간색 */
`;

const CoinReason = styled.span`
    font-style: italic;
    color: #757575;
`;

const Icon = styled.span`
    margin-right: 0.5rem;
    font-size: 1.2rem;
    color: #00796b; /* 아이콘 색상 */
`;

const Coins = () => {
    const navigate = useNavigate();
    const [coinData, setCoinData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        const fetchCoinData = async () => {
            try {
                const memberId = await getMemberId();
                const coins = await getCoinListByMemberId(memberId);

                const coinDTOs = coins.map(coin => ({
                    coinId: coin.coinId,
                    memberId: coin.memberId,
                    coinDateTime: coin.coinDateTime,
                    coinAmount: coin.coinAmount,
                    coinReason: coin.coinReason,
                }));
                console.log(coinDTOs)

                setCoinData(coinDTOs);
            } catch (error) {
                console.error('Failed to fetch coin data:', error);
                setError('코인 내역을 가져오는 데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchCoinData();
    }, []);

    const handleMenuClick = (path) => {
        navigate(path);
    };

    return (
        <Container>
            <SidebarStyled>
                <Sidebar />
            </SidebarStyled>

            <Content>
                <CoinListContainer>
                    {loading ? (
                        <div>로딩 중...</div>
                    ) : error ? (
                        <div>{error}</div>
                    ) : (
                        coinData.map(coin => (
                            <CoinItem key={coin.coinId}>
                                <div>
                                    <Icon>💰</Icon>
                                    <CoinDate>{coin.coinDateTime}</CoinDate>
                                </div>
                                <CoinAmount>{coin.coinAmount} 코인</CoinAmount>
                                <CoinReason>{coin.coinReason}</CoinReason>
                            </CoinItem>
                        ))
                    )}
                </CoinListContainer>
            </Content>
        </Container>
    );
};

export default Coins;