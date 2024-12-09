// For custom cursor
const cursor = document.querySelector(".cursor");
let timeout;
let mouseX = 0;
let mouseY = 0;

// Follow cursor on mousemove
document.addEventListener("mousemove", (e) => {
	mouseX = e.clientX + window.scrollX;
	mouseY = e.clientY + window.scrollY;

	cursor.style.display = "block";

	// Cursor effects on mouse stopped
	function mouseStopped() {
		cursor.style.display = "none";
	}
	// To hide the cursor after certain time
	clearTimeout(timeout);
	timeout = setTimeout(mouseStopped, 1000);

	updateCursor();
});

// Position the cursor
function updateCursor() {
	cursor.style.top = `${mouseY}px`;
	cursor.style.left = `${mouseX}px`;
}

// Hide the cursor when the mouse leaves the document
document.addEventListener("mouseout", () => {
	cursor.style.display = "none";
});

document.addEventListener("scroll", () => {
	cursor.style.display = "none";
	clearTimeout(timeout);
});

function disableScroll() {
	document.body.style.overflow = "hidden";
}

function enableScroll() {
	document.body.style.overflow = "auto";
}

//Navbar
function disappearNavbar(){
	document.querySelector(".navbar").style.zIndex = -1;
	gsap.set(document.querySelector(".navbar"), { opacity: 0 });
}

function reappearNavbar() {
	document.querySelector(".navbar").style.zIndex = 10;
    gsap.to(document.querySelector(".navbar"), {
        opacity: 1,
        duration: 1,
        ease: "power4.out",
    });
}

//Hero content
function disappearHero() {
	document.querySelector(".hero-content").style.zIndex = -1;
	gsap.set(document.querySelector(".hero-content"), { opacity: 0 });
}

function reappearHero() {
	document.querySelector(".hero-content").style.zIndex = 1;
	gsap.to(document.querySelector(".hero-content"), {
		opacity: 1,
		duration: 1,
		ease: "power4.out",
	});
}

//Cards
function disappearCard() {
	document.querySelectorAll(".card").forEach((card) => {
		card.style.zIndex = -1;
		gsap.set(card, { opacity: 0});
	});
}
function reappearCard() {
	document.querySelectorAll(".card").forEach((card, index) => {
		card.style.zIndex = 5;
		gsap.to(card, {
			opacity: 1,
			duration: 1,
			ease: "power4.out",
			stagger: {
				amount: 1,
				ease: "power4.out",
				from: "start",
			},
		});
	});
}

//Loader Settings
function startLoader() {
	disableScroll();
	disappearCard();
	disappearHero();
	disappearNavbar();
	let counterElement = document.querySelector(".count p");
	let currentValue = 0;

	function updateCounter() {
		if (currentValue < 100) {
			let increment = Math.floor(Math.random() * 10) + 1;
			currentValue = Math.min(currentValue + increment, 100);
			counterElement.textContent = currentValue;

			let delay = Math.floor(Math.random() * 200) + 25;
			setTimeout(updateCounter, delay);
		}
	}

	updateCounter();
}

startLoader();
gsap.to(".count", { opacity: 0, delay: 3.5, duration: 0.5 });

let textWrapper = document.querySelector(".ml16");
textWrapper.innerHTML = textWrapper.textContent.replace(
	/\S/g,
	"<span class='letter'>$&</span>"
);

//Loading screen animation
anime
	.timeline({ loop: false })
	.add({
		targets: ".ml16 .letter",
		translateY: [-100, 0],
		easing: "easeOutExpo",
		duration: 1500,
		delay: (el, i) => 30 * i,
	})
	.add({
		targets: ".ml16 .letter",
		translateY: [0, 100],
		easing: "easeOutExpo",
		duration: 3000,
		delay: (el, i) => 2000 + 30 * i,
	});

gsap.to(".pre-loader", {
	scale: 0.5,
	ease: "power4.inOut",
	duration: 2,
	delay: 3,
	onComplete: () => {
		reappearCard();
		reappearHero();
		reappearNavbar();
	},
});

gsap.to(".loader", {
	height: "0",
	ease: "power4.inOut",
	duration: 1.5,
	delay: 3.75,
});

gsap.to(".loader-bg", {
	height: "0",
	ease: "power4.inOut",
	duration: 1.5,
	delay: 4,
	onComplete: enableScroll,
});

gsap.to(".loader-2", {
	clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
	ease: "power4.inOut",
	duration: 1.5,
});

gsap.from(".header h1", {
	y: 200,
	ease: "power4.inOut",
	duration: 1.5,
	delay: 3.75,
	stagger: 0.05,
});

gsap.to(".img", {
	clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
	ease: "power4.inOut",
	duration: 1.5,
	delay: 4.5,
	stagger: 0.25,
});


//Highlight the section
document.addEventListener("DOMContentLoaded", () => {
	const sections = document.querySelectorAll("section");
	const navLinks = document.querySelectorAll(".nav-link");

	const setActiveLink = () => {
		let index = sections.length;

		while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

		navLinks.forEach((link) => link.classList.remove("active"));
		navLinks[index]?.classList.add("active");
	};

	navLinks.forEach((link) => {
		link.addEventListener("click", (e) => {
			e.preventDefault();
			const targetId = link.getAttribute("href").substring(1);
			const targetSection = document.getElementById(targetId);

			window.scrollTo({
				top: targetSection.offsetTop - 50,
				behavior: "smooth",
			});

			navLinks.forEach((link) => link.classList.remove("active"));
			link.classList.add("active");
		});
	});

	window.addEventListener("scroll", setActiveLink);
});
