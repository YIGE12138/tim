<template>
  <div id="list">
    <ul v-if="currentList == '群聊'">
      <p style="padding: 2px 4px; height: 20px">群聊列表</p>
      <li
        :class="{
          active: currentSession ? '群聊' == currentSession.username : false,
        }"
        v-on:click="changeCurrentSession(chatObj)"
      >
        <img class="avatar" src="../../assets/logo.png" />
        <el-badge :is-dot="isDot[user.username + '#群聊']"
          ><p class="name">天南海北是一家</p></el-badge
        >
      </li>
    </ul>
    <el-scrollbar
      wrap-class="userList"
      wrap-style="height:600px;"
      view-style="height:100%;"
      :native="false"
    >
      <ul v-if="currentList == '私聊'">
        <p style="padding: 2px 4px; height: 20px">用户列表</p>
        <li
          v-for="item in users"
          :class="{
            active: currentSession
              ? item.username === currentSession.username
              : false,
          }"
          v-on:click="changeCurrentSession(item)"
          :key="item.index"
        >
          <div style="display: flex; justify-content: flex-start">
            <div>
              <el-badge
                :is-dot="isDot[user.username + '#' + item.username]"
                style=""
              >
                <el-image
                  class="avatar"
                  :preview-src-list="[item.userProfile]"
                  :src="item.userProfile"
                  :alt="item.nickname"
                >
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </el-badge>
              <p class="name">{{ item.nickname }}</p>
            </div>
          </div>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "list",
  data() {
    return {
      user: this.$store.state.currentUser,
      chatObj: { username: "群聊", nickname: "群聊" },
    };
  },
  computed: mapState(["users", "currentSession", "isDot", "currentList"]),
  methods: {
    changeCurrentSession: function (currentSession) {
      this.$store.commit("changeCurrentSession", currentSession);
    },
  },
};
</script>

<style scoped>
#list ul {
  margin-left: 0px;
  padding-left: 0px;
  margin-left: 2px;
}

#list li {
  padding-top: 14px;
  padding-bottom: 14px;
  list-style: none;
  cursor: pointer;
}

#list li:hover {
  background-color: #d8d6d6;
}

#list li.active {
  background-color: #c8c6c6;
}

#list .avatar {
  border-radius: 2px;
  width: 30px;
  height: 30px;
  vertical-align: middle;
}

#list .name {
  display: inline-block;
  margin-left: 15px;
  margin-top: 0px;
  margin-bottom: 0px;
}

#list .userList {
  max-height: 600px;
}

#list .el-scrollbar__wrap.default-scrollbar__wrap {
  overflow-x: auto;
}
</style>
