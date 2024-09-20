import Modal from 'react-modal';
import PropTypes from 'prop-types'; // PropTypes 임포트
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
          width: '300px',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          backgroundColor: '#fff6e6',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <ModalTitle>오류 발생</ModalTitle>
      <ModalMessage>{message}</ModalMessage>
      <ModalButton onClick={onClose}>닫기</ModalButton>
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
