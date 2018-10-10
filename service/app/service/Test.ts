import { Service } from 'egg';

/**
 * Test Service
 */
export default class Test extends Service {

  /**
   * sayHi to you
   * @param name - your name
   */
  public async list(page:number = 1) {
    // 声明类型
    interface configStruct {
      serverUrl: string;
      pageSize: number
    }

    // read config
    const { serverUrl, pageSize }: configStruct = this.config.news;

    // use build-in http client to GET hacker-news api
    const { data: idList } = await this.ctx.curl(`${serverUrl}/topstories.json`, {
      data: {
        orderBy: '"$key"',
        startAt: `"${pageSize * (page - 1)}"`,
        endAt: `"${pageSize * page - 1}"`,
      },
      dataType: 'json',
    });

    // parallel GET detail
    const newsList = await Promise.all(
      Object.keys(idList).map(key => {
        const url = `${serverUrl}/item/${idList[key]}.json`;
        return this.ctx.curl(url, { dataType: 'json' });
      })
    );
    console.log(newsList)
    return newsList.map(res => res.data);
  }
}
