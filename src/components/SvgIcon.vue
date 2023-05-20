<template>
    <svg aria-hidden="true" :class="['svg-icon', customClass]">
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
    className: {
        type: String,
        required: false,
        default: "",
    },
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
const customClass = computed(() => (props.className ? props.className : props.name));
</script>

<style scoped>
.svg-icon {
    fill: currentColor;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
}
</style>
