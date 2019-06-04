// axios封装
    // 为什么要进行封装？ 
    // axios的默认请求是get请求，没有post请求，也没有头部需要的请求信息，
    //     也没有网页超时时间设置
    // 步骤：有三步或者是两步
    // 1、封装公共的部分
    // 2、请求拦截
    // 3、响应拦截

import http from 'axios';
// qs是axios内置的安装包  是进行数据转换的模块  JSON.stringify() JSON.parse()  
import qs from 'qs';

// 公共部分
http.defaults.baseURL = 'http://localhost:3001/';

// 每次请求都要携带自定义头部信息
// http.defaults.headers.common['token'] = 'kghffhsujfflflidifhfgdndbf5555fjfhfh';
// 单独配置某一种请求头部信息
// http.defaults.headers.post['Content-type'] = 'application/x-www-form-urlencoded;charset=utf-8';

http.defaults.timeout = 5000;
// 请求拦截
http.interceptors.request.use(config=>{
    if(config.method == 'get' || config.method == 'put'){
        config.headers = {
            "Content-type":"application/json;charset=utf8"
        }
        config.data = qs.stringify(config.data)
    }else if(config.method == 'post'|| config.method == 'delete'){
        config.headers = {
            "token":"hfhfsdfshdfhhdskfdsklfhkdsdhfksjdfsdklfsdkldf",
            "Content-type":"application/x-www-form-urlencoded;charset=utf-8"
        }
        config.data = qs.stringify(config.data)
    }
    return config;
},error=>{
    // 此处是请求时 失败的错误  前端的错误
    const err = Promise.reject(error);
    throw err;
});
// 响应拦截
http.interceptors.response.use(
response=>{
    if(response.data.status == 200){
        console.log('请求成功！')
    }
    return response;
},err=>{
    // 此处是处理后台的错误  暴露后台的错误到控制台
    const errs = Promise.reject(err);
    throw errs;
});

// 封装所有的请求方法
export function getPageData(page){
    return http.get(`page?page=${page}`)
}

export default http;














// 封装步骤
//     1、公共部分
//     2、请求拦截  向后台进行请求的  配置请求头部  
//                 是否跨域 是否携带cookie进行跨域 
//                 网页的超时时间
//                 headers配置  'Content-type'
//                 本地服务器 地址   线上服务器地址
//     3、响应拦截
//                 获取到后台的数据  进行一些处理 
//                 可以进行报错处理  

// import http from 'axios';
// 将数据转换为需要的数据
// import qs from 'qs';
// JSON.parse()
// JSON.stringify()
// 1、公共请求头
// 公共地址
// http.defaults.baseURL = 'http://localhost:3000/';
// 允许携带cookie跨域   默认是false
// http.defaults.withCredentials = true;
// 配置网页超时时间
// http.defaults.timeout = 5000;
//设置通用的请求头部
// http.defaults.headers.common['Authorization'] = '12345698745236987412';
// 设置单个post请求的header
// http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

// 2、请求拦截
// http.interceptors.request.use(config => {
//     if (config.method == 'get' || config.method == 'delete' || config.method == 'put') {
//         config.headers = {
//             // 'X-Requested-With':'XMLHttpRequest',
//             'Content-Type': 'application/json;charset=utf8',
//         }
//         config.data = qs.stringify(config.data);
//     } else if (config.method == 'post') {
//         config.headers = {
//             'Content-Type': 'application/x-www-form-urlencoded;charset=utf8',
//             'Authorization':'12345698745236987412'
//         }
//         config.data = qs.stringify(config.data);
//     }
//     console.log(config)
//     return config;
// },
//     // 请求时的错误
//     error => {
//         // switch(error.errorCode){
//         //     case '10000':
//         //     throw Promise.reject('地址错误')
//         //     case '10001':
//         //     throw Promise.reject('请求方式错误')
//         // }
//         return Promise.reject(error)
//     }
// );

// // 3、响应拦截
// http.interceptors.response.use(
//     response => {
//         if (response.data.status == 200) {
//             // this.$router.push({
//             //     path:'/admin'
//             // });
//             console.log('我是响应拦截器');
//         }
//         return response;
//     },
//     // 后台响应的错误
//     error => {

//         const err = Promise.reject(error);
//         throw Error(err);
//     }
// )
// export default http;







// import axios from 'axios'
// // import router from "../router";
// import Vue from 'vue'
// // 加密方式   MD5加密  
// let Base64 = require('js-base64').Base64;
// let vm = new Vue();
// axios.defaults.timeout = 5000;
// // axios.defaults.baseURL=process.env.baseUrl;
// axios.defaults.baseURL = "/api";
// //设置公共请求头
// axios.defaults.headers = {
//     // 标识当前的请求时ajax异步请求
//     "X-Requested-With": "XMLHttpRequest",
//     "FrontBackSepration": true,
//     "Content-Type": "application/json"
// };

// //HTTP request拦截器
// axios.interceptors.request.use(
//     config => {
//         // console.log("这是请求拦截器");
//         // vm.$Message.success({
//         // content: 'success',
//         // duration: 5,
//         // });
//         return config
//     },
//     error => {
//         // vm.$Message.error({
//         // content:'网络请求失败！请检查您的网络设置！',
//         // duration:5
//         // });
//         console.log(error)
//         return Promise.reject(error);
//     }
// );

// //HTTP response拦截器
// axios.interceptors.response.use(
//     response => {
//         // console.log("这是响应拦截器");
//         // console.log(response.status);
//         // console.log(response);
//         if (response.status == 200 && response.data.code == "0000") {
//             // router.push({
//             // path:'/login',
//             // query:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
//             // })
//             // 保存用户信息
//             sessionStorage.setItem('user', JSON.stringify(response.data.data));
//         }
//         return response
//     },
//     error => {
//         vm.$Message.error({
//             content: '登录失败！',
//             duration: 5
//         })
//         console.log("响应拦截器报错")
//         // console.dir(error)
//         if (error.response.status == 401 && error.response.data.code == 'nosso') {
//             window.location.href = '/api/redirect/to/frontend?page=' + Base64.encode(window.location.href)
//         }
//         return Promise.reject(error);
//     }
// );

// /**
// * 封装请求方法
// *@params(url)
// * @params(data)
// * returns { Promise }
// * get请求类型可省略
// */
// export default function http(url, data = {}, type = 'get', header = {}) {
//     type = type.toLowerCase();
//     let promise;
//     return new Promise((resolve, reject) => {
//         if (type == 'post') {
//             promise = axios.post(url, data, { headers: header })

//         } else if (type == 'put') {
//             promise = axios.put(url, data, { headers: header })
//         } else if (type == 'delete') {
//             promise = axios.delete(url, { params: data, headers: header })
//         } else {
//             promise = axios.get(url, { params: data, headers: header })
//         }
//         promise.then(response => {
//             // console.log(response.data)
//             resolve(response.data);
//         })
//             .catch(error => {
//                 console.log("出错了")
//                 // console.log(error)
//                 reject(response.data);
//             })























