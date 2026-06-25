import axios from "axios";

const api_url = "http://localhost:5000/expenses";
export const getExpenses = async (token) => {
    // console.log("token in getExpenses:", token);  // add this
    const response = await axios.get(api_url,{
        headers: {Authorization: `Bearer ${token}`}
    });
    return response.data;
};
export const createExpense = async ({expense,token}) => {
    console.log(expense,token);
    const response = await axios.post(api_url,expense,{
        headers: {Authorization: `Bearer ${token}`}
    });
    return response.data;
};
export const deleteExpense = async ({id,token}) => {
    const response = await axios.delete(`${api_url}/${id}`,{
        headers: {Authorization: `Bearer ${token}`}
    });
    return response.data;
};
export const updateExpense = async ({id,expense,token}) => {
    const response = await axios.put(`${api_url}/${id}`,expense,{
        headers: {Authorization: `Bearer ${token}`}
    });
    return response.data;
};
