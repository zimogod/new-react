import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router,BrowserRouter,Link,Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Home from './views-redux/home';
import * as serviceWorker from './serviceWorker';
import 'element-theme-default';

const renders = () =>{
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <Route path='/' exact component={Home} />            
            </BrowserRouter>
        </Provider>, 
        document.getElementById('root')
    );
}
renders();
store.subscribe(renders);
serviceWorker.unregister();
