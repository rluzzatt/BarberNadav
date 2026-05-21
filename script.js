const body = document.body;
body.classList.add("is-loading");

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

function focusTopOnPageLoad() {
  if (window.location.hash === "#booking") {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }

  window.scrollTo(0, 0);
  window.setTimeout(() => window.scrollTo(0, 0), 0);
}

window.addEventListener("pageshow", focusTopOnPageLoad);
window.addEventListener("load", focusTopOnPageLoad);
window.addEventListener("DOMContentLoaded", focusTopOnPageLoad);

const loader = document.querySelector(".loader");
window.addEventListener("load", () => {
  window.setTimeout(() => {
    loader?.classList.add("is-hidden");
    body.classList.remove("is-loading");
  }, 650);
});

document.querySelectorAll(".split-text").forEach((element) => {
  const words = element.textContent.trim().split(/\s+/);
  element.textContent = "";

  words.forEach((word, index) => {
    const wrapper = document.createElement("span");
    wrapper.className = "word";
    wrapper.style.setProperty("--i", index);

    const inner = document.createElement("span");
    inner.textContent = word;
    wrapper.append(inner);
    element.append(wrapper, document.createTextNode(" "));
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16, rootMargin: "0px 0px -60px" }
);

document.querySelectorAll("[data-reveal]").forEach((item) => revealObserver.observe(item));

const cursor = document.querySelector(".cursor-orbit");
let cursorX = 0;
let cursorY = 0;
let orbitX = 0;
let orbitY = 0;

window.addEventListener("pointermove", (event) => {
  cursorX = event.clientX;
  cursorY = event.clientY;
  if (cursor) {
    cursor.style.opacity = "1";
  }
});

function animateCursor() {
  orbitX += (cursorX - orbitX) * 0.12;
  orbitY += (cursorY - orbitY) * 0.12;
  if (cursor) {
    cursor.style.left = `${orbitX}px`;
    cursor.style.top = `${orbitY}px`;
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
  }
  requestAnimationFrame(animateCursor);
}

animateCursor();

const heroMedia = document.querySelector(".hero__media");
window.addEventListener("scroll", () => {
  const progress = Math.min(window.scrollY / 900, 1);
  if (heroMedia) {
    heroMedia.style.setProperty("filter", `brightness(${1 - progress * 0.22})`);
    heroMedia.style.setProperty("translate", `0 ${progress * 34}px`);
  }
});

document.querySelectorAll(".tilt").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = ((y / rect.height) - 0.5) * -10;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

document.querySelectorAll(".magnetic").forEach((item) => {
  item.addEventListener("pointermove", (event) => {
    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    item.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
  });

  item.addEventListener("pointerleave", () => {
    item.style.transform = "";
  });
});
