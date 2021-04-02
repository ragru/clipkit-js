/**
 * @desc ユーザー情報
 */
export default class User {
  data: object;

  /**
   * @ignore
   */
  constructor(data: object) {
    this.data = data;
  }

  /**
   * @return {string} Permalink ID
   */
  get key(): string {
    return this.data['key'];
  }

  /**
   * @return {string} E-mail
   */
  get email(): string {
    return this.data['email'];
  }

  /**
   * @return {string} 表示名
   */
  get screenName(): string {
    return this.data['screenName'];
  }

  /**
   * @return {string} E-mail以外のログインID
   */
  get signId(): string {
    return this.data['signId'];
  }

  /**
   * @return {string} ライターページURL
   */
  get url(): string {
    return this.data['url'];
  }

  /**
   * @return {Array<string>} ロール名の配列
   */
  get roles(): Array<string> {
    return this.data['roles'];
  }

  /**
   * @return {Array<string>} ユーザー種別コードの配列
   */
  get kinds(): Array<string> {
    return this.data['kinds'];
  }

  /**
   * @desc 指定ロールに属しているかどうか
   * @param {string} roleName - ロール名(Name)
   * @return {boolean} 指定ロールに属していたらtrue
   */
  hasRole(roleName: string): boolean {
    return this.roles.includes(roleName);
  }

  /**
   * @desc 指定種別に属しているかどうか
   * @param {string} kindCode - ユーザー種別コード
   * @return {boolean} 指定種別に属していたらtrue
   */
  hasKind(kindCode: string): boolean {
    return this.kinds.includes(kindCode);
  }
}
