// const scroll = new LocomotiveScroll({
//     el: document.querySelector('#main'),
//     smooth: true
// });

// gsap.utils.toArray(".accordion-item").forEach((item) => {
//   gsap.from(item, {
//     scrollTrigger: {
//       trigger: item,
//       start: "top 85%",
//       scroller: "#main"
//     },
//     y: 80,
//     opacity: 0,
//     duration: 1.2,
//     ease: "power4.out"
//   });
// });


// // Animation for the first page load
// // function firstPageAnim() {
// //     const tl = gsap.timeline();
// //     tl.from("#nav", {
// //         y: -10,
// //         opacity: 0,
// //         duration: 1.5,
// //         ease: "expo.inOut"
// //     })
// //     .to(".boundingelem", {
// //         y: 0,
// //         ease: "expo.inOut",
// //         duration: 2,
// //         delay: -1,
// //         stagger: .2
// //     })
// //     .from("#herofooter", {
// //         y: -10,
// //         opacity: 0,
// //         duration: 1.5,
// //         delay: -1,
// //         ease: "expo.inOut"
// //     });
// // }

// function firstPageAnim() {
//   const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

//   tl.from("#nav a", {
//     y: -30,
//     opacity: 0,
//     duration: 1.2,
//     stagger: 0.1
//   })
//   .to(".boundingelem", {
//     y: 0,
//     duration: 1.6,
//     stagger: 0.15
//   }, "-=0.6")
//   .from("#chotiheadings h5", {
//     y: 20,
//     opacity: 0,
//     duration: 1,
//     stagger: 0.15
//   }, "-=1")
//   .from("#herofooter", {
//     opacity: 0,
//     y: 20,
//     duration: 1
//   }, "-=0.8");
// }

// // Accordion and image hover logic
// document.querySelectorAll('.accordion-item').forEach(item => {
//     const header = item.querySelector('.accordion-header');
//     const image = header.querySelector('img');
//     const icon = header.querySelector('i');
//     let rotate = 0;
//     let diffrot = 0;

//     header.addEventListener('click', () => {
//         const currentlyActive = document.querySelector('.accordion-item.active');
//         if (currentlyActive && currentlyActive !== item) {
//             currentlyActive.classList.remove('active');
//         }
//         item.classList.toggle('active');

//         setTimeout(() => {
//             scroll.update();
//         }, 800);
//     });

//     header.addEventListener('mouseleave', () => {
//         gsap.to(image, {
//             opacity: 0,
//             ease: "power3.out",
//             duration: 0.5,
//         });
//     });

//     header.addEventListener('mousemove', (dets) => {
//         // This CSS-only fix is more reliable for the icon hover
//         // if (dets.target === icon) { ... }
        
//         const rect = header.getBoundingClientRect();
//         const diff = dets.clientY - rect.top;
//         diffrot = dets.clientX - rotate;
//         rotate = dets.clientX;

//         // gsap.to(image, {
//         //     opacity: 1,
//         //     ease: "power3.out",
//         //     top: diff,
//         //     left: dets.clientX,
//         //     rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
//         // });
//         gsap.to(image, {
//             opacity: 1,
//             top: diff,
//             left: dets.clientX,
//             rotate: gsap.utils.clamp(-15, 15, diffrot * 0.3),
//             ease: "power2.out",
//             duration: 0.4
//         });
//     });
// });

// // Update the live time in the footer
// function updateTime() {
//     const timeElement = document.querySelector('#time');
//     if (timeElement) {
//         const now = new Date();
//         const timeString = now.toLocaleTimeString('en-US', {
//             hour: '2-digit',
//             minute: '2-digit',
//             hour12: true,
//             timeZone: 'Asia/Kolkata'
//         });
//         timeElement.textContent = `${timeString} IST`;
//     }
// }
// setInterval(updateTime, 1000);
// updateTime();

// // Page view switch animation
// const mainContent = document.querySelector("#main-content");
// const contactPage = document.querySelector("#contact-page");
// const contactLink = document.querySelector("#contact-link");
// const backToHomeLink = document.querySelector("#back-to-home");

// function openContact() {
//     const tl = gsap.timeline();
//     tl.to(mainContent, {
//         opacity: 0,
//         y: -20,
//         duration: 0.8,
//         ease: "power3.inOut",
//         onComplete: () => {
//             mainContent.style.display = "none";
//             contactPage.style.display = "flex";
//             if (scroll) scroll.destroy();
            
