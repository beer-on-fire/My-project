//	设置右键菜单内容数据
function showContextMenu(container,dataList) {
	dataList.forEach(function(item) {
		var li = document.createElement('li');
		li.innerHTML = `${item.name}`;
		li.onmousedown = contextmenuCallback[item.callBackName];

		li.onmouseover = function(e) {
			var lis = this.parentNode.children;
			for (var i=0; i<lis.length; i++) {
					lis[i].className = '';
      }
			this.className = 'menuActive';
			if(!li.children.length) {
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
        if (!li.children.length) {
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
	if(_ID <= 0) {
		back.style.display = 'none';
		line.style.display = 'none';
	} else {
		back.style.display = 'inline-block';
		line.style.display = 'inline-block';
	}
	var dataList = getChildren(_ID);
	element.list.innerHTML = '';
	dataList.forEach(function(item) {
			var newname = item.name;
			if (item.extname) {
					newname += `(${item.extname})`;
			}
	    var li = document.createElement('li');
			var figure = document.createElement('figure');
			var div = document.createElement('div');
			var p = document.createElement('p');
			var input = document.createElement('input');
			var label = document.createElement('label');
			var chose = document.createElement('input');
	    figure.className = item.type;
			p.innerHTML = newname;
			input.type = 'text';
			chose.type = 'checkbox';
			label.style.display = 'none';
			input.style.display = 'none';
			div.appendChild(p);
			div.appendChild(input);
			li.appendChild(figure);
			li.appendChild(label);
			label.appendChild(chose);
			li.appendChild(div);
			li.item = item;
			li.onmouseover = function() {
					var lis = this.parentNode.children;
					label.style.display = 'block';
					this.classList.add('liHover');
			}
			li.onmouseout = function() {
				this.classList.remove('liHover');
				if(this.className == 'liActive') {
					label.style.display = 'block';
				} else {
					label.style.display = 'none';
				}
			}
			li.onclick = function(e) {
					hasChosen.parentNode.style.display = 'none';
					if(item.type == 'floder'||item.type == 'excel'||item.type == 'html') {
						view(item.id);
					} else {
						openMedia(item.newClass,item.type);
					}
			}
	    element.list.appendChild(li);
			li.addEventListener('mousemove',function(e) {
				e.stopPropagation();
			});
			li.addEventListener('mousedown',function(e) {
				e.stopPropagation();
			});
			label.addEventListener('click',function(e) {
				e.stopPropagation();
			});
			label.addEventListener('mousedown',function(e) {
				e.stopPropagation();
			});
			///	勾选部分
			var chosen = element.list.querySelectorAll('input[type="checkbox"]');
			chosenX = chosen;
			chosenX.forEach(function(val) {
				val.onchange = function() {
					selectedLi = this.parentNode.parentNode;
					this.parentNode.parentNode.classList.add('liActive');
					var nub = 0;
					var isAll = false;
					if(!this.checked) {
						this.parentNode.parentNode.classList.remove('liActive');
					}
					//	全选
					for(var i=0;i<chosenX.length;i++) {
							if(chosenX[i].checked) {
								nub++;
							}
					}
					isAll = nub == chosenX.length?true:false;
					choseAll.checked = isAll;
					hasChosen.innerHTML = nub;
					if(nub == 0) {
						hideFileBar();
					} else {
						showFileBar();
					}
				}
			})
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
	li.innerHTML = '<a href="javascript:;">全部文件</a>';
	li.onclick = function() {
		view(0);
	}
	element.crumbs.appendChild(li);
	//	所有的父级点击
	pathList.forEach(function(item) {
		var li = document.createElement('li');
		//	路径补全后缀名
		if(!item.extname) {
			li.innerHTML = `<span>&gt;</span><a href="javascript:;">${item.name}</a>`;
		} else {
			li.innerHTML = `<span>&gt;</span><a href="javascript:;">${item.name}(${item.extname})</a>`;
		}
		li.onclick = function() {
			view(item.id);
		}
		element.crumbs.appendChild(li)
	});
	//	当前所在的目录,且无法点击
	var info = getInfo(_ID);
	if(info) {
		var li = document.createElement('li');
		//	路径补全后缀名
		if(!info.extname) {
			li.innerHTML = `<span>&gt;</span>${info.name}`;
		} else {
			li.innerHTML = `<span>&gt;</span>${info.name}(${info.extname})`;
		}
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

//打开文件
var fileDetailsC = fileDetail.children[0];
fileDetailCols.addEventListener('click',function(e) {
		fileDetailsC.innerHTML = '';
		fileDetail.style.display = 'none';
});
function openMedia(file,fileType) {
		fileDetailsC.innerHTML = "";
		var reader = new FileReader();
		reader.onload = function(e){
			fileDetail.style.display = "block";
			var result = e.target.result;
			if(fileType == 'text') {
					var p = document.createElement("p");
					p.innerHTML = result;
					fileDetailsC.appendChild(p);
			}
			else if (fileType == 'image') {
				var img = new Image();
				img.src = result;
				fileDetailsC.appendChild(img);
			}
			else if (fileType == 'video') {
				var video = document.createElement('video');
				video.setAttribute("loop","");
				video.setAttribute("controls","");
				video.src = result;
				fileDetailsC.appendChild(video);
			}
			else if(fileType == "audio"){
				var audio = document.createElement('audio');
				audio.setAttribute("loop","");
				audio.setAttribute("controls","");
				audio.src = result;
				fileDetailsC.appendChild(audio);
			}
	}
	if(fileType == "text"){
		reader.readAsText(file);
	} else {
		reader.readAsDataURL(file);
	}
}

//	重命名
var timer;
function rename(which) {
	if(which) {
		var p = which.querySelector('p');
		var input = which.querySelectorAll('input')[1];
		setTimeout(function(){
			input.select();
		});
		p.style.display = 'none';
		input.style.display = 'block';
		input.value = p.innerHTML;
		//	将同种类的，同一个文件夹的放进一个数组
		var ext = data.list;
		ext = ext.filter(function(item) {
				if(item.pid == _ID && item.type == which.item.type) {
					return true
				} else {
					return false
				}
		});
		//	将同类的文件所有名字放进一个数组，并拼接成完整名字，不再分为extname和name
		var names = [];
		for(var i=0;i<ext.length;i++) {
			if(ext[i].extname) {
				names.push(ext[i].name + '(' + ext[i].extname + ')')
			} else {
				names.push(ext[i].name);
			}
		};
		input.onblur = function() {
				//	重名
				if(hasName()){
					element.mask.style.display = 'block'
				}
				else if(input.value == ''||input.value == p.innerHTML) {
					view(_ID)
				}
				else if(which.item.extname) {

					//	如果修改的文件原本就存在后缀名
					/**
					 * a 表示'(' 在名字字符串中出现的位置
					 * b 表示')' 在名字字符串中出现的位置
					 * c 表示 替换后的extname
					 * d 表示 替换后的name
					 */
					var a,b,c,d;
					a = input.value.lastIndexOf('(');
					b = input.value.lastIndexOf(')');
					c = input.value.slice(a+1,b);
					d = input.value.slice(0,a);
					if(a == -1 || b == -1||c.length == 0) {
							which.item.name = input.value
							which.item.extname = null;
					} else {
							which.item.name = d;
							which.item.extname = c;
					}
					p.style.display = 'block';
					input.style.display = 'none';
					view(_ID)
				} else {
					which.item.name = input.value
					view(_ID)
				}
		};

		//	遮罩层关闭
		sure.onclick = function() {
			console.log(1);
			mask.style.display = 'none';
			selectedLi = rightLi
			rename(selectedLi)
		}
		turnOff.onclick = cancel.onclick = function() {
			mask.style.display = 'none';
			input.style.display = 'none';
			p.style.display = 'block';
		}
		function hasName() {
			for(var i=0;i< names.length;i++) {
				if(input.value == names[i] && p.innerHTML != names[i]) {
					return true;
				}
			}
			return false
		}
		//阻止冒泡
		input.addEventListener('click',function(e) {
			e.stopPropagation();
		});
	}
}
//	文件显示控制条
function showFileBar() {
hasChosen.parentNode.style.display = 'block';
	myDevice.style.display = 'none';
	offlineBtn.style.display = 'none';
	fileBar.style.display = 'block';
}
function hideFileBar() {
hasChosen.parentNode.style.display = 'none';
	myDevice.style.display = 'block';
	offlineBtn.style.display = 'block';
	fileBar.style.display = 'none';
}

////	碰撞检测
function getCollide(el,el2){
	var rect = el.getBoundingClientRect();
	var rect2 = el2.getBoundingClientRect();
	if(rect.right < rect2.left
	||rect.left > rect2.right
	||rect.bottom<rect2.top
	||rect.top>rect2.bottom){
		return false;
	}
	return true;
}
