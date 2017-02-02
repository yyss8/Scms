export default {
    state:{
        articles:{}
    },
    mutations: {
      getCgArticle (state,articles){
          state.articles = articles
      }
    }
}