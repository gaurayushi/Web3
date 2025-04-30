

/* script.js */
function searchBook() {
    alert("Searching by ISBN...");
  }
  window.addEventListener('DOMContentLoaded', () => {
    const stack = document.querySelector('.book-stack-hero');
    const cards = document.querySelectorAll('.book-card');
  
    if (!stack || cards.length === 0) return;
  
    let current = 0;
    setInterval(() => {
      const card = stack.children[0];
      stack.appendChild(card);
  
      [...stack.children].forEach((el, i) => {
        el.style.zIndex = 3 - i;
        el.style.transform = `translateX(${i * 20}px) scale(${1 - i * 0.04}) rotateY(${(-2 + i)}deg)`;
      });
    }, 4000);
  });
  