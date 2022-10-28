<template>
    <div>
        <h1>Editing a Todo</h1>
        <div v-for="item in todo" :key="item._id">
            Author: {{item.author}} <br>
            Todo Item: {{item.todo}} <br>
        </div>
        <hr>
            <input type="text" placeholder="Input Author" v-model="state.newAuthor">
            <span> Test: {{state.newAuthor}}</span>
            <br>
            <input type="text" placeholder="Input Todo" v-model="state.newTodoItem">
            <span> Test: {{state.newTodoItem}}</span>
            <br>
            <button @click="editTodo()">Update Todo</button>
        <hr>
    </div>
</template>

<script>        
    import todocrud from "../models/todocrud"
    export default {
        setup(){
            const {state, editTodo, todo, todoId, GetSpecificTodo} = todocrud()
            GetSpecificTodo()
            return {state, editTodo, todo, todoId}

        }
    }
</script>

<style lang="scss" scoped>

</style>