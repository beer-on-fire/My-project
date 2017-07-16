var element = {
		list: document.querySelector('#list'),
    filename: document.querySelector('#filename'),
    filetype: document.querySelector('#filetype'),
		menu:document.querySelector('.conTextMenu'),
		createBtn: document.querySelector('#createBtn'),
		paths: document.querySelector('#paths'),
		back: document.querySelector('#back'),
		line:document.querySelector('line'),
		crumbs:document.querySelector('#crumbs'),
		fileBtn:document.querySelector('#fileBtn'),
		fileDetail: document.querySelector('#fileDetail'),
		fileDetailCols: document.querySelector('#fileDetailCols'),
		fileWrap:document.querySelector('#fileWrap'),
		uploadFileBtn:document.querySelector('#uploadFileBtn'),
		sortBtn:document.querySelector('#sortBtn'),
		sortMenu:document.querySelector('#sortMenu'),
		nameChosen:document.querySelector('#nameChosen'),
		nameRight:document.querySelector('#nameRight'),
		nameWrong:document.querySelector('#nameWrong'),
		regesiter:document.querySelector('#regesiter'),
		logIn:document.querySelector('#logIn'),
		choseAll:document.querySelector('#choseAll'),
		hasChosen:document.querySelector('#hasChosen')

}
//	右键菜单
document.addEventListener('contextmenu',function(e) {
		e.preventDefault();
		element.menu.innerHTML = '';
    element.menu.style.display = 'block';
    element.menu.style.left = e.clientX + 'px';
    element.menu.style.top = e.clientY + 'px';
		if(e.target.tagName.toUpperCase() == 'LI'||e.target.parentNode.tagName.toUpperCase() == 'LI'||e.target.parentNode.parentNode.tagName.toUpperCase() == 'LI') {
				showContextMenu(element.menu,data.menu.fileMenu);
				//	右键的那个文件夹选中
				var lis = list.children;
				for(var i=0;i<lis.length;i++) {
					lis[i].classList.remove('liActive');
					lis[i].children[1].checked = false;
					lis[i].children[1].style.display = 'none';
				}
				if(e.target.tagName.toUpperCase() == 'LI') {
						e.target.classList.add('liActive');
						e.target.children[1].checked = true;
						rightLi = e.target;
				} else if (e.target.parentNode.tagName.toUpperCase() == 'LI') {
						e.target.parentNode.classList.add('liActive');
						e.target.parentNode.children[1].checked = true;
						rightLi = e.target.parentNode;
				} else if(e.target.parentNode.parentNode.tagName.toUpperCase() == 'LI') {
						e.target.parentNode.parentNode.classList.add('liActive');
						e.target.parentNode.parentNode.children[1].checked =
						rightLi = e.target.parentNode.parentNode;
				}
		} else {
				showContextMenu(element.menu,data.menu.deskMenu);
		}
				resetOffset(element.menu);
});
//阻止默认事件
paths.addEventListener('contextmenu',function(e) {
	e.preventDefault();
	e.stopPropagation();
});
document.onmousedown = function() {
	hideContextmenu(element.menu);
	nameChosen.style.display = 'none';
}
nameChosen.addEventListener('mousedown',function(e) {
	e.stopPropagation();
})
//	窗口大小变化时调整menu位置
window.addEventListener('resize', function(e) {
	resetOffset(element.menu)
});
/**
 * 右键菜单的点击事件
 */
