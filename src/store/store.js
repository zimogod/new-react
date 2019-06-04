import { createStore,applyMiddleware } from 'redux';

import { reduces } from '../reducer/reduce';
// 开发时的调试工具
import { composeWithDevTools } from 'redux-devtools-extension';
// 日志插件  叫做中间件 真正的中间件   applyMiddleware：统称叫做中间件
import thunk from 'redux-thunk';

const store = createStore(reduces,composeWithDevTools(applyMiddleware(thunk)));
// console.log(store)
export default store;
