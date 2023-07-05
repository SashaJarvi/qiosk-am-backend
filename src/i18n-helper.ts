const { I18n } = require("i18n");
const { join } = require("path");
const i18n = new I18n({
  locales: ["ru", "en", "hy"],
  defaultLocale: process.env.I18N_DEFAULT_LOCALE || "ru",
  directory: join(__dirname, "locales"),
  objectNotation: true,
});

module.exports = i18n;
