import React, { useState } from 'react';
import styled from 'styled-components';
import logoImg from '../../assets/images/logo.png';

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

const ChecklistContainer = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const DateButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  margin: 0 20px;
`;

const ChecklistItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff2d7;
  width: 400px;
  padding: 15px;
  margin: 10px 0;
  border-radius: 10px;
  font-size: 18px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 20px;
  width: 24px;
  height: 24px;
  accent-color: black;
`;

const TodoText = styled.span`
  text-decoration: ${({ checked }) => (checked ? 'line-through' : 'none')};
  font-weight: ${({ checked }) => (checked ? 'bold' : 'normal')};
`;

const todosData = [
  { id: 1, text: '건강 검진 예약하기', checked: true },
  { id: 2, text: '영화 보기', checked: true },
  { id: 3, text: '취미 활동하기', checked: true },
  { id: 4, text: '블로그 글 작성하기', checked: true },
  { id: 5, text: '사회봉사 활동하기', checked: true },
  { id: 6, text: '가족과 시간 보내기', checked: true },
];

function Todo() {
  const [todos, setTodos] = useState(todosData);

  const handleCheckboxChange = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
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

      <ChecklistContainer>
        <Header>
          <DateButton>&lt;</DateButton>
          <h2>8/6</h2>
          <DateButton>&gt;</DateButton>
        </Header>

        {todos.map((todo) => (
          <ChecklistItem key={todo.id}>
            <Checkbox
              checked={todo.checked}
              onChange={() => handleCheckboxChange(todo.id)}
            />
            <TodoText checked={todo.checked}>{todo.text}</TodoText>
          </ChecklistItem>
        ))}
      </ChecklistContainer>
    </Container>
  );
}

export default Todo;
