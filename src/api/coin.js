import axiosInstance from "../axios/AxiosInstance";
import { getMemberId } from "./member"; // getMemberProfile 함수 가져오기

// 해당 사용자가 가지고 있는 코인의 총량을 반환하는 메서드
export const getTotalCoinAmountOfMember = async () => {
    try {
        const memberId = await getMemberId(); // 여기까지는 잘 된 것 확인했음
        const response = await axiosInstance.get(`/coins/${memberId}/totalCoinAmount`); // API 호출
        return response.data; // 총 코인 수량 반환
    } catch (error) {
        console.error('Failed to fetch total coin amount:', error);
    }
}