import { axiosInstance } from './instance';

// post pdf
export const postFile = async (file: File) => {
  const formData = new FormData();
  formData.append('pdf', file);

  const res = await axiosInstance.post('/api/scenario/upload', formData);

  return res.data.scenario_result;
};
