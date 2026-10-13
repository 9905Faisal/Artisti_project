

// const text = "I am recently given my SSC exam .Then, I do many types of courses for web design.For doing web design I learn HTML5,CSS,SASS Language .And I also learn a framework which is: Bootstrap.And I am assure that any type of  web design work I will do by taking Responsive and in time.You can be satisfy to my work also.";
// const textElement = document.getElementById("text");

// let index = 0;

// function type() {
//     if (index < text.length) {
//         textElement.textContent += text.charAt(index);
//         index++;
//         setTimeout(type, 100); // Adjust speed here (100ms for slow motion)
//     }
// }

// type()







/*==================== toggle icon navbar ====================*/
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
	menuIcon.addEventListener('click', () => {
		menuIcon.classList.toggle('bx-x');
		navbar.classList.toggle('active');
	});
}

/*==================== scroll sections active link ====================*/
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const header = document.querySelector('header');

if (sections.length && navLinks.length) {
	window.addEventListener('scroll', () => {
		sections.forEach(sec => {
		let top = window.scrollY;
		let offset = sec.offsetTop - 150;
		let height = sec.offsetHeight;
		let id = sec.getAttribute('id');
		
		if (top >= offset && top < offset + height){
			navLinks.forEach(link => {
				link.classList.remove('active');
			})
			const activeLink = document.querySelector('header nav a[href*="' + id + '"]');
			if (activeLink) activeLink.classList.add('active');
		}	
		});
	});
}

window.addEventListener('scroll', () => {
    /*==================== sticky navbar ====================*/
    if (header) header.classList.toggle('sticky', window.scrollY > 100);

    /*==================== remove toggle icon and navbar when click navbar link (scroll) ====================*/
	if (menuIcon) menuIcon.classList.remove('bx-x');
	if (navbar) navbar.classList.remove('active');
});

/*==================== scroll reveal ====================*/
if (typeof ScrollReveal === 'function') ScrollReveal({ 
    // reset: true
	distance: '80px',
	duration: 2000,
	delay: 200,
});
if (typeof ScrollReveal === 'function') {
	ScrollReveal().reveal('#banner .home-content, .heading', { origin: 'top' });
	ScrollReveal().reveal('#banner .home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
	ScrollReveal().reveal('#banner .home-content .h1,#banner .home-content .h2,#banner .home-content .h3 .about-img', { origin: 'left' });
	ScrollReveal().reveal('#banner .home-content p,  .about-content', { origin: 'right' });
}

const skillsSection = document.querySelector('#skills');
if (skillsSection) {
	const skillItems = [...skillsSection.querySelectorAll('.progress')];
	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	skillItems.forEach((item, index) => {
		const bar = item.querySelector('.progress-bar');
		const value = item.querySelector('.val');
		if (!bar || !value) return;

		value.textContent = '0%';
		bar.style.width = '0';
		bar.style.transitionDelay = `${reduceMotion ? 0 : index * 100}ms`;
	});

	const animateSkills = () => {
		skillItems.forEach((item, index) => {
			const bar = item.querySelector('.progress-bar');
			const value = item.querySelector('.val');
			if (!bar || !value) return;

			const target = Number(bar.getAttribute('aria-valuenow'));
			bar.style.width = `${target}%`;

			const animateValue = () => {
				const startTime = performance.now();
				const duration = reduceMotion ? 0 : 1000;
				const update = currentTime => {
					const progress = duration === 0 ? 1 : Math.min((currentTime - startTime) / duration, 1);
					value.textContent = `${Math.round(target * progress)}%`;
					if (progress < 1) requestAnimationFrame(update);
				};
				requestAnimationFrame(update);
			};

			window.setTimeout(animateValue, reduceMotion ? 0 : index * 100);
		});
	};

	if ('IntersectionObserver' in window) {
		const skillsObserver = new IntersectionObserver(entries => {
			if (entries.some(entry => entry.isIntersecting)) {
				animateSkills();
				skillsObserver.disconnect();
			}
		}, { threshold: 0.2 });
		skillsObserver.observe(skillsSection);
	} else {
		animateSkills();
	}
}

/*==================== typed js ====================*/
if (typeof Typed === 'function' && document.querySelector('.multiple-text')) {
	new Typed('.multiple-text', {
		strings: ['Frontend Developer', 'Youtuber', 'Blogger'],
		typeSpeed: 100,
		backSpeed: 100,
		backDelay: 1000,
		loop: true
	});
}

const contactForm = document.querySelector('#contact-form');
if (contactForm) {
	const contactFormStatus = document.querySelector('#contact-form-status');
	contactForm.addEventListener('submit', event => {
		event.preventDefault();

		const formData = new FormData(contactForm);
		const message = [
			`Name: ${formData.get('name')}`,
			`Phone: ${formData.get('phone')}`,
			`Email: ${formData.get('email')}`,
			`Message: ${formData.get('message')}`
		].join('\n');

		contactForm.hidden = true;
		if (contactFormStatus) {
			contactFormStatus.textContent = 'Your message draft is ready. Tap Send in your SMS app to deliver it to +880-1868-727750.';
			contactFormStatus.hidden = false;
		}
		window.location.href = `sms:+8801868727750?body=${encodeURIComponent(message)}`;
	});
}



