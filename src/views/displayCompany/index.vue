<template>
  <div class="img-content">
    <el-button type="primary" class="back-btn" @click="toPage('/home')">
      返回
    </el-button>
    <div @click="handleTypeChange" class="change-btn">{{ typeName }}</div>
    <div class="img-container" v-if="type == 1">
      <img src="../../assets/images/1.jpg" />
    </div>
    <div class="position-container" v-else>
      <div class="img-container" v-if="position == 'all'">
        <img src="../../assets/images/2.jpg" />
        <div
          class="position position-1"
          @click="handlePositionChange('1')"
        ></div>
        <div
          class="position position-2"
          @click="handlePositionChange('2')"
        ></div>
      </div>
      <div class="img-container" v-else-if="position == '1'">
        <img src="../../assets/images/3.jpg" />
        <div
          class="position position-3"
          @click="handlePositionChange('all')"
        ></div>
      </div>
      <div class="img-container" v-else-if="position == '2'">
        <img src="../../assets/images/3.jpg" />
        <div
          class="position position-4"
          @click="handlePositionChange('all')"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'display3D',
    data() {
      return {
        type: 1, // 1图片 2 场景
        position: 'all', // 场景切换
      }
    },
    computed: {
      typeName() {
        return this.type === 1 ? '3D全景图' : '俯瞰图'
      },
    },
    methods: {
      toPage(path) {
        this.$router.push({
          path,
        })
      },
      handleTypeChange() {
        this.type = this.type === 1 ? 2 : 1
      },
      handlePositionChange(position) {
        this.position = position
      },
    },
  }
</script>
<style scoped lang="scss">
  .img-content {
    position: relative;
    width: 100vw;
    height: 100vh;
    .back-btn {
      position: absolute;
      left: 30px;
      top: 30px;
      z-index: 2;
    }
    .change-btn {
      position: absolute;
      bottom: 30px;
      right: 30px;
      width: 100px;
      height: 80px;
      line-height: 80px;
      font-size: 20px;
      border: 1px solid #e6e6e6;
      border-radius: 5px;
      z-index: 2;
    }
  }
  .img-container {
    position: relative;
    width: 100%;
    height: 100%;
    img {
      display: block;
      width: 100%;
    }
    .position {
      position: absolute;
      width: 100px;
      height: 100px;
      &.position-1 {
        left: 50px;
        top: 50px;
        background: red;
      }
      &.position-2 {
        left: 150px;
        top: 250px;
        background: black;
      }
      &.position-3 {
        right: 50;
        bottom: 150px;
        background: yellow;
      }
      &.position-4 {
        right: 50;
        bottom: 150px;
        background: green;
      }
    }
  }
</style>
