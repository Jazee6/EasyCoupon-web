<template>
  <div class="card flex border" v-loading="loading">

    <el-image :src="img" fit="scale-down" loading="lazy" class="img imgBorder">
      <div></div>
    </el-image>

    <div class="flex" style="flex-direction: column;width: 100%">
      <div class="titleName">
        {{ name }}
      </div>

      <div class="flex margin">
        <span style="white-space: nowrap">优惠券剩余</span>
        <el-progress :percentage="percentage" style="width: 100%;margin-left: 8px"/>
      </div>

      <el-button round @click="getCoupon(goodsId,searchId)" class="margin">查看</el-button>
    </div>


  </div>

</template>

<script setup>
import api from "../api/index"
import {ref} from "vue";

const loading = ref(false);

defineProps({
  name: String,
  img: String,
  percentage: Number,
  goodsId: String,
  searchId: String
})

const getCoupon = (goodsId, searchId) => {
  loading.value = true;
  api.getCoupon(goodsId, searchId).then(res => {
    loading.value = false
    const sUserAgent = navigator.userAgent.toLowerCase();
    if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
      window.open(res.data[0].schemaUrl)
    } else {
      window.open(res.data[0].url)
    }
  }).finally(() => {
    loading.value = false
  })
}


</script>

<style scoped>
.card {
  height: 200px;
}

.img {
  min-width: 200px;
}

@media screen and (max-width: 768px) {
  .card {
    height: 150px;
  }

  .img {
    min-width: 150px;
  }
}
</style>