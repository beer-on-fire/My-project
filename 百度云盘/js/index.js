var element = {
  list: document.querySelector('#list'),
  filename: document.querySelector('#filename'),
  filetype: document.querySelector('#filetype'),
  menu: document.querySelector('.conTextMenu'),
  createBtn: document.querySelector('#createBtn'),
  paths: document.querySelector('#paths'),
  back: document.querySelector('#back'),
  line: document.querySelector('line'),
  crumbs: document.querySelector('#crumbs'),
  fileBtn: document.querySelector('#fileBtn'),
  fileDetail: document.querySelector('#fileDetail'),
  fileDetailCols: document.querySelector('#fileDetailCols'),
  fileWrap: document.querySelector('#fileWrap'),
  uploadFileBtn: document.querySelector('#uploadFileBtn'),
  sortBtn: document.querySelector('#sortBtn'),
  sortMenu: document.querySelector('#sortMenu'),
  nameChosen: document.querySelector('#nameChosen'),
  nameRight: document.querySelector('#nameRight'),
  nameWrong: document.querySelector('#nameWrong'),
  regesiter: document.querySelector('#regesiter'),
  logIn: document.querySelector('#logIn'),
  choseAll: document.querySelector('#choseAll'),
  choseAlll: document.querySelector('#choseAlll'),
  hasChosen: document.querySelector('#hasChosen'),
  mask: document.querySelector('#mask'),
  sure: document.querySelector('#sure'),
  cancel: document.querySelector('#cancel'),
  turnOff: document.querySelector('#turnOff'),
  trash: document.querySelector('#trash'),
  fileBar: document.querySelector('#fileBar'),
  offlineBtn: document.querySelector('#offlineBtn'),
  myDevice: document.querySelector('#myDevice'),
  fileDelete: document.querySelector('#fileDelete'),
  treeMask: document.querySelector('#treeMask'),
  treeSure: document.querySelector('#treeSure'),
  treeCancel: document.querySelector('#treeCancel'),
  tree: document.querySelector('#tree'),
  fileCopyto: document.querySelector('#fileCopyto'),
  fileMoveto: document.querySelector('#fileMoveto'),
  header: document.querySelector('#header'),
  nameTxt: document.querySelector('#nameTxt'),
  sortSearchSee: document.querySelector('#sortSearchSee'),
  aside: document.querySelector('#aside'),
  choseNub: document.querySelector('#choseNub'),
  notThis: document.querySelector('#notThis'),
  allfile: document.querySelector('.allfile'),
  allimage: document.querySelector('.allimage')
}
//	右键菜单
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  element.menu.innerHTML = '';
  element.menu.style.display = 'block';
  element.menu.style.left = e.clientX + 'px';
  element.menu.style.top = e.clientY + 'px';
  if (e.target.tagName.toUpperCase() == 'LI' || e.target.parentNode.tagName.toUpperCase() == 'LI' || e.target.parentNode.parentNode.tagName.toUpperCase() == 'LI') {
    //  判断是否是在回收站的情况
    if(trash.className == 'active') {
      showContextMenu(element.menu, data.menu.trashMenu);
    } else {
      showContextMenu(element.menu, data.menu.fileMenu);
    }
    //	右键的那个文件夹选中
    var lis = list.children;
    for (var i = 0; i < lis.length; i++) {
      lis[i].classList.remove('liActive');
      if(lis.length == 0) {
        choseAll.checked = true;
      } else {
        choseAll.checked = false;
      }
      lis[i].children[1].children[0].checked = true;
      lis[i].children[1].style.display = 'none';
    }
    if (e.target.tagName.toUpperCase() == 'LI') {
      e.target.classList.add('liActive');
      e.target.children[1].checked = true;
      selectedLi = rightLi = e.target;
    } else if (e.target.parentNode.tagName.toUpperCase() == 'LI') {
      e.target.parentNode.classList.add('liActive');
      e.target.parentNode.children[1].checked = true;
      selectedLi = rightLi = e.target.parentNode;
    } else if (e.target.parentNode.parentNode.tagName.toUpperCase() == 'LI') {
      e.target.parentNode.parentNode.classList.add('liActive');
      e.target.parentNode.parentNode.children[1].checked =
      selectedLi = rightLi = e.target.parentNode.parentNode;
    }
    //	只有一个文件夹时右键后，全选按钮打勾
    if (!rightLi.previousElementSibling && !rightLi.nextElementSibling) {
      choseAll.checked = true;
    } else {
      rightLi.children[1].children[0].checked = true;
    }
    trash.className != 'active' && showFileBar();
    rightLi.children[1].style.display = 'block';
    hasChosen.innerHTML = 1;
  } else {
    showContextMenu(element.menu, data.menu.deskMenu);
  }
  resetOffset(element.menu);
});
document.onmousedown = function() {
  hideContextmenu(element.menu);
  nameChosen.style.display = 'none';
}
//阻止默认事件
element.menu.addEventListener('click', function(e) {
  e.stopPropagation();
});
mask.addEventListener('mousedown', function(e) {
  e.stopPropagation();
});
nameChosen.addEventListener('mousedown', function(e) {
  e.stopPropagation();
});
header.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  e.stopPropagation();
});
nameTxt.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  e.stopPropagation();
});
fileBar.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  e.stopPropagation();
});
sortSearchSee.addEventListener('contextmenu',function(e){
  e.preventDefault();
  e.stopPropagation();
});
aside.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  e.stopPropagation();
});
paths.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  e.stopPropagation();
});
mask.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  e.stopPropagation();
});
choseNub.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  e.stopPropagation();
});
//	窗口大小变化时调整menu位置
window.addEventListener('resize', function(e) {
  resetOffset(element.menu)
});

