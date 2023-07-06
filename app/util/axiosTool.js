const axios = require('axios');
class AxiosTool {
    constructor(baseURL) {
        this.axiosInstance = axios.create({
            baseURL: baseURL,
            timeout: 30000 // 请求超时时间
        });
    }

    /**
     * 发送get请求
     * @param {*} url 请求的url地址
     * @param {*} params 请求的参数
     */
    async get(url, params = {}) {
        try {
            const response = await this.axiosInstance.get(url, { params });
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    /**
     * 发送post请求
     * @param {*} url 请求的url地址
     * @param {*} data 请求的参数
     */
    async post(url, data = {}) {
        try {
            const response = await this.axiosInstance.post(url, data);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    /**
     * 发送put请求
     * @param {*} url 请求的url地址
     * @param {*} data 请求的参数
     */
    async put(url, data = {}) {
        try {
            const response = await this.axiosInstance.put(url, data);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    /**
     * 发送delete请求
     * @param {*} url 请求的url地址
     */
    async delete(url) {
        try {
            const response = await this.axiosInstance.delete(url);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

module.exports = AxiosTool;
