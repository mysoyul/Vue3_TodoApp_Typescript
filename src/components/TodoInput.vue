<template>
    <div>
        <input type="text" :value="newTodoItem">
        <button>추가</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const newTodoItem = ref("")

</script>

<style scoped></style>