//             // *** ERROR FIX: Add the event listener only when the form is visible ***
//             const contactForm = document.querySelector('#contact-form-container form');
//             contactForm.addEventListener("submit", handleSubmit);
//         }
//     });

//     tl.fromTo(contactPage,
//         { opacity: 0, y: 20 },
//         { opacity: 1, y: 0, duration: 0.8, ease: "power3.inOut" }
//     );
// }

// function closeContact() {
//     const tl = gsap.timeline();
//     tl.to(contactPage, {
//         opacity: 0,
//         y: 20,
//         duration: 0.8,
//         ease: "power3.inOut",
//         onComplete: () => {
//             contactPage.style.display = "none";
//             mainContent.style.display = "block";
//             scroll.init();
//         }
//     });

//     tl.fromTo(mainContent,
//         { opacity: 0, y: -20 },
//         { opacity: 1, y: 0, duration: 0.8, ease: "power3.inOut" }
//     );
// }

// // Add click event listeners for page switching
// contactLink.addEventListener("click", (event) => {
//     event.preventDefault();
//     openContact();
// });

// backToHomeLink.addEventListener("click", (event) => {
//     event.preventDefault();
//     closeContact();
// });

// // Run initial page load animation
// firstPageAnim();

// // Contact form submission handler
// async function handleSubmit(event) {
//     event.preventDefault();
//     const form = event.target;
//     const status = document.createElement('p');
//     const data = new FormData(form);

//     try {
//         const response = await fetch(form.action, {
//             method: form.method,
//             body: data,
//             headers: {
//                 'Accept': 'application/json'
//             }
//         });

//         if (response.ok) {
//             status.textContent = "Thanks for your message!";
//             status.style.color = 'lightgreen';
//             form.reset();
//         } else {
//             status.textContent = "Oops! There was a problem sending your message.";
//             status.style.color = 'red';
//         }
//     } catch (error) {
//         status.textContent = "Oops! There was a problem sending your message.";
//         status.style.color = 'red';
//     }

//     form.appendChild(status);
//     setTimeout(() => {
//         status.remove();
//     }, 4000);
// }


// ===============================
// LOCOMOTIVE SCROLL INIT
// ===============================
const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});

// ===============================
// HERO INTRO ANIMATION
// ===============================
function firstPageAnim() {
  const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

  tl.from("#nav a", {
    y: -30,
    opacity: 0,
    duration: 1.2,
    stagger: 0.1
  })
  .to(".boundingelem", {
    y: 0,
    duration: 1.6,
    stagger: 0.15
  }, "-=0.6")
  .from("#chotiheadings h5", {
    y: 20,
    opacity: 0,
    duration: 1,
    stagger: 0.15
  }, "-=1")
  .from("#herofooter", {
    opacity: 0,
    y: 20,
    duration: 1
  }, "-=0.8");
}

firstPageAnim();

// ===============================
// ACCORDION + HOVER IMAGE LOGIC
// ===============================
document.querySelectorAll(".accordion-item").forEach(item => {
  const header = item.querySelector(".accordion-header");
  const image = header.querySelector("img");
  let rotate = 0;
  let diffrot = 0;

  header.addEventListener("click", () => {
    const active = document.querySelector(".accordion-item.active");
    if (active && active !== item) active.classList.remove("active");
    item.classList.toggle("active");

    setTimeout(() => scroll.update(), 800);
  });

  header.addEventListener("mouseleave", () => {
    gsap.to(image, {
      opacity: 0,
      duration: 0.4,
      ease: "power3.out"
    });
  });

  header.addEventListener("mousemove", e => {
    const rect = header.getBoundingClientRect();
    const diff = e.clientY - rect.top;
    diffrot = e.clientX - rotate;
    rotate = e.clientX;

    gsap.to(image, {
      opacity: 1,
      top: diff,
      left: e.clientX,
      rotate: gsap.utils.clamp(-15, 15, diffrot * 0.3),
      duration: 0.4,
      ease: "power2.out"
    });
  });
});

// ===============================
// SCROLL REVEAL FOR ACCORDIONS
// ===============================
gsap.utils.toArray(".accordion-item").forEach(item => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: "top 85%",
      scroller: "#main"
    },
    y: 80,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out"
  });
});

