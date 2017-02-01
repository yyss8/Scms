<template>
    <div class='panel panel-default'>
        <div class='panel-heading'>预览</div><br />
        <div class='article-title'>
            <b>{{ title }}</b>
        </div>
        <div class='panel-body' v-html='previewContent'></div>
    </div>
</template>

<script>
    export default {
        props:[
            'title',
            'content'
        ],
        data () {
            return {

            }
        },
        computed:{
            previewContent(){
                const patternObj = {
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
                };

                let content = this.content.replace(/\</g,"&lt;").replace(/\>/g,"&gt;");

                for (let pat in patternObj){
                    switch (pat){
                        case "code":
                            const codeTags = content.match(patternObj[pat].reg);
                            if (codeTags !== null){
                                codeTags.forEach(code => {
                                    let convertedTag = code.replace(patternObj[pat].reg,"$1");
                                    content = content.replace(/\[code](.*?)\[\/code\]/, `<blockquote class='pre-scrollable'>${convertedTag}</blockquote>`);
                                });
                            }
                            break;
                        case "img":
                            const imgTags = content.match(patternObj[pat].reg);
                            if (imgTags !== null){
                                imgTags.forEach(img =>{
                                    const attrib = (img.match(/\[img(.*?)]/))[1];
                                    const url = (img.match(/\](.*?)\[\//))[1];
                                    const alt = attrib.match(/a=\'(.*?)\'/) === null ? "":` alt='${(attrib.match(/a=\'(.*?)\'/))[1]}'`; //更换alt标签
                                    const w = attrib.match(/w=\'(.*?)\'/) === null ? "":` width='${(attrib.match(/w=\'(.*?)\'/))[1]}'`; //更换width标签
                                    const h = attrib.match(/h=\'(.*?)\'/) === null ? "":` height='${(attrib.match(/h=\'(.*?)\'/))[1]}'`; //更换height标签
                                    const imgTag = `<img${alt}${w}${h} src='${url}' />`;
                                    content = content.replace(/\[img.*?].*?\[\/img\]/, imgTag);
                                });
                            }
                            break;
                        case "url":
                            break;
                        default:
                            content = content.replace(patternObj[pat].reg,patternObj[pat].newStr);
                    }
                }

                return content
            }
        }
    }
</script>