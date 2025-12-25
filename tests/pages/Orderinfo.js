export class Orderinfo
{
    constructor(page)
    {
        this.page = page;
    } 

    async pickupInstructions()
    {
        await this.page.getByRole('textbox', { name: 'Pickup Instructions (Optional)' }).click();
        await this.page.getByRole('textbox', { name: 'Pickup Instructions (Optional)' }).fill('Add More spice ');
        await this.page.locator('.custom-checkbox').click();
    }
}

