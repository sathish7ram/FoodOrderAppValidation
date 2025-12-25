export class NavigationPage {
    constructor(page) {
    this.page = page;
  }

  async urlNavigation() 
  {
    await this.page.goto('https://dev-order.boons.io/site/citys-one-ovens/49');
    // wait for a known element or url to settle
    //await this.page.waitForLoadState('domcontentloaded');
    
  }
}




