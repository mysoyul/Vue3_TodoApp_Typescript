<template>
    <div>
        <input type="text" :value="newTodoItem" @input="handleInput">
        <button>추가</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const newTodoItem = ref("")
const emit = defineEmits(["input:todo"])

const handleInput = (event: Event) => {
    const todoText = (event.target as HTMLInputElement).value
    if (!todoText) return
    emit("input:todo", todoText)
    newTodoItem.value = todoText
}
</script>

<style scoped></style>