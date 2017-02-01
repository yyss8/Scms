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
    screenWidth:0,
    currentArticle:{},
    patternObj:{
        code:{
            reg:/\[code\](.*?)\[\/code]/g
        },
        br:{
            reg:/(?:\r\n|\r|\n)/g,
            newStr:"<br />"
        },
        b:{
            reg:/\[b\](.*?)\[\/b\]/g,
            newStr:"<b>$1</b>"
        },
        img:{
            reg:/\[img(.*?)](.*?)\[\/img\]/g
        },
        color:{
            reg:/\[c='(.*?)'\](.*?)\[\/c\]/g,
            newStr:"<span style='color:$1'>$2</span>"
        },
        size:{
            reg:/\[s='(.*?)'\](.*?)\[\/s\]/g,
            newStr:"<span style='font-size:$1'>$2</span>",
        },
        i:{
            reg:/\[i\](.*?)\[\/i\]/g,
            newStr:"<i>$1</i>"
        },
        quote:{
            reg:/\[quote](.*?)\[\/quote]/g,
            newStr:"<blockquote>$1</blockquote>"
        },
        u:{
            reg:/\[u\](.*?)\[\/u\]/g,
            newStr:"<u>$1</u>"
        }
    }
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
      },
      loadArticleDetail (state,article){
          state.currentArticle = article;
      }
  },
  actions:{
      nuxtServerInit({commit},{req}){
          
          commit('loadSetting',req.preLoad.settings);

          if (req.session.user !== undefined) {
              commit('login',req.session.user);
          }

          if (req.path.includes('/pages')){
              commit('getArticleNum',req.preLoad.articles);
          }
      }
  }
});

export default  store;