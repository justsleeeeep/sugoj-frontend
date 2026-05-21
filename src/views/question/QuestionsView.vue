<template>
  <a-table
    :columns="columns"
    :data="data"
    :pagination="pagination"
    @page-change="onPageChange"
  >
    <template #optional="{ record }">
      <a-button
        status="success"
        @click="$modal.info({ title: '题目内容', content: record.content })"
      >
        查看
      </a-button>
      <a-button status="danger" @click="doDelete(record)"> 删除 </a-button>
      <a-button status="warning" @click="doUpdate(record)"> 修改 </a-button>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { QuestionControllerService, Question } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
const router = useRouter();
const data = ref([]);

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
    dataIndex: "tags",
  },
  {
    title: "通过率",
    // dataIndex: "tags",
  },
  {
    title: "Optional",
    slotName: "optional",
  },
];

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingGet(
    undefined,
    pagination.current,
    undefined,
    pagination.pageSize,
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

onMounted(() => {
  loadData();
});

const doDelete = async (question: Question) => {
  console.log(question);
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id,
  });
  console.log(res.code);
  if (res.code == 0) {
    message.success("删除成功");
    loadData();
  } else {
    message.error("删除失败" + res.message);
  }
};
const doUpdate = async (question: Question) => {
  console.log(question);
  router.push({
    path: "/question/update",
    query: {
      id: question.id,
    },
  });
};
</script>
