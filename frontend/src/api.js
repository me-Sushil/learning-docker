// Automatically uses VITE_API_URL from .env in production
// Falls back to proxy in development
import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL || '/api';

const create = async(user)=>{
const response = await axios.post(`${API_URL}/register`, user)
return response;
}
export default { create };