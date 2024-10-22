import axiosInstance from "../axios/AxiosInstance"

export const getTodos = async (date) => {
    try{
        console.log('getTodos 메소드 실행')
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

        const response = await axiosInstance.get(`/todo/${formattedDate}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch todos:', error);
    }
}