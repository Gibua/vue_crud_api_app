<template>
    <div>
        <NewEntryForm @entry-sent="updateChildList"/>     
        <!--<img alt="Vue logo" src="../assets/logo.png">-->
        <MainList ref="list"/> 
        <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    </div> 
</template>

<script>
    //import HelloWorld from './HelloWorld.vue'
    import NewEntryForm from './NewEntryForm.vue';
    import MainList from './MainList.vue';
    //import NavBar from './NavBar.vue'

    export default {
      name: 'HomeApp',
      components: {
        //NavBar,
        NewEntryForm,
        //HelloWorld,
        MainList
      },
      methods: {
        updateChildList () {
            this.$refs.list.updateList();
        }
      }
    }
</script>

<style>
    

    .main-form {
        width: 100%;
    }
</style>
  