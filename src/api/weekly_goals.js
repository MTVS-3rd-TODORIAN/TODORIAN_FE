import axiosInstance from "../axios/AxiosInstance"

export const getWeeklyGoals = async (date) => {
    try{
        console.log('getWeeklyGoals 메소드 실행')
        let formattedDate;
        if (!date) {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');

            formattedDate = `${year}-${month}-${day}`;
        } else {
            formattedDate = date; // 파라미터로 받은 날짜 사용
        }

        const response = await axiosInstance.get(`/weekly/${formattedDate}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch weeklyGoals:', error);
    }
}