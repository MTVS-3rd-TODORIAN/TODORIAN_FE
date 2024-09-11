import { useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";

// 컴포넌트에서 logout 호출
const LogoutComponent = () => {
    const navigate = useNavigate();
  
    const handleLogout = () => {
      logout(navigate);
    };
  
    return (
      <button onClick={handleLogout}>로그아웃</button>
    );
  };
  
  export default LogoutComponent;