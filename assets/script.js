import { generateTestimonials } from "/assets/carousel.js";
import { testimonials } from "/assets/testimonials.js";

const $headerButtonsContainer = document.getElementById("bannerCTA");
const $contactBanner = document.getElementById("contact-section");
const $couponSection = document.querySelector(".coupons");
const $cards = document.getElementById("icon-boxes");

const $logos = document.querySelectorAll(".clickeable-logo");
const $hamburguerButton = document.getElementById("hamburger-btn");
const $sideMenu = document.getElementById("side-menu");
const $navbar = document.getElementById("mobile-nav");
const $schedule = document.getElementById("scheduleBtn");

let lastScrollY = window.scrollY;
let isOpen = false;

/*Function that replaces the phone number locally*/

const replacePhoneNumber = () => {
  const oldPhoneNumber = '(978)-487-5396';
  const newPhoneNumber = '888-423-7337';
  const newPhoneNumberHref = '8884237337';

  const links = document.getElementsByTagName('a');

  Array.from(links).forEach(link => {
      if (link.textContent.includes(oldPhoneNumber)) {
          link.textContent = link.textContent.replace(oldPhoneNumber, newPhoneNumber);
      }

      const oldPhoneNumberHref = oldPhoneNumber.replace(/[\(\)-\s]/g, '');
      if (link.href.includes(oldPhoneNumberHref)) {
          link.href = link.href.replace(oldPhoneNumberHref, newPhoneNumberHref);
      }
  });
};

const replaceContactLink = () => {
  const newLink = "/contact-us.html";

  const links = document.querySelectorAll('a[href="#form-section"]');
  console.log(links);

  links.forEach(link => {
    link.href = newLink;
  });
};

document.addEventListener("DOMContentLoaded", replaceContactLink());


/* Function to handle call swapping script after all elements have loaded */

const loadPhoneNumberScript = () => {
  replacePhoneNumber();

  const script = document.createElement('script');
  script.src = 'https://s.ksrndkehqnwntyxlhgto.com/120658.js';
  script.onerror = () => console.error('Failed to load script1');
  document.body.appendChild(script);
};

/* Recyclable function to fetch the HTML content and return plain text. */
const dynamicPieces = async url => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }
    const plainHTML = await response.text();  // Make sure to await the response.text() method.
    return plainHTML;
  } catch (error) {
    console.error("🚬 Failed to render, check every execution of function dynamicPieces:", error);
    return "";  // Return an empty string in case of error to prevent further issues.
  }
};

