import camelcaseKeys from 'camelcase-keys';
import axios from 'axios';
import User from './user';

/**
 * @desc ClipkitフロントエンドAPIライブラリ
 */
export default class Clipkit {
  _siteRoot: string;
  _currentUserData: object;

  /**
   * @example
   * var clipkit = new Clipkit();
   * @param {string} siteRoot - サイトのルートURL（デフォルト：/）
   */
  constructor(siteRoot: string = '/') {
    this._siteRoot = siteRoot;
    this._currentUserData = null;
  }

  /**
   * @desc ログイン中のユーザーの情報を取得します
   * ※ Cookieを送信するためサイトの同一ドメイン上で実行する必要があります
   * @example
   * clipkit.currentUser().then((user) => {
   *   if (user) {
   *     console.log('You are ' + user.screenName);
   *   } else {
   *     console.log('You are a guest.');
   *   }
   * });
   * @return {Promise<User>} ログイン中のUser（未ログインの場合はNULL）
   */
  async currentUser(): Promise<User> {
    if (!this._currentUserData) {
      const response = await axios.get(`${this._siteRoot}users/me.json`);
      this._currentUserData = camelcaseKeys(response.data.user);
    }
    return new User(this._currentUserData);
  }
}
