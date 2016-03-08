/**
 * Footer 一个允许用户改变可见 todo 过滤器的组件。
 * 	filter: string 当前的过滤器为： 'SHOW_ALL'、 'SHOW_COMPLETED' 或 'SHOW_ACTIVE'。
 *  onFilterChange(nextFilter: string)： 当用户选择不同的过滤器时调用的回调函数。
 */
import React, { Component, PropTypes } from 'react';

export default class Footer extends Component {
	renderFilter(filter, name){
		if(filter === this.props.filter){
			return name;
		}

		return (
			<a href='#' onClick={e => {
		        e.preventDefault();
		        this.props.onFilterChange(filter);
		      }}>
		     {name}
	      </a>
		);
	}

	render(){
		return (
			  <p>
		        Show:
		        {' '}
		        {this.renderFilter('SHOW_ALL', 'All')}
		        {', '}
		        {this.renderFilter('SHOW_COMPLETED', 'Completed')}
		        {', '}
		        {this.renderFilter('SHOW_ACTIVE', 'Active')}
		        .
		      </p>
		);
	}
}

Footer.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    filter: PropTypes.oneOf(['SHOW_ALL', 'SHOW_COMPLETED', 'SHOW_ACTIVE']).isRequired
};
