/**
 * 我们想要通过 react-redux 提供的 connect() 方法将包装好的组件连接到Redux。尽量只做一个顶层的组件，
 * 或者 route 处理。从技术上来说你可以将应用中的任何一个组件 connect() 到 Redux store 中，
 * 但尽量避免这么做，因为这个数据流很难追踪。
 * 任何一个从 connect() 包装好的组件都可以得到一个 dispatch 方法作为组件的 props，以及得到全局 state 
 * 中所需的任何内容。 connect() 的唯一参数是 selector。此方法可以从 Redux store 接收到全局的 state，
 * 然后返回组件中需要的 props。最简单的情况下，可以返回一个初始的 state （例如，返回认证方法），
 * 但最好先将其进行转化。
 * 为了使组合 selectors 更有效率，不妨看看 reselect。在这个例子中我们不会用到它，但它适合更大的应用
 */
import React, {Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../../actions/actions';

import AddTodo from './AddTodo';
import TodoList from './TodoList';
import Footer from './Footer';

// export default class App extends Component{
// 	render(){
// 		// 通过调用 connect() 注入:
// 		const {dispatch} = this.props;

// 		let todos = [{
// 	            text: 'Use Redux',
// 	            completed: true
// 	          }, {
// 	            text: 'Learn to connect it to React',
// 	            completed: false
// 	          }];

// 		return (<div>						
// 			<AddTodo onAddClick={text=>{
// 				console.log('add todo', text);
// 			}}/>
// 			<TodoList
// 	          todos={todos}
// 	          onTodoClick={todo =>
// 	            console.log('todo clicked', todo)
// 	          } />
// 			<Footer filter='SHOW_ALL'
// 				onFilterChange={filter=>{
// 				console.log('filter change', filter);
// 			}}/>
// 		</div>);
// 	}
// }

class App extends Component{
	render(){
		// 通过调用 connect() 注入:
		const {dispatch, visibleTodos, visibilityFilter} = this.props;		

		return (<div>						
			<AddTodo onAddClick={text=>{
				dispatch(addTodo(text));
			}}/>
			<TodoList
	          todos={this.props.visibleTodos}
	          onTodoClick={index => dispatch(completeTodo(index))} />
			<Footer filter={this.props.visibilityFilter}
				onFilterChange={filter=> dispatch(setVisibilityFilter(filter))}/>
		</div>);
	}
}

App.propTypes = {
	visibleTodos: PropTypes.arrayOf(PropTypes.shape({
		text: PropTypes.string.isRequired,
		completed: PropTypes.bool.isRequired
	})),
	visibilityFilter: PropTypes.oneOf(['SHOW_ALL',
	    'SHOW_COMPLETED',
	    'SHOW_ACTIVE']).isRequired
};

function selectTodos (todos, filter) {
	 switch (filter) {
	 	case VisibilityFilters.SHOW_ALL:
	 		return todos;
	 	case VisibilityFilters.SHOW_COMPLETED:
	 		return todos.filter(todo => todo.completed);
	 	case VisibilityFilters.SHOW_ACTIVE:
	 		return todos.filter(todo => !todo.completed);
	 	default:
	 		return [];
	 }
}

/**
 * 基于全局 state ，哪些是我们想注入的 props ?
 * 注意：使用 https://github.com/faassen/reselect 效果更佳。
 */
function select (state) {
	 return{
	 	visibleTodos: selectTodos(state.todos, state.visibilityFilter),
	 	visibilityFilter: state.visibilityFilter
	 };
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中
export default connect(select)(App);