import axiosInstance from "../axios/AxiosInstance";
import { getMemberId } from "./member"; // getMemberId 함수 가져오기
import { createCoinFindResponseDto } from "../dto/CoinFindResponseDto";

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

export const updateCoinAmount = async (coinData) => {
    try {
        const response = await axiosInstance.post('/coins', coinData);
        return response.data;
    } catch (error) {
        console.error('Failed to update coin amount:', error);
        throw error; // 오류를 상위로 전달
    }
};

export const getCoinListByMemberId = async (memberId) => {
    try {
        const response = await axiosInstance.get(`/coins?memberId=${memberId}`); // API 호출

        // 응답 데이터를 DTO 형태로 변환
        const coinDTOs = response.data.map(createCoinFindResponseDto);

        return coinDTOs; // 변환된 DTO 반환
    } catch (error) {
        console.error('Error fetching coin list:', error); // 에러 처리
        throw error; // 에러를 호출자에게 전달
    }
};