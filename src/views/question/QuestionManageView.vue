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

<script lang="ts">
import { ref, reactive, onMounted } from "vue";
import { QuestionControllerService, Question } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
const doDelete = (question: Question) => {
  console.log(question);
};
const doUpdate = (question: Question) => {
  console.log(question);
};
export default {
  setup() {
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
        title: "提交数",
        dataIndex: "submitNum",
      },
      {
        title: "通过数",
        dataIndex: "acceptNum",
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
      },
      {
        title: "更新时间",
        dataIndex: "updateTime",
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

        // 总数
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

    return {
      columns,
      data,
      pagination,
      onPageChange,
      doDelete,
      doUpdate,
    };
  },
};
</script>
