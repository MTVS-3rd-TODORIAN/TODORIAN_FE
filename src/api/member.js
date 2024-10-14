import axiosInstance from "../axios/AxiosInstance";

export const getMemberProfile = async () => {
    try {
      const response = await axiosInstance.get('/member/profile'); // axiosInstance 사용
      return response.data;
    } catch (error) {
      console.error('Failed to fetch member profile:', error);
    }
}

// 아이디 받는 로직 추가
export const getMemberId = async () => {
  try {
    const response = await axiosInstance.get('/member/id');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch member id:', error);
  }
}