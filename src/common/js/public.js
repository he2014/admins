export const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
    if (attr === 'scrollTop') {
        target = element.scrollTop;
    }else if(element.currentStyle){
        target = element.currentStyle[attr];
    }else{
        target = document.defaultView.getComputedStyle(element,null)[attr];
    }
    //在获取 opactiy 时需要获取小数 parseFloat
    return  NumberMode == 'float'? parseFloat(target) : parseInt(target);
}

export const freshScrollbar =(bool,el)=>{//smooth-scrollbar解决scrollbar导致el-dialog不显示问题
  if(bool){
    
    el.firstChild.setAttribute("class","")
    setTimeout(()=>{
      el.firstChild.setAttribute("style","")
    })
  }else{
      el.firstChild.setAttribute("class",'scroll-content')
  }

}
