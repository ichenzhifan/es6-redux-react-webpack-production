/*
	1. usage of componment.
*/
// import Button from './components/Button';

// const button = new Button('http://www.google.com');
// button.render('a');

import './styles.scss';

/**
	2. split code
*/
// Only want our Button componment when we have a link on the page.
if (document.querySelectorAll('a').length) {
	// ensure:
	//  first param: dependencies
	//  second param: function
	//  third param: chunk name.
    require.ensure([], () => {
        const components = require('./components/Button/Button');
        const button = new components.default('http://www.google.com');

        button.render('a');
    }, 'button');
}

// If we have a title, render the header componment on it.
if(document.querySelectorAll('h1').length){
	require.ensure([], ()=>{
		const components = require('./components/Header/Header');
		const header = new components.default();

		header.render('h1');

	}, 'header');
}

// require.ensure([], ()=>{
// 	const store = require('./store/store');
// }, 'store');

// /**
//  * Render 'App' component.
//  */
// require.ensure([], ()=>{
// 	const React = require('react');
//     const ReactDOM = require('react-dom');
// 	const App = require('./components/redux/App').default;

// 	ReactDOM.render(<App/>, document.getElementById('root'));
// }, 'app');
// 

/**
 * 连接到 Redux
 * 将 App 组件连接到 Redux 并且让它能够 dispatch actions 以及从 Redux store 读取到 state。
 *
 * 首先，我们需要获取从之前安装好的 react-redux 提供的 Provider，
 * 并且在渲染之前将根组件包装进 <Provider>
 */
require.ensure([], ()=>{
	const React = require('react');
    const ReactDOM = require('react-dom');
    const createStore = require('redux').createStore;
    const Provider = require('react-redux').Provider;
    
    const App = require('./components/redux/App').default;
    const todoApp = require('./reducer/reducer').default;
   
    let store = createStore(todoApp);
    let rootEle = document.getElementById('root');

    ReactDOM.render(<Provider store={store}>
    		<App />
    	</Provider>, rootEle);
}, 'app');
