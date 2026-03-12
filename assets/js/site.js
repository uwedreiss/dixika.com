(function ($) {
  "use strict";

  const onScroll = function () {
    if ($(window).scrollTop() > 16) {
      $(".navbar").addClass("scrolled");
    } else {
      $(".navbar").removeClass("scrolled");
    }
  };

  const revealElements = function () {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16,
      }
    );

    items.forEach((item) => observer.observe(item));
  };

  $(window).on("scroll", onScroll);
  $(onScroll);
  $(document).ready(function () {
    revealElements();
  });
})(jQuery);
