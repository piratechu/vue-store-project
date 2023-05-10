<template>
    <div class="code-container">
        <textarea
            placeholder="Add your code (default html)"
            class="text-area-code-editor"
            formControlName="content"
            spellcheck="false"
            v-model="code"
        ></textarea>
        <pre class="pre"><code class="code" v-html="highlightCode"></code>
    </pre>
    </div>
    <div class="upload-container">
        <label>
            <el-upload
                ref="readFile"
                :auto-upload="false"
                :on-exceed="handleFileChange"
                :on-change="handleOpenFile"
                :limit="1"
            >
                <el-button type="primary">Click to Open File</el-button>
                <template #tip>
                    <div class="el-upload__tip text-red">
                        limit 1 file, new file will cover the old file and replace code editor content
                    </div>
                </template>
            </el-upload>
        </label>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import hljs from "highlight.js/lib/core";
import "highlight.js/styles/stackoverflow-dark.css";
import javascript from "highlight.js/lib/languages/javascript";
// 指定寫法需要註冊
import sql from "highlight.js/lib/languages/sql";
import { genFileId } from "element-plus";

hljs.registerLanguage("sql", sql);
// import "highlight.js/lib/common";

const code = ref("");
const readFile = ref();
function handleFileChange(files) {
    readFile.value.clearFiles();
    const file = files[0];
    file.uid = genFileId();
    readFile.value.handleStart(file);
}
function handleOpenFile(file) {
    console.log("file:", readFile.value);
    const reader = new FileReader();
    reader.readAsText(file.raw);

    reader.onload = function () {
        // console.log("result:", reader.result);
        code.value = reader.result;
        //     console.log(reader.result);
        // }
    };
    // console.log(file.raw);
}
const highlightCode = computed(() => {
    // console.log("code:", code.value);
    // 指定寫法
    // console.log("hl:", hljs.highlight(code.value, { language: "sql" }));
    // console.log("hl:", hljs.highlight(code.value, { optionsOrCode: javascript }));
    // return  hljs.highlight(code.value, { optionsOrCode: "javascript" });
    // return hljs.highlightAuto(code.value).value;
    return hljs.highlight(code.value, { language: "sql" }).value;
});
</script>

<style scoped>
.upload-container {
    top: 60px;
    left: 100px;
    position: relative;
    background-color: aqua;
}
.code-container {
    top: 50px;
    max-width: 90%;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    min-height: 300px;
    background-color: #3f3f3f;
    color: #fff;
}
.text-area-code-editor {
    box-shadow: none;
    outline: 0;
    border: 0;
}
/* .text-area-code-editor:focus {
    box-shadow: none;
    outline: 0;
    border: 1;
} */

.text-area-code-editor,
.pre,
.code {
    tab-size: 2;
    margin: 0;
    padding: 0;
    font-family: Georgia, "Times New Roman", Times, serif;
    font-size: 16px;
    line-height: 1.5;
}

.pre {
    margin: 0;
    padding: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    min-height: inherit;
    z-index: 1;
    overflow: auto;
    padding: 15px 0 0 70px;
}
pre.code {
    min-height: inherit;
    overflow: hidden;
    height: 100%;
}

.text-area-code-editor {
    caret-color: rgb(255, 255, 255);
    white-space: nowrap;
    text-align: left;
    display: block;
    resize: none;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: transparent;
    color: transparent;
    z-index: 2;
    padding: 15px 0 0 70px;
}
</style>
