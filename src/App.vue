<template>
  <div class="container">
    <h1>{{ $store.state.title }}</h1>

    {{ filteredId }}

    <form @submit.prevent>
      <textarea type="text" :placeholder="plc" v-model.trim="inputValue"></textarea>
      <button v-if="!isEditing" class="btn add" @click="sendData">Add</button>
      <button v-else class="btn edit" @click="saveTask(index)">Save</button>
      <button class="test" @click="getData">TEST</button>
    </form>
    <hr>
    <ul v-if="filteredTaskArray.length">
      <li v-for="(item, index) in filteredTaskArray" :key="item">
        <p>
          {{ index + 1 }}.
          {{ item }}
        </p>

        <div class="btns">
          <button v-if="!isEditing" class="btn del" @click="getTask(index)">Delete</button>
          <button class="btn edit" @click="editTask(item, index)">Edit</button>

          <!-- v-if="!clickedIndex != index" -->
        </div>
      </li>
    </ul>
    <h3 v-else>There are not tasks!</h3>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      API: 'https://super-todo-ffce3-default-rtdb.firebaseio.com/tasks.json',
      title: 'to do list',
      plc: 'Write a task',
      inputValue: '',
      taskArray: [],
      isEditing: false,
      clickedIndex: null,

    }
  },
  computed: {
    ...mapGetters(['getAllTasks']),
    filteredId() {
      return Object.keys(this.getAllTasks)
    },
    filteredTaskArray() {
      return Object.values(this.getAllTasks)
    }
  },
  methods: {
    ...mapActions(['fetchTasks', 'deleteTask']),
    getTask(index) {
      this.filteredId.forEach((element, idIndex) => {
        if (idIndex === index) {
          this.deleteTask(element)
          this.fetchTasks('tasks.json')
        }
      });
    },
    sendData() {
      fetch(this.API, {
        method: "POST",
        body: JSON.stringify(this.inputValue),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      this.fetchTasks('tasks.json')
      // .then(res => {
      //   console.log(res);
      // })
    },
    // addTask() {
    //   if (this.inputValue) {
    //     this.taskArray.unshift(this.inputValue)
    //   }
    //   this.inputValue = ''
    // },
    // deleteTask(taskIndex) {
    //   const answer = confirm('Are you sure to delete?')
    //   if (answer) {
    //     this.taskArray.splice(taskIndex, 1)
    //   } else {
    //     alert('You cancelled action!')
    //   }
    // },
    editTask(taskValue, taskIndex) {
      this.isEditing = true
      this.inputValue = taskValue
      this.clickedIndex = taskIndex
    },
    saveTask() {
      this.taskArray[this.clickedIndex] = this.inputValue
      this.isEditing = !this.isEditing
      this.inputValue = ''
    }
  },
  mounted() {
    this.fetchTasks('tasks.json')
  }
}
</script>

<style>
@import url(./assets/main.css);
</style>