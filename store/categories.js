export const state = () => ({
    articles:[],
});

export const mutations = {
    getCgArticle (state,articles){
        state.articles = articles
    }
};