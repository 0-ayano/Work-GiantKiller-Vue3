<template>
	<h1 id="title">Giant Killer</h1>

	<button id="btn" class="move-nomalplay" @click="moveNomalPlay()">Nomal　Play</button>
	<button id="btn" class="move-rule" @click="moveRule()">Rule</button>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const moveNomalPlay = () => {
    router.push('nomal-play')
}

const moveRule = () => {
    router.push('rule')
}
</script>

<style scoped>
.move-nomalplay {
	position: absolute;
	top: 30%;
	left: 50%;
	transform: translateX(-50%);
}

.move-rule {
	position: absolute;
	top: 45%;
	left: 50%;
	transform: translateX(-50%);
}

</style>