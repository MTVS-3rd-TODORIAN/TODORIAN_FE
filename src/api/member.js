import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

export const getMemberProfile = async () => {
    try {
      const response = await axios.get(`${baseURL}/member/profile`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch member profile:', error);
    }
}