import { GetAxiosInstance } from "../axios/AxiosMethod";
import { PutAxiosInstance } from "../axios/AxiosMethod";

export const getPointPolicy = async () => {
    try {
        const res = await GetAxiosInstance('/admin/points');
        return res.data.response.pointDTOList; // API 응답 데이터에서 필요한 부분만 반환
    } catch (error) {
        console.error('Failed to fetch point policies:', error);
        throw error; // 에러를 호출한 쪽에서 처리할 수 있도록 던짐
    }
};

export const updatePointRatio = async (payload) => {
    try {
        const formattedPayload = { ...payload, todoPointType: payload.todoPointType.toLowerCase() }
        const res = await PutAxiosInstance('/admin/todo-point', formattedPayload);
        return res.data; // 서버 응답 반환
    } catch (error) {
        console.error('Error updating ratio:', error);
        throw error; // 에러를 호출한 쪽에서 처리할 수 있도록 던짐
    }
};
