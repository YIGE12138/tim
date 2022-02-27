<template>
  <div id="uesrtext">
    <textarea
      id="textarea"
      placeholder="按住 Ctrl + Enter 发送"
      v-model="content"
      @keyup="addMessage"
    >
    </textarea>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "uesrtext",
  data() {
    return {
      content: "",
    };
  },
  computed: mapState(["sessions", "currentSession"]),
  methods: {
    addMessage(e) {
      if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
        this.addMessageByClick();
      }
    },
    addMessageByClick() {
      if (!this.content || this.content.match(/^[ ]*$/)) {
        this.$message({
          showClose: true,
          message: "不能发送空白信息",
        });
        return;
      }
      let msgObj = new Object();
      msgObj.content = this.content;
      msgObj.messageTypeId = 1;
      if (this.currentSession.username == "群聊") {
        console.log(this.content);
        this.$store.state.stomp.send(
          "/ws/groupChat",
          {},
          JSON.stringify(msgObj)
        );
      } else {
        msgObj.from = this.$store.state.currentUser.username;
        msgObj.fromNickname = this.$store.state.currentUser.nickname;
        msgObj.to = this.currentSession.username;
        this.$store.state.stomp.send("/ws/chat", {}, JSON.stringify(msgObj));
        this.$store.commit("addMessage", msgObj);
      }
      this.content = "";
    },
  },
};
</script>


<style>
.el-popover {
  height: 200px;
  width: 450px;
  overflow: scroll;
  overflow-x: auto;
}
</style>

<style scoped>
#uesrtext {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 30%;
  border: solid 1px #ddd;
  background-color: white;
}

#uesrtext > textarea {
  padding: 10px;
  width: 100%;
  height: 90%;
  border: none;
  outline: none;
  resize: none;
}

#uesrtext #sendBtn {
  float: right;
  margin-right: 10px;
}

#uesrtext #uploadImgBtn {
  border: none;
  padding-bottom: 0px;
  margin-bottom: 0px;
  padding-left: 12px;
}

#uesrtext #uploadImgBtn:hover {
  background-color: white;
}

#uesrtext #emojiBtn {
  border: none;
  padding-right: 0px;
  padding-bottom: 0px;
  margin-bottom: 0px;
}

#uesrtext #emojiBtn:hover {
  background-color: white;
}

#uesrtext .upload-btn {
  display: inline-block;
}

.emotionList {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
}

.emotionItem {
  width: 10%;
  font-size: 20px;
  text-align: center;
}

.emotionItem,
.emotionItem:link,
.emotionItem:visited,
.emotionItem:hover,
.emotionItem:active {
  text-decoration: none;
}
</style>
