<template>
    <el-table :data="allUsers" stripe style="width: 100%; height: 500px" row-key="id">
        <el-table-column type="expand">
            <template #default="props">
                <h1>
                    <el-icon><User /></el-icon> Full Name : {{ props.row.name.firstname }},
                    {{ props.row.name.lastname }}
                </h1>
                <h1>
                    <el-icon><LocationInformation /></el-icon> address:{{ props.row.address.zipcode }}
                    {{ props.row.address.city }} {{ props.row.address.street }}
                    {{ props.row.address.number }}
                </h1>
            </template>
        </el-table-column>
        <el-table-column prop="id" label="id" width="80" />
        <el-table-column prop="username" label="username" width="180" />
        <el-table-column prop="email" label="email" />
        <el-table-column prop="password" label="password" />
        <el-table-column prop="phone" label="phone" />
        <el-table-column label="Opertions">
            <el-button size="small" type="primary" round>Detail</el-button>
            <el-button size="small" type="danger" round>delete</el-button>
        </el-table-column>
    </el-table>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAllUsers } from "../apis/apiUser";
import { openLoading, closeLoading } from "../utils/loading";
import { useRouter } from "vue-router";

const allUsers = ref([]);
const loading = ref(true);
const Router = useRouter();
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;
onMounted(() => {
    openLoading();
    getUserList();
    loading.value = false;
    closeLoading();
});

async function getUserList() {
    await getAllUsers()
        .then((res) => {
            allUsers.value = res.data;
        })
        .catch((error) => {
            console.log(error);
        });
}
</script>

<style scoped></style>
