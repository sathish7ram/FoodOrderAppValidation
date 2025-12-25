//import {test,expect} from '@playwright/test'
export class Checkoutbtn
{
    constructor(page)
     {
        this.page = page;
     }

      async getCheckoutQuantity()
          {
         // Locate the quantity input using a dynamic selector that matches the pattern
         const quantityElement = this.page.locator('input[id^="quantity_for_menu_"]');
         const quantityValue = await quantityElement.inputValue();
         console.log('Quantity displayed in the checkout:', quantityValue);
         return quantityValue;
          }
     async clickCheckout()
       {
                
         await this.page.getByRole('link', { name: ' Checkout $' }).click();
         console.log('Clicked on Checkout button');         
         await this.page.getByRole('button', { name: 'Proceed as Guest' }).click();
         console.log('Clicked on Proceed as Guest button');
         }

     
     }
    
