<template>
    <svg aria-hidden="true" :class="['svg-icon', name]" :style="{ color, width: size, height: size }">
        <use :xlink:href="symbolId" />
    </svg>
</template>

<script setup>
import { computed } from "vue";
name: "SvgIcon";
const props = defineProps({
    prefix: {
        type: String,
        default: "icon",
    },
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: "currentColor",
    },
    size: {
        type: [String, Number],
        default: 24,
    },
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<style scoped>
.svg-icon {
    fill: currentColor;
    vertical-align: middle;
}
</style>
