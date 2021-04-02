import Cache from './cache';

const axios = require('axios').default;

/**
 * @ignore
 */
export const appConfig = {
  site: process.env.SITE,
  apiEndPoint: process.env.API_ENDPOINT,
  apiId: process.env.API_ID,
  apiSecret: process.env.API_SECRET,
};

/**
 * @ignore
 */
export default class ClipkitClient {
  constructor() {
    this.cache = new Cache();
  }

  urlWithQuery(url, params = {}) {
    let absoluteUrl = url;
    if (Object.keys(params).length > 0) {
      const prms = [];
      for (let key in params) {
        prms.push([key, params[key]].join('='));
      }
      absoluteUrl = [url, prms.join('&')].join('?');
    }
    return absoluteUrl;
  }

  async send(method, url, params = {}, headers = {}) {
    const absoluteUrl = this.urlWithQuery(url, params);
    console.log(`${method} ${absoluteUrl}`);
    headers['Accept'] = 'application/json';
    try {
      const response = await axios({ url: absoluteUrl, method: method, headers: headers });
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getAccessToken() {
    let accessToken = this.cache.read('accessToken');
    if (accessToken === null) {
      const url = appConfig.apiEndPoint + '/oauth/token';
      const params = {
        grant_type: 'client_credentials',
        scope: 'public',
        client_id: appConfig.apiId,
        client_secret: appConfig.apiSecret,
      };
      const data = await this.send('POST', url, params);
      accessToken = data.access_token;
      this.cache.write('accessToken', accessToken, 3600);
    }
    return accessToken;
  }

  async get(options = {}) {
    const accessToken = await this.getAccessToken();
    const headers = {
      Authorization: 'Bearer ' + accessToken,
    };
    const cacheKey = this.urlWithQuery(options.url, options.params);
    let data = this.cache.read(cacheKey);
    if (data == null) {
      data = await this.send('GET', options.url, options.params, headers);
      this.cache.write(cacheKey, data, options['ttl']);
    }
    return data;
  }

  async getSite() {
    const sites = await this.get({
      url: appConfig.apiEndPoint + '/v1/sites',
      ttl: 600,
    });
    let site = null;
    sites.forEach((s) => {
      if (s.name === appConfig.site) {
        site = s;
      }
    });
    return site;
  }

  async getArticles(params = {}) {
    const site = await this.getSite();
    const articles = await this.get({
      url: site._links.articles.href,
      params: params,
      ttl: 600,
    });
    return articles;
  }

  async getArticle(id) {
    const site = await this.getSite();
    const article = await this.get({
      url: appConfig.apiEndPoint + '/v1/sites/' + site.id + '/articles/' + id,
      ttl: 600,
    });
    return article;
  }

  async getCategories() {
    const site = await this.getSite();
    const categories = await this.get({
      url: site._links.categories.href,
      ttl: 600,
    });
    return categories;
  }

  async getCategory(categoryName) {
    const categories = await this.getCategories();
    const category = null;
    categories.forEach((c) => {
      if (c.name === categoryName) {
        category = c;
      }
    });
    return category;
  }

  async getCategoryArticles(categoryName, params = {}) {
    const category = await this.getCategory(categoryName);
    const articles = await this.get({
      url: category._links.articles.href,
      params: params,
      ttl: 600,
    });
    return articles;
  }

  async getTags() {
    const site = await this.getSite();
    const tags = await this.get({
      url: site._links.tags.href,
      ttl: 600,
    });
    return tags;
  }

  async getTag(tagName) {
    const tags = await this.getTags();
    const tag = null;
    tags.forEach((c) => {
      if (c.name === tagName) {
        tag = c;
      }
    });
    return tag;
  }

  async getTagArticles(tagName, params = {}) {
    const tag = await this.getTag(tagName);
    const articles = await this.get({
      url: tag._links.articles.href,
      params: params,
      ttl: 600,
    });
    return articles;
  }
}
