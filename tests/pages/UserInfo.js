export class UserInfo
{
    constructor(page){
        this.page = page;
    } 

    async UserInformation()
    {
  await this.page.getByRole('textbox', { name: 'First Name *' }).click();
  await this.page.getByRole('textbox', { name: 'First Name *' }).fill('12345');
  await this.page.getByRole('textbox', { name: 'Last Name' }).click();
  await this.page.getByRole('textbox', { name: 'Last Name' }).fill('67890');
  await this.page.getByRole('textbox', { name: 'Email *' }).click();
  await this.page.getByRole('textbox', { name: 'Email *' }).fill('cityoneoven@gmail.com');
  
    }
}