var contextmenuCallback = {
		createFloder:function() {
			addData({
				pid:_ID,
				type: 'floder',
				name: '新建文件夹'
			})
			view(_ID)
		},
		createHtml:function() {
				addData({
					pid:_ID,
					type: 'html',
					name: '新建网页'
				})
				view(_ID)
		},
		createExcel:function() {
				addData({
					pid:_ID,
					type: 'excel',
					name: '新建Excel'
				})
				view(_ID)
		},
		nameSort:function() {
			data.list.sort(function(a, b) {
					if (pinyin.getFullChars(a.name) > pinyin.getFullChars(b.name)) {
							return 1;
					} else {
							return -1;
					}
			});
			view(_ID)
		},
		timeSortB:function() {
			data.list.sort(function(a, b) {
					if (a.id < b.id) {
							return 1;
					} else {
							return -1;
					}
			});
			view(_ID)
		},
		timeSortA:function() {
			data.list.sort(function(a, b) {
					if (a.id > b.id) {
							return 1;
					} else {
							return -1;
					}
			});
			view(_ID)
		},
		typeSort:function() {
				var fileArrs = [];
				var fileArr = [];//	所有的文件夹
				var image = [];//所有的图片
				var video = [];//所有的视频
				var audio = [];//所有的音频
				var text = [];//所有的文本
				var html = [];//所有的网页
				var excel = [];//所有的表格
				for(var i=0;i<data.list.length;i++) {
					switch(data.list[i].type) {
							case 'floder':
								fileArr.push(data.list[i])
								break;
							case 'image':
								image.push(data.list[i])
								break;
							case 'video':
								video.push(data.list[i])
								break;
							case 'audio':
								audio.push(data.list[i])
								break;
							case 'text':
								text.push(data.list[i])
								break;
							case 'html':
								html.push(data.list[i])
								break;
							case 'excel':
								excel.push(data.list[i])
								break;
					}
				}
				fileArr.sort(function(a,b) {
					if(pinyin.getFullChars(a.name) > pinyin.getFullChars(b.name)){
						return 1;
					}
					return -1;
				});
				image.sort(function(a,b) {
					if(pinyin.getFullChars(a.name) > pinyin.getFullChars(b.name)){
						return 1;
					}
					return -1;
				});
				video.sort(function(a,b) {
					if(pinyin.getFullChars(a.name) > pinyin.getFullChars(b.name)){
						return 1;
					}
					return -1;
				});
				audio.sort(function(a,b) {
					if(pinyin.getFullChars(a.name) > pinyin.getFullChars(b.name)){
						return 1;
					}
					return -1;
				});
				text.sort(function(a,b) {
					if(pinyin.getFullChars(a.name) > pinyin.getFullChars(b.name)){
						return 1;
					}
					return -1;
				});
				html.sort(function(a,b) {
					if(pinyin.getFullChars(a.name) > pinyin.getFullChars(b.name)){
						return 1;
					}
					return -1;
				});
				excel.sort(function(a,b) {
					if(pinyin.getFullChars(a.name) > pinyin.getFullChars(b.name)){
						return 1;
					}
					return -1;
				});
				data.list = fileArrs.concat(fileArr,image,audio,video,text,excel,html);
				view(_ID);
		},
		uploadFile:function() {
			fileBtn.click();
			//	上传渲染
			fileBtn.addEventListener('change',function() {
				//	每次点击都会绑定一个change事件,因此可以用事件绑定或者使监听只执行一次就停止
				var file = this.files[0];
				var fileType = file.type.split('/')[0];
				if(!(fileType == 'text'
					||fileType =='image'
					||fileType == 'video'
					||fileType == 'audio'
				)) {
					alert("目前只支持图片、视频、和音频文档的上传");
				}
				addData({
					pid:_ID,
					type:fileType,
					name:file.name,
					newClass:file
				})
				//	需要用一个属性来记录下上传的文件的内容
				view(_ID);
				fileBtn.value = "";
			},{
				once:true
			});
		},
		openFile:function() {
			//	获取到我当前点击的这个的pid
			if(rightLi.item.newClass) {
				openMedia(rightLi.item.newClass,rightLi.item.type)
			} else {
				view(rightLi.item.id)
			}
		},
		deleteFile:function() {
				rightLi.item.pid = -1;
				view(_ID)
		},
		renameFile:function() {
				setTimeout( function(){
					rename(rightLi)
				});
		}
	}


//	当前所在目录的id,每当视图发生改变时，就是view方法执行时，需要同步该值
var _ID = 0;
var selectedLi = null;
//	渲染初始化数据，显示pid为0的数据
view(_ID);
//	返回上一级
element.back.onclick = function() {
		//	返回上一级：获取当前目录的父级的子目录
		var info = getInfo(_ID);
		if(info) {
			view(info.pid)
		}
}
//	创建文件，文件夹
element.createBtn.onclick = function() {
		nameChosen.style.display = 'block';
}
element.nameRight.onclick = function() {
		if(element.filename.value == '') {
			alert('请输入名字')
			return
		};
		addData({
			pid:_ID,
			type: 'floder',
			name: element.filename.value
		});
		view(_ID);
		console.log(chosenX);
		choseAll.checked = false;
}
element.nameWrong.onclick = function() {
		element.filename.value == '';
		nameChosen.style.display = 'none';
}
//	重命名
renameBtn.onclick = function() {
	rename(selectedLi);
}
// 上传文件
uploadFileBtn.onmousedown = contextmenuCallback.uploadFile;
//	排序按钮
var timer;
sortBtn.onmouseover = function() {
	sortMenu.style.display = 'block';
}
sortMenu.onmouseover = function() {
	clearTimeout(timer);
	sortMenu.style.display = 'block';
}
sortBtn.onmouseout = function() {
	timer = setTimeout(function(){
		sortMenu.style.display = 'none';
	},300)
}
sortMenu.onmouseleave = function() {
	sortMenu.style.display = 'none';
}
sortMenu.children[0].onclick = contextmenuCallback.nameSort;
sortMenu.children[1].onclick = contextmenuCallback.timeSortB;
sortMenu.children[2].onclick = contextmenuCallback.typeSort;

//	全选
var nub=0;
var chosenX;
choseAll.onchange = function() {
	// console.log(chosenX);
		var lis = list.children;
		for(var i=0;i<chosenX.length;i++) {
			chosenX[i].checked = this.checked;
			chosenX[i].style.display = this.checked?'block':'none';
			lis[i].className = this.checked?'liActive':'';
			nub = this.checked?chosenX.length:0;
			hasChosen.parentNode.style.display = this.checked?'block':'none';
			hasChosen.innerHTML = nub;
		}
}
