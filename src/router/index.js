import Vue from "vue";
import VueRouter from "vue-router";
import Comment from "../views/comment/Comment";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/mall"
  },
  // 商城
  {
    path: "/mall",
    component: Comment,
    children: [
      {
        path: "",
        name: "mall",
        component: () => import("../views/mall/Mall"),
        meta:{
          title:"商城"
        }
      }
    ]
  },
  // 分类
  {
    path: "/classify",
    component: Comment,
    children: [
      {
        path: "",
        name: "classify",
        component: () => import("../views/classify/Sort"),
        meta:{
          title:"分类"
        }
      }
    ]
  },
  // 购物车
  {
    path: "/shoppingCar",
    component: Comment,
    children: [
      {
        path: "",
        name: "shoppingCar",
        component: () => import("../views/shoppingCar/ShoppingCar"),
        meta:{
          title:"购物车"
        }
      }
    ]
  },
  // 我的
  {
    path: "/me",
    component: Comment,
    children: [
      {
        path: "",
        name: "me",
        component: () => import("../views/me/Me"),
        meta:{
          title:"我的"
        }
      }
    ]
  },
  // 登录注册
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/Login"),
    meta:{
      title:"登录/注册"
    }
  },
  // 地址管理
  {
    path: "/address",
    name: "address",
    component: () => import("../views/address/Address"),
    meta:{
      title:"地址管理"
    }
  },
    // 地址编辑
  {
    path: "/addressEdit",
    name: "addressEdit",
    component: () => import("../views/addressEdit/AddressEdit"),
    meta:{
      title:"地址编辑"
    }
  },
  // 收藏商品
  {
    path: "/collection",
    name: "collection",
    component: () => import("../views/collection/Collection"),
    meta:{
      title:"收藏商品"
    }
  },
  // 定位
  {
    path: "/positioning",
    name: "positioning",
    component: () => import("../views/positioning/Positioning"),
    meta:{
      title:"定位"
    }
  },
  // 最近浏览
  {
    path: "/browse",
    name: "browse",
    component: () => import("../views/browse/Browse"),
    meta:{
      title:"最近浏览"
    }
  },
  // 评价中心
  {
    path: "/evaluation",
    name: "evaluation",
    component: () => import("../views/evaluation/Evaluation"),
    meta:{
      title:"评价中心"
    }
  },
  // 评论详情
  {
    path: "/evaluationDetails",
    name: "evaluationDetails",
    component: () => import("../views/evaluationDetails/EvaluationDetails"),
    meta:{
      title:"评论详情"
    }
  },
  // 评论晒单
  {
    path: "/discuss",
    name: "discuss",
    component: () => import("../views/discuss/Discuss"),
    meta:{
      title:"评论晒单"
    }
  },
  // 我的订单
  {
    path: "/order",
    name: "order",
    component: () => import("../views/order/Order"),
    meta:{
      title:"我的订单"
    }
  },
  // 全部订单
  {
    path: "/allOrder",
    name: "allOrder",
    component: () => import("../views/allOrder/AllOrder"),
    meta:{
      title:"全部订单"
    }
  },
  // 个人资料
  {
    path: "/personalData",
    name: "personalData",
    component: () => import("../views/personalData/PersonalData"),
    meta:{
      title:"个人资料"
    }
  },
  // 订单结算
  {
    path: "/ordersettlement",
    name: "ordersettlement",
    component: () => import("../views/orderSettlement/Ordersettlement"),
    meta:{
      title:"订单结算"
    }
  },
  // 商品详情
  {
    path: "/goodsDetails",
    name: "goodsDetails",
    component: () => import("../views/goodsDetails/GoodsDetails"),
    meta:{
      title:"商品详情"
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,

});


router.beforeEach((to, from, next) => {
  document.title=to.meta.title
  next()
});

export default router;
