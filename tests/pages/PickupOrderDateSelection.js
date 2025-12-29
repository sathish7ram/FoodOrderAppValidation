 export class PickupOrderDateSelection 
 {
    constructor(page) 
    {
        this.page = page;
    }
async selectPickupDate()
{
    //const dateLocator = this.page.getByRole('button', { name: date });
    //await dateLocator.waitFor({ state: 'visible', timeout: 5000 });
    //await dateLocator.click();  

    await this.page.getByRole('dialog').getByText('Pickup', { exact: true }).click();
    //await this.page.locator('#mday').click();
    //await this.page.getByRole('cell', { name: '25' }).click();
    await this.page.getByRole('button', { name: 'Start Order' }).click();

}
 }