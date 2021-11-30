// Load _locales/{language}/messages.json
const DEFAULT_LANG = "en";

async function getMessage(msg, lang) {
  if (!lang) lang = navigator.language;

  return fetch(`./_locales/${lang}/messages.json`)
    .then((res) => res.json())
    .then((json) => {
      if (json[msg]) return json[msg].message;
      else return getMessage(msg, DEFAULT_LANG);
    });
}

export default { getMessage };
