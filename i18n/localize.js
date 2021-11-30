import i18n from "./i18n.js";

document.querySelectorAll("[data-locale]").forEach((e) => {
  i18n.getMessage(e.dataset.locale).then((msg) => (e.innerText = msg));
});
