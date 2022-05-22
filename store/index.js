export const state = () => ({
  todos: ['item1', 'item2', 'item3']
})

export const mutations = {
  setTodos(state, todos = state.todos) {
    state.todos = todos
  },
  addTodo(state, todo = null) {
    if (todo) {
      state.todos.push(todo)
    }
  },
  updateTodo(state, { oldTodo = null, renewTodo = null }) {
    if (oldTodo && renewTodo) {
      const number = state.todos.indexOf(oldTodo)
      if (number !== -1) {
        state.todos.splice(number, 1, renewTodo)
      }
    }
  },
  deleteTodo(state, doneTodo = null) {
    const number = state.todos.indexOf(doneTodo)
    if (number !== -1) {
      state.todos.splice(number, 1)
    }
  }
}

export const actions = {}
export const getters = {
  todos: (state) => state.todos
}
