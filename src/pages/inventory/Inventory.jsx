import React, { useState } from 'react';
import styled from 'styled-components';
import logoImg from '../../assets/images/todo/logo.png';

const Container = styled.div`
  display: flex;
  background-color: #f8f4ef;
  height: 100vh;
  width: 100vw;
`;

const Sidebar = styled.div`
  background-color: #d0e6f6;
  width: 250px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  width: 140px;
  height: 80px;
  margin-bottom: 20px;
`;

const SidebarButton = styled.button`
  background: none;
  border: none;
  width: 100%;
  padding: 15px 0;
  margin: 10px 0;
  border-radius: 20px;
  font-size: 18px;
  cursor: pointer;
  font-weight: bold;
  color: #333;
  &:hover {
    background-color: #c4d7f2;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InventoryTitle = styled.h1`
  margin-left: 20px;
  font-size: 24px;
  color: #333;
`;

const InventoryBox = styled.div`
  background-color: #CFE1F4;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
`;

const CategoryButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const CategoryButton = styled.button`
  background-color: #e8e8e8;
  border: none;
  margin: 0 5px;
  padding: 10px 20px;
  border-radius: 15px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #c4d7f2;
  }
`;

const InventoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 70px;
  flex-grow: 1;
`;

const InventoryItem = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  };
  border-radius : 10px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const CoinDisplay = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  background-color: #c4d7f2;
  border: none;
  padding: 10px 15px;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: #a0bde0;
  }
`;

function Inventory(){

    const [inventoryType, setInventoryType] = useState('장비');
    const [coins, setCoins] = useState(1000); // 보유 코인 수
    const [inventoryItems, setInventoryItems] = useState(Array(24).fill(null)); // 3x8 인벤토리 아이템
    
    const handleCategoryChange = (type) => {
      setInventoryType(type);
    };

    return (
        <Container>
            <Sidebar>
                <Logo src={logoImg} alt="Logo" />
                <SidebarButton>MAIN</SidebarButton>
                <SidebarButton>STORE</SidebarButton>
                <SidebarButton>TO DO</SidebarButton>
                <SidebarButton>FARM</SidebarButton>
                <SidebarButton>MY PAGE</SidebarButton>
            </Sidebar>
    
            <ContentArea>
                <Header>
                    <InventoryTitle>Inventory</InventoryTitle>
                </Header>

                <InventoryBox>
                    <CategoryButtons>
                        {['장비', '장신구', '배경', '기타'].map((type) => (
                        <CategoryButton key={type} onClick={() => handleCategoryChange(type)}>
                            {type}
                        </CategoryButton>
                        ))}
                    </CategoryButtons>

                    <InventoryGrid>
                        {inventoryItems.map((item, index) => (
                        <InventoryItem key={index}>{item ? item.name : ''}</InventoryItem>
                        ))}
                    </InventoryGrid>
                </InventoryBox>

                <Footer>
                    <CoinDisplay>보유 코인: {coins}개</CoinDisplay>
                    <ActionButtons>
                        <ActionButton>착용</ActionButton>
                        <ActionButton>해제</ActionButton>
                    </ActionButtons>
                </Footer>
            </ContentArea>
        </Container>
    );
}

export default Inventory;