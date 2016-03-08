import {createStore} from 'redux';
import todoApp from '../reducer/reducer';
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions/actions';

// 第二个参数可以设置初始状态。 这对开发同构应用时非常有用，
// 可以用于把服务器端生成的 state 转变后在浏览器端传给应用
let store = createStore(todoApp);

// perform actions.
// print init state
console.log(store.getState());

// listener state updates.
// 注意 subscribe() 返回一个函数用来注销监听器
let unsubscribe = store.subscribe(()=>{
	console.log(store.getState());
});

store.dispatch(addTodo('learn about the actions'));
store.dispatch(addTodo('learn about the reducer'));
store.dispatch(addTodo('learn about the store'));
store.dispatch(completeTodo(0));
store.dispatch(completeTodo(1));
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));

// 停止监听 state 更新
unsubscribe();

