import { defineStore } from 'pinia'

export const useCounterStore = defineStore('notes', {
    state: () => ({
        //Список заметок
        notes: [],
    }),

    actions: {
        //сохраняет заметки в localStorage
        save() {
            localStorage.notes = JSON.stringify(this.notes)
        },
        //загружать в приложение сохраненые изменения из localStorage
        load() {
            this.notes = JSON.parse(localStorage.notes)
        },
        //удаляет дело
        deleteTodoItem(payload) {
            this.notes[payload.indexNote].todo.splice(payload.indexItem, 1)
        },
        //добавляет дело
        addTodoItem(payload) {
            this.notes[payload].todo.unshift({
                done: false,
                text: 'Новое дело',
            })
        },
        //создать заметку
        createNote() {
            this.notes.unshift({
                title: 'Заголовок',
                todo: [
                    {
                        done: false,
                        text: 'Новое дело',
                    },
                ],
            })
        },
        //удаляет заметку
        //payload - число - индекс хранилища this.notes
        deleteNote(payload) {
            this.notes.splice(payload, 1)
        },
    },
})
