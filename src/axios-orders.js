import axios from "axios";

const instance = axios.create({
    baseURL: 'https://react-burger-project-e24a3-default-rtdb.firebaseio.com/'
});

export default instance;