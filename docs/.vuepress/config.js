module.exports = {
    "title": "zhairuihao的blog 😀😀😀😀😀😀",
    "description": "know more and do better",
    "dest": "html",
    "head": [
        [
            "link",
            "link",
            {
                "rel": "icon",
                "href": "/favicon.ico"
            }
        ],
        [
            "meta",
            {
                "name": "viewport",
                "content": "width=device-width,initial-scale=1,user-scalable=no"
            }
        ]
    ],
    "theme": "reco",
    "themeConfig": {
        "noFoundPageByTencent": false,
        "nav": [
            {
                "text": "Home",
                "link": "/",
                "icon": "reco-home"
            },
            {
                "text": "TimeLine",
                "link": "/timeline/",
                "icon": "reco-date"
            },
            {
                "text": "Contact",
                "icon": "reco-message",
                "items": [
                    {
                        "text": "GitHub",
                        "link": "https://github.com/zhairuihao",
                        "icon": "reco-github"
                    },
                    {
                        "text": "我的故事",
                        "link":"http://zhairuihao.show/my-story/index.html",
                        "icon": "reco-other"
                    }
                ]
            }
        ],
        "type": "blog",
        "blogConfig": {
            "category": {
                "location": 2,
                "text": "Category"
            },
            "tag": {
                "location": 3,
                "text": "Tag"
            }
        },
        "friendLink": [
            {
                "title": "xy的设计素材",
                "desc": "A simple material site.",
                "link": "http://xy.zhairuihao.show"
            },
            {
                "title": "小郭子blog",
                "desc": "小郭子blog",
                "link": "https://www.cnblogs.com/gxr-tygy",
                "logo":"reco-bokeyuan"
            },
            {
                "title": "午后南杂",
                "desc": "Enjoy when you can, and endure when you must.",
                "email": "1156743527@qq.com",
                "link": "https://www.recoluan.com"
            },
            {
                "title": "vuepress-theme-reco",
                "desc": "A simple and beautiful vuepress Blog & Doc theme.",
                "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
                "link": "https://vuepress-theme-reco.recoluan.com"
            },

        ],
        "logo": "/logo.png",
        "search": true,
        "searchMaxSuggestions": 10,
        "sidebar": "auto",
        "lastUpdated": "Last Updated",
        "author": "zhairuihao",
        "authorAvatar": "/avatar.jpg",
        // 备案号
        record: '陇ICP备20001916号',
        recordLink: 'http://www.beian.miit.gov.cn/',
        "startYear": "2020",
        // vssueConfig: {
        //     platform: 'github',
        //     owner: 'zhairuihao',
        //     repo: 'vuepress-reco',
        //     clientId: '4eeb9cd2f7249af6d11e',
        //     clientSecret: 'abe80266714d4500634a99e7dcb7ca9feaf448c8',
        // },
        valineConfig: {
            appId: '6ebOChfHw45AFr9BSyg79TF0-gzGzoHsz',// your appId
            appKey: 'b2FAr6adnShjHKnMjRAffspz', // your appKey
            visitor: true // 阅读量统计
        }
        // 密钥
//        keyPage: {
//          keys: ['c4ca4238a0b923820dcc509a6f75849b'], //md5 32位小写 1
//          color: '#42b983', // 登录页动画球的颜色
//          lineColor: '#42b983', // 登录页动画线的颜色
//        },
    },
    "markdown": {
        "lineNumbers": true
    },
    "frontmatter": {"bgImage": "/home-bg.jpg"}
}
