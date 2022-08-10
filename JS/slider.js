const slides = document.querySelector(".slides");
const img = document.querySelectorAll(".slides li");
let currentIdx = 0;
const firstIdx = 0;
const lastIdx = img.length - 1;
const imgLen = img.length;
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const width = 400;
const margin = 100;
const author = document.querySelector(".authors");
let startPoint = 0;
let endPoint = 0;

let option = {};

const slideList = [
  "<li><img src='./Contents/img1.png' alt='1' class='contents' /></li>",

  "<li><img src='./Contents/img2.png' alt='2' class='contents' /></li>",

  "<li><img src='./Contents/img3.png' alt='3' class='contents' /></li>",

  "<li><img src='./Contents/img4.png' alt='4' class='contents' /></li>",

  "<li><img src='./Contents/img5.png' alt='5' class='contents' /></li>",

  "<li><video class='contents' autoplay loop controls><source src='./Contents/sample.mp4 ' type='video/mp4' /></video></li>",
];
//순서 썪기
const shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
  return array;
};

// 이벤트 제거 함수
const removeEvent = () => {
  prev.removeEventListener("click", prevHandlerForLoop);
  prev.removeEventListener("click", prevHandler);
  next.removeEventListener("click", nextHandlerForLoop);
  next.removeEventListener("click", nextHandler);
};
/* =============================드래그 시작===============================*/
const addDragEvent = () => {
  slides.addEventListener("mousedown", (e) => {
    startPoint = e.pageX;
  });

  slides.addEventListener("mouseup", (e) => {
    endPoint = e.pageX;
    if (startPoint < endPoint) {
      if (option.loop) {
        prevHandlerForLoop();
      } else {
        prevHandler();
      }
    } else if (startPoint > endPoint) {
      if (option.loop) {
        nextHandlerForLoop();
      } else {
        nextHandler();
      }
    }
  });
};

/* =============================드래그 끝===============================*/

/* =============================loop : off 시작===============================*/

// 슬라이드 이동 (loop가 false일 때)
const moveSlide = (idx) => {
  slides.style.left = -idx * (width + margin) + "px";
  currentIdx = idx;
};

//prevHandler, Loop=false
const prevHandler = () => {
  if (currentIdx !== firstIdx) moveSlide(currentIdx - 1);
};

//nexHandler, Loop=false
const nextHandler = () => {
  if (currentIdx !== lastIdx) {
    moveSlide(currentIdx + 1);
  }
};
/* =============================loop : off 끝===============================*/

/* =============================loop : on 시작===============================*/

//자연스럽게 보이기 위해서 처음과 끝에 가상 이미지 추가
const setClone = () => {
  const firstClone = slides.firstElementChild.cloneNode(true);
  const lastClone = slides.lastElementChild.cloneNode(true);
  slides.append(firstClone);
  slides.insertBefore(lastClone, slides.firstElementChild);
};

//클론값만큼 슬라이더 사이즈 다시 세팅
const setWidthForLoop = () => {
  slides.style.width = (width + margin) * (imgLen + 2) + "px";
  slides.style.left = -(width + margin) + "px";
};

//prevHandler , Loop=true
const prevHandlerForLoop = () => {
  if (currentIdx >= 0) {
    slides.style.left = -currentIdx * (width + margin) + "px";
    slides.style.transition = `${0.5}s ease-out`;
  }
  if (currentIdx === 0) {
    setTimeout(() => {
      slides.style.left = -imgLen * (width + margin) + "px";
      slides.style.transition = `${0}s ease-out`;
    }, 500);
    currentIdx = imgLen;
  }
  currentIdx -= 1;
};

//nextHandler , Loop=true
const nextHandlerForLoop = () => {
  if (currentIdx <= lastIdx) {
    slides.style.left = -(currentIdx + 2) * (width + margin) + "px";
    slides.style.transition = `${0.5}s ease-out`;
  }
  if (currentIdx === lastIdx) {
    setTimeout(() => {
      slides.style.left = -(width + margin) + "px";
      slides.style.transition = `${0}s ease-out`;
    }, 500);
    currentIdx = -1;
  }
  currentIdx += 1;
};

/* =============================loop : on 끝===============================*/

/* =============================사용자 설정 컨트롤러 시작===============================*/

//사용자 설정 핸들러
const controlHandler = () => {
  const button = document.querySelector("#button").checked;
  const loop = document.querySelector("#loop").checked;
  const random = document.querySelector("#random").checked;
  currentIdx = 0;
  removeEvent();
  option = {
    prev: button,
    next: button,
    loop: loop,
    random: random,
  };

  button && prev.addEventListener("click", prevHandler);
  button && next.addEventListener("click", nextHandler);

  if (option.random) {
    slides.innerHTML = shuffle(slideList);
  } else {
    slides.innerHTML = slideList;
  }

  if (option.loop) {
    setWidthForLoop();
    setClone();
    removeEvent();
    button && prev.addEventListener("click", prevHandlerForLoop);
    button && next.addEventListener("click", nextHandlerForLoop);
  }
};

// 사용자 옵션 세팅 함수
const setOption = (options) => {
  option = {
    prev: options.prev,
    next: options.next,
    loop: options.loop,
    random: options.random,
  };
};

author.addEventListener("change", () => controlHandler());

/* =============================사용자 설정 컨트롤러 끝===============================*/
export default function slider(id, options) {
  setOption(options);
  addDragEvent();
  prev.addEventListener("click", prevHandler);
  next.addEventListener("click", nextHandler);
}
