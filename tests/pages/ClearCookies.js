export class ClearCookies
{

    constructor (page)
    {
    this.page=page;
    }
   

async clearCookies() 
{
    // Clear cookies for the current browser context
    try {
      await this.page.context().clearCookies();
      log('clearCookies', 'Cleared browser context cookies');
    } catch (e) {
      // Some Playwright versions/platforms may not support this API; ignore any error
    }
  }
}