<template>
  <div class="manage">
    <el-container>
      <el-header>
        <el-button class="back-btn" type="text" @click="toPage('/')">
          <i class="el-icon-arrow-left"></i>
          返回
        </el-button>
        <div class="title">资源中心</div>
      </el-header>
      <el-container class="manage-container">
        <el-aside width="150px">
          <div class="menu">
            <div class="menu-cell">资源管理</div>
            <div class="menu-cell" level="2" @click="changePage('VideoManage')">
              视频管理
            </div>
            <div class="menu-cell" level="2" @click="changePage('ImgManage')">
              图片管理
            </div>
            <div class="menu-cell" level="2" @click="changePage('FileManage')">
              文件管理
            </div>
          </div>

          <div class="menu">
            <div class="menu-cell">电子签名</div>
            <div class="menu-cell" level="2" @click="changePage('SignManage')">
              签名管理
            </div>
          </div>
        </el-aside>
        <el-main>
          <div class="list-container">
            <component v-bind:is="pageName"></component>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'managePage',
    components: {
      VideoManage: () =>
        import(/* webpackChunkName: "manage" */ './videoManage'),
      ImgManage: () => import(/* webpackChunkName: "manage" */ './imgManage'),
      FileManage: () => import(/* webpackChunkName: "manage" */ './fileManage'),
      SignManage: () => import(/* webpackChunkName: "manage" */ './signManage'),
    },
    data() {
      return {
        pageName: 'VideoManage',
      }
    },
    methods: {
      toPage(path) {
        console.log(path)
        this.$router.push({
          path,
        })
      },
      changePage(name) {
        this.pageName = name
      },
    },
  }
</script>
<style scoped lang="scss">
  .manage {
    padding: 0 30px 30px;
    text-align: center;
  }
  .el-header {
    position: relative;
    padding: 0;
    height: 80px !important;
    line-height: 80px;
    .back-btn {
      position: absolute;
      left: 0;
      top: 20px;
      height: 40px;
      width: 100px;
      border-radius: 2px;
      color: white;
      font-weight: bold;
      font-size: 20px;
      text-align: left;
    }
    .title {
      font-size: 40px;
      font-weight: bolder;
      margin-bottom: 10px;
    }
  }
  .manage-container {
    margin-top: 10px;
  }
  .menu {
    .menu-cell {
      width: 100px;
      height: 40px;
      line-height: 40px;
      border-radius: 2px;
      background: white;
      color: #396ced;
      font-weight: bold;
      font-size: 16px;
      &[level='2'] {
        margin-left: 20px;
      }
      &.menu-cell-active {
        background: #e6e6e6;
      }
      & + .menu-cell {
        margin-top: 15px;
      }
    }
    & + .menu {
      margin-top: 30px;
    }
  }
  .el-main {
    width: calc(100vw - 200px);
    height: calc(100vh - 120px);
    background-color: white;
  }
</style>
