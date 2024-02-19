import axios from 'axios';
import router from '@/router/index';


const instance = axios.create({
  timeout: 10000,
  withCredentials: true,
});

// 添加请求拦截器
instance.interceptors.request.use(
	
  config => {
    // 在请求中添加 Token 和其他公共参数
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.token = ` ${token}`;
    }
    config.params = {
      ...config.params
    };
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    // 对于 HTTP 状态码非 200 的响应，将错误信息以 Promise.reject 的形式返回
    if (response.status !== 200) {
      return Promise.reject(response.data);
    }
    return response.data;
  },
  error => {
    // 对于 401 错误，自动跳转到登录页面
    if (error.response && error.response.status === 401) {
      router.push('/login');
    }
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;