<template>
  <div id="message" v-scroll-bottom="sessions">
    <div v-if="currentSession && currentSession.username != '群聊'">
      <ul>
        <li
          v-for="entry in sessions[
            user.username + '#' + currentSession.username
          ]"
          :key="entry.index"
        >
          <p class="time">
            <span>{{ entry.date | time }}</span>
          </p>
          <div class="main" :class="{ self: entry.self }">
            <p class="username">{{ entry.fromNickname }}</p>
            <img
              @dblclick="takeAShot(entry.fromNickname, username)"
              class="avatar"
              :src="entry.self ? user.userProfile : currentSession.userProfile"
              alt=""
            />
            <p v-if="entry.messageTypeId == 1" class="text">
              {{ entry.content }}
            </p>
            <img
              v-if="entry.messageTypeId == 2"
              :src="entry.content"
              class="img"
            />
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <ul>
        <li v-for="entry in sessions['群聊']" :key="entry.id">
          <p class="time">
            <span>{{ entry.createTime | time }}</span>
          </p>
          <div class="main" :class="{ self: entry.fromId == user.id }">
            <p class="username">{{ entry.fromName }}</p>
            <img
              @dblclick="takeAShot(entry.fromName, username)"
              class="avatar"
              :src="
                entry.fromId == user.id ? user.userProfile : entry.fromProfile
              "
              alt=""
            />
            <div v-if="entry.messageTypeId == 1">
              <p class="text" v-html="entry.content"></p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "message",
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem("user")),
    };
  },
  computed: mapState(["sessions", "currentSession", "errorImgUrl"]),
  filters: {
    time(date) {
      if (date) {
        date = new Date(date);
      }
      let currentDate = new Date();
      let timeInterval = currentDate.getDate() - date.getDate();
      let weekdays = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];
      let timeRange = "上午";
      if (date.getHours() > 12) {
        timeRange = "下午";
      }
      if (
        date.getMonth() == currentDate.getMonth() &&
        date.getDate() == currentDate.getDate()
      ) {
        return `${timeRange} ${date.getHours()}:${date.getMinutes()}`;
      }
      if (
        date.getFullYear() == currentDate.getFullYear() &&
        timeInterval <= 6 &&
        timeInterval >= 1
      ) {
        if (timeInterval == 1) {
          return `昨天 ${timeRange} ${date.getHours()}:${date.getMinutes()}`;
        } else {
          return `${
            weekdays[date.getDay()]
          } ${timeRange} ${date.getHours()}:${date.getMinutes()}`;
        }
      } else
        return `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()} ${timeRange}  ${date.getHours()}:${date.getMinutes()}`;
    },
  },
  directives: {
    "scroll-bottom"(el) {
      setTimeout(function () {
        el.scrollTop += 9999;
      }, 1);
    },
  },
  methods: {
    takeAShot(fromName, toName) {
      console.log("拍了一怕");
      let s = fromName + "拍了拍" + toName;
      this.$message(s);
    },
  },
};
</script>

<style scoped>
#message {
  padding: 15px;
  height: 60%;
  max-height: 63%;
  overflow-y: scroll;
  overflow-x: hidden;
}

#message ul {
  list-style-type: none;
  padding-left: 0px;
}

#message ul li {
  margin-bottom: 15px;
}

#message .time {
  text-align: center;
  margin: 7px 0;
}

#message .time > span {
  display: inline-block;
  padding: 0 18px;
  font-size: 12px;
  color: #fff;
  background-color: #dcdcdc;
  border-radius: 2px;
}

#message .main .avatar {
  float: left;
  margin: 0 10px 0 0;
  border-radius: 3px;
  width: 30px;
  height: 30px;
}

#message .main .text {
  display: inline-block;
  padding: 0 10px;
  max-width: 80%;
  background-color: #fafafa;
  border-radius: 4px;
  line-height: 30px;
}

#message .main .img {
  display: inline-block;
  height: 100px;
  width: 100px;
  margin-top: 15px;
}

#message .main .username {
  position: relative;
  left: 35px;
  top: 11px;
  margin: 0 0;
  padding: 0 0;
  border-radius: 4px;
  line-height: 15px;
  font-size: 10px;
  color: grey;
}

#message .self {
  text-align: right;
}

#message .self .avatar {
  float: right;
  margin: 0 0 0 10px;
  border-radius: 3px;
  width: 30px;
  height: 30px;
}

#message .self .text {
  display: inline-block;
  padding: 0 10px;
  max-width: 80%;
  background-color: #b2e281;
  border-radius: 4px;
  line-height: 30px;
}

#message .self .img {
  display: inline-block;
  height: 100px;
  width: 100px;
  margin-top: 15px;
}

#message .self .username {
  position: relative;
  left: 310px;
  top: 11px;
  margin: 0 0;
  padding: 0 0;
  width: 200px;
  line-height: 15px;
  font-size: 10px;
  color: grey;
}

</style>
