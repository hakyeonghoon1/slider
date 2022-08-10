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

let option = {};

const array = [
  "<li><img src='./Contents/img1.png' alt='1' class='contents' /></li>",

  "<li><img src='./Contents/img2.png' alt='2' class='contents' /></li>",

  "<li><img src='./Contents/img3.png' alt='3' class='contents' /></li>",

  "<li><img src='./Contents/img4.png' alt='4' class='contents' /></li>",

  "<li><img src='./Contents/img5.png' alt='5' class='contents' /></li>",

  "<li><video class='contents' autoplay loop controls><source src='./Contents/sample.mp4 ' type='video/mp4' /></video></li>",
];

// 슬라이드 이동 (loop가 false일 때)
const moveSlide = (idx) => {
  slides.style.left = -idx * (width + margin) + "px";
  currentIdx = idx;
};

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

//prevHandler, Loop=false
const prevHandler = () => {
  if (currentIdx !== firstIdx) moveSlide(currentIdx - 1);
};

//nexHandler, Loop=false
const nextHandler = () => {
  if (currentIdx !== lastIdx) {
    moveSlide(currentIdx + 1);
  }
  console.log(currentIdx, "currentIdx");
};

//순서 썪기
const shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
  return array;
};

const controlHandler = () => {
  const button = document.querySelector("#button").checked;
  const loop = document.querySelector("#loop").checked;
  const random = document.querySelector("#random").checked;
  option = {
    prev: button,
    next: button,
    loop: loop,
    random: random,
  };

  console.log(option, "1213213");
};

const setOption = (options) => {
  option = {
    prev: options.prev,
    next: options.next,
    loop: options.loop,
    random: options.random,
  };
};
author.addEventListener("change", () => controlHandler());
export default function slider(id, options) {
  setOption(options);

  if (option.random) {
    slides.innerHTML = shuffle(array);
  }
  if (option.loop) {
    setWidthForLoop();
    setClone();

    prev.addEventListener("click", prevHandlerForLoop);
    next.addEventListener("click", nextHandlerForLoop);
    console.log("1");
  } else {
    option.prev && prev.addEventListener("click", prevHandler);
    option.next && next.addEventListener("click", nextHandler);
    console.log("2");
  }
}
