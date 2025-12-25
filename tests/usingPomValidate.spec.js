import {test,expect} from '@playwright/test'
import { NavigationPage } from './pages/NavigationPage.js';
import { PickupOrderDateSelection } from './pages/PickupOrderDateSelection.js';
import { SearchFoods } from './pages/SearchFoods.js';
import { Checkoutbtn } from './pages/Checkoutbtn.js';
import { Orderinfo } from './pages/Orderinfo.js';
import { UserInfo } from './pages/UserInfo.js';
import { AddCardDeatils } from './pages/AddCardDetatils.js';
import { ClearCookies } from './pages/ClearCookies.js';
import { btnCheckout } from './pages/CartCheckout.js';

test('Using POM framework Place an order', async ({ page }) =>
 {
    const npage = new NavigationPage(page);
    await npage.urlNavigation();
    // assert using the Playwright page instance
    await expect(page).toHaveURL(/citys-one-ovens/);
    console.log('Navigation to HomePage successful');
 
    const ccookies = new ClearCookies();
    await ccookies.clearCookies();


    const pickdate = new PickupOrderDateSelection(page);
    await pickdate.selectPickupDate();
    console.log('Pickup date selection successful');
 

    // Search the food items.
    const foodpage = new SearchFoods(page);
    await foodpage.searchBiriyani();
    
    console.log('Food items added to cart successfully');
    const verifyQuantity = new Checkoutbtn(page);
    await verifyQuantity.getCheckoutQuantity(); 
    await expect(await verifyQuantity.getCheckoutQuantity()).toBe(foodpage.appliedQuantityValue);
    console.log('Verified quantity in checkout is matched with applied quantity');

    const clickcheckout = new Checkoutbtn(page);
    await clickcheckout.clickCheckout();
    console.log('Proceeded to Checkout successfully');

    const quantity = await clickcheckout.getCheckoutQuantity();
    console.log('Retrieved quantity:', quantity);
    
    const pickupinfo = new Orderinfo(page);
    await pickupinfo.pickupInstructions('test Order 25');
    console.log('Pickup instructions added successfully');


    const userDetails = new UserInfo(page);
    await userDetails.UserInformation();
    console.log('User information filled successfully');

    const creditCardDetails = new AddCardDeatils(page);
    await creditCardDetails.cardDetails();
    console.log('Card details added successfully'); 

    const qunantityCartPage = new btnCheckout(page);
    await qunantityCartPage.qunantityOnCartPage();      
    await expect(await qunantityCartPage.qunantityOnCartPage()).toBe(foodpage.appliedQuantityValue);
    console.log('Verified quantity in cart page is matched with applied quantity'); 
 });
