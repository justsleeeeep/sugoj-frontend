<template>
  <a-table :columns="columns" :data="data" :pagination="pagination">
    <template #optional="{ record }">
      <a-button
        @click="$modal.info({ title: '题目内容', content: record.content })"
      >
        view
      </a-button>
    </template>
  </a-table>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";

export default {
  setup() {
    const data = ref([]);

    // 分页对象
    const pagination = reactive({
      current: 1,
      pageSize: 10,
      total: 0,
    });

    const columns = [
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

    onMounted(() => {
      loadData();
    });

    return {
      columns,
      data,
      pagination,
    };
  },
};
</script>
