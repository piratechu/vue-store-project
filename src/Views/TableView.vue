<template>
    <div style="width: 100%; height: 100%">
        <el-card shadow="hover" header="自適應測試">
            <el-select v-model="value" class="m-2" placeholder="Select" size="large">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-button type="primary" @click="resetValue">清除</el-button>
        </el-card>
        <div class="table_outer">
            <el-table :data="tableData.arr" style="width: 98%" max-height="500px">
                <el-table-column label="Date" prop="date" min-width="80px" />
                <el-table-column label="Name" prop="name" min-width="150px" />
                <el-table-column label="address" prop="address" min-width="300px" />
                <el-table-column label="action" align="right" min-width="250px">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
                            >Delete</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-button class="mt-4" style="width: 10%" type="success" @click="handleAdd">+ Add item</el-button>
        <el-pagination
            small
            background
            layout="total,sizes, prev, pager, next, jumper"
            :page-size="pageSize"
            :page-sizes="[2, 5, 6, 20]"
            :total="tableData.arr.length"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            class="mt-4"
        />
    </div>
</template>

<script setup>
import { ref, computed, reactive, watch, inject, onMounted } from "vue";

const search = ref("");
const reData = ref([]);
const code = ref("");
const value = ref("");
const pageSize = ref(0);
pageSize.value = inject("pageSize");

onMounted(() => {});
const handleSizeChange = (index) => {
    console.log("handleSizeChange:", index);
};

const handleCurrentChange = (index) => {
    console.log("handleCurrentChange:", index);
};
const options = [
    {
        value: "Option1",
        label: "Option1",
    },
    {
        value: "Option2",
        label: "Option2",
    },
    {
        value: "Option3",
        label: "Option3",
    },
    {
        value: "Option4",
        label: "Option4",
    },
    {
        value: "Option5",
        label: "Option5",
    },
];
const resetValue = () => {
    value.value = "";
    console.log(value.value);
};
watch(code, (newCode) => {
    console.log(newCode);
});
const tableRowClassName = ({ row, rowIndex }) => {
    console.log(row, rowIndex);

    if (rowIndex % 2) return { background: "green" };

    return "";
};
const codeSubmit = () => {
    console.log("code:", code.value);
};
const handleRefNew = () => {
    reData.value.push({
        date: "2025-05-03",
        name: "張三",
        address: "No. 189, Grove St, Los Angeles",
    });
};
const filterTableData = computed(() =>
    tableData.arr.filter((data) => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase()))
);

const handleAdd = () => {
    tableData.arr.push({
        date: "2023-07-01",
        name: "Jacky",
        address: "No. 190, Grove St, Los Angeles",
    });
};
const handleEdit = (index, row) => {
    console.log(row);
};
const handleDelete = (index, row) => {
    let tmpArr = tableData.arr;
    tableData.arr = tmpArr.filter((item, idx) => {
        return idx !== index;
    });
    console.log(index, row);
};

// const tableRef = ref(null);
const tableData = reactive({ arr: [] });
tableData.arr = [
    {
        date: "2016-05-03",
        name: "Tom",
        address: "No. 189, Grove St, Los Angeles",
    },
    {
        date: "2016-05-02",
        name: "John",
        address: "No. 189, Grove St, Los Angeles",
    },
    {
        date: "2016-05-04",
        name: "Morgan",
        address: "No. 189, Grove St, Los Angeles",
    },
    {
        date: "2016-05-01",
        name: "Jessy",
        address: "No. 189, Grove St, Los Angeles",
    },
];
</script>

<style scoped>
.table_outer {
    position: relative;
}
@media only screen and (max-width: 800px) {
    .table_outer:after {
        content: "";
        display: block;
        width: 20px;
        height: 88%;
        position: absolute;
        background: red;
        top: 35px;
        right: 0;
        z-index: 1;
        /* 線性漸層 */
        /* background:linear-gradient(方向, 顏色1 位置, 顏色2 位置); */
        background: linear-gradient(
            to right,
            rgba(224, 195, 252, 0.1) 10%,
            rgba(224, 195, 252, 0.3) 40%,
            rgba(142, 197, 252, 0.6) 60%,
            rgba(142, 197, 252, 1) 100%
        );
        /* background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%); */
    }
}
:deep(.el-table__row.success-row) {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
}
:deep(.el-table__inner-wrapper) {
    overflow-x: auto;
}
</style>
