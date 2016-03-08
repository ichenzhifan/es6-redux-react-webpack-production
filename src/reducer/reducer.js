import assign from 'object-assign';
import { combineReducers } from 'redux';
import { VisibilityFilters, SET_VISIBILITY_FILTER, ADD_TODO, COMPLETE_TODO } from '../actions/actions';
const { SHOW_ALL } = VisibilityFilters;

// Define a default state object.
const initialState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    todos: []
};

/**
 * 这里的 todos 和 visibilityFilter 的更新看起来是相互独立的。有时 state 
 * 中的字段是相互依赖的，需要认真考虑，但在这个案例中我们可以把 todos 
 * 更新的业务逻辑拆分到一个单独的函数里：
 */
function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [...state, {
                text: action.text,
                completed: false
            }];
            break;
        case COMPLETE_TODO:
            return [...state.slice(0, action.index),
                assign({}, state[action.index], {
                    completed: true
                }),
                ...state.slice(action.index + 1)
            ];
            break;
        default:
            return state;
            break;
    }
}

/**
 * 抽出一个 reducer 来专门管理 visibilityFilter
 */
function visibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}

/**
 * 这里一个技巧是使用 ES6 参数默认值语法 来精简代码。
 */
// function todoApp(state = initialState, action) {
//     // switch (action.type) {
//     //     // 处理 SET_VISIBILITY_FILTER。
//     //     // 需要做的只是改变 state 中的 visibilityFilter
//     //     case SET_VISIBILITY_FILTER:
//     //         return assign({}, state, {
//     //             visibilityFilter: action.filter
//     //         });
//     //         break;
//     //     case ADD_TODO:
//     //         // 新的 todos 对象就相当于旧的 todos 在末尾加上新建的 todo
//     //         return assign({}, state, {
//     //             todos: [...state.todos, {
//     //                 text: action.text,
//     //                 completed: false
//     //             }]
//     //         });
//     //         break;
//     //     case COMPLETE_TODO:
//     //         return assign({}, state, {
//     //             // 因为我们不能直接修改却要更新数组中指定的一项数据，
//     //             // 这里需要先把前面和后面都切开。如果经常需要这类的操作
//     //             // 可以选择使用帮助类 React.addons.update，updeep，
//     //             // 或者使用原生支持深度更新的库 Immutable。
//     //             // 最后，时刻谨记永远不要在克隆 state 前修改它
//     //             todos: [...state.todos.slice(0, action.index),
//     //                 assign({}, state.todos[action.index], {
//     //                     completed: true
//     //                 }),
//     //                 ...state.todos.slice(action.index, 1)
//     //             ]
//     //         });
//     //         break;
//     //     default:
//     //         return state;
//     //         break;
//     // }
//     // 

//     switch (action.type) {
//         // 处理 SET_VISIBILITY_FILTER。
//         // 需要做的只是改变 state 中的 visibilityFilter
//         case SET_VISIBILITY_FILTER:
//             return assign({}, state, {
//                 visibilityFilter: action.filter
//             });
//             break;
//         case ADD_TODO:
//         case COMPLETE_TODO:
//             return assign({}, state, {
//                 todos: todos(state.todos, action)
//             });
//             break;
//         default:
//             return state;
//             break;
//     }

// }

// function todoApp(state = {}, action) {
//     return {
//         visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//         todos: todos(state.todos, action)
//     };
// }
// 

const todoApp = combineReducers({
    visibilityFilter,
    todos
});

export default todoApp;
