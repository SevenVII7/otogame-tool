<template>
  <div class="about">
    <h3>This is an about page</h3>
    <input type="text" placeholder="name" v-model="name">
    <input type="text" placeholder="age" v-model="age">
    <input type="text" placeholder="email" v-model="email">
    <input type="text" placeholder="department" v-model="deparment">
    <button @click="submit">submit</button>
    <hr>
    <input type="text" placeholder="id" v-model="id">
    <input type="text" placeholder="age" v-model="age">
    <button @click="update">update</button>
    <hr>
    <input type="text" placeholder="id" v-model="id">
    <button @click="deleteDB">delete</button>
  </div>
</template>
<script setup>
  /* eslint-disable  no-unused-vars */
  import { ref } from "vue";
  import axios from "axios";

  const id = ref();
  const name = ref();
  const age = ref();
  const email = ref();
  const deparment = ref();
  async function submit(){
    await axios.post('http://localhost:3000/students', {
      name: name.value, age: age.value, email: email.value, deparment: deparment.value
    })
        .then((response) => {
          console.log(response)
        })
        .catch((err)=>{
          console.log(err)
        });
  }
  async function update(){
    await axios.patch('http://localhost:3000/students', {
      id: id.value, age: age.value
    })
        .then((response) => {
          console.log(response)
        })
        .catch((err)=>{
          console.log(err)
        });
  }
  async function deleteDB(){
    await axios.delete('http://localhost:3000/students', {
      data: {
        id: id.value
      }
    })
        .then((response) => {
          console.log(response)
        })
        .catch((err)=>{
          console.log(err)
        });
  }
</script>
