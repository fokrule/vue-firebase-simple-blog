<template>
  <div id="app">
    <label> Title</label>
    <br>
    <input type="text" v-model="name" style="width:80%;height:40px;border-radious:2px;margin-bottom:20px;">
    <br>
    <label style="margin-top:20px;"> Post Content</label>
    <br>
    <textarea v-model="body" style="width:80%;height:150px;border-radious:2px;margin-top:5px;"></textarea>
    <br>
    <button style="border-radius: 6px;width:40px;height:40px;"  @click="submitName()"><i class="fas fa-save" style="color:green;font-size:30px;"></i></button>

    <div>
      <ul>
        <li v-for="personName of names" v-bind:key="personName['.key']" >
          <div v-if="!personName.edit">
            <h2>{{personName.name}}</h2>
            <p>{{personName.body}}</p>
            <button style="border-radius: 6px;width:40px;height:40px;"  @click="removeName(personName['.key'])"> <i class="fas fa-trash-alt" style="color:red"></i></button>
            <button style="border-radius: 6px;width:40px;height:40px;"  @click="setEditPerson(personName['.key'])"><i class="fas fa-edit" style="color:green"></i></button>
          </div>
          <div v-else>
            <input type="text" v-model="personName.name" style="width:80%;height:40px;border-radious:2px;margin-bottom:20px;">
            <br>
            <textarea name="" id="" cols="30" rows="10" v-model="personName.body"  style="width:80%;height:150px;border-radious:2px;margin-top:5px;"></textarea>
            <br>
            <button  style="border-radius: 6px;width:40px;height:40px;"  @click="updateName(personName)"><i class="fas fa-save" style="color:green;font-size:30px;"></i></button>
            <button  style="border-radius: 6px;width:40px;height:40px;"  @click="cancelUpdate(personName['.key'])"><i class="fas fa-times"></i></button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import { nameRef } from './firebase';

export default {
  name: 'app',
  data () {
    return {
      names: [],
      name: '',
      body: '',
    }
  },

  firebase: {
    names: nameRef
  },

  methods: {
    submitName(){
      nameRef.push({name:this.name,body:this.body, edit:false});
      this.name = '',
      this.body = '',
      alert('Post saved successfully');
    },

    removeName(key){
      nameRef.child(key).remove();
    },

    setEditPerson(key){
      nameRef.child(key).update({edit:true})
    },
    cancelUpdate(key){
      console.log(key);
      nameRef.child(key).update({edit:false});
    },
    updateName(person){
      console.log(person);
      const key = person['.key'];
      nameRef.child(key).set({name:person.name,body:person.body, edit:false})
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
