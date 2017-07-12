var element = {
		list: document.querySelector('#list'),
    filename: document.querySelector('#filename'),
    filetype: document.querySelector('#filetype'),
		menu:document.querySelector('.conTextMenu'),
		createBtn: document.querySelector('#createBtn'),
		paths: document.querySelector('#paths'),
		back: document.querySelector('#back'),
		crumbs:document.querySelector('#crumbs')
}
//	右键菜单
document.addEventListener('contextmenu',function(e) {
		element.menu.innerHTML = '';
    element.menu.style.display = 'block';
    element.menu.style.left = e.clientX + 'px';
    element.menu.style.top = e.clientY + 'px';
		if(e.target.tagName.toUpperCase() == 'LI') {
			showContextMenu(element.menu,data.menu.fileMenu);
		} else {
			showContextMenu(element.menu,data.menu.deskMenu);
		}
		resetOffset(element.menu);
		e.preventDefault();
});
document.onmousedown = function() {
	hideContextmenu(element.menu);
}
//阻止默认事件
paths.addEventListener('contextmenu',function(e) {
	e.preventDefault();
	e.stopPropagation();
});
//	窗口大小变化时调整menu位置
window.addEventListener('resize', function(e) {
	resetOffset(element.menu)
});

//	当前所在目录的id,每当视图发生改变时，就是view方法执行时，需要同步该值
var _ID = 0;
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
		if(element.filename.value == '') {
			alert('请输入名字')
			return
		};
		addData({
			pid:_ID,
			type: element.filetype.value,
			name: element.filename.value
		});
		view(_ID)
}
