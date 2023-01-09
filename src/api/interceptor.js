import axios from "axios";
import { ElMessage } from 'element-plus';

axios.interceptors.response.use(
    (response) => {
        const data = response.data;
        if(data.code !== 200) {
            ElMessage.error(data.message);
            return Promise.reject(data);
        }
        return data;
    }
)