var stickArr = [];//  被复制的元素数据
var treeClick;//  当前点击的是树的哪一个
/**
 * 右键菜单的点击事件
 */
var contextmenuCallback = {
  createFloder: function() {
    addData({
      pid: _ID,
      type: 'floder',
      name: '新建文件夹'
    })
    view(_ID)
    canChose();
  },
  createHtml: function() {
    addData({
      pid: _ID,
      type: 'html',
      name: '新建网页'
    })
    view(_ID)
    canChose();
  },
  createExe: function() {
    addData({
      pid: _ID,
      type: 'exe',
      name: '新建压缩包'
    })
    view(_ID)
    canChose();
  },
  nameSort: function() {
    data.list.sort(function(a, b) {
      if (pinyin.getFullChars(a.name + a.extname) > pinyin.getFullChars(b.name + b.extname)) {
        return 1;
      } else {
        return -1;
      }
    });
    view(_ID)
  },
  timeSortB: function() {
    data.list.sort(function(a, b) {
      if (a.id < b.id) {
        return 1;
      } else {
        return -1;
      }
    });
    view(_ID)
  },
  timeSortA: function() {
    data.list.sort(function(a, b) {
      if (a.id > b.id) {
        return 1;
      } else {
        return -1;
      }
    });
    view(_ID)
  },
  typeSort: function() {
    var typeClassify = {
      fileArrs:[],
      fileArr:[],//	所有的文件夹
      image:[],  // 所有的图片
      video:[],// 所有的视频
      audio:[],// 所有的音频
      text:[],// 所有的文本
      html:[],// 所有的网页
      exe:[] // 所有的表格
    }
    for (var i = 0; i < data.list.length; i++) {
      switch (data.list[i].type) {
        case 'floder':
          typeClassify.fileArr.push(data.list[i])
          break;
        case 'image':
          typeClassify.image.push(data.list[i])
          break;
        case 'video':
          typeClassify.video.push(data.list[i])
          break;
        case 'audio':
          typeClassify.audio.push(data.list[i])
          break;
        case 'text':
          typeClassify.text.push(data.list[i])
          break;
        case 'html':
          typeClassify.html.push(data.list[i])
          break;
        case 'exe':
          typeClassify.exe.push(data.list[i])
          break;
      }
    }
    typeClassify.fileArr.sort(function(a, b) {
      if (pinyin.getFullChars(a.name + a.extname) > pinyin.getFullChars(b.name + b.extname)) {
        return 1;
      }
      return -1;
    });
    typeClassify.image.sort(function(a, b) {
      if (pinyin.getFullChars(a.name + a.extname) > pinyin.getFullChars(b.name + b.extname)) {
        return 1;
      }
      return -1;
    });
    typeClassify.video.sort(function(a, b) {
      if (pinyin.getFullChars(a.name + a.extname) > pinyin.getFullChars(b.name + b.extname)) {
        return 1;
      }
      return -1;
    });
    typeClassify.audio.sort(function(a, b) {
      if (pinyin.getFullChars(a.name + a.extname) > pinyin.getFullChars(b.name + b.extname)) {
        return 1;
      }
      return -1;
    });
    typeClassify.text.sort(function(a, b) {
      if (pinyin.getFullChars(a.name + a.extname) > pinyin.getFullChars(b.name + b.extname)) {
        return 1;
      }
      return -1;
    });
    typeClassify.html.sort(function(a, b) {
      if (pinyin.getFullChars(a.name + a.extname) > pinyin.getFullChars(b.name + b.extname)) {
        return 1;
      }
      return -1;
    });
    typeClassify.exe.sort(function(a, b) {
      if (pinyin.getFullChars(a.name + a.extname) > pinyin.getFullChars(b.name + b.extname)) {
        return 1;
      }
      return -1;
    });
    data.list = typeClassify.fileArrs.concat(typeClassify.fileArr, typeClassify.image, typeClassify.audio, typeClassify.video, typeClassify.text, typeClassify.exe, typeClassify.html);
    view(_ID);
  },
  uploadFile: function() {
    fileBtn.click();
    //	上传渲染
    fileBtn.addEventListener('change', function() {
      //	每次点击都会绑定一个change事件,因此可以用事件绑定或者使监听只执行一次就停止
      var file = this.files[0];
      var fileType = file.type.split('/')[0];
      if (!(fileType == 'text' ||
          fileType == 'image' ||
          fileType == 'video' ||
          fileType == 'audio'
        )) {
        alert("目前只支持图片、视频、和音频文档的上传");
      }
      addData({
        pid: _ID,
        type: fileType,
        name: file.name,
        newClass: file
      })
      //	需要用一个属性来记录下上传的文件的内容
      view(_ID);
      fileBtn.value = "";
      canChose();
      hideFileBar();
      choseAll.checked = false;
    }, {
      once: true
    });
  },
  openFile: function() {
    choseAll.checked = false;
    hasChosen.parentNode.style.display = 'none'
    var arr = [];
    data.list.forEach(function(val) {
        if(rightLi.item.id == val.pid) {
            arr.push(val)
        }
    });
    if(arr.length == 0) {
        cannotChose();
    }
    //	获取到我当前点击的这个的pid
    if (rightLi.item.newClass) {
      openMedia(rightLi.item.newClass, rightLi.item.type)
    } else {
      view(rightLi.item.id)
    }
  },
  deleteFile: function() {
    for (var i = 0; i < lis.length; i++) {
      if (lis[i].className == 'liActive') {
        lis[i].item.reId = lis[i].item.pid;
        lis[i].item.pid = -1;
      }
    }
    var nub = list.querySelectorAll('.liActive').length;
    if (nub == lis.length) {
      cannotChose();
    }
    hideFileBar();
    notChoseAll();
    view(_ID)
  },
  renameFile: function() {
    setTimeout(function() {
      rename(rightLi)
    });
  },
  copyFile: function() {
    showTree();
    //  结构树点击效果
    $('#tree li').on('click',function() {
      $('#tree li').removeClass('active');
      $(this).addClass('active');
      //  获取我当前点击的树里面那个的对应文件的id
      var treeid = parseInt(this.attributes["treeid"].nodeValue);
      treeClick = treeid;
      var cId = selectedLi.item.id;
      var cIdChild = getTree(cId);
      var cIdParents = getParents(cId);
      var cIdArr = [];
      var cIdArr2 = [];
      cIdArr2.push(cId);
      for (var i = 0; i < cIdChild.length; i++) {
        cIdArr.push(cIdChild[i].id)
      }
      for (var i = 0; i < cIdParents.length; i++) {
        cIdArr2.push(cIdParents[i].id)
      }
      cIdArr = cIdArr2.concat(cIdArr);
      //  不能复制到自身或者子级下面
      for (var j = 0; j < cIdArr.length; j++) {
        if (treeid == cIdArr[j]) {
          treeSure.onclick = function() {
            treeMask.style.display = 'none';
            notThis.style.display = 'block';
            setTimeout(function() {
              notThis.style.display = 'none';
            }, 1000)
          }
          break
        } else {
          treeSure.onclick = contextmenuCallback.stickFile
        }
      };
    })
    //  向要粘贴的数组里push进我要复制的
    stickArr = [];
    stickArr.push({
      id:selectedLi.item.id,
      pid:selectedLi.item.pid,
      type:selectedLi.item.type,
      name:selectedLi.item.name,
      extname:selectedLi.item.extname
    });
    view(_ID);
    treeCancel.onclick = function() {
      treeMask.style.display = 'none';
    }
  },
  moveFile: function() {
    showTree();
    var treeli = tree.querySelectorAll('li');
    for (var i = 0; i < treeli.length; i++) {
      treeli[i].onclick = function() {
        for (var j = 0; j < treeli.length; j++) {
          treeli[j].className = ''
        }
        this.className = 'active';
        //  获取我当前点击的树里面那个的对应文件的id
        var treeid = parseInt(this.attributes["treeid"].nodeValue);
        treeClick = treeid;
        var cId = selectedLi.item.id;
        var cIdChild = getTree(cId);
        var cIdParents = getParents(cId);
        var cIdArr = [];
        var cIdArr2 = [];
        cIdArr2.push(cId);
        for (var i = 0; i < cIdChild.length; i++) {
          cIdArr.push(cIdChild[i].id)
        }
        for (var i = 0; i < cIdParents.length; i++) {
          cIdArr2.push(cIdParents[i].id)
        }
        cIdArr = cIdArr2.concat(cIdArr);
        //  不能移动到自身或者子级下面
        for (var j = 0; j < cIdArr.length; j++) {
          if (treeid == cIdArr[j]) {
            treeSure.onclick = function() {
              treeMask.style.display = 'none';
              notThis.style.display = 'block';
              notThis.style.backgroundImage = 'url(img/cloud/movealert.png)';
              setTimeout(function() {
                notThis.style.display = 'none';
              }, 1000)
            }
            break
          } else {
            selectedLi.item.pid = -2;
            treeSure.onclick = contextmenuCallback.stickFile
          }
        };
      };
    }
    treeCancel.onclick = function() {
      treeMask.style.display = 'none';
    }
    //  向要粘贴的数组里push进我要复制的
    stickArr = [];
    stickArr.push({
      id:selectedLi.item.id,
      pid:selectedLi.item.pid,
      type:selectedLi.item.type,
      name:selectedLi.item.name,
      extname:selectedLi.item.extname
    });
    view(_ID);
  },
  stickFile:function () {
      treeMask.style.display = 'none';
      stickFile(stickArr[0]);
  },
  deleteAbsolute:function() {
    notChoseAll();
    selectedLi.item.pid = -2
    view(_ID)
    var lis = list.querySelectorAll('li');
    if (lis.length == 0) {
      cannotChose()
    } else {
      canChose()
    }
  },
  restore:function() {
    notChoseAll();
    selectedLi.item.pid = selectedLi.item.reId;
    view(_ID);
    var lis = list.querySelectorAll('li');
    if (lis.length == 0) {
      cannotChose()
    } else {
      canChose()
    }
  }
}

