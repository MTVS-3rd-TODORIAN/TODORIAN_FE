import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';
import { getTodos } from '../../api/todo';
import axiosInstance from '../../axios/AxiosInstance';

const Container = styled.div`
  display: flex;
  background-color: #f8f4ef;
  height: 100vh;
  width: 100vw;
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

function Todo() {
  const [todos, setTodos] = useState([]); // 할 일 목록 상태
  const [currentDate, setCurrentDate] = useState(new Date()); // 현재 날짜 상태

  useEffect(() => {
    const fetchTodos = async () => {
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`; // yyyy-MM-dd 형식으로 변환
  
      const todosData = await getTodos(formattedDate);
      setTodos(todosData.response); // 상태 업데이트
    };
  
    fetchTodos(); // 날짜가 변경될 때마다 데이터 가져오기
  }, [currentDate]); // currentDate가 변경될 때마다 useEffect 실행
  
  // 날짜 변경 함수
  const handlePrevDate = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate); // 새로운 Date 객체 생성
      newDate.setDate(prevDate.getDate() - 1); // 날짜를 1일 이전으로 설정
      return newDate;
    });
  };
  
  const handleNextDate = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate); // 새로운 Date 객체 생성
      newDate.setDate(prevDate.getDate() + 1); // 날짜를 1일 이후로 설정
      return newDate;
    });
  };

  const handleCheckboxChange = async (id) => {
    try {
        // API 호출
        const response = await axiosInstance.post(`/todo/${id}/complete`);
        console.log(response.data); // API 응답 확인

        // 성공적으로 완료되면 상태 업데이트
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.todoId === id && !todo.completed
                    ? { ...todo, completed: true }
                    : todo
            )
        );
    } catch (error) {
        console.error('Failed to complete todo:', error);
    }
  };

  return (
    <Container>
      <Sidebar/>
      <ChecklistContainer>
        <Header>
          <DateButton onClick={handlePrevDate}>&lt;</DateButton> {/* 전날 버튼 */}
          <h2>{`${currentDate.getMonth() + 1}/${currentDate.getDate()}`}</h2> {/* 상태에 저장된 날짜 표시 */}
          <DateButton onClick={handleNextDate}>&gt;</DateButton> {/* 다음 날 버튼 */}
        </Header>

        {todos.map((todo) => (
          <ChecklistItem key={todo.todoId}>
              <Checkbox
                checked={todo.completed}
                onChange={() => handleCheckboxChange(todo.todoId)}
                disabled={todo.completed} // 체크된 항목은 비활성화
              />
              <TodoText checked={todo.completed}>{todo.todoContent}</TodoText>
            </ChecklistItem>
        ))}
      </ChecklistContainer>
    </Container>
  );
}

export default Todo;
