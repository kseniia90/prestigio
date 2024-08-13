const mobileBreakpoint = 768;

const langDropdown = document.querySelector('.lang-dropdown');
document.querySelector('.lang-switcher .current').addEventListener('click', () => {
  document.querySelector('.lang-switcher .current').classList.toggle('active');
  if (langDropdown.classList.contains('show')) {
    langDropdown.classList.remove('show');
    fadeOut(langDropdown, 'flex');
  } else {
    langDropdown.classList.add('show');
    fadeIn(langDropdown, 'flex');
  }
});
window.addEventListener('click', (event) => {
  if (!document.querySelector('.lang-switcher').contains(event.target) && langDropdown.classList.contains('show')) {
    langDropdown.classList.remove('show');
    fadeOut(langDropdown, 'flex');
  }
});

document.querySelector('.mobile-menu-toggle').addEventListener('click', () => {
  const mainMenu = document.querySelector('.main-menu');
  const mainHeader = document.querySelector('.main-header');
  if (document.body.classList.contains('menu-open')) {
    document.body.classList.remove('menu-open');
    document.querySelectorAll('.main-menu .active').forEach((el) => {
      el.classList.remove('active');
    });
  } else {
    document.body.classList.add('menu-open');
  }
});

document.querySelectorAll('.main-menu .menu-item-has-children > a').forEach((el) => {
  el.addEventListener('click', (event) => {
    event.preventDefault();

    if (window.innerWidth >= mobileBreakpoint) {
      if (event.target.matches('.main-menu-wrapper>ul>li>a')) {
        document.querySelectorAll('.main-menu .active').forEach((el) => {
          if (!event.target.isSameNode(el.querySelector(':scope>a'))) {
            el.classList.remove('active');
            el.querySelectorAll('.main-menu-wrapper>ul>li.active>.sub-menu').forEach((el) => {
              fadeOut(el, 'flex');
            });
          }
        });
      } else {
        event.target.closest('.sub-menu').querySelectorAll('.active').forEach((el) => {
          if (!event.target.isSameNode(el.querySelector(':scope>a'))) {
            el.classList.remove('active');
          }
        });
      }

      if (el.parentElement.classList.contains('active')) {
        fadeOut(el.nextElementSibling, 'flex');
      } else {
        fadeIn(el.nextElementSibling, 'flex');
      }
    } else {
      const subMenu = el.nextElementSibling;
      if (el.parentElement.classList.contains('active')) {
        slideUp(subMenu);
      } else {
        slideDown(subMenu);
      }
    }

    el.parentElement.classList.toggle('active');
  });
});

window.addEventListener('click', (event) => {
  if (window.innerWidth >= mobileBreakpoint) {
    if (!document.querySelector('.main-menu').contains(event.target)) {
      document.querySelectorAll('.main-menu .active').forEach((el) => {
        el.querySelectorAll('.main-menu-wrapper>ul>li.active>.sub-menu').forEach((el) => {
          fadeOut(el, 'flex');
        });
        el.classList.remove('active');
      });
    }
  }
});

function slideDown(el) {
  el.style.overflow = 'hidden';
  el.style.height = '0';
  el.style.display = 'block';
  el.style.transition = 'height 0.3s';
  el.style.height = el.scrollHeight + 'px';
  setTimeout(() => {
    el.style.overflow = null;
    el.style.height = null;
    el.style.transition = null;
    el.style.display = null;
  }, 300);
}

function slideUp(el) {
  el.style.overflow = 'hidden';
  el.style.display = 'block';
  el.style.height = el.scrollHeight + 'px';
  el.style.transition = 'height 0.3s';
  setTimeout(() => {
    el.style.height = '0';
  }, 10);
  setTimeout(() => {
    el.style.overflow = null;
    el.style.display = null;
    el.style.height = null;
    el.style.transition = null;
  }, 300);
}

function fadeIn(el, display = 'flex') {
  el.style.opacity = 0;
  el.style.display = display;
  el.style.transition = 'opacity 0.3s';
  setTimeout(() => {
    el.style.opacity = 1;
  }, 10);
  setTimeout(() => {
    el.style.transition = null;
    el.style.display = null;
    el.style.opacity = null;
  }, 300);
}

