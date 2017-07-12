//	设置右键菜单内容数据
function showContextMenu(container,dataList) {
	dataList.forEach(function(item) {
		var li = document.createElement('li');
		var p = document.createElement('p');
		li.innerHTML = `<p>${item.name}</p>`;
		li.onmouseover = function(e) {
			var lis = this.parentNode.children;
			for (var i=0; i<lis.length; i++) {
          lis[i].className = '';
      }
			this.className = 'menuActive';
			if(!(li.children.length == 2)) {
				var uls = this.parentNode.querySelectorAll('ul');
				for(var i=0;i<uls.length;i++) {
					uls[i].parentNode.removeChild(uls[i]);
				}
				if (item.children) {
            var ul = document.createElement('ul');
            this.appendChild(ul);
            ul.style.display = 'block';
            ul.className = 'subMenu';
						resetUlOffset(ul);
            showContextMenu(ul, item.children);
        }
			}
		};
		li.onmouseout = function(e) {
        if (!(li.children.length == 2)) {
            this.className = '';
        }
   	};
   	container.appendChild(li);
	})
}
function hideContextmenu(container) {
    container.style.display = 'none';
}
//	在窗口大小变化时调整ul位置
function resetUlOffset(ul){
	var rect = ul.getBoundingClientRect();
	if(rect.right > document.documentElement.clientWidth){
		ul.style.left = -(rect.width - 5) + "px";
	}
	if(rect.bottom > document.documentElement.clientHeight){
		ul.style.top = (ul.offsetParent.clientHeight - rect.height) + "px";
	}
}
//	设置menu出现时位置
function resetOffset(menu) {
	var x = css(menu,'left');
	var y = css(menu,'top');
	var maxX = document.documentElement.clientWidth -  menu.offsetWidth;
	var maxY = document.documentElement.clientHeight -  menu.offsetHeight;
	menu.style.left = Math.min(maxX,x) + "px";
	menu.style.top = (y  > maxY? y  - menu.offsetHeight:y) + "px";
}

/**
 * 	渲染页面文件列表
 *@param pid 要渲染的文件数据的pid
 */
function view(pid) {
	//	只要调用view方法，就把_ID设置成我们要的view的pid
	//	记录_ID的值，以便其他地方的使用，记录当view过后，当前所在的目录的id
	_ID = pid;

	var dataList = getChildren(_ID);

	element.list.innerHTML = '';
	dataList.forEach(function(item) {
		var newname = item.name;
		if (item.extname) {
				newname += `(${item.extname})`;
		}
	    var li = document.createElement('li');
	    li.className = item.type;
			li.innerHTML = `<p>${newname}</p>`;
			li.ondblclick = function() {
				view(item.id)
			}
	    element.list.appendChild(li);
	});
/**
 * 导航列表
 *由三个部分组成：顶层+所有父级+当前目录
 */
	var pathList = getParents(_ID);
	// console.log(_ID,pathList);
	//	一开始是在id=0的目录下，所以，pathList为空数组，在id=1的数组下时，父级为id=0的目录，所以pathList还为空数组
	element.crumbs.innerHTML = '';
	//	单独顶级点击
	var li = document.createElement('li');
	li.innerHTML = '<a href="javascript:;">根目录</a>';
	li.onclick = function() {
		view(0);
	}
	element.crumbs.appendChild(li);
	//	所有的父级点击
	pathList.forEach(function(item) {
		var li = document.createElement('li');
		li.innerHTML = `<span>&gt;</span><a href="javascript:;">${item.name}</a>`;
		li.onclick = function() {
			view(item.id);
		}
		element.crumbs.appendChild(li)
	});
	//	当前所在的目录,且无法点击
	var info = getInfo(_ID);
	// console.log(info);
	if(info) {
		var li = document.createElement('li');
		li.innerHTML = `<span>&gt;</span><span>${info.name}</span>`;
		element.crumbs.appendChild(li);
	}
}
//	重名检测
function checkName(fileData) {
	var files=[];
	for(var i=0;i<data.list.length;i++) {
		if(fileData.type == data.list[i].type
			&&
			fileData.name == data.list[i].name
			&&
			fileData.pid == data.list[i].pid
		) {
			files.push(data.list[i])
		}
	}
	return files;
}
