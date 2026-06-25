import axios from "axios";

const api_url = "http://localhost:5000/upload";

export const uploadImage = async (file) => {
  const formData = new FormData();

  formData.append("image", file);

  const response = await axios.post(
    api_url,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};