import React from 'react';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';

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

function Weekly() {
  return (
    <Container>
      <Sidebar /> {/* Sidebar는 따로 렌더링 */}
      <Content> {/* Sidebar 옆에 표시될 내용 */}
        <CalendarHeader>
          <CalendarHeaderButton>&lt;</CalendarHeaderButton>
          <h2>7월</h2>
          <CalendarHeaderButton>&gt;</CalendarHeaderButton>
        </CalendarHeader>

        <Days>
          <Day>
            <DayTitle>월 29일</DayTitle>
            <DayList>
              <li>밥먹기</li>
              <li>국먹기</li>
              <li>반찬먹기</li>
              <li>화장실 가기</li>
              <li>설거지 하기</li>
              <li>청소하기</li>
            </DayList>
          </Day>
          <Day>
            <DayTitle>화 30일</DayTitle>
            <DayList>
              <li>이불 정리하기</li>
              <li>아침 먹기</li>
              <li>7시 30분에 출근하기</li>
              <li>발표하기</li>
              <li>빨래하기</li>
              <li>운동하러 가기</li>
            </DayList>
          </Day>
          <Day>
                <DayTitle>수 31일</DayTitle>
            </Day>
            <Day>
                <DayTitle>목 1일</DayTitle>
            </Day>
            <Day>
                <DayTitle>금 2일</DayTitle>
            </Day>
            <Day>
                <DayTitle>토 3일</DayTitle>
            </Day>
            <Day>
                <DayTitle>일 4일</DayTitle>
            </Day>
        </Days>

        <WeeklyGoals>
          <h3>🚀 주간 목표 🚀</h3>
          <WeeklyGoalsList>
            <WeeklyGoalsListItem>
              <input type="checkbox" checked /> 운동 주 3회 이상하기
            </WeeklyGoalsListItem>
            <WeeklyGoalsListItem>
              <input type="checkbox" /> sqld 시험 공부하기
            </WeeklyGoalsListItem>
            <WeeklyGoalsListItem>
              <input type="checkbox" /> jpa 강의 복습하기
            </WeeklyGoalsListItem>
          </WeeklyGoalsList>
        </WeeklyGoals>
      </Content>
    </Container>
  );
}

export default Weekly;
