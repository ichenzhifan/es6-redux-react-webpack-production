/**
 * 一个 todo 项。
 * 	text: string 显示的文本内容。
 *  completed: boolean todo 项是否显示删除线。
 *  onClick() 当 todo 项被点击时调用的回调函数
 * 
 */
import React, { Component, PropTypes } from 'react';

export default class Todo extends Component {
    render() {
        return (
        	<li onClick = {this.props.onClick}
        		style = {{
        			textDecoration : this.props.completed ? 'line-through' : 'none',
        			cursor: this.props.completed ? 'default' : 'pointer'
        		}}>
        		{this.props.text}
        	</li>
        );
    }
}

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
};
