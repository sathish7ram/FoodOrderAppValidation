import { test, expect } from '@playwright/test';
import { OrderPage } from './pages/OrderPage.js';
import { initLog, closeLog } from './utils/logger.js';

test('test - POM', async ({ page }) => 
  {
  // initialize per-run log file
  initLog('TestAutoCode');
  const order = new OrderPage(page);
  // Clear cookies to ensure a clean session before navigation
  await order.clearCookies();
  await order.goto();
  await order.startOrder();
  await order.searchAndOpenItem('biriyani');
  await order.increaseQuantity(3);
  await order.addToCart();
  await order.toggleCheckmark();
  await order.fillInstructions('test new');
  // Add to cart again (keeps original flow)
  await order.addToCart();
  await order.goToCheckout();
  await order.proceedAsGuest();
  await order.fillPickupInstructions('test Order 25');
  await order.clickCustomCheckbox();
  await order.fillCustomerDetails({
    first: 'sample quick',
    last: 'test',
    email: 'sathishram.test@gmail.com',
    phone: '(875)447-1344'
  });

  // Fill card details (best-effort; frames may vary)
  await order.fillCardDetails();

  console.log('Test completed successfully');
  // finalize log file
  closeLog();
  await page.close();
});