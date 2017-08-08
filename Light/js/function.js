//  申明各类元素
var element = {
    indexPart: document.querySelector('#indexPart'),
    timeline:document.querySelector('#timeline'),
    closeMask:document.querySelector('#closeMask')
}
//  渲染当前页面
function view(partNub) {
    var indexTop = document.createElement('div');
    var indexBottom = document.createElement('div');
    var pWord = document.createElement('p');
    var pSubword = document.createElement('p');
    var lightNub = document.createElement('span');
    var bigGood = document.createElement('div');
    var topNub = document.createElement('span');
    var timeline = document.createElement('button');

    indexTop.className = 'indexTop';
    indexBottom.className = 'indexBottom';
    bigGood.className = 'bigGood';
    lightNub.className = 'lightNub';
    topNub.className = 'topNub';
    timeline.id = 'timeline';

    indexTop.style.background = 'url(img/indexImg/'+ data.index[partNub].indexTopimg +') no-repeat';
    lightNub.style.background = 'url(img/indexImg/'+ data.index[partNub].lightNub +') no-repeat';
    bigGood.style.background = 'url(img/indexImg/'+ data.index[partNub].bigGood +') no-repeat';

    topNub.innerHTML = data.index[partNub].top;
    pWord.innerHTML = data.index[partNub].word;
    pSubword.innerHTML = data.index[partNub].subword;

    indexPart.appendChild(indexTop);
    indexPart.appendChild(indexBottom);
    indexTop.appendChild(timeline);
    indexBottom.appendChild(topNub);
    indexBottom.appendChild(pWord);
    indexBottom.appendChild(pSubword);
    indexBottom.appendChild(lightNub);
    indexPart.appendChild(bigGood);
}
