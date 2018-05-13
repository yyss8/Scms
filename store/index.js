export const state = () => ({
    articleNum:0,
    articles:[],
    user:{},
    isLogin:false,
    headerLink:[],
    sideBarComps : {},
    blogTitle:"Blog",
    postCategories:[],
    screenWidth:0,
    currentArticle:{},
    blogScnTitle:"A Scms Blog",
    blogDescription:"",
    blogKyWrds:"",
    blogAuthor:"",
    usersControl:{}
});

export const mutations = {
    login (state,user) {
        state.user = user;
        state.isLogin = true;
    },
    loadSetting (state, setting){
        state.headerLink = setting.headerLink;
        state.sideBarComps = setting.sideBarComps;
        state.blogTitle = setting.title;
        state.postCategories = setting.categories;
        state.blogScnTitle = setting.scnTitle;
        state.blogDescription = setting.descri;
        state.blogKyWrds = setting.keywords;
        state.blogAuthor = setting.author;
        state.usersControl = setting.usersControl
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
    },
    updateGeneralSetting (state,settings){
        state.blogTitle = settings.title;
        state.blogScnTitle = settings.scnTitle;
        state.blogDescription = settings.description;
        state.blogKyWrds = settings.keywords;
        state.blogAuthor = settings.author;
    },
    updateHeaderLinks (state,links){
        state.headerLink = links;
    },
    updateSidebar (state,sidebars){
        state.sideBarComps = sidebars;
    },
    updateCategories (state,cg) {
        state.postCategories = cg;
    },
    updateUsersControl (state,setting){
        state.usersControl = setting;
    },
    updateUserInfo(state,infos){
        state.user.email = infos.email;
        state.user.password = infos.password;
    }
};

export const actions = {
    nuxtServerInit({commit},{req}){
        commit('loadSetting',req.preLoad.settings);
        if (req.session.user !== undefined) {
            commit('login',req.session.user);
        }

        if (req.originalUrl.substring(0,6) === "/pages"){
            commit('getArticleNum',req.preLoad.articles);
        }
    }
};

export const strict = false;