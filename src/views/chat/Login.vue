<template>
  <el-container>
    <el-main>
      <div class="login">
        <div class="container">
          <el-form
            ref="loginForm"
            :rules="rules"
            :model="loginForm"
            label-width="80px"
          >
            <h1 class="logintitle">Tim</h1>
            <div class="form-control">
              <input
                type="text"
                v-model="loginForm.username"
                auto-complete="off"
                placeholder="请输入用户名"
              />
            </div>
            <div class="form-control">
              <input
                type="password"
                v-model="loginForm.password"
                auto-complete="off"
                placeholder="请输入密码"
              />
            </div>
            <div class="form-control">
              <input
                type="text"
                @keydown.enter="submitLogin"
                v-model="loginForm.code"
                auto-complete="off"
                placeholder="请输入验证码"
                style="width: 150px; display: inline-block"
              />
              <img
                :src="verifyCode"
                title="点击切换验证码"
                @click="changeverifyCode"
              />
            </div>
            <div>
              <el-button
                @click="showRegistryDialog"
                style="width: 45%; margin-right: 15px"
                >注册</el-button
              >
              <el-button
                type="primary"
                style="width: 45%"
                @click="submitLogin"
                v-loading.fullscreen.lock="fullscreenLoading"
                >登录</el-button
              >
            </div>
          </el-form>
        </div>
      </div>
    </el-main>
    <el-dialog
      title="新用户注册"
      :before-close="closeRegisterDialog"
      :visible.sync="registerDialogVisible"
      width="30%"
    >
      <el-form
        :model="registerForm"
        status-icon
        :rules="registerRules"
        ref="registerForm"
      >
        <el-form-item
          label="用户昵称："
          :label-width="formLabelWidth"
          prop="nickname"
        >
          <el-input
            v-model="registerForm.nickname"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="登录用户名："
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input
            v-model="registerForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码："
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input
            type="password"
            v-model="registerForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码："
          :label-width="formLabelWidth"
          prop="checkPass"
        >
          <el-input
            type="password"
            v-model="registerForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户头像：" :label-width="formLabelWidth">
          <el-upload
            action="/ossFileUpload?module=group-chat"
            ref="upload"
            list-type="picture-card"
            :class="{ disabled: uploadDisabled }"
            :before-upload="beforeAvatarUpload"
            :file-list="fileList"
            :on-progress="onProgress"
            :on-success="imgSuccess"
            :on-error="imgError"
            :on-remove="imgRemove"
          >
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传不超过4MB的图片(可使用默认头像！)
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="submitRegisterForm('registerForm')"
          style="width: 100%"
          >注册</el-button
        >
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    var validateNickname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入昵称"));
      }
      //检查昵称是否重复
      this.getRequest("user/checkNickname?nickname=" + value).then((resp) => {
        if (resp != 0) {
          callback(new Error("该昵称已被注册"));
        } else {
          callback();
        }
      });
    };
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      }
      //检查用户名是否重复
      this.getRequest("/user/checkUsername?username=" + value).then((resp) => {
        if (resp != 0) {
          callback(new Error("该用户名已被注册"));
        } else {
          callback();
        }
      });
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.checkPass !== "") {
          this.$refs.registerForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
        code: "",
      },
      verifyCode: "/verifyCode",
      checked: true,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      fullscreenLoading: false,
      //注册表单相关
      registerDialogVisible: false,
      formLabelWidth: "120px",
      registerForm: {
        nickname: "",
        username: "",
        password: "",
        checkPass: "",
        userProfile: "default_head.jpg",
      },
      registerRules: {
        nickname: [{ validator: validateNickname, trigger: "blur" }],
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      uploadDisabled: false,
      //上传的文件信息列表
      fileList: [],
    };
  },
  methods: {
    submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.fullscreenLoading = true;
          this.postKeyValueRequest("/doLogin", this.loginForm).then((resp) => {
            setTimeout(() => {
              this.fullscreenLoading = false;
            }, 1000);
            if (resp) {
              //保存当前用户到vuex
              this.$store.state.currentUser = resp.obj;
              //保存登录用户到sessionStorage中
              window.sessionStorage.setItem("user", JSON.stringify(resp.obj));
              let path = this.$route.query.redirect;
              this.$router.replace(
                path == "/" || path == undefined ? "/chatroom" : path
              );
            } else {
              this.changeverifyCode();
            }
          });
        } else {
          this.$message.error("用户名,密码和验证码都不能为空！");
          return false;
        }
      });
    },
    changeverifyCode() {
      this.verifyCode = "/verifyCode?time=" + new Date();
    },
    showRegistryDialog() {
      this.registerDialogVisible = true;
    },
    /**
     *       图片上传的方法
     */
    //上传前
    beforeAvatarUpload(file) {
      let isLt4M = file.size / 1024 / 1024 < 4;

      if (!isLt4M) {
        this.$message.error("上传头像图片大小不能超过 4MB!");
      }
      return isLt4M;
    },
    // 上传中
    onProgress(event, file, fileList) {
      this.uploadDisabled = true;
    },
    // 图片上传成功
    imgSuccess(response, file, fileList) {
      this.uploadDisabled = true;
      this.registerForm.userProfile = response; //将返回的路径给表单的头像属性
      console.log("图片url为：" + this.registerForm.userProfile);
    },
    // 图片上传失败
    imgError(err, file, fileList) {
      this.$message.error("上传失败");
      this.uploadDisabled = false;
    },
    //移除图片
    imgRemove(file, fileList) {
      this.uploadDisabled = false;
    },
    closeRegisterDialog(done) {
      this.registerForm = {
        //清空表单
        nickname: "",
        username: "",
        password: "",
        checkPass: "",
        userProfile: "",
      };
      //this.$refs.upload.clearFiles();//清除上传组件的图片
      done(); //关闭对话框
    },
    //提交注册操作
    submitRegisterForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.postRequest("/user/register", this.registerForm).then((resp) => {
            if (resp) {
              this.registerDialogVisible = false;
              location.reload(); //刷新页面，清空注册界面的上传组件中的图片
            }
          });
        } else {
          this.$message.error("请正确填写信息！");
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
.el-main {
  padding: 0 !important;
}

.login {
  background-size: 100%;
  /* color: #fff; */
  font-family: "Muli", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  padding-right: 200px;
}

.container {
  background-color: rgb(255, 255, 255);
  padding: 20px 40px;
  border-radius: 5px;
}

.logintitle {
  text-align: center;
  margin-bottom: 30px;
}

.container a {
  text-decoration: none;
  /* color: lightblue; */
}


.form-control {
  position: relative;
  margin: 20px 0 40px;
  width: 300px;
}

.form-control input {
  background-color: transparent;
  border: 0;
  border-bottom: 2px #fff solid;
  display: block;
  width: 100%;
  padding: 15px 0;
  font-size: 18px;
}

.form-control input:focus,
.form-control input:valid {
  outline: 0;
  border-bottom-color: lightblue;
}
</style>
