import React from 'react'
import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import { useMutation } from '@tanstack/react-query';

const createUser = async (newUser) => {
    const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        newUser
    );
    return response.data;
};
const fetchUsers = async () => {
    const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
    );

    return response.data;
};

const Reactquerydemo = () => {
    const {
        data,
        isLoading,
        error
    } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers
    });
    const mutation = useMutation({
        mutationFn : createUser,

        onSuccess: (data) => {
            console.log("Success");
            console.log(data);
        },

        onError: (error) => {
            console.log(error);
        }
    });
    if (isLoading)
    {
        return <h2>Loading...</h2> ;
    }
    if (error){
        return <h2>Error Fetching Users</h2> ;
    }

  return (
    <div>
      <h1>React Query Demo</h1>
      {data.map((user) => (
        <div key={user.id}>
            <h3>{user.name}</h3>
            <h3>{user.email}</h3>
        </div>
      ))}
      <button onClick={() => mutation.mutate({
        name:"KAvya",
        email:"Galaxy.kavya@gmail.com"
      })}>Add User</button>
      <p>Pending : {String(mutation.isPending)}</p>
      <p>Success : {String(mutation.isSuccess)}</p>
      <p>Error : {String(mutation.isError)}</p>
    </div>
  );
};

export default Reactquerydemo
