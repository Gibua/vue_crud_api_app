<template>
    <div>
        <form role="form" @:submit.prevent="onSubmit">  
            <div class="input-group mb-3">
                <input class="form-control" type="text" v-model="entry.nome"     
                    placeholder="Nome" :disabled="isNameDisabled" required>
                <input class="form-control" type="text" v-model="entry.email"    
                    placeholder="E-mail" :disabled="isEmailDisabled" required>
                <input class="form-control" type="tel"  v-model="entry.telefone" 
                    placeholder="Telefone" :disabled="isPhoneDisabled">
                <button class="btn btn-outline-secondary" type="submit" 
                    @click="sendNewEntry"  id="send-butoon" :disabled="isBtnDisabled">
                    Enviar
                </button>
            </div>
        </form>
        <div class="response-container">
            <p v-if="tryCount > 0 && success" class="response-status response-success">SUCESSO!</p>
            <p v-else-if="tryCount > 0 && conflict" class="response-status response-fail">CONFLITO</p>
            <p v-else-if="tryCount > 0 && !success" class="response-status response-fail">Falha...</p>
        </div>
    </div>
    
</template>

<script>
    import apiConnection from '@/apiConnection';

    export default {
        name: 'NewEntryForm',
        components: {
            
        },
        data (){
            return {
                entry: {
                    nome: '',
                    email: '',
                    telefone: ''
                },
                tryCount: 0,
                success: false,
                conflict: false,
                isNameDisabled: false,
                isEmailDisabled: false,
                isPhoneDisabled: false,
                isBtnDisabled: false
            };
        },
        methods: {
            async sendNewEntry(){
                if(!this.entry.nome || !this.entry.email) return;

                this.isBtnDisabled   = true;             
                this.isNameDisabled  = true;
                this.isEmailDisabled = true;
                this.isPhoneDisabled = true;

                const data = this.entry

                try {
                    const res = await apiConnection.create(data);
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
                
                this.entry = {};
                this.tryCount++;
                this.isBtnDisabled   = false;             
                this.isNameDisabled  = false;
                this.isEmailDisabled = false;
                this.isPhoneDisabled = false;
            }
        }
    }
</script>

<style>
    .response-container {
        height: 2em;
    }

    .response-status{
        font-size: 1.4em;
        padding-top: 1%;
        margin: 0;
        line-height: 0;
    }

    .response-fail{
        color: rgb(255, 48, 48);
    }

    .response-success {
        color: rgb(10, 190, 100);
    }
</style>
  