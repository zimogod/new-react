// 负责写redux逻辑的组件
import { connect } from 'react-redux';
import { add,reduce,reducerNumAsync } from '../action/actions';
import Home from '../views/home';
export default connect(
    state=>({num:state.add.num}),
    {add,reduce,reducerNumAsync}
)(Home)