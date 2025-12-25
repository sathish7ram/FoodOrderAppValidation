export class btnCheckout
{
    constructor(page)
     {
        this.page = page;
     }  

     async qunantityOnCartPage()
          {
         // Locate the quantity input using a dynamic selector that matches the pattern
         const cartQuantity = this.page.locator('input[id^="quantity_for_menu_"]');
         const cartquantityValue = await cartQuantity.inputValue();
         //console.log('Quantity displayed in the cart checkout page:', cartquantityValue);
         return cartquantityValue;
          }

        }