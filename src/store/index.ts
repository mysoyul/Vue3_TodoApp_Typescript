import { createStore, createLogger } from "vuex"
import axios from "axios"

import TodoItem from "@/types/TodoItem";
import http from "@/common/http-common"

export type State = { todoItems: TodoItem[] };

const state: State = { todoItems: [] };

export const store = createStore({
    plugins: process.env.NODE_ENV === 'development' ?
        [createLogger()] : [],
    state,
    actions: {
        loadTodoItems({ commit }) {
            http
                .get('/todos')
                .then(r => r.data)
                .then(items => commit('setTodoItems', items))
                .catch(error => {
                    if (axios.isAxiosError(error)) {
                        console.log(error?.response?.status +
                            ' : ' + error.message)
                    } else {
                        console.error(error);
                    }
                });
        }, //loadTodoItems
        addTodo({ commit }, payload) {
            http
                .post(`/todos`, payload)
                .then(r => r.data)
                .then(items => commit('setTodoItems', items))
                .catch(error => {
                    if (axios.isAxiosError(error)) {
                        console.log(error?.response?.status +
                            ' : ' + error.message)
                    } else {
                        console.error(error);
                    }
                });
        },
    },
    mutations: {
        setTodoItems(state: State, items: TodoItem[]) {
            state.todoItems = items;
        },
        addTodo(state: State, todoItem: string) {
            const obj = { completed: false, item: todoItem };
            localStorage.setItem(todoItem, JSON.stringify(obj));
            state.todoItems.push(obj);
        },
        removeTodo(state, payload) {
            const { todoItem: { item }, index } = payload
            localStorage.removeItem(item);
            state.todoItems.splice(index, 1);
        },
        toggleTodo(state, payload) {
            const { todoItem: { item, completed }, index } = payload
            state.todoItems[index].completed = !completed
            localStorage.removeItem(item);
            localStorage.setItem(item, JSON.stringify(state.todoItems[index]));
        },
        clearTodo(state) {
            localStorage.clear()
            state.todoItems = []
        }
    },


})