<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import { useCounterStore } from '@/stores/notes'
export default {
    setup() {
        const counterStore = useCounterStore()

        return { counterStore }
    },
    created() {
        this.counterStore.load()
    },
}
</script>