// ===============================
// ABOUT SECTION PARALLAX
// ===============================
gsap.from("#about img", {
  scrollTrigger: {
    trigger: "#about",
    start: "top 80%",
    scroller: "#main"
  },
  scale: 0.85,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out"
});

gsap.from("#textabout", {
  scrollTrigger: {
    trigger: "#about",
    start: "top 75%",
    scroller: "#main"
  },
  y: 60,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out"
});

// ===============================
// FOOTER FADE-IN
// ===============================
gsap.from("#footer", {
  scrollTrigger: {
    trigger: "#footer",
    start: "top 90%",
    scroller: "#main"
  },
  opacity: 0,
  y: 40,
  duration: 1
});

// ===============================
// MAGNETIC BUTTONS / LINKS
// ===============================
document.querySelectorAll("a, button").forEach(el => {
  el.addEventListener("mousemove", e => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(el, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  el.addEventListener("mouseleave", () => {
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: "power3.out"
    });
  });
});

// ===============================
// LIVE TIME UPDATE
// ===============================
function updateTime() {
  const timeEl = document.querySelector("#time");
  if (!timeEl) return;

  const now = new Date();
  const timeString = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata"
  });

  timeEl.textContent = `${timeString} IST`;
}
setInterval(updateTime, 1000);
updateTime();

// ===============================
// CONTACT PAGE TRANSITION
// ===============================
const mainContent = document.querySelector("#main-content");
const contactPage = document.querySelector("#contact-page");
const contactLink = document.querySelector("#contact-link");
const backBtn = document.querySelector("#back-to-home");

function openContact() {
  gsap.to(mainContent, {
    opacity: 0,
    y: -20,
    duration: 0.8,
    ease: "power3.inOut",
    onComplete: () => {
      mainContent.style.display = "none";
      contactPage.style.display = "flex";
      scroll.destroy();
    }
  });

  gsap.fromTo(contactPage,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power3.inOut" }
  );
}

function closeContact() {
  gsap.to(contactPage, {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: "power3.inOut",
    onComplete: () => {
      contactPage.style.display = "none";
      mainContent.style.display = "block";
      scroll.init();
    }
  });

  gsap.fromTo(mainContent,
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power3.inOut" }
  );
}

contactLink.addEventListener("click", e => {
  e.preventDefault();
  openContact();
});

backBtn.addEventListener("click", e => {
  e.preventDefault();
  closeContact();
});

// ===============================
// CONTACT FORM SUBMIT
// ===============================
async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const status = document.createElement("p");

  try {
    const res = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { Accept: "application/json" }
    });

    if (res.ok) {
      status.textContent = "Thanks for your message!";
      status.style.color = "lightgreen";
      form.reset();
    } else {
      throw new Error();
    }
  } catch {
    status.textContent = "Something went wrong. Try again.";
    status.style.color = "red";
  }

  form.appendChild(status);
  setTimeout(() => status.remove(), 4000);
}

const contactForm = document.querySelector("#contact-form-container form");
if (contactForm) contactForm.addEventListener("submit", handleSubmit);


function pageWipeIn(callback) {
  gsap.to("#page-wipe", {
    scaleY: 1,
    duration: 0.8,
    ease: "expo.inOut",
    onComplete: callback
  });
}

function pageWipeOut() {
  gsap.to("#page-wipe", {
    scaleY: 0,
    transformOrigin: "bottom",
    duration: 0.8,
    ease: "expo.inOut"
  });
}

// Initial load
pageWipeOut();

const modal = document.querySelector("#project-modal");
const modalTitle = document.querySelector("#modal-title");
const modalDesc = document.querySelector("#modal-desc");
const closeModal = document.querySelector("#close-modal");

// Example trigger: clicking any project entry
document.querySelectorAll(".project-entry").forEach(project => {
  project.addEventListener("click", () => {
    modal.style.display = "flex";
    modalTitle.textContent = project.querySelector("h4").innerText;
    modalDesc.textContent = project.innerText;

    gsap.to(".modal-content", {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: "power3.out"
    });
  });
});

closeModal.addEventListener("click", () => {
  gsap.to(".modal-content", {
    scale: 0.8,
    opacity: 0,
    duration: 0.4,
    ease: "power3.in",
    onComplete: () => modal.style.display = "none"
  });
});
