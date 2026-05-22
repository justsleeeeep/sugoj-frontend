<template>
  <a-form :model="searchParams" layout="inline">
    <a-form-item field="title" label="标题">
      <a-input
        v-model="searchParams.title"
        placeholder="请输入标题"
        style="width: 200px"
      />
    </a-form-item>

    <a-form-item field="tags" label="标签">
      <a-input
        v-model="searchParams.tags"
        placeholder="请输入标签"
        style="width: 200px"
      />
    </a-form-item>

    <a-form-item field="id" label="题号">
      <a-input
        v-model="searchParams.id"
        placeholder="请输入题号"
        style="width: 200px"
      />
    </a-form-item>

    <a-form-item>
      <a-space>
        <a-button type="primary" @click="doSearch"> 搜索 </a-button>
      </a-space>
    </a-form-item>
  </a-form>

  <a-table
    :columns="columns"
    :data="data"
    :pagination="pagination"
    @page-change="onPageChange"
  >
    <template #tags="{ record }">
      <a-space wrap>
        <a-tag v-for="(tag, index) of record.tags" :key="index" color="#0fc6c2">
          {{ tag }}
        </a-tag>
      </a-space>
    </template>
    <template #acceptedRate="{ record }">
      {{ record.submitNum ? record.acceptNum / record.submitNum : 0 }}%({{
        record.acceptNum
      }}/{{ record.submitNum }})
    </template>
    <template #createTime="{ record }">
      {{ moment(record.createTime).format("YYYY-MM-DD") }}
    </template>
    <template #optional="{ record }">
      <a-button shape="round" type="text" @click="toQuestionPage(record)">
        去做题
      </a-button>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { QuestionControllerService, Question } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";
const router = useRouter();
const data = ref([]);

const searchParams = reactive({
  id: undefined,
  title: "",
  tags: "",
});
// 分页对象
const pagination = reactive({
  current: 1,
  pageSize: 5,
  total: 0,
  showTotal: true,
});

const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "标签",
    slotName: "tags",
  },
  {
    title: "通过率",
    slotName: "acceptedRate",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingGet(
    undefined,
    pagination.current,
    searchParams.id,
    pagination.pageSize,
    undefined,
    undefined,
    searchParams.tags,
    searchParams.title,
    undefined,
  );

  if (res.code === 0) {
    data.value = res.data.records;
    pagination.total = res.data.total;
  } else {
    message.error("查询失败：" + res.message);
  }
};
const onPageChange = (page) => {
  pagination.current = page;
  loadData();
};
const toQuestionPage = (question: Question) => {
  router.push({
    path: "/view/question/" + question.id,
  });
};
const doSearch = () => {
  pagination.current = 1;
  loadData();
};

onMounted(() => {
  loadData();
});
</script>
