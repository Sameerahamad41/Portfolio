const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

// Animation for the first page load
function firstPageAnim() {
    const tl = gsap.timeline();
    tl.from("#nav", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        ease: "expo.inOut"
    })
    .to(".boundingelem", {
        y: 0,
        ease: "expo.inOut",
        duration: 2,
        delay: -1,
        stagger: .2
    })
    .from("#herofooter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: "expo.inOut"
    });
}

//Accordion and image hover logic
document.querySelectorAll('.accordion-item').forEach(item => {
    const header = item.querySelector('.accordion-header');
    const image = header.querySelector('img');
    const icon = header.querySelector('i'); 
    let rotate = 0;
    let diffrot = 0;

    header.addEventListener('click', () => {
        const currentlyActive = document.querySelector('.accordion-item.active');
        if (currentlyActive && currentlyActive !== item) {
            currentlyActive.classList.remove('active');
        }
        item.classList.toggle('active');

        setTimeout(() => {
            scroll.update();
        }, 800);
    });

    
    header.addEventListener('mouseleave', () => {
        gsap.to(image, {
            opacity: 0,
            ease: "power3.out",
            duration: 0.5,
        });
    });

    header.addEventListener('mousemove', (dets) => {
        if (dets.target === icon) {
            gsap.to(image, {
                opacity: 0,
                ease: "power3.out",
                duration: 0.5,
            });
            return; 
        }
        
        const rect = header.getBoundingClientRect();
        const diff = dets.clientY - rect.top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;

        gsap.to(image, {
            opacity: 1,
            ease: "power3.out",
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
        });
    });
});

function updateTime() {
    const timeElement = document.querySelector('#time'); 
    if (timeElement) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'Asia/Kolkata'
        });
        timeElement.textContent = `${timeString} IST`;
    }
}
setInterval(updateTime, 1000);
updateTime();

//Page view switch animation
const mainContent = document.querySelector("#main-content");
const contactPage = document.querySelector("#contact-page");
const contactLink = document.querySelector("#contact-link");
const backToHomeLink = document.querySelector("#back-to-home");

function openContact() {
    const tl = gsap.timeline();
    tl.to(mainContent, {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => {
            mainContent.style.display = "none";
            contactPage.style.display = "flex";
            if(scroll) scroll.destroy();
        }
    });

    tl.fromTo(contactPage, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.inOut" }
    );
}

function closeContact() {
    const tl = gsap.timeline();
    tl.to(contactPage, {
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

    tl.fromTo(mainContent, 
        { opacity: 0, y: -20 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.inOut" }
    );
}

// Add click event listeners
contactLink.addEventListener("click", (event) => {
    event.preventDefault();
    openContact();
});

backToHomeLink.addEventListener("click", (event) => {
    event.preventDefault();
    closeContact();
});

firstPageAnim();

//Contact form
const contactForm = document.querySelector('#contact-form-container form');

async function handleSubmit(event) {
    event.preventDefault(); 
    const status = document.createElement('p');
    const data = new FormData(event.target);
    
    try {
        const response = await fetch(event.target.action, {
            method: contactForm.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            status.textContent = "Thanks for your message!";
            status.style.color = 'lightgreen';
            contactForm.reset(); 
        } else {
            status.textContent = "Oops! There was a problem sending your message.";
            status.style.color = 'red';
        }
    } catch (error) {
        status.textContent = "Oops! There was a problem sending your message.";
        status.style.color = 'red';
    }
    
    contactForm.appendChild(status);
    setTimeout(() => {
        status.remove();
    }, 4000); 
}

contactForm.addEventListener("submit", handleSubmit);