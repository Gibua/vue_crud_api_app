<template>
    <div class="list-container">
        <i class="bi bi-arrow-clockwise reload-icon" @click="updateList"></i>
        <div v-for="entry in list" :key="entry.id">
                <table class="entry-table">
                    <tr>
                        <td rowspan="3" class="table-id">{{entry.id}}</td>
                        <th colspan="2">{{entry.nome}}</th>
                        <td class="entry-button" rowspan="3">
                            <i class="bi bi-pencil-fill edit" @click="editEntry(entry)"></i>
                        </td>
                        <td class="entry-button" rowspan="3">
                            <i class="bi bi-trash3-fill icon-red delete" @click="deleteEntry(entry)"></i>
                        </td>
                    </tr>
                    <tr>
                        <td class="email-title-cell">Email:</td>
                        <td class="email-cell">{{entry.email}}</td>
                    </tr>
                    <tr>
                        <td class="phone-title-cell">Telefone:</td>
                        <td class="phone-cell">{{entry.telefone ?? '⎯'}}</td>
                    </tr>
                </table>
        </div>
        
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
                list: [],
                success: false
            };
        },
        methods: {
            async retrieveList() {
                try{
                    const res = await apiConnection.fetchAll();
                    console.log(res);
                    this.list = res.data;
                    this.success = true;
                } catch (err) {
                    if (err.response){
                        console.log(err.response);
                    }
                    this.success = false;
                }
            },
            async updateList() {
                this.retrieveList();
            },
            async deleteEntry (entry){
                await apiConnection.delete(entry.id);
                await this.updateList();
            },
            async editEntry(entry){
                this.$router.push(`/edit/${entry.id}`)
            }
        },
        mounted() {
            this.retrieveList();
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

    .reload-icon {
        font-size: 33px;
        cursor: pointer;
    }

    .entry-table {
        border-spacing: 0;
        border-collapse: separate;
        border-radius: 10px;
        width: 100%;
        margin: 6px 0;
        overflow: hidden;
        box-shadow: 3px 3px 6px 1px #aaaaaa94;
    }

    .entry-table th {
        padding-top: 5px;
        text-align: left;
        padding-left: 0.7em;
    }

    .email-title-cell, .phone-title-cell {
        text-align: right;
        width: 14%;
    }

    .email-cell, .phone-cell {
        text-align: left;
        padding-left: 7px;
    }

    .list-container {
        border-radius: 10px;
        padding: 10px;
    }

    .table-id {
        border-right: 1px solid var(--bs-secondary);
        width: 10%;
        min-width: 45px;
        background: #acbfd3;
    }
    
    .entry-button {
        width: 8%;
    }

    .icon-red {
        color: rgb(219, 48, 48);
    }

    .delete, .edit {
        cursor: pointer;
    }
</style>
  