function fadeOut(el, display = 'flex') {
  el.style.display = display;
  el.style.opacity = 1;
  el.style.transition = 'opacity 0.3s';
  setTimeout(() => {
    el.style.opacity = 0;
  }, 10);
  setTimeout(() => {
    el.style.display = null;
    el.style.opacity = null;
    el.style.transition = null;
  }, 300);
}


const overlay = document.getElementById('overlay');
const popup = document.getElementById('popup');
document.querySelectorAll('.contact-us').forEach((el) => {
  el.addEventListener('click', (event) => {
    event.preventDefault();
    fadeIn(overlay);
    fadeIn(popup);
    document.body.classList.add('popup-open');

  });
});

document.querySelectorAll('#popup .close-btn, #overlay').forEach((el) => el.addEventListener('click', (event) => {
  event.preventDefault();
  fadeOut(overlay);
  fadeOut(popup);
  document.body.classList.remove('popup-open');
}));

//BEGIN filter accordion

$(".filter__accordion__title, .accordion__title").on("click", function (e) {
  e.preventDefault();
  var $this = $(this);
  $this.toggleClass("accordion-active");
  $this.next().slideToggle();
  $(".accordion__arrow", this).toggleClass("open");

});

if(window.innerWidth < 768){
  $(".accordion__title.btn").on("click", function (e) {
    e.preventDefault();
    var $this = $(this);
    $this.toggleClass("accordion-active");
    $(".accordion__arrow", this).toggleClass("open");
  });

  // $(".btn-back").on("click", function (e) {
  //   e.preventDefault();
  //   var $this = $(this);
  //   // $this.toggleClass("accordion-active");
  //   $(".accordion__content", this).removeClass("accordion-active");
  // });
}



// filter check square
const elProperties = document.querySelectorAll(".el_properties");

elProperties.forEach((item) => {
  item.addEventListener("click", (e) => {
    let square = item.querySelector(".square");
    square.classList.toggle("active-square");
  });
});

// price range slider START

if (!!document.querySelector(".range_container")) {
  function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, "#C6C6C6", "#3D5397", controlSlider);
    if (from > to) {
      fromSlider.value = to;
      fromInput.value = to;
    } else {
      fromSlider.value = from;
    }
  }

  function controlToInput(toSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, "#C6C6C6", "#3D5397", controlSlider);
    setToggleAccessible(toInput);
    if (from <= to) {
      toSlider.value = to;
      toInput.value = to;
    } else {
      toInput.value = from;
    }
  }

  function controlFromSlider(fromSlider, toSlider, fromInput) {
    const [from, to] = getParsed(fromSlider, toSlider);
    fillSlider(fromSlider, toSlider, "#C6C6C6", "#3D5397", toSlider);
    if (from > to) {
      fromSlider.value = to;
      fromInput.value = to;
    } else {
      fromInput.value = from;
    }
  }

  function controlToSlider(fromSlider, toSlider, toInput) {
    const [from, to] = getParsed(fromSlider, toSlider);
    fillSlider(fromSlider, toSlider, "#C6C6C6", "#3D5397", toSlider);
    setToggleAccessible(toSlider);
    if (from <= to) {
      toSlider.value = to;
      toInput.value = to;
    } else {
      toInput.value = from;
      toSlider.value = from;
    }
  }

  function getParsed(currentFrom, currentTo) {
    const from = parseInt(currentFrom.value, 10);
    const to = parseInt(currentTo.value, 10);
    return [from, to];
  }

  function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
    const rangeDistance = to.max - to.min;
    const fromPosition = from.value - to.min;
    const toPosition = to.value - to.min;
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
      ${sliderColor} ${(toPosition / rangeDistance) * 100}%, 
      ${sliderColor} 100%)`;
  }

  function setToggleAccessible(currentTarget) {
    const toSlider = document.querySelector("#toSlider");
    if (Number(currentTarget.value) <= 0) {
      toSlider.style.zIndex = 2;
    } else {
      toSlider.style.zIndex = 0;
    }
  }

  const fromSlider = document.querySelector("#fromSlider");
  const toSlider = document.querySelector("#toSlider");
  const fromInput = document.querySelector("#fromInput");
  const toInput = document.querySelector("#toInput");
  fillSlider(fromSlider, toSlider, "#C6C6C6", "#3D5397", toSlider);
  setToggleAccessible(toSlider);

  fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
  toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
  fromInput.oninput = () =>
    controlFromInput(fromSlider, fromInput, toInput, toSlider);
  toInput.oninput = () =>
    controlToInput(toSlider, fromInput, toInput, toSlider);

  // value of start filter price
  const rangeStart = document.getElementById("fromSlider"),
    rangeStartV = document.getElementById("fromInput"),
    setStartValue = () => {
      const newValue = Number(
          ((rangeStart.value - rangeStart.min) * 100) /
            (rangeStart.max - rangeStart.min)
        ),
        newPosition = 10 - newValue * 0.2;
      rangeStartV.innerHTML = `<span>₴${rangeStart.value}</span>`;
      rangeStartV.style.left = `calc(${newValue}% - (5px))`;
    };
  document.addEventListener("DOMContentLoaded", setStartValue);
  rangeStart.addEventListener("input", setStartValue);

  // value of start filter price
  const rangeEnd = document.getElementById("toSlider"),
    rangeEndV = document.getElementById("toInput"),
    setEndValue = () => {
      const newValue = Number(
          ((rangeEnd.value - rangeEnd.min) * 100) /
            (rangeEnd.max - rangeEnd.min)
        ),
        newPosition = 10 - newValue * 0.2;
      rangeEndV.innerHTML = `<span>₴${rangeEnd.value}</span>`;
      rangeEndV.style.left = `calc(${newValue}% - (10px))`;
    };
  document.addEventListener("DOMContentLoaded", setEndValue);
  rangeEnd.addEventListener("input", setEndValue);
}
// price range slider END


new Swiper('.banner-slider', {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      index = index + 1;
      index = index < 10 ? '0' + index : index; 
      return '<div class="' + className + '"><span>' + (index) + '</span><span class="pagination-sq"><span></span></span></div>'
    },
  },
  breakpoints: {
    0: {
      direction: "horizontal"
    },
    768: {
      direction: "vertical"
    }
  }
});

new Swiper('.bestsellers-slider', {
  spaceBetween: 20,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
    1270: {
      slidesPerView: 4,
    }
  }
});

new Swiper('.news-slider', {
  spaceBetween: 20,
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 4,
    }
  }
});


// $(".footer-block .accordion__title").on("click", function (e) {
//   e.preventDefault();
//   var $this = $(this);

//   $this.toggleClass("accordion-active");
//   $this.next().slideToggle();
//   $(".accordion__arrow", this).toggleClass("accordion__rotate");
// });

// document.querySelector('.blogs .show-more-btn').addEventListener('click', (event) => {
//   event.preventDefault();
//   document.querySelectorAll('.blogs .post-catd').forEach((el) => el.style.display= 'flex');
// });








// tab on product-page START

function openOption(evt, optionName) {

  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(optionName).style.display = "block";
  evt.currentTarget.className += " active";

}

// tab on product-page END


//tab 2 on product page start

function openOption2(evt, optionName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent2");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks2");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(optionName).style.display = "block";
  evt.currentTarget.className += " active";
}

//tab 2 on product page end

if (document.querySelector(".single-product") !== null) {
  new Carousel(
    document.getElementById("productCarousel"),
    {
      transition: 'slide',
      preload: 3, 
      Dots: false,
      Thumbs: {
        type: 'classic',
        Carousel: {
          dragFree: false,
          slidesPerPage: 'auto',
          Navigation: true,
          axis: 'x',
        },
      },
    },
    { Thumbs }
  );
  
  Fancybox.bind('[data-fancybox="gallery"]', {
    compact: false,
    idle: false,
    dragToClose: false,
    contentClick: () =>
      window.matchMedia('(max-width: 578px), (max-height: 578px)').matches
        ? 'toggleMax'
        : 'toggleCover',
  
    animated: false,
    showClass: false,
    hideClass: false,
  
    Hash: false,
    Thumbs: false,
  
    Toolbar: {
      display: {
        left: [],
        middle: [],
        right: ['close'],
      },
    },
  
    Carousel: {
      transition: 'fadeFast',
      preload: 3,
    },
  
    Images: {
      zoom: false,
      Panzoom: {
        panMode: 'mousemove',
        mouseMoveFactor: 1.1,
      },
    },
  });
}





