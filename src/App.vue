<script setup>
import {Search} from "@element-plus/icons-vue";
import {ref} from 'vue'
import {ElNotification} from "element-plus";
import GoodsList from "./components/GoodsList.vue";
import api from "./api/index";

const title = '轻松查券'
const input = ref('')
const loading = ref(false)
const goodsList = ref([])

const getSearch = () => {
  if (loading.value === true) {
    return
  }
  const keyword = input.value
  if (keyword === '') {
    warn()
    return
  }
  loading.value = true
  api.getGoods(keyword).then(res => {
    loading.value = false
    goodsList.value = res.data
  }).finally(() => {
    loading.value = false
  })
}

const search = () => {
  getSearch()
}

const warn = () => {
  ElNotification({
    title: '提示',
    message: "请输入关键词",
    type: 'warning'
  });
}

// const goodsWithCoupon = computed(() => {
//   return goodsList.value.filter(item => item.hasCoupon)
// })

const enter = (e) => {
  if (e.keyCode === 13) {
    getSearch()
  }
}

</script>

<template>
  <div class="body">
    <div class="header border">{{ title }}</div>

    <div class="search flex border" style="background-color:rgba(0,0,0,0.1) ">
      <el-input v-model.trim="input" placeholder="请输入商品关键字" @keydown.enter="enter"/>

      <el-button type="primary" @click="search" :icon="Search" :loading="loading">搜索
      </el-button>
    </div>
    <el-empty description="空" v-show="goodsList.length===0"/>
    <div v-show="goodsList.length" class="body">
      <GoodsList class="list" v-for="(good,index) in goodsList" :img="good.goodsThumbnailUrl"
                 :name="good.goodsName"
                 :key="index"
                 :percentage="isNaN(Number((good.couponRemainQuantity/good.couponTotalQuantity*100).toFixed(2)))?0:Number((good.couponRemainQuantity/good.couponTotalQuantity*100).toFixed(2))"
                 :goods-id="good.goodsSign"
                 :search-id="good.searchId"></GoodsList>
    </div>
  </div>
</template>

<style scoped>
/** {*/
/*  border: black solid 1px;*/
/*}*/

.body {
  display: flex;
  flex-direction: column;
}

.list {
  align-self: center;
  width: 50%;
  transition: all 0.3s;
}

.search {
  align-self: center;
  align-items: center;
  width: 50%;
  transition: all 0.3s;
}

.header {
  background-color: #409eff;
  color: #fff;
  text-align: center;
  line-height: 60px;
  width: 50%;
  align-self: center;
  transition: all 0.3s;
}

@media screen and (max-width: 768px) {
  .search {
    width: 100%;
  }

  .header {
    width: 100%;
  }

  .list {
    width: 100%;
  }
}
</style>