//	当前所在目录的id,每当视图发生改变时，就是view方法执行时，需要同步该值
var _ID = 0;
var selectedLi = null;
//	渲染初始化数据，显示pid为0的数据
view(_ID);
//	返回上一级
element.back.onclick = function() {
  canChose();
  hideFileBar();
  choseAll.checked = false;
  //	返回上一级：获取当前目录的父级的子目录
  var info = getInfo(_ID);
  if (info) {
    view(info.pid)
  }
}
//	创建文件，文件夹
element.createBtn.onclick = function() {
  nameChosen.style.display = 'block';
}
element.nameRight.onclick = function() {
  canChose();
  if (element.filename.value == '') {
    alert('请输入名字')
    return
  };
  addData({
    pid: _ID,
    type: 'floder',
    name: element.filename.value
  });
  view(_ID);
  choseAll.checked = false;
}
element.nameWrong.onclick = function() {
  element.filename.value == '';
  nameChosen.style.display = 'none';
}
//	重命名
renameBtn.onclick = function() {
  var liss = list.querySelectorAll('.liActive');
  for (var i = 0; i < liss.length; i++) {
    selectedLi = liss[i];
  }
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
  timer = setTimeout(function() {
    sortMenu.style.display = 'none';
  }, 300)
}
sortMenu.onmouseleave = function() {
  sortMenu.style.display = 'none';
}
sortMenu.children[0].onclick = contextmenuCallback.nameSort;
sortMenu.children[1].onclick = contextmenuCallback.timeSortB;
sortMenu.children[2].onclick = contextmenuCallback.typeSort;

//	复制按钮
fileCopyto.onclick = contextmenuCallback.copyFile;
//	移动按钮
fileMoveto.onclick = contextmenuCallback.moveFile;
//	删除按钮
fileDelete.onclick = contextmenuCallback.deleteFile;
//	全部文件
element.allfile.onclick = function() {
  view(0)
  if (lis.length == 0) {
    cannotChose()
  } else {
    canChose();
    choseAll.checked = false
  }
}

//	全选
var nub = 0;
var chosenX;
choseAll.onchange = function() {
  if (choseAll.checked && trash.className != 'active') {
    showFileBar();
  } else {
    hideFileBar();
  }
  var lis = list.children;
  for (var i = 0; i < chosenX.length; i++) {
    chosenX[i].checked = this.checked;
    chosenX[i].parentNode.style.display = this.checked ? 'block' : 'none';
    lis[i].className = this.checked ? 'liActive' : '';
    nub = this.checked ? chosenX.length : 0;
    hasChosen.parentNode.style.display = this.checked ? 'block' : 'none';
    hasChosen.innerHTML = nub;
  }
}

// 侧边栏点击状态设置
var typeClassify2 = {
  classifyList:{},
  fileArr:[], //	所有的文件夹
  image:[],   // 所有的图片
  video:[],   // 所有的视频
  audio:[],   // 所有的音频
  text:[],    // 所有的文本
  html:[],    // 所有的网页
  exe:[]      // 所有的表格
}
$('#aside li').on('click',function() {
  $('#aside li').removeClass('active');
  $(this).addClass('active');
  data.list = data.list.concat(typeClassify2.classifyList)
  hasChosen.parentNode.style.display = 'none';
  choseAll.checked = false;

});
//	回收站
trash.onclick = function() {
  view(-1);
  hideFileBar();
  var lis = list.querySelectorAll('li');
  if (lis.length == 0) {
    cannotChose()
  } else {
    canChose()
  }
}

//	框选部分
var lis = list.getElementsByTagName('li');
list.onmousedown = function(e) {
  if (e.button == 2) {
    return;
  }
  var selectArea = document.createElement('div');
  var startX = e.clientX;
  var startY = e.clientY;
  selectArea.className = 'selectArea';
  selectArea.style.left = startX + 'px';
  selectArea.style.top = startY + 'px';
  list.appendChild(selectArea);
  document.onmousemove = function(e) {
    var nowX = e.clientX;
    var nowY = e.clientY;
    var disX = Math.abs(nowX - startX);
    var disY = Math.abs(nowY - startY);
    selectArea.style.width = Math.abs(nowX - startX) + 'px';
    selectArea.style.height = Math.abs(nowY - startY) + 'px';
    selectArea.style.left = Math.min(nowX, startX) + 'px';
    selectArea.style.top = Math.min(nowY, startY) + 'px';
    //	碰撞后框选
    for (var i = 0; i < lis.length; i++) {
      if (getCollide(selectArea, lis[i])) {
        trash.className != 'active' && showFileBar();
        canChose();
        lis[i].classList.add('liActive');
        lis[i].children[1].style.display = 'block';
        chosenX[i].checked = true;
      }
    }
  }
  document.onmouseup = function(e) {
    (selectArea.parentNode == list) && list.removeChild(selectArea);
    var nub = list.querySelectorAll('.liActive').length;
    hasChosen.innerHTML = nub;
    choseAll.checked = nub == lis.length ? true : false;
  }
};
