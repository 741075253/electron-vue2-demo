<template>
  <div class="manage">
    <img src="@/assets/images/manage-bg.png" class="bg" />
    <el-container style="position: relative; z-index: 1">
      <el-header>
        <div class="back-btn" @click="toPage('/home')">
          <i class="iconfont icon-backward"></i>
        </div>
        <div class="title">资源中心</div>
      </el-header>
      <el-container class="manage-container">
        <el-aside width="200px">
          <el-menu
            :default-active="code"
            :unique-opened="true"
            @select="handleMenuSelect"
          >
            <el-submenu
              v-for="item in menuData"
              :key="item.value"
              :index="item.value"
            >
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.label }}</span>
              </template>
              <template v-if="item.children && item.children.length">
                <el-menu-item
                  v-for="child in item.children"
                  :key="child.value"
                  :index="child.value"
                >
                  {{ child.label }}
                </el-menu-item>
              </template>
            </el-submenu>
          </el-menu>
          <!-- <div class="menu">
            <div class="menu-cell">党建资源管理</div>
            <div class="menu">
              <div
                class="menu-cell"
                :class="{ active: code === 1 }"
                @click="changePage('VideoManage', 1, '1')"
              >
                视频管理
              </div>
              <div
                class="menu-cell"
                :class="{ active: code === 2 }"
                @click="changePage('ImgManage', 2, '1')"
              >
                图片管理
              </div>
              <div
                class="menu-cell"
                :class="{ active: code === 3 }"
                @click="changePage('FileManage', 3, '1')"
              >
                文件管理
              </div>
            </div>
          </div>
          <div class="menu">
            <div class="menu-cell">内控资源管理</div>
            <div class="menu">
              <div
                class="menu-cell"
                :class="{ active: code === 4 }"
                @click="changePage('VideoManage', 4, '2')"
              >
                视频管理
              </div>
              <div
                class="menu-cell"
                :class="{ active: code === 5 }"
                @click="changePage('ImgManage', 5, '2')"
              >
                图片管理
              </div>
              <div
                class="menu-cell"
                :class="{ active: code === 6 }"
                @click="changePage('FileManage', 6, '2')"
              >
                文件管理
              </div>
            </div>
          </div>
          <div class="menu">
            <div class="menu-cell">电子签名</div>
            <div class="menu">
              <div
                class="menu-cell"
                :class="{ active: code === 7 }"
                level="2"
                @click="changePage('SignManage', 7)"
              >
                签名管理
              </div>
            </div>
          </div> -->
        </el-aside>
        <el-main>
          <component v-bind:is="pageName" :type="type"></component>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  const menuData = [
    {
      label: '党建管理',
      value: '1',
      icon: 'iconfont icon-dangjian_dangzhangdanggui',
      children: [
        {
          label: '视频管理',
          value: '1-1',
          component: 'VideoManage',
          type: '1',
        },
        {
          label: '图片管理',
          value: '1-2',
          component: 'ImgManage',
          type: '1',
        },
        {
          label: '文件管理',
          value: '1-3',
          component: 'FileManage',
          type: '1',
        },
      ],
    },
    {
      label: '内控管理',
      value: '2',
      icon: 'iconfont icon-minganfangkong',
      children: [
        {
          label: '视频管理',
          value: '2-1',
          component: 'VideoManage',
          type: '2',
        },
        {
          label: '图片管理',
          value: '2-2',
          component: 'ImgManage',
          type: '2',
        },
        {
          label: '文件管理',
          value: '2-3',
          component: 'FileManage',
          type: '2',
        },
      ],
    },
    {
      label: '签名管理',
      value: '3',
      icon: 'iconfont icon-dianziqianmingx',
      children: [
        {
          label: '电子签名',
          value: '3-1',
          component: 'SignManage',
          type: '3',
        },
      ],
    },
  ]
  import common from '@/mixins/common'
  export default {
    name: 'managePage',
    mixins: [common],
    components: {
      VideoManage: () =>
        import(/* webpackChunkName: "manage" */ './videoManage'),
      ImgManage: () => import(/* webpackChunkName: "manage" */ './imgManage'),
      FileManage: () => import(/* webpackChunkName: "manage" */ './fileManage'),
      SignManage: () => import(/* webpackChunkName: "manage" */ './signManage'),
    },
    data() {
      return {
        menuData: menuData,
        pageName: 'VideoManage',
        code: '1-1',
        type: '1', // 资源管理类型 1党建 2内控
      }
    },
    methods: {
      changePage(name, code, type) {
        this.pageName = name
        this.type = type || ''
        this.code = code
      },
      handleMenuSelect(index) {
        const parentVal = index.split('-')[0]
        const parent = this.menuData.find((item) => item.value == parentVal)
        if (parent) {
          const child = parent?.children.find((item) => item.value == index)
          if (child) {
            this.type = child.type
            this.pageName = child.component
          }
        }
      },
    },
  }
</script>
<style scoped lang="scss">
  .manage {
    position: relative;
    text-align: center;
    // background: url('../../assets/images/manage-bg.png') no-repeat 100%;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    .bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
  .back-btn {
    color: #333;
  }
  .el-header {
    position: relative;
    padding: 0;
    height: 80px !important;
    line-height: 80px;

    // background: linear-gradient(to right, #0248f8, #5583f7);
    .title {
      font-size: 40px;
      font-weight: bolder;
      margin-bottom: 10px;
      color: #333;
    }
  }
  .el-aside {
    overflow-y: auto;
    height: 100vh;
  }
  .el-menu::v-deep {
    border-right: 0;
    background-color: transparent;
    .el-menu {
      background-color: transparent;
    }
    .el-submenu__title {
      .iconfont {
        color: #303133;
      }
      & > span {
        margin-left: 10px;
      }
    }
  }
  .menu {
    padding-left: 30px;
    .menu-cell {
      box-sizing: border-box;
      position: relative;
      padding: 0 10px;
      width: 120px;
      height: 40px;
      line-height: 40px;
      border-radius: 2px;
      color: white;
      font-weight: bold;
      font-size: 16px;
      cursor: pointer;
      border-radius: 40px;
      &.active {
      }
      & + .menu-cell {
        margin-top: 15px;
      }
    }
    & + .menu {
      margin-top: 20px;
    }
    & > .menu {
      margin-top: 15px;
      // height: 0;
      &.active {
        height: auto;
        transition: 0.3 all ease-in;
      }
    }
  }
  .el-main {
    margin-right: 30px;
    width: calc(100vw - 230px);
    height: calc(100vh - 120px);
    background-color: transparent;
    border-radius: 5px;
  }
</style>
