---
title: 网易云音乐
date: 2017-8-10 23:29:54
categories: 作品展示-JS
tags: [Ajax,jQuery,sessionStorage,跨域]
copyright: true
---

#### 作品名称：网易云音乐
[点击此处预览](http://lonelyarrow.site/showMyWeb/NeteaseCloudMusic/clouds/)，详情请点击阅读全文。

![](http://i.imgur.com/8QCIrks.png)
<!--more-->

##### 实现的功能
1. 音乐的播放暂停
2. 音乐进度条
3. 音乐音量调节
4. 静音
5. 音乐进度缓冲
6. 音乐上一首、下一首的切换
7. 歌曲的收藏
8. 搜索歌曲
9. 查看收藏歌单
10. 进度条拖拽改变播放位置

##### 实现功能过程
1. 播放和暂停可通过` play() `和` pause()`方法实现
2. 进度条，监听`timeupdate`事件，实施更新当前播放位置，并且通过拖拽事件，来计算出进度条对应移动多少，通过改变`media.currentTime`来改变歌曲播放进度
3. 类似进度条，改变`media.volume`，通过`audio.muted=true`实现静音
4. 通过`media.buffered.start(i)
media.buffered.end(i)`，来获取缓存范围，并改变进度条样式，在媒体就绪`media.readyState`时,播放音乐
5. 上一首、下一首，通过`previousSibling`和`nextSibling`来改变
6. 搜索是通过Ajax，跨域调用
7. 通过`sessionStroage`实现歌曲的歌单收藏


##### 遇到的问题
1. 添加收藏时，能够重复添加同一首歌
2. 在html结构中预先存储了两首歌，在歌单间切换时为了不让歌曲消失（歌单切换使用`jq.html()`方法），使用了本地存储，导致刷新后，首页歌单会一直重复添加

##### 解决过程
> 一开始，是把loveList进行了筛选，如果在loveList中存在了我已经添加过的歌曲的id，那么就不把它push到数组中，但是此方法不能解决问题2，我将一开始就存在的歌曲存储到了本地存储，每次刷新后，本地存储又添加了那些歌，如果用`sessionStroage.removeItem`会导致在切换歌单时，html结构为空，所以最终解决方法是用延时，在每次刷新后将html结构清空，在从本地存储读取渲染出来。

重复添加的问题采用的是：
    `
		var hash = {};  

		indexList = indexList.reduce(function(item, next) {
			hash[next.id] ? '' : hash[next.id] = true && item.push(next);
			return item
		}, [])  
	`
##### 收获
> 让自己对跨域访问有一定的了解，运用了本地存储

## 安装  
```
$ npm install
```
## 运行
```
$ node app.js 
```
服务器启动默认端口为3000,若不想使用3000端口,可使用以下命令:  
Mac/Linux
```
$ PORT=4000 node app.js
```

windows 下使用 git-bash 或者 cmder 等终端执行以下命令:  
```
$ set PORT=4000 && node app.js
