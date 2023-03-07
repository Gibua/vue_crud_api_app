<template>
    <div class="main-card">
        <div v-if="!found">
            <p error-text>Falha ao buscar recurso</p>
            <button type="button" @click="goBack" class="btn btn-outline-secondary send-btn" id="back-btn">Voltar</button>
        </div>
        <form class="edit-form" role="form" @:submit.prevent="onSubmit" v-else>
            <p style="font-weight: bold">ID: {{this.$route.params.id}}</p>
            <div class="form-group row mb-2">
              <label for="inputName" class="col-sm-2 col-form-label">Nome</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="inputName" v-model="newEntry.nome" :disabled="isNameDisabled" required>
                </div>
            </div>
            <div class="form-group row mb-2">
              <label for="inputEmail" class="col-sm-2 col-form-label">E-mail</label>
                <div class="col-sm-10">
                    <input type="email" class="form-control" id="inputEmail" v-model="newEntry.email" :disabled="isEmailDisabled" required>
                </div>
            </div>
            <div class="form-group row mb-2">
                <label for="inputPhone" class="col-sm-2 col-form-label">Telefone</label>
                <div class="col-sm-10">
                  <input type="tel" class="form-control" v-model="newEntry.telefone" id="inputPhone" :disabled="isPhoneDisabled">
                </div>
            </div>
            <div class="response-container">
                <p v-if="tryCount > 0 && success" class="response-status response-success">SUCESSO!</p>
                <p v-else-if="tryCount > 0 && conflict" class="response-status response-fail">CONFLITO</p>
                <p v-else-if="tryCount > 0 && !success" class="response-status response-fail">Falha...</p>
            </div>
            <div class="form-group row">
              <div class="col-sm">
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" @click="goBack" class="btn btn-outline-secondary send-btn" id="back-btn" :disabled="isBtnDisabled">Voltar</button>
                        <button type="submit" @click="sendEdit" class="btn btn-outline-secondary" id="send-btn" :disabled="isBtnDisabled">Enviar</button>
                    </div>
              </div>
            </div>
        </form>
    </div>
    
</template>

<script>
    import apiConnection from '@/apiConnection';

    export default {
        name: 'MainList',
        components: {
            
        },
        data (){
            return {
                entry: {},
                newEntry: {},
                tryCount: 0,
                found: true,
                success: false,
                conflict: false,
                isNameDisabled: false,
                isEmailDisabled: false,
                isPhoneDisabled: false,
                isBtnsDisabled: false
            };
        },
        methods: {
            async retrieveEntry() {
                try{
                    const res = await apiConnection.fetch(this.$route.params.id);
                    console.log(res);
                    this.entry = res.data;
                    this.newEntry = this.entry;
                    this.success = true;
                } catch (err) {
                    if (err.response){
                        console.log(err.response);
                        this.found = false;
                    }
                    this.success = false;
                }
            },
            goBack() {
                this.$router.push('/');
            },
            async sendEdit(){
                if(!this.entry.nome || !this.entry.email) return;

                this.isBtnDisabled   = true;             
                this.isNameDisabled  = true;
                this.isEmailDisabled = true;
                this.isPhoneDisabled = true;

                const data = this.entry

                try {
                    const res = await apiConnection.update(this.$route.params.id, data);
                    this.conflict = false;
                    this.success = true;
                    this.$emit('entrySent');
                    console.log(res);
                } catch (err) {
                    if (err.response){
                        console.log(err.response);
                        if(err.response.status === 409) this.conflict = true;
                    }
                    
                    this.success = false;
                }

                this.tryCount++;
                this.isBtnDisabled   = false;             
                this.isNameDisabled  = false;
                this.isEmailDisabled = false;
                this.isPhoneDisabled = false;
            }
        },
        mounted() {
            this.retrieveEntry();
        }
    }
</script>

<style>
    .response-container {
        height: 2em;
    }

    .response-status{
        font-size: 1.4em;
        padding: 15px 0; 
        margin: 0;
        line-height: 0;
    }

    .response-fail{
        color: rgb(255, 48, 48);
    }

    .response-success {
        color: rgb(10, 190, 100);
    }

    .main-card {
        border-radius: 10px;
        overflow: hidden;
        min-height: 500px;
        box-shadow: 3px 3px 6px 1px #aaaaaa94;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .list-container {
        border-radius: 10px;
        padding: 10px;
    }

    .edit-form {
        width: 80%;
    }

    #back-btn, #send-btn {
        border-color: var(--bs-secondary);
        color: var(--bs-secondary);
    }

    #back-btn:hover {
        background-color: transparent;
        border-color: rgb(228, 28, 28);
        color: rgb(228, 28, 28);
    }

    #send-btn:hover {
        background-color: transparent;
        border-color: var(--bs-primary);
        color: var(--bs-primary);
    }
</style>
  