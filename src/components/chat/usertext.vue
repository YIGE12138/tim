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
//写完了
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
      //发送群聊消息
      if (this.currentSession.username == "群聊") {
        console.log(this.content);
        this.$store.state.stomp.send(
          "/ws/groupChat",
          {},
          JSON.stringify(msgObj)
        );
      }
      //发送私聊消息
      else {
        msgObj.from = this.$store.state.currentUser.username;
        msgObj.fromNickname = this.$store.state.currentUser.nickname;
        msgObj.to = this.currentSession.username;
        this.$store.state.stomp.send("/ws/chat", {}, JSON.stringify(msgObj));
        //提交私聊消息记录
        this.$store.commit("addMessage", msgObj);
      }
      //清空输入框
      this.content = "";
    },
  },
};
</script>


<style lang="scss">
.el-popover {
  height: 200px;
  width: 450px;
  overflow: scroll;
  overflow-x: auto;
}
</style>

<style lang="scss" scoped>
#uesrtext {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 30%;
  border: solid 1px #ddd;
  background-color: white;
  > textarea {
    padding: 10px;
    width: 100%;
    height: 90%;
    border: none;
    outline: none;
    resize: none; //禁止拉伸
  }
  #sendBtn {
    float: right;
    margin-right: 10px;
  }
  #uploadImgBtn {
    border: none;
    padding-bottom: 0px;
    margin-bottom: 0px;
    padding-left: 12px;
  }
  #uploadImgBtn:hover {
    background-color: white;
  }
  #emojiBtn {
    border: none;
    padding-right: 0px;
    padding-bottom: 0px;
    margin-bottom: 0px;
  }
  #emojiBtn:hover {
    background-color: white;
  }
  .upload-btn {
    display: inline-block;
  }
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
/*包含以下四种的链接*/
.emotionItem {
  text-decoration: none;
}
/*正常的未被访问过的链接*/
.emotionItem:link {
  text-decoration: none;
}
/*已经访问过的链接*/
.emotionItem:visited {
  text-decoration: none;
}
/*鼠标划过(停留)的链接*/
.emotionItem:hover {
  text-decoration: none;
}
/* 正在点击的链接*/
.emotionItem:active {
  text-decoration: none;
}
</style>
