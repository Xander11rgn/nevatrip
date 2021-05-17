if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}


// object-fit for ie11
function ibg(){
  let ibg = document.querySelectorAll(".ibg");
  for (let i = 0; i < ibg.length; i++) {
    if(ibg[i].querySelector('img')){
      ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
    }
  }
}
ibg();


//cruise time selection
const cruiseTimes = document.querySelectorAll('.services__cruise-time');
cruiseTimes.forEach(function(time){
  time.addEventListener('click', function(){
    if (time.classList.contains('services__cruise-time_selected')) {
      time.classList.remove('services__cruise-time_selected');
    }
    else {
      try{
        time.parentNode.parentNode.parentNode.querySelector('.services__cruise-time_selected').classList.remove('services__cruise-time_selected');
      }
      catch (e){}
      time.classList.add('services__cruise-time_selected');
    }    
  })
})

document.addEventListener('click', function(e){
  if (e.target.className != 'services__cruise-time more') {
    const cruiseLists = document.querySelectorAll('.services__cruize-list');
    cruiseLists.forEach(function(list){
      list.classList.add('visually-hidden');
    });
  }
})

//more
function moreButton(block){
  if (window.matchMedia("(min-width: 768px)").matches) {
    try{
      const cruiseTimeBlock = block.querySelector('.services__cruise-times');
      const cruiseList = block.querySelector('.services__cruize-list');
      let height = block.querySelector('.services__cruise-caption').clientHeight;
      if (height > 20) {
        while (height > 20) {
          if (!block.querySelector('.more')) {
            cruiseTimeBlock.lastElementChild.classList.add('services__cruise-time_in-list');
            cruiseList.appendChild(cruiseTimeBlock.lastElementChild);
          }
          else {
            const allTimes = block.querySelector('.services__cruise-times').children;
            allTimes[allTimes.length - 2].classList.add('services__cruise-time_in-list');
            cruiseList.appendChild(allTimes[allTimes.length - 2]);
          }
          height = block.querySelector('.services__cruise-caption').clientHeight;
        }
        if (!block.querySelector('.more')) {
          const more = document.createElement('div');
          more.className = "services__cruise-time more";
          more.innerHTML = "ещё...";
          more.setAttribute('data-list', cruiseList.dataset.list);
          cruiseTimeBlock.appendChild(more);
          cruiseTimeBlock.lastElementChild.appendChild(cruiseList);
          more.addEventListener('click', function(e){
            const cruiseLists = document.querySelectorAll('.services__cruize-list');
            cruiseLists.forEach(function(list){
              list.classList.add('visually-hidden');
              document.querySelector('.services__cruize-list[data-list="' + more.dataset.list + '"]').classList.remove('visually-hidden');
            });
          });
          moreButton(block);
        }
      }
      else {
        const more = block.querySelector('.more');
        cruiseList.lastElementChild.classList.remove('services__cruise-time_in-list');
        cruiseTimeBlock.insertBefore(cruiseList.lastElementChild, more);
        if (window.matchMedia("(min-width: 1050px)").matches) {
          if (cruiseList.children.length == 0) {
            block.appendChild(cruiseList);
            more.parentNode.removeChild(more);
            cruiseTimeBlock.appendChild(cruiseList.lastElementChild);
          }
        }
        moreButton(block);
      }
    }
    catch (e) {}
  }
  else {
    const cruiseTimes = block.querySelector('.services__cruise-times');
    let cruiseTimesWidth = cruiseTimes.clientWidth;
    let timeWidth = cruiseTimes.firstElementChild.clientWidth;
    const cruiseBlock = block.querySelector('.services__cruise');
    let cruiseBlockWidth = cruiseBlock.firstElementChild.clientWidth;
    const more = cruiseTimes.querySelector('.more');
    const cruiseList = block.querySelector('.services__cruize-list');
    
    if ((cruiseTimesWidth < cruiseBlockWidth) && (more)) {
      if (!block.querySelector('.services__cruise-time_in-list')) {
        block.appendChild(cruiseList);
        block.querySelector('.more').parentNode.removeChild(block.querySelector('.more'));
      }
      else {
        try{
          while (cruiseTimesWidth < cruiseBlockWidth - (timeWidth/2)) {
            cruiseList.lastElementChild.classList.remove('services__cruise-time_in-list');
            cruiseTimes.insertBefore(cruiseList.lastElementChild, more);
            cruiseTimesWidth = cruiseTimes.clientWidth;
          }
        }
        catch (e){}
      }
    }
    if ((cruiseTimesWidth > cruiseBlockWidth) && (more)) {
      while (cruiseTimesWidth > cruiseBlockWidth - (timeWidth/2)) {
        if (!block.querySelector('.more')) {
          cruiseTimes.lastElementChild.classList.add('services__cruise-time_in-list');
          cruiseList.appendChild(cruiseTimes.lastElementChild);
        }
        else {
          const allTimes = cruiseTimes.children;
          allTimes[allTimes.length - 2].classList.add('services__cruise-time_in-list');
          cruiseList.appendChild(allTimes[allTimes.length - 2]);
        }
        cruiseTimesWidth = cruiseTimes.clientWidth;
      }
    }
    if ((cruiseTimesWidth > cruiseBlockWidth) && (!more)) {

      const more = document.createElement('div');
      more.className = "services__cruise-time more";
      more.innerHTML = "ещё...";
      cruiseTimes.appendChild(more);
      
        while (cruiseTimesWidth > cruiseBlockWidth - (timeWidth/2)) {
        if (!block.querySelector('.more')) {
          cruiseTimes.lastElementChild.classList.add('services__cruise-time_in-list');
          cruiseList.appendChild(cruiseTimes.lastElementChild);
        }
        else {
          const allTimes = cruiseTimes.children;
          allTimes[allTimes.length - 2].classList.add('services__cruise-time_in-list');
          cruiseList.appendChild(allTimes[allTimes.length - 2]);
        }
        cruiseTimesWidth = cruiseTimes.clientWidth;
      }

      cruiseTimes.lastElementChild.appendChild(cruiseList);
      more.addEventListener('click', function(){
        cruiseList.classList.toggle('visually-hidden');
      });
    }
  }
}
function moreForAllBlocks(){
  const blocks = document.querySelectorAll('.services__block');
  blocks.forEach(function(block){
    moreButton(block);
  });
}
moreForAllBlocks();
window.addEventListener('resize', moreForAllBlocks);