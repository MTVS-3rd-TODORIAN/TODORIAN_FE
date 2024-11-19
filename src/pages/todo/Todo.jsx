import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';
import { getTodos } from '../../api/todo';
import axiosInstance from '../../axios/AxiosInstance';

const Container = styled.div`
  display: flex;
  background-color: #f8f4ef;
  color: #000000;
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

const AddTodoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const AddTodoInput = styled.input`
  width: 300px;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 5px;
  margin-right: 10px;
`;

const AddTodoButton = styled.button`
  background-color: #ff9f43;
  border: none;
  color: white;
  font-size: 18px;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #ff7f00;
  }
`;

function Todo() {
  const [todos, setTodos] = useState([]); // 할 일 목록 상태
  const [currentDate, setCurrentDate] = useState(new Date()); // 현재 날짜 상태
  const [newTodo, setNewTodo] = useState(''); // 새 할 일 입력 상태
  const [showNotification, setShowNotification] = useState(false);

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
  }, [currentDate]);

  const handlePrevDate = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 1);
      return newDate;
    });
  };

  const handleNextDate = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + 1);
      return newDate;
    });
  };

  const handleCheckboxChange = async (id) => {
    const todo = todos.find((t) => t.todoId === id); // 체크하려는 할 일 찾기
    if (todo.completed) {
      // 이미 완료된 경우 아무 작업도 하지 않음
      return;
    }

    try {
      const response = await axiosInstance.post(`/todo/${id}/complete`);
      console.log(response.data); // API 응답 확인

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.todoId === id && !todo.completed
            ? { ...todo, completed: true }
            : todo
        )
      );

        // 알림 표시
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000); // 3초 후 알림 숨김
    } catch (error) {
      console.error('Failed to complete todo:', error);
    }
  };

  const handleAddTodo = async () => {
    if (newTodo.trim() === '') return; // 빈 문자열이면 아무것도 하지 않음
    if (todos.length >= 10) { // 총 갯수 10개 제한
      alert('할 일은 최대 10개까지만 추가할 수 있습니다.');
      return;
    }

    try {
      // 새로운 할 일 추가 API 호출
      const response = await axiosInstance.post('/todo/save', { todoContent: newTodo });
      const addedTodo = response.data.response; // 응답에서 할 일 객체 추출

      // 새로운 할 일을 기존 목록에 추가
      setTodos((prevTodos) => [...prevTodos, addedTodo]);
      setNewTodo(''); // 입력 필드 초기화
    } catch (error) {
      console.error('Failed to save new todo:', error);
    }
  };

  const isToday = currentDate.toDateString() === new Date().toDateString();
  
  return (
    <Container>
      <Sidebar />
      <ChecklistContainer>
        <Header>
          <DateButton onClick={handlePrevDate}>&lt;</DateButton>
          <h2>{`${currentDate.getMonth() + 1}/${currentDate.getDate()}`}</h2>
          <DateButton onClick={handleNextDate}>&gt;</DateButton>
        </Header>
  
        {todos.map((todo) => (
          <ChecklistItem key={todo.todoId}>
            <Checkbox
              checked={todo.completed}
              onChange={() => handleCheckboxChange(todo.todoId)}
              disabled={!isToday} // 오늘 날짜가 아니면 체크박스 비활성화
            />
            <TodoText checked={todo.completed}>{todo.todoContent}</TodoText>
          </ChecklistItem>
        ))}
  
        {isToday && ( // 오늘 날짜일 때만 할 일 추가 필드 렌더링
          <AddTodoContainer>
            <AddTodoInput
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="새 할 일을 입력하세요"
            />
            <AddTodoButton onClick={handleAddTodo}>+</AddTodoButton>
          </AddTodoContainer>
        )}
        {showNotification && (
          <div
            style={{
              position: 'fixed',
              bottom: '20px',
              backgroundColor: '#ffd700',
              padding: '10px',
              borderRadius: '5px',
              fontSize: '16px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            성장 포인트를 획득하였습니다!
          </div>
        )}
      </ChecklistContainer>
    </Container>
  );
}

export default Todo;
