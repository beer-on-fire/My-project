var data = {
	menu:{
		'deskMenu':[
			{
				name:'新建(W)',
				children:[
					{
						callBackName:'createFloder',
						name:'新建文件夹'
					},{
						callBackName:'createHtml',
						name:'新建网页'
					},{
						callBackName:'createExcel',
						name:'新建表格'
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
						callBackName:'nameSort',
						name:'按照名称排序'
					},
					{
						name:'按照时间排序',
						children:[
							{
								name:'按时间倒序',
								callBackName:'timeSortB'
							},
							{
								name:'按时间正序',
								callBackName:'timeSortA',
							}
						]
					},{
						callBackName:'typeSort',
						name:'按照类型排序'
					}
				]
			},
			{
				callBackName:'uploadFile',
				name:'上传文件(U)'
			}
		],
		'fileMenu':[
			{
				callBackName:'openFile',
				name:'打开'
			},
			{
				callBackName:'renameFile',
				name:'重命名'
			},
			{
				callBackName:'deleteFile',
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
	        id: 4,
	        pid: 0,
	        type: 'floder',
	        name: '图片'
	    },
	    {
	        id: 5,
	        pid: 0,
	        type: 'excel',
	        name: '数学'
	    },
	    {
	        id: 6,
	        pid: 0,
	        type: 'html',
	        name: '自由门'
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
