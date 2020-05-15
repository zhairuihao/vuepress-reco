module.exports = {
    "title": "万事不如杯在手,一年几见月当头",
    "description": "who else em ?\n"
        // +
        // "你是无意穿堂风，偏偏孤倨引山洪\n" +
        // "我是垂眉摆渡翁，却独独偏爱侬。\n" +
        // "你应该是一场梦，而我是一场风。\n" +
        // "——《我的一个道姑朋友》\""
    ,
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
        "record": "1.2.3.4",
        "startYear": "2020",
        vssueConfig: {
            platform: 'github',
            owner: 'zhairuihao',
            repo: 'vuepress-reco',
            clientId: '4eeb9cd2f7249af6d11e',
            clientSecret: 'abe80266714d4500634a99e7dcb7ca9feaf448c8',
        },
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
    frontmatter: {bgImage: "/home-bg.jpg"}
}