/* Rendering header buttons, using dynamicPieces */
const renderBtns = () => {
  return new Promise((resolve, reject) => {
    document.addEventListener("DOMContentLoaded", async event => {
      try {
        const btnURL = "/assets/dynamic/heroButtons.html";
        const btnHTML = await dynamicPieces(btnURL);
        $headerButtonsContainer.innerHTML = btnHTML;
        resolve();
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  });
};

const renderContactBanner = () => {
  return new Promise((resolve, reject) => {
    document.addEventListener("DOMContentLoaded", async event => {
      try {
        const contactBanner = "/assets/dynamic/contact-banner.html"
        const cbHtml = await dynamicPieces(contactBanner);
        $contactBanner.innerHTML = cbHtml;
        resolve();
      } catch (error) {
        console.log(error)
        reject(error)
      }
    });
  });
};

/*Render coupons */
const renderCoupons = () => {
  try {
    document.addEventListener("DOMContentLoaded", async event => {
      const couponURL = "/assets/dynamic/coupons.html";
      const couponHTML = await dynamicPieces(couponURL);
      $couponSection.innerHTML = couponHTML;
    });
  } catch (error) {
    console.error(error);
  }
};

/* Function to determine the phone number based on the current URL */
const getPhoneNumber = () => {
  const currentURL = window.location.pathname;

  const phoneNumbers = {
    '/air-conditioning/ac-repair': '(541) 215-8703',
    '/heating/heating-repair': '(541) 216-4559',
    '/air-conditioning/ac-maintenance': '(541) 209-6379',
    '/heatpumps/heatpump-repair': '(541) 216-7113',

    'default': ''  // Default phone number if URL doesn't match any case
  };


  return phoneNumbers[currentURL] || phoneNumbers['default'];
};

/* Rendering footer, using dynamicPieces */
const renderFooter = () => {
  return new Promise((resolve, reject) => {
    document.addEventListener("DOMContentLoaded", async event => {
      try {
        const footURL = "/assets/dynamic/footer.html";
        const footHTML = await dynamicPieces(footURL);
        const footer = document.querySelector('footer');  // Ensure you have a footer element in your HTML.
        if (footer) {
          footer.innerHTML = footHTML;

          const phoneNumber = getPhoneNumber();
          const phoneElement = document.getElementById('phone-number');
          if (phoneElement) {
            phoneElement.textContent = `${phoneNumber}`;
          } else {
            console.error('Element with id "phone-number" not found in the footer.');
          }

          resolve();
        } else {
          console.error("Footer element not found on the page.");
          reject("Footer element not found on the page.");
        }
      } catch (error) {
        console.error("Error rendering footer:", error);
        reject(error);
      }
    });
  });
};

/* Rendering icon boxes, using dynamicPieces */
const renderCards = () => {
  document.addEventListener("DOMContentLoaded", async event => {
    try {
      const cardsURL = "/assets/dynamic/cards.html";
      const cardsHTML = await dynamicPieces(cardsURL);
      $cards.innerHTML = cardsHTML;
    } catch (error) {
      console.error(error);
    }
  });
};

/* This is used to add links to logos or any other thing */
const setLinkLogo = logo => {
  logo.addEventListener("click", event => {
    window.location.href = "/";
  });
};

/*Adding links to selected logos*/
const createLinkInLogos = () => {
  window.addEventListener("DOMContentLoaded", event => {
    $logos.forEach(logo => {
      setLinkLogo(logo);
    });
  });
};

/*Harmburguer Actions*/

const hamburguerLogic = () => {
  if (isOpen === false) {
    $sideMenu.classList.add("side-menu-open");
    document.body.classList.add('no-scroll');
    isOpen = true;
  } else {
    $sideMenu.classList.remove("side-menu-open");
    document.body.classList.remove('no-scroll');
    isOpen = false;
  }
};

document.addEventListener("click", event => {
  if (
    !event.target.matches("input") &&
    !event.target.matches("path") &&
    !event.target.matches("svg") &&
    !event.target.classList.contains("side-menu-open") &&
    isOpen === true
  ) {
    $sideMenu.classList.remove("side-menu-open");
    $hamburguerButton.checked = false;
    isOpen = false;
  }
});

window.addEventListener("resize", event => {
  if (window.innerWidth >= 1400) {
    $sideMenu.classList.remove("side-menu-open");
    $hamburguerButton.checked = false;
    isOpen = false;
  }
});

$hamburguerButton.addEventListener("click", hamburguerLogic);

/*----header hiding------*/

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  let threshold;
  threshold = window.innerHeight / 3;
  if (window.scrollY > threshold){
    if (currentScrollY < lastScrollY) {
      $navbar.style.opacity = "1";
      $navbar.style.pointerEvents = 'all';
  } else {
      $navbar.style.opacity = "0";
      $navbar.style.pointerEvents = 'none';
  }
  } else {
    $navbar.style.opacity = '1';
    $navbar.style.pointerEvents = 'all';
  }


  if (window.location.pathname !== '/contact-us') {
      if ($schedule) {
        if (window.scrollY > threshold){
          if (currentScrollY < lastScrollY) {
            $schedule.style.opacity = "1";
        } else {
            $schedule.style.opacity = "0";
        }
        }
      }
  }

  lastScrollY = currentScrollY;
});

/*----header hiding ends------*/

/*----waiting for dynamic pieces to execute phone script insertion------*/

Promise.all([renderFooter(), renderBtns(), renderContactBanner()])
  .then(loadPhoneNumberScript(), console.log("replacing"))
  .catch(error => console.error('One of the promises failed:', error));

  /*----waiting for dynamic pieces to execute phone script insertion------*/

  /*----handling phone script in pages with less than 2 dynamic renders------*/

  document.addEventListener('DOMContentLoaded', () => {
    const oldLink = '/contact-us';
    const newLink = '/book-online';

    const buttons = document.querySelectorAll('.classic-button');

    buttons.forEach(button => {

        if (button.href === oldLink) {
          button.href = newLink;
          console.log("replacing btns links");
        }
    });
  });

/*Executions*/

renderCards();
renderCoupons();
createLinkInLogos();
generateTestimonials(testimonials);
phoneSwapIfNotDynamic();

