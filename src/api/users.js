import axios from 'axios';
import { API_USERS } from './config';

const getAll = async () => {
    const res = await axios.get(API_USERS);
    return res.data;
};

const create = async (body) => {
    const res = await axios.post(API_USERS, body);
    return res.data;
};

const remove = async (id) => {
    const res = await axios.delete(`${API_USERS}/${id}`);
    return res.data;
};

const update = async (id, body) => {
    const res = await axios.put(`${API_USERS}/${id}`, body);
    return res.data;
};

export {
    getAll, create, remove, update,
};
