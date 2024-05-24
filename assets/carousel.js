const generateTestimonials = testimonials => {
  const swiperWrapper = document.querySelector(".swiper-wrapper");

  //-------------RATING VALIDATOR-------//
  let checker = true;
  testimonials.some((testimonial, i) => {
    if (
      typeof testimonial.rating !== "number" ||
      testimonial.rating < 1 ||
      testimonial.rating > 5
    ) {
      checker = false;
      console.error(
        `🦜Type of "rating" can't be different from "number", also rating needs to be over 1 and under or equal to 5.`
      );
      console.error(`🔍But don't worry, the problem is in the element ${i}.`);
    }
  });

  if (!checker) {
    return;
  }
  //------------------------------//

  const fragment = document.createDocumentFragment();

  testimonials.forEach(testimonial => {
    const swiperSlide = document.createElement("div");
    swiperSlide.className = "swiper-slide";

    const profileDiv = document.createElement("div");
    profileDiv.className = "profile";

    const profileImg = document.createElement("img");
    profileImg.src = testimonial.image;
    profileImg.alt = testimonial.name;

    const $googleLogo = document.createElement("a");
    $googleLogo.href =
      "https://maps.app.goo.gl/xyGr8VPeG8JZB9G38";
    $googleLogo.setAttribute("target", "_blank");
    $googleLogo.classList.add("logo-review");

    const $googleImg = document.createElement("img");
    $googleImg.src = "/assets/images/g-review-mini-logo.png";
    $googleImg.alt = "Google Reviews Logo";

    const starsAndNameDiv = document.createElement("div");
    starsAndNameDiv.className = "starsAndName";

    const nameHeader = document.createElement("h3");
    nameHeader.textContent = testimonial.name;

    const starsDiv = document.createElement("div");
    starsDiv.className = "stars";

    Array(testimonial.rating)
      .fill(null)
      .forEach(() => {
        const starImg = document.createElement("img");
        starImg.src = "/assets/images/star-solid.svg";
        starImg.alt = "rating start";
        starsDiv.appendChild(starImg);
      });

    const commentContainerDiv = document.createElement("div");
    commentContainerDiv.className = "commentContainer";

    const commentParagraph = document.createElement("p");
    commentParagraph.textContent = testimonial.review;

    // Construir la estructura del DOM
    starsAndNameDiv.appendChild(nameHeader);
    starsAndNameDiv.appendChild(starsDiv);

    $googleLogo.appendChild($googleImg);
    profileDiv.appendChild($googleLogo);
    profileDiv.appendChild(profileImg);
    profileDiv.appendChild(starsAndNameDiv);

    swiperSlide.appendChild(profileDiv);
    swiperSlide.appendChild(commentContainerDiv);

    commentContainerDiv.appendChild(commentParagraph);

    fragment.appendChild(swiperSlide);
  });

  // Limpiar contenido existente y añadir el nuevo
  swiperWrapper.innerHTML = "";
  swiperWrapper.appendChild(fragment);

  // Inicializar Swiper
  new Swiper(".mySwiper", {
    spaceBetween: 30,
    freeMode: false,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      760: {
        slidesPerView: 1,
      },
      1200: {
        slidesPerView: 2,
      },
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });
};

export { generateTestimonials };
