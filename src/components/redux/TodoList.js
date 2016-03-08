/**
 * TodoList 用于显示 todos 列表。
 *  todos: Array 以 { text, completed } 形式显示的 todo 项数组。
 *  onTodoClick(index: number) 当 todo 项被点击时调用的回调函数。
 */
import React, { Component, PropTypes } from 'react';
import Todo from './Todo';

export default class TodoList extends Component {
	render(){
		  let _todos = [];
	      let allTodos = this.props.todos;
	      allTodos.forEach((todo, index) =>{
	      	 _todos.push(<Todo {...todo} 
						key = {index}
						onClick = {()=> {this.props.onTodoClick(index)}} />);
	      });

		return (
			<ul>
				{_todos}
			</ul>
		);
	}
}

TodoList.propTypes = {
    onTodoClick: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired
};
