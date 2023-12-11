import { createStore } from 'vuex'

const store = createStore({
  state: {
    API: 'https://super-todo-ffce3-default-rtdb.firebaseio.com/',
    title: 'To Do List',
    tasks: [],
  },
  getters: {
    getAllTasks(state) {
      return state.tasks
    }
  },
  mutations: {
    updateTasks(state, payload) {
      state.tasks = payload
    }
  },
  actions: {
    async fetchTasks(ctx, endPoint) {
      const res = await fetch(this.state.API + endPoint)
      const data = await res.json()
      ctx.commit('updateTasks', data)
    },
    async deleteTask(ctx, id) {
      const answer = confirm('Are you sure to delete?')
      if (answer) {
        const res = await fetch(this.state.API + 'tasks/' + id + '.json', {
          method: 'DELETE'
        })
        const data = await res.json()
        ctx.commit('updateTasks', data)
      } else {
        alert('You cancelled action!')
      }

    }
  }
})

export default store