import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    articleNum:0,
    articles:[],
    user:"",
    isLogin:false,
    headerLink:[
        {
            name:"",
            url:"",
            hasSub:false,
            subLinks:[
                {
                    name:"",
                    url:""
                }
            ]
        }
    ],
    sideBarComps : {
        SelfMotto : {
            display : false,
            content : "",
            title : "",
            showTitle : false
        },
        "SelfIntro" : {
            showName:false,
            showTitle:false,
            title:"个人介绍",
            name:"",
            display : false,
            showEmail : false,
            email : "",
            showLocation : false,
            location : "",
            showIntros : false,
            intros : ""
        },
        QuickBtns : {
            display : false,
            showTitle : false,
            title:"",
            quickPost : false
        }
    },
    blogTitle:"Blog",
    postCategories:[],
    screenWidth:0
  },
  mutations: {
      login (state,user) {
          state.user = user;
          state.isLogin = true;
      },
      loadSetting (state,setting){
          state.headerLink = setting.headerLink;
          state.sideBarComps = setting.sideBarComps;
          state.blogTitle = setting.title;
          state.postCategories = setting.categories;
      },
      getArticleNum (state,data){
          state.articleNum = data.num;
          state.articles = data.articles.reverse();
      },
      getArticle (state,articles){
          state.articles = articles.reverse();
      }
  },
  actions:{
      nuxtServerInit({commit},{req}){
          
          if (req.session.user !== undefined) {
              commit('login',req.session.user);
          }
          commit('loadSetting',req.preLoad.settings);
          commit('getArticleNum',req.preLoad.articles);
      }
  }
});

export default  store;