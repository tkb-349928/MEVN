import { ref, computed } from "vue"
import { useRoute, useRouter} from "vue-router";
const getTodos = () =>{

    const route = useRoute();
    const router = useRouter();
    const todoId = computed(()=> route.params.id)

    const state = ref({
        newAuthor: "",
        newTodoItem: "",
        todos: {}
    });

    const GetAllTodos = async ()=>{
        try {
            await fetch("http://localhost:5000/Todos")
            .then(res => res.json())
            .then(data =>{
                state.value.todos = data
                // debugger
            })
        } catch (error) {
            console.log(error);
        }
    };

    const newTodo = ()=>{
        const requesOptions = {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                author: state.value.newAuthor,
                todo: state.value.newTodoItem
            })
        }
        fetch("http://localhost:5000/Todos/new", requesOptions)
        .then(GetAllTodos())
    };

    const deleteTodo = (_id)=>{
        fetch("http://localhost:5000/Todos/delete/" + _id, { method: "DELETE"})
        .then(GetAllTodos())
    };

    const editTodo = ()=>{
        const requesOptions = {
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                author: state.value.newAuthor,
                todo: state.value.newTodoItem
            })
        }
        fetch("http://localhost:5000/Todos/update/" + todoId.value, 
        requesOptions)
        .then(res=>res.body)
        .then(res => {console.log(res)})
        router.push("/todos")
    };

    const todo = ref({})
    const GetSpecificTodo = async()=>{
        try {
            fetch("http://localhost:5000/Todos")
                .then(res=>res.json())
                .then(data => {
                    todo.value = data.filter( t => t._id === todoId.value )
                })
        } catch (error) {
            console.log(error)
        }
    }
    return {
        todo,
        todoId,
        GetSpecificTodo,
        state,
        GetAllTodos, 
        newTodo,
        deleteTodo,
        editTodo
    };
};

export default getTodos