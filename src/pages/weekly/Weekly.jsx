import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';
import axiosInstance from '../../axios/AxiosInstance';

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 20px;
`;

const CalendarHeader = styled.div`
  background-color: #fffaf0;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CalendarHeaderButton = styled.button`
  background-color: #f8d7da;
  border: none;
  padding: 10px;
  cursor: pointer;
`;

const Days = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Day = styled.div`
  background-color: #ffefd5;
  padding: 15px;
  border-radius: 10px;
  width: 12%;
`;

const DayTitle = styled.h3`
  margin-bottom: 10px;
`;

const DayList = styled.ul`
  list-style: none;
  padding: 0;
`;

const WeeklyGoals = styled.div`
  background-color: #f5f5dc;
  padding: 20px;
  border-radius: 10px;
`;

const WeeklyGoalsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const WeeklyGoalsListItem = styled.li`
  margin: 10px 0;
`;

const AddGoalContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const AddGoalInput = styled.input`
  width: 200px;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 8px;
`;

const AddGoalButton = styled.button`
  background-color: #ff9f43;
  border: none;
  color: white;
  font-size: 14px;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #ff7f00;
  }
`;

function Weekly() {
  const [todos, setTodos] = useState(Array(7).fill([])); // 요일별 할 일 목록 상태
  const [weeklyGoals, setWeeklyGoals] = useState([]); // 주간 목표 상태
  const [currentDate, setCurrentDate] = useState(new Date()); // 현재 날짜 상태
  const [newGoal, setNewGoal] = useState(''); // 새 주간 목표 입력 상태

  useEffect(() => {
    const formatToYYYYMMDD = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const formattedDate = formatToYYYYMMDD(currentDate); // 날짜를 올바르게 포맷

    const fetchTodos = async () => {
      try {
        const response = await axiosInstance.get(`/todo/week/${formattedDate}`);
        const { success, response: todosData } = response.data;

        if (success) {
          const weekTodos = Array(7).fill().map(() => []);
          todosData.forEach(todo => {
            if (todo.week >= 0 && todo.week < 7) { // 유효한 week 값인지 확인
              weekTodos[todo.week].push(todo.todoContent);
            }
          });
          setTodos(weekTodos);
        }
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      }
    };

    const fetchWeeklyGoals = async () => {
      try {
        const response = await axiosInstance.get(`/weekly/${formattedDate}`);
        const { success, response: goalsData } = response.data;

        if (success) {
          setWeeklyGoals(goalsData);
        }
      } catch (error) {
        console.error('Failed to fetch weekly goals:', error);
      }
    };

    fetchTodos();
    fetchWeeklyGoals();
  }, [currentDate]);

  const handleAddGoal = async () => {
    if (newGoal.trim() === '') return; // 빈 문자열이면 아무것도 하지 않음

    try {
      const response = await axiosInstance.post('/weekly/save', { content: newGoal });
      const { success, response: addedGoal } = response.data;

      if (success) {
        setWeeklyGoals((prevGoals) => [...prevGoals, addedGoal.content]);
        setNewGoal(''); // 입력 필드 초기화
      }
    } catch (error) {
      console.error('Failed to save new goal:', error);
    }
  };

  const getWeekDates = () => {
    const today = new Date(currentDate);
    const weekDates = [];
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }

    return weekDates;
  };

  const changeWeek = (direction) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + direction * 7); // 주차 변경
      return newDate;
    });
  };

  const weekDates = getWeekDates();
  const month = currentDate.toLocaleString('default', { month: 'long' });

  const isCurrentWeek = () => {
    const today = new Date();
    const weekDates = getWeekDates();
    return weekDates.some(
      (date) =>
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <Container>
      <Sidebar />
      <Content>
        <CalendarHeader>
          <CalendarHeaderButton onClick={() => changeWeek(-1)}>&lt;</CalendarHeaderButton>
          <h2><b>{month}</b></h2>
          <CalendarHeaderButton onClick={() => changeWeek(1)}>&gt;</CalendarHeaderButton>
        </CalendarHeader>

        <Days>
          {['월', '화', '수', '목', '금', '토', '일'].map((day, index) => (
            <Day key={index}>
              <DayTitle><b>{`${day} ${weekDates[index].getDate()}일`}</b></DayTitle>
              <DayList>
                {todos[index].map((todo, idx) => (
                  <li key={idx}>{todo}</li>
                ))}
              </DayList>
            </Day>
          ))}
        </Days>

        <WeeklyGoals>
          <h3><b>🚀 주간 목표 🚀</b></h3>
          <WeeklyGoalsList>
            {weeklyGoals.map((goal, idx) => (
              <WeeklyGoalsListItem key={idx}>
                <input type="checkbox" /> {goal}
              </WeeklyGoalsListItem>
            ))}
          </WeeklyGoalsList>
            {isCurrentWeek() && (
              <AddGoalContainer>
                <AddGoalInput
                  type="text"
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  placeholder="새 목표를 입력하세요"
                />
                <AddGoalButton onClick={handleAddGoal}>+</AddGoalButton>
              </AddGoalContainer>
            )}
        </WeeklyGoals>
      </Content>
    </Container>
  );
}

export default Weekly;
