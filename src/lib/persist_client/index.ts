import Cookies from 'js-cookie';
import LocalStorage from './localStorage';

export default class PersistClient {
  static getTranslationsStore() {
    return LocalStorage;
  }

  static getLocaleStore() {
    return Cookies;
  }

  static getThemeStore() {
    return Cookies;
  }
}
