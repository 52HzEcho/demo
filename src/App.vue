<template>
  <div id="app">
    <div class="flex-center">
      <span>项目状态：</span>
      <van-button plain type="info" @click="checkData('all')">全部</van-button>
      <van-button plain type="info" @click="checkData('tobegin')"
        >待开始</van-button
      >
      <van-button plain type="info" @click="checkData('pending')"
        >进行中</van-button
      >
      <van-button plain type="info" @click="checkData('resolve')"
        >已完成</van-button
      >
      <van-button plain type="info" @click="checkData('delay')"
        >延迟</van-button
      >
    </div>

    <div class="flex-center">
      <van-search
        placeholder="请输入搜索关键词"
        @input="searchData"
        v-model="searchVal"
      />
      <van-button type="info" @click="clearData">清空</van-button>
      <van-button type="info" @click="exportExcel">导出</van-button>
    </div>
    <form>
      <table class="table">
        <tr>
          <th>序号</th>
          <th>删除</th>
          <th>项目名称</th>
          <th>状态</th>
        </tr>
        <tr v-for="(item, index) in list" v-bind:key="item.id">
          <td>{{ index + 1 }}</td>
          <td @click="deleteData(index)"><van-icon name="delete" /></td>
          <td>{{ item.projectname }}</td>
          <td>
            <span v-if="item.status === 'tobegin'">待开始</span>
            <span v-if="item.status === 'pending'">进行中</span>
            <span v-if="item.status === 'resolve'">已完成</span>
            <span v-if="item.status === 'delay'">延迟</span>
          </td>
        </tr>
      </table>
    </form>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  name: "app",
  data() {
    return {
      list: "", //要展示的数组
      searchVal: "", //搜索框的值
      loading: false,
      data: [
        {
          id: "0",
          projectname: "临时事宜",
          status: "tobegin"
        },
        {
          id: "1",
          projectname: "团队福利",
          status: "pending"
        },
        {
          id: "2",
          projectname: "商场项目",
          status: "resolve"
        },
        {
          id: "3",
          projectname: "待办事项",
          status: "pending"
        },
        {
          id: "4",
          projectname: "合作项目",
          status: "tobegin"
        },
        {
          id: "5",
          projectname: "云小mall",
          status: "delay"
        },
        {
          id: "6",
          projectname: "能完成的项目",
          status: "resolve"
        },
        {
          id: "7",
          projectname: "去工作",
          status: "pending"
        },
        {
          id: "8",
          projectname: "能合作的项目",
          status: "delay"
        },
        {
          id: "9",
          projectname: "能自己完成的项目",
          status: "resolve"
        },
        {
          id: "10",
          projectname: "指标报表",
          status: "delay"
        }
      ]
    };
  },
  created() {
    //获取要展示的数组
    this.list = this.data;
  },
  methods: {
    // 选择要展示的状态
    checkData(status) {
      if (status == "all") {
        this.list = this.data;
      } else {
        this.list = this.data.filter(item => {
          return status === item.status;
        });
      }
    },
    //删除数据
    deleteData(index) {
      Dialog.confirm({
        title: "提示",
        message: "请问您确定要删除吗？"
      }).then(() => {
        this.list.splice(index, 1);
      });
    },
    exportExcel() {
      // 需要导出的数据，可以动态获取
      this.loading = true; // 设置一个loading，生成Excel需要时间
      import("@/vendor/Export2Excel.js").then(excel => {
        // 导入js模块
        const tHeader = ["序号","id", "项目名称", "状态"]; // 导出excel 的标题
        const filterVal = ["index", "id", "projectname","status"]; // 每个标题对应的字段
        window.console.log(this.list)
        const list = (this.list || []).map((item, key) => {
          // 通过 map 方法遍历，组装数据成上面的格式
          return {
            index: key + 1,
            id:item.id,
            projectname: item.projectname,
            status: item.status
          };
        });
        console.log(list)
        if (list) {
          const data = this.formatJson(filterVal, list); // 生成json数据
          excel.export_json_to_excel({
            // 调用excel方法生成表格
            header: tHeader,
            data,
            filename: this.goodsName
          });
        } else {
          alert("暂无无数据");
        }
        this.loading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },

    //根据项目名称搜索
    searchData() {
      var item = this.list.filter(item => {
        if (item.projectname.match(this.searchVal)) {
          return item;
        }
      });
      window.console.log(item);
      this.list = item;
    },
    //清空搜索框
    clearData() {
      window.console.log(this.searchVal);
      this.searchVal = "";
      this.list = this.data;
    }
  }
};
</script>

<style scoped>
.flex-center {
  display: flex;
  align-items: center;
}
.flex-center > button {
  margin: 0 5px;
}
.table > tr > th,
.table > tr > td {
  height: 40px;
  width: 100px;
  text-align: center;
}
.table > tr > td:nth-of-type(3) {
  width: 150px;
}
</style>
