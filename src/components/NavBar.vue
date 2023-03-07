

<template>
    <nav class="navbar navbar-dark bg-vue navbar-not-pad">
        <a href="/" @click="disableLink" :class="btnDisabledClasses">PESSOAL</a>
    </nav>
    
</template>
  
<script>  
  import { useRoute } from 'vue-router';
  export default {
    name: 'NavBar',
    components: {
      
    },
    data() {
      return {

      }
    },
    methods: {
        disableLink (event) {
            if (this.isBtnDisabled) event.preventDefault();
        }
    },
    computed: {
        isBtnDisabled (){
            if (useRoute().name === 'lista'){
                return true;
            } else {
                return false;
            }
        },
        btnDisabledClasses() {
            return this.isBtnDisabled ?  "btn-square disabled" : "btn-square";
        }
    }
  }
</script>
  
<style>

    .bg-vue {
        background-color: #35495e !important;
    }

    .navbar.navbar-not-pad {
        padding: 0;
    }

    .btn-square {
        background-color: var(--bs-primary);
        text-decoration: inherit;
        border: none;
        font-size: 1.5em;
        line-height: 55px;
        padding: 0 16px;
        color: aliceblue;
    }

    .btn-square:hover {
        color: #35495e;
    }

    .disabled {
        cursor: auto;
        color: aliceblue;
    }

    .disabled:hover {
        color: aliceblue;
    }
</style>
  