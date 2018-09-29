export function throttle (fn, delay, mustRunDelay) {
  var timer = null;
  var timeStart;
  return function () {
    var context = this;
    let args = arguments;
    let timeCurr = +new Date();
    clearTimeout(timer);
    if (!timeStart) {
      timeStart = timeCurr;
    }
    if (timeCurr - timeStart >= mustRunDelay) {
      fn.apply(context, args);
      timeStart = timeCurr;
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    }
  };
}

export function debounce (fn, blockTime) {
  // let timer;
  let debounce = false;

  return function () {
    if (debounce) return;
    debounce = true;
    fn.apply(this, arguments);
    setTimeout(() => {
      debounce = false;
    }, blockTime);
  };
}
