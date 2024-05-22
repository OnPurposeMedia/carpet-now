import { generateTestimonials } from "/assets/carousel.js";
import { testimonials } from "/assets/testimonials.js";

const $headerButtonsContainer = document.getElementById("bannerCTA");
const $footer = document.getElementById("footer");
const $couponSection = document.querySelector(".coupons");
const $cards = document.getElementById("icon-boxes");

const $logos = document.querySelectorAll(".clickeable-logo");
const $hamburguerButton = document.getElementById("hamburger-btn");
const $sideMenu = document.getElementById("side-menu");
const $navbar = document.getElementById("mobile-nav");
const $schedule = document.getElementById("scheduleBtn");
const $swiper = document.querySelector('.mySwiper');

let lastScrollY = window.scrollY;
let isOpen = false;

/*Function that replaces the phone number locally*/

const replacePhoneNumber = () => {
  const oldPhoneNumber = '(978)-487-5396';
  const newPhoneNumber = '(909) 923-7071';
  const newPhoneNumberHref = '9099237071';

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


/* Function to handle call swapping script after all elements have loaded */

const loadPhoneNumberScript = () => {

  replacePhoneNumber();

  const script = document.createElement('script');
  script.src = 'https://scripts.iconnode.com/120649.js';
  script.onerror = () => console.error('Failed to load script1');
  document.body.appendChild(script);

};

/*Recyclable function to fetch the HTML content and return plain text.*/
const dynamicPieces = async url => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw {
        status: response.status,
        message:
          "🚬 Failed to render, check every execution of function dynamicPieces",
      };
    }
    const plainHTML = response.text();
    return plainHTML;
  } catch (error) {
    console.error(error);
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
    '/air-conditioning/ac-repair': '(909) 916-0030',
    '/air-conditioning/ac-maintenance': '(909) 916-0030',
    '/air-conditioning/ac-install': '(909) 916-0030',
    '/air-conditioning/mini-splits': '(909) 916-0030',
    '/heating/heating-installation': '(909) 918-4709',
    '/heating/heating-maintenance': '(909) 918-4709',
    '/heating/heating-repair': '(909) 918-4709',
    '/heatpumps/heatpump-installation': '(909) 703-5684',
    '/heatpumps/heatpump-maintenance': '(909) 703-5684',
    '/heatpumps/heatpump-repair': '(909) 703-5684',

    'default': '(909) 845-3237'  // Default phone number if URL doesn't match any case
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

  if (currentScrollY < lastScrollY) {
      $navbar.style.opacity = "1";
  } else {
      $navbar.style.opacity = "0";
  }

  if (window.location.pathname !== '/contact-us') {
      if ($schedule) {
          if (currentScrollY < lastScrollY) {
              $schedule.style.opacity = "1";
          } else {
              $schedule.style.opacity = "0";
          }
      }
  }

  lastScrollY = currentScrollY;
});


/*----autoplay handling------*/

const autoPlay = () => {
  const stopAutoplay = () => {
    let swiper = document.querySelector('.mySwiper').swiper;
    swiper.autoplay.stop();
  };

  const startAutoplay = () => {
    let swiper = document.querySelector('.mySwiper').swiper;
    swiper.autoplay.start();
  };

  $swiper.addEventListener('mouseenter', stopAutoplay);
  $swiper.addEventListener('mouseleave', startAutoplay);

  $swiper.addEventListener('touchstart', stopAutoplay, { passive: true });
  $swiper.addEventListener('touchend', startAutoplay, { passive: true });

}

/*----autoplay handling ends------*/

/*----waiting for dynamic pieces to execute phone script insertion------*/

Promise.all([renderFooter(), renderBtns()])
  .then(loadPhoneNumberScript(), console.log("replacing"))
  .catch(error => console.error('One of the promises failed:', error));

  /*----waiting for dynamic pieces to execute phone script insertion------*/

  /*----handling phone script in pages with less than 2 dynamic renders------*/

const phoneSwapIfNotDynamic = () => {
  if(window.location.href.includes("contact") || window.location.href.includes("thank")) {
    loadPhoneNumberScript()
  }
}

  /*----handling phone script in pages with less than 2 dynamic renders------*/

/*Executions*/
renderFooter();
renderBtns();
renderCards();
renderCoupons();
createLinkInLogos();
generateTestimonials(testimonials);
phoneSwapIfNotDynamic();