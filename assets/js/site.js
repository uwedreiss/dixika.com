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

  const wireMailtoForm = function () {
    const form = document.querySelector("[data-mailto-form]");
    if (!form) {
      return;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const data = new FormData(form);
      const name = (data.get("name") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const company = (data.get("company") || "").toString().trim();
      const service = (data.get("service") || "").toString().trim();
      const budget = (data.get("budget") || "").toString().trim();
      const timeline = (data.get("timeline") || "").toString().trim();
      const message = (data.get("message") || "").toString().trim();
      const recipient = (form.getAttribute("data-email") || "hello@dixika.com").trim();

      if (!name || !email || !message) {
        const status = document.querySelector("[data-form-status]");
        if (status) {
          status.textContent = "Name, email, and message are required.";
          status.classList.remove("text-success");
          status.classList.add("text-danger");
        }
        return;
      }

      const subject = encodeURIComponent("New inquiry from dixika.com");
      const body = encodeURIComponent(
        [
          "Name: " + name,
          "Email: " + email,
          "Company: " + (company || "n/a"),
          "Service: " + (service || "n/a"),
          "Budget: " + (budget || "n/a"),
          "Timeline: " + (timeline || "n/a"),
          "",
          message,
        ].join("\n")
      );

      window.location.href = "mailto:" + recipient + "?subject=" + subject + "&body=" + body;

      const status = document.querySelector("[data-form-status]");
      if (status) {
        status.textContent = "Opening your email client now.";
        status.classList.remove("text-danger");
        status.classList.add("text-success");
      }
    });
  };

  $(window).on("scroll", onScroll);
  $(onScroll);
  $(document).ready(function () {
    revealElements();
    wireMailtoForm();
  });
})(jQuery);
