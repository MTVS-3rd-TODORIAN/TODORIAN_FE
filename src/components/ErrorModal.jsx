import Modal from 'react-modal';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ErrorModal = ({ isOpen, onClose, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Error Message"
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          backgroundColor: '#fff6e6',
          width: 'auto', // 너비를 자동으로 설정
          height: 'auto', // 높이를 자동으로 설정
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <ModalContent>
        <ModalTitle>오류 발생</ModalTitle>
        <ModalMessage>{message}</ModalMessage>
        <ModalButton onClick={onClose}>닫기</ModalButton>
      </ModalContent>
    </Modal>
  );
};

// PropTypes 사용하여 props 타입 지정
ErrorModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default ErrorModal;

// 스타일 정의
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 중앙 정렬 */
  text-align: center;  /* 텍스트 중앙 정렬 */
  width: auto; /* 내용에 맞게 자동으로 크기 조정 */
  height: auto; /* 내용에 맞게 자동으로 크기 조정 */
`;

const ModalTitle = styled.h2`
  color: #d32f2f;
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const ModalMessage = styled.p`
  font-size: 1rem;
  margin-bottom: 20px;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  background-color: #ffd233;
  color: black;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #fbc02d;
  }
`;
