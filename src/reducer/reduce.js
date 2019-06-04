import { ADD,REDUCE } from '../action/actions';
import { combineReducers } from 'redux';
const initialState = {
    num:100
}
let add = (state=initialState,action)=>{
    switch(action.type){
        case ADD:
        return Object.assign({},state,{num:state.num + action.num});
        case REDUCE:
        return Object.assign({},state,{num:state.num - action.num});
        default:
        return state;
    }
}
// let reduce = (state=initialState,action) =>{
//     switch(action.type){
//         case REDUCE:
//         return Object.assign({},state,{num:state.num - action.num});
//         // 必须返回默认数据，否则页面空白
//         default:
//         return state;
//     }
// }

// 合并reducer纯函数
export const reduces = combineReducers({
    add
})
