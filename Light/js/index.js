view(0);

//  点击添加（去除）遮罩
timeline.onclick = function() {
    var mask = document.createElement('div');
    var closeMask = document.createElement('button');
    mask.className = 'mask';
    closeMask.id = 'closeMask';
    mask.appendChild(closeMask);
    document.body.appendChild(mask);
    closeMask.onclick = function() {
        document.body.removeChild(mask);
    }
}
