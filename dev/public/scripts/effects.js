var colors = new Array(
    [62,35,255],
    [60,255,60],
    [255,35,98],
    [45,175,230],
    [255,0,255],
    [255,128,0]
);  
var step = 0;

    //color table indices for: 
  // current color left
  // next color left
  // current color right
  // next color right
var colorIndices = [0,1,2,3];
  
  //transition speed
var gradientSpeed = 0.002;
  
function updateGradient(){

    if ( $===undefined ) return;
            
    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];
    
    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    var color1 = "rgb("+r1+","+g1+","+b1+")";
    
    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    var color2 = "rgb("+r2+","+g2+","+b2+")";
  
    /** até usa jQuery, mas não precisa */
    $('#firstId').css({
        background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
        background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
        step += gradientSpeed;
    if ( step >= 1 )
    {
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];
        //pick two new target color indices
        //do not pick the same as the current one
        colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
        colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    }
  }
  
setInterval(updateGradient,10);  

const perToggle = document.getElementById('toggle-performance')
const checkbox = document.getElementById('toggle-performance')
perToggle.addEventListener('change', () => {
    localStorage.setItem('checked', perToggle.checked)
    togglePerformance(checkbox)
})

function togglePerformance(checkbox) {
    const gradientAnimation = document.querySelector('#firstId') || document.querySelector('#firstIdStatic')
    if (JSON.parse(localStorage.getItem('checked'))) {
        checkbox.checked = JSON.parse(localStorage.getItem('checked'))
        gradientAnimation.id = 'firstIdStatic'
        gradientAnimation.style.backgroundImage = "linear-gradient( 150deg, #eb8c6d8a, rgba(136, 136, 206, 0.7) )"  
    }
    else{
        gradientAnimation.id = 'firstId'
        checkbox.checked = JSON.parse(localStorage.getItem('checked'))
        localStorage.setItem('checked', perToggle.checked)
    }
}

/*######################    smart navbar    ######################*/

const nav = document.querySelector("header");
const supportPageOffset = window.pageXOffset !== undefined;
const isCSS1Compat = (document.compatMode || "") === "CSS1Compat";
let previousScrollPosition = 0;

const isScrollingDown = () => {
    let scrolledPosition = supportPageOffset 
        ? window.pageYOffset
        : isCSS1Compat
        ? document.documentElement.scrollTop
        : document.body.scrollTop;
    let isScrollDown;

    if (scrolledPosition > previousScrollPosition) {
        isScrollDown = true;
    } else {
        isScrollDown = false;
    }
    previousScrollPosition = scrolledPosition;
    return isScrollDown;
};

const handleNavScroll = () => {
    if (isScrollingDown() && !nav.contains(document.activeElement)) {
        nav.classList.add("scroll-down");
        nav.classList.remove("scroll-up");
    } else {
        nav.classList.add("scroll-up");
        nav.classList.remove("scroll-down");
    }
};
var throttleTimer;

const throttle = (callback, time) => {
    if (throttleTimer) return;

    throttleTimer = true;
    setTimeout(() => {
        callback();
        throttleTimer = false;
    }, time);
};

const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

window.addEventListener("scroll", () => {
    if (mediaQuery && !mediaQuery.matches) {
        throttle(handleNavScroll, 175);
    }
});

/* ####################     mudar o titulo quando a pessoa sair     #################### */
const docTitle = document.title
window.addEventListener('blur', () => {
    document.title =  'Bom trabalho!!'
})
window.addEventListener('focus', () => {
    document.title = docTitle
})