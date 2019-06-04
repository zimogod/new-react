import http from './http';
// 集中管理所有的请求接口
// 1、首页请求
export function getData(){
    return http.get('/allData')
}
export function pageNum(page){
    return http.post(`/page?page=${page}`)
}
export function getUserInfo(params){
    return http.post('/manage/user/login.do',params)
}

// 2、详情页请求