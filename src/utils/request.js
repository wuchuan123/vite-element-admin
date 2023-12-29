// token的消息头
import axios from 'axios';
import { getTokenFromCookie, clearAllCoolies } from '@/utils/cookie-utils';
import { localClear } from '@/utils/local-utils';
import { ElMessage } from 'element-plus';

const TOKEN_HEADER = 'x-access-token';

// 创建axios对象
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
});

// ================================= 请求拦截器 =================================

service.interceptors.request.use(
  (config) => {
    // 在发送请求之前消息头加入token token
    const token = getTokenFromCookie();
    if (token) {
      config.headers[TOKEN_HEADER] = token;
    } else {
      delete config.headers[TOKEN_HEADER];
    }
    return config;
  },
  // 对请求错误做些什么
  (error) => Promise.reject(error),
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const res = response.data;
    if (res.code && res.code !== 1) {
      // `token` 过期或者账号已在别处登录
      if (res.code === 30007 || res.code === 30008) {
        ElMessage.error('您没有登录，请重新登录');
        clearAllCoolies();
        localClear();
        // 跳转到登录页面，直接使用页面刷新的策略
        setTimeout(() => {
          window.location.href = '/';
        }, 300);
        return Promise.reject(response);
      }
      ElMessage.error(res.msg);
      return Promise.reject(response);
    }
    return Promise.resolve(res);
  },
  (error) => {
    // 对响应错误做点什么
    if (error.message.indexOf('timeout') !== -1) {
      ElMessage.error('网络超时');
    } else if (error.message === 'Network Error') {
      ElMessage.error('网络连接错误');
    } else if (error.message.indexOf('Request') !== -1) {
      ElMessage.error('网络发生错误');
    }
    return Promise.reject(error);
  },
);

/**
 * 通用请求封装
 * @param config
 */
export const request = (config) => service.request(config);
/**
 * post请求
 */
export const postRequest = (url, data) => request({ data, url, method: 'post' });

/**
 * get请求
 */
export const getRequest = (url, params) => request({ url, method: 'get', params });
