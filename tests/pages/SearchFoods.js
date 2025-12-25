export class SearchFoods 
{
    constructor(page) 
    {
        this.page = page; 
        this.searchBox = page.getByRole('textbox', { name: /search menu/i });
    }

async searchBiriyani()
{
await this.searchBox.waitFor({ state: 'visible', timeout: 10000 });
await this.page.getByRole('textbox', { name: 'Search Menu' }).click();
console.log('Clicked on Search Menu textbox');
await this.page.getByRole('textbox', { name: 'Search Menu' }).fill('biriyani');
console.log('Filled biriyani in Search Menu textbox');
await this.page.locator('.icon-magnifier').click();
console.log('Clicked on Search button');
await this.page.getByRole('link', { name: 'Chicken Biriyani' }).click();
await this.page.locator('.ti-plus').click();
await this.page.locator('input[id^="quantity_for_menu"]').fill('4');
this.appliedQuantityValue = await this.page.locator('input[id^="quantity_for_menu"]').inputValue();
console.log('Food quantity set to:', this.appliedQuantityValue);
console.log('Food quantity is increased');
await this.page.getByRole('button', { name: 'Add to cart $' }).click();
await this.page.locator('.checkmark').click();
await this.page.locator('#instructions').click();
await this.page.locator('#instructions').fill('Test 123456');
await this.page.getByRole('button', { name: 'Add to cart $' }).click();
console.log('Add to cart done');
}
}
