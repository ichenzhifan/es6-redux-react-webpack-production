/**
 * AddTodo 输入字段的输入框和按钮。
 * 	onAddClick(text: string) 当按钮被点击时调用的回调函数。
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';

export default class AddTodo extends Component {
    render() {
        return ( 
        	< div >
	            < input type = 'text' ref = 'input' / >
	            < button onClick = { e => this.handleClick(e) } >
	            	Add 
	            < /button>
	        < /div>
        );
    }

    handleClick(e) {
        const node = findDOMNode(this.refs.input);
        const text = node.value.trim();
        if(!text){
            return;
        }
        this.props.onAddClick(text);
        node.value = '';
    }
}

AddTodo.propTypes = {
    onAddClick: PropTypes.func.isRequired
};
