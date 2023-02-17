<template>
    <!-- @keydown="clickKey" -->
    <div class="home">
        <div class="note">
            <div class="title">
                <p>Редактируем заголовок</p>
                <input type="text" v-model="note.title" @input="changeHeader" />
            </div>
            <button class="add" @click="addItem">Добавить</button>
            <div class="todo">
                <ul>
                    <li v-for="(todo, index) in note.todo">
                        <input
                            type="checkbox"
                            class="option-input"
                            v-model="todo.done"
                            @change="checkItem"
                        />
                        <input
                            type="text"
                            v-model="todo.text"
                            @input="changeItem"
                            :class="{ 'cross-text': todo.done }"
                        />
                        <button class="delete" @click="deleteItem(index)">
                            Удалить
                        </button>
                    </li>
                </ul>
            </div>
            <div class="buttons">
                <button class="button-bottom" @click="onSave">
                    Сохранить изменения
                </button>
                <button class="button-bottom" @click="openModalCancel">
                    Отменить редактирование
                </button>
                <button class="button-bottom" @click="openModalDelete">
                    Удалить
                </button>
                <button class="button-bottom" @click="onHistoryPrev">
                    Отменить внесенное изменение
                </button>
                <button class="button-bottom" @click="onHistoryNext">
                    Повторить отмененное изменение
                </button>
            </div>
        </div>
        <Modal ref="modalCancel" @ok="onCancel">Отменить?</Modal>
        <Modal ref="modalDelete" @ok="onDelete">Удалить?</Modal>
    </div>
</template>

<script>
import { useCounterStore } from '@/stores/notes'
import { ref } from 'vue'
export default {
    setup() {
        const counterStore = useCounterStore()
        const history = ref([])
        const historyCancel = ref([])
        return { counterStore, history, historyCancel }
    },
    computed: {
        note() {
            return this.counterStore.notes[this.$route.params.index]
        },
    },
    created() {
        this.writeHistory()
    },
    methods: {
        // История изменений
        writeHistory() {
            this.history.push(JSON.stringify(this.note))
        },
        // Сохранять
        onSave() {
            this.counterStore.save()
            this.$router.push('/')
        },
        //Отменить редактирование
        onCancel() {
            this.counterStore.notes.splice(
                this.$route.params.index,
                1,
                JSON.parse(this.history[0])
            )
            console.log(this.history[0])
            this.$router.push('/')
        },
        //Удалить заметку
        onDelete() {
            this.counterStore.deleteNote(this.$route.params.index)
            this.counterStore.save()
            this.$router.push('/')
        },
        // Редактирование заголовка у заметки
        changeHeader() {
            this.writeHistory()
            this.historyCancel.splice(0)
        },
        // Отмечать дело
        checkItem() {
            this.writeHistory()
            this.historyCancel.splice(0)
        },
        // Редактировать название дела
        changeItem() {
            this.writeHistory()
            this.historyCancel.splice(0)
        },
        // Отменить внесенное изменение
        onHistoryPrev() {
            if (this.history.length > 1) {
                this.historyCancel.unshift(JSON.stringify(this.note))
                this.history.pop()
                let historyNote = JSON.parse(
                    this.history[this.history.length - 1]
                )
                this.counterStore.notes.splice(
                    this.$route.params.index,
                    1,
                    historyNote
                )
            }
        },
        // Повторить отмененное изменение
        onHistoryNext() {
            if (this.historyCancel.length == 0) {
                return
            }
            let historyNoteCancel = JSON.parse(this.historyCancel.shift())
            this.counterStore.notes.splice(
                this.$route.params.index,
                1,
                historyNoteCancel
            )
            this.writeHistory()
        },
        // Добавить дело
        addItem() {
            this.counterStore.addTodoItem(this.$route.params.index)
            this.writeHistory()
            this.historyCancel.splice(0)
        },
        // Удалить дело
        deleteItem(index) {
            this.counterStore.deleteTodoItem({
                indexNote: this.$route.params.index,
                indexItem: index,
            })
            this.writeHistory()
            this.historyCancel.splice(0)
        },
        // Открыть модальное окно для удаления
        openModalDelete() {
            this.$refs.modalDelete.open()
        },
        // Открыть модальное окно для отмены
        openModalCancel() {
            this.$refs.modalCancel.open()
        },
    },
}
</script>

<style lang="scss" scoped>
.cross-text {
    text-decoration: line-through;
}
.option-input {
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    -o-appearance: none;
    appearance: none;
    position: relative;
    right: 0;
    bottom: 0;
    left: 0;
    height: 27px;
    width: 27px;
    transition: all 0.15s ease-out 0s;
    background: #cbd1d8;
    border: none;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    margin-right: 0.5rem;
    outline: none;
}
.option-input:hover {
    background: #9faab7;
}
.option-input:checked {
    background: #40e0d0;
}
.option-input:checked::before {
    height: 25px;
    width: 25px;
    content: '✔';
    display: inline-block;
    font-size: 20.66667px;
    text-align: center;
    line-height: 27px;
}
.option-input:checked::after {
    -webkit-animation: click-wave 0.65s;
    -moz-animation: click-wave 0.65s;
    animation: click-wave 0.65s;
    background: #40e0d0;
    content: '';
    display: block;
    position: relative;
    z-index: 100;
}
.option-input.radio {
    border-radius: 50%;
}
.option-input.radio::after {
    border-radius: 50%;
}
.home {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.note {
    border: 1px solid black;
    margin: 20px;
    text-align: center;
    padding: 10px;
    input {
        text-align: center;
    }
}
.button-bottom {
    margin: 0 30px 15px 30px;
    border-radius: 5px;
    border: none;
    height: 40px;
}
ul {
    list-style-type: none;
    padding-left: 0;
    li {
        display: flex;
        justify-content: center;
        align-items: center;
        list-style-type: none;
        margin: 15px;
        height: 30px;
    }
}
input[type='text'] {
    height: 25px;
    border-radius: 5px;
    border: 1px solid #b8b5b8;
}
input[type='checkbox'] {
    margin-right: 20px;
}
.add {
    background-color: #4fc08d;
    border: none;
    height: 40px;
    width: 150px;
    margin: 25px 0;
    border-radius: 5px;
    color: white;
}
.delete {
    background-color: red;
    border: none;
    height: 30px;
    width: 80px;
    margin: 5px 5px 5px 15px;
    border-radius: 5px;
    color: white;
}
button {
    height: 50px;
    cursor: pointer;
}
.buttons {
    display: inline-flex;
    flex-direction: column;
    margin-top: 20px;
    width: 400px;
}
</style>
