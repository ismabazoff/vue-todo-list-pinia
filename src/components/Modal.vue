<template>
    <div :class="{ burg: true, opened: addOpened }">
        <div class="background_modal"></div>
        <h2>
            <slot></slot>
        </h2>
        <div class="buttons_modal">
            <button class="yes" @click="clickYes">Да</button>
            <button class="no" @click="close">Нет</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            addOpened: false,
        }
    },
    methods: {
        open() {
            this.addOpened = true
        },
        close() {
            this.addOpened = false
        },
        clickYes() {
            this.$emit('ok') //$emit - сгенерировать событие
            this.close()
        },
    },
}
</script>

<style lang="scss">
.buttons_modal button {
    margin: 15px;
    width: 100px;
    font-size: 18px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
}
.buttons_modal > .no {
    background-color: #4fc08d;
    height: 40px;
}
.buttons_modal > .yes {
    background-color: red;
    height: 40px;
    color: white;
}
html,
body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}
.background_modal {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(15, 15, 15, 0.4);
    z-index: -1;
}
.burg {
    position: fixed;
    border-radius: 5px;
    background-color: rgb(134, 126, 126);
    display: none;
    flex-direction: column;
    padding: 30px;
    color: blanchedalmond;
    z-index: 1000;
    top: 50%;
    left: 50%;
    margin: -200px 0 0 -160px;
    // background: rgba(0, 0, 0, 0.6);
    overflow: auto;
    &:before {
        height: 100%;
        display: inline-block;
        vertical-align: middle;
        content: '';
    }
    h2 {
        text-align: center;
        margin-bottom: 40px;
    }
    input {
        background: #212325;
        width: 363px;
        height: 40px;
        border-radius: 6px;
        border: none;
        color: white;
        margin-bottom: 25px;
        padding: 20px;
    }
}
.opened {
    display: flex;
}
</style>
