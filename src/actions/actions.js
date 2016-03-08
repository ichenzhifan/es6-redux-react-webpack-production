/**
 * type of actions
 */
export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};

/**
 * Action method for creating todo item.
 * @param {string} text The description of todo item.
 * @return {object} The action payload.
 */
export function addTodo(text) {
    return {
        type: ADD_TODO,
        text
    };
}

/**
 * Action method for completed todo item.
 * @param  {int} index The index of todo item.
 * @return {object} The action payload.
 */
export function completeTodo(index) {
    return {
        type: COMPLETE_TODO,
        index
    };
}

/**
 * Action method for set visibility for todo item.
 * @param {string} filter The filter condition.
 * @return {object} The action payload.
 */
export function setVisibilityFilter(filter) {
    return {
        type: SET_VISIBILITY_FILTER,
        filter
    };
}
