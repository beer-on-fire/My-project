var data = {
	menu:{
		'deskMenu':[
			{
				name:'新建',
				children:[
					{
						callBackName:'createFloder',
						name:'新建文件夹'
					},{
						callBackName:'createTxt',
						name:'新建文本文档'
					},{
						callBackName:'createHtml',
						name:'新建Html'
					}
				]
			},
			{
				name:'刷新(E)'
			},
			{
				name:'排序方式(O)',
				children:[
					{
						callBackName:'timeSort',
						name:'按照时间排序'
					},{
						callBackName:'nameSort',
						name:'按照名称排序'
					},{
						callBackName:'typeSort',
						name:'按照类型排序'
					}
				]
			},
			{
				callBackName:'uploadFile',
				name:'上传文件'
			},
			{
				name:'图形选项',
				children:[
					{
						name:'屏幕适配',
					},
					{
						name:'旋转'
					},
					{
						name:'配置式'
					}
				]
			}
		],
		'fileMenu':[
			{
				name:'打开'
			},
			{
				name:'重命名'
			},
			{
				name:'删除'
			}
		]
	},
	list: [
	    {
	        id: 1,
	        pid: 0,
	        type: 'floder',
	        name: '技术'
	    },
	    {
	        id: 2,
	        pid: 0,
	        type: 'floder',
	        name: '电影'
	    },
	    {
	        id: 3,
	        pid: 0,
	        type: 'floder',
	        name: '音乐'
	    },
	    {
	        id: 4,
	        pid: 0,
	        type: 'floder',
	        name: '图片'
	    },
	    {
	        id: 5,
	        pid: 0,
	        type: 'floder',
	        name: '小说'
	    },
	    {
	        id: 6,
	        pid: 0,
	        type: 'txt',
	        name: 'README'
	    },
	    {
	        id: 7,
	        pid: 1,
	        type: 'floder',
	        name: '前端'
	    },
	    {
	        id: 8,
	        pid: 1,
	        type: 'floder',
	        name: '后端'
	    },
	    {
	        id: 9,
	        pid: 7,
	        type: 'floder',
	        name: 'javascript'
	    },
	    {
	        id: 10,
	        pid: 9,
	        type: 'floder',
	        name: 'ECMAScript'
	    },
	    {
	        id: 11,
	        pid: 10,
	        type: 'floder',
	        name: 'ECMAScript2015'
	    }
	]
};
