<template>
  <div id="toolbar">
    <el-image
      class="imgProfile"
      :src="user.userProfile"
      :preview-src-list="[user.userProfile]"
      :alt="user.nickname"
    >
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
    <div id="btnBar">
      <div class="topBtnBar">
        <el-tooltip
          class="item"
          effect="dark"
          content="进入群聊"
          placement="right"
        >
          <el-button
            @click="chooseChatList('群聊')"
            class="toolBtn"
            size="small"
            ><i class="fa fa-comments fa-2x" aria-hidden="true"></i
          ></el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="用户列表"
          placement="right"
        >
          <el-button
            @click="chooseChatList('私聊')"
            class="toolBtn"
            size="small"
            ><i class="fa fa-address-book-o fa-2x" aria-hidden="true"></i
          ></el-button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "toolbar",
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem("user")),
    };
  },
  methods: {
    chooseChatList(listName) {
      this.$store.commit("changeCurrentList", listName);
    },
  },
};
</script>

<style scoped>
#toolbar {
  width: 100%;
  height: 100%;
}

#toolbar #btnBar {
  width: 100%;
  height: 82%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#toolbar .imgProfile {
  width: 40px;
  height: 40px;
  horiz-align: center;
  margin: 25px 10px;
}

#toolbar .toolBtn {
  background-color: #2e3238;
  border: 0;
  margin: 5px 5px;
}

#toolbar .feedbackDialog {
  width: 1000px;
  height: 800px;
  margin: 10px auto;
}

#toolbar .feedbackInput {
  width: 450px;
  height: 200px;
  resize: none;
  padding: 0;
  margin: 0;
}

#moreList {
  margin: 0px;
  padding: 0px;
  background-color: #2e3238;
}

#moreList li {
  padding-top: 14px;
  padding-bottom: 14px;
  padding-left: 5px;
  list-style: none;
  cursor: pointer;
}

#moreList li:hover {
  background-color: #abaaaa;
}

</style>
<style >
.el-popover.moreListPopoverClass {
  height: 150px;
  width: 150px;
  margin-left: 10px;
  padding: 0px;
  overflow-x: hidden;
  overflow-y: hidden;
  background-color: #2e3238;
  border: none;
}
</style>
