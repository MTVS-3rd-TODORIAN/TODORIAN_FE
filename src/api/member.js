import axiosInstance from "../axios/AxiosInstance";

export const getMemberProfile = async () => {
    try {
      const response = await axiosInstance.get('/member/profile'); // axiosInstance 사용
      return response.data;
    } catch (error) {
      console.error('Failed to fetch member profile:', error);
    }
}