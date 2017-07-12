/**根据指定的id，返回其下一级所有的数据
 * @param id 要查找的id
 *@return {Array} 包含一级子数据的数组
 */
 //返回data.list中pid是id的数据
function getChildren(id) {
  return data.list.filter(function(item) {
    return item.pid == id
  })
}

/**
 * 获取指定id的信息
 *@param  id 要查找的id
 *@return {object} 满足数据的条件
 */
function getInfo(id) {
  return data.list.filter(function(item) {
    return item.id == id
  })[0];
}

/**
 * 获取指定id父级的info
 */
function getParent(id) {
  var info = getInfo(id);
  if(info) {
    return getInfo(info.pid)
  }
}
/**
 * 获取指定id的所有父级（不包括自己）
 * @param id
 * @return {Array} 返回一个包含所有父级数据的数组
 */
function getParents(id) {
  //  保存所有父级数据
  var parents = [];
  //  获取父级
  var parentInfo = getParent(id);
  if(parentInfo) {
    parents.push(parentInfo);
    var more = getParents(parentInfo.id);
    parents = more.concat(parents);
    //  将当前父级的信息保存到parents中
  }
  return parents;
}
//  添加新数据
function addData(newData) {
  newData.id = getMaxId()+1;
  var existFiles = checkName(newData);
  // console.log(existFiles);
  if(existFiles.length) {
    for(var i=1;i<=existFiles.length;i++) {
      //返回数组中满足条件的第一个元素的值
        var v = existFiles.find(function(ele) {
          return ele.extname == (i+1)
        });

        if(v === undefined) {
          newData.extname = (i+1);
          break;
        }
    }
  }
  data.list.push(newData);
}
//  获取数据中最大的id
function getMaxId() {
  var maxId = 0;
  data.list.forEach(function(item) {
    if(item.id>maxId) {
      maxId = item.id;
    }
  });
  return maxId;
}
