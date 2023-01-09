import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080';

function getGoods(keyword) {
    return axios.get('/search', {
        params: {
            keyword
        }
    });
}

const getCoupon = (goodsId, searchId) => {
    return axios.get('/coupon', {
        params: {
            searchId,
            goodsId
        }
    });
}

export default {
    getGoods,
    getCoupon
}
