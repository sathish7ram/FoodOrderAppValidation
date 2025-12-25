export class AddCardDeatils {
  constructor(page) {
    this.page = page;
  }

  async cardDetails(cardNumber = '4111 1111 1111 1111', expiry = '01 / 33', cvc = '123') {
    try {
      console.log('[AddCardDeatils] Starting card details fill');

      // Find all Stripe frames dynamically by name prefix (avoids hardcoded frame names)
      const frames = this.page.locator('iframe[name^="__privateStripeFrame"]');
      const frameCount = await frames.count();
      console.log(`[AddCardDeatils] Found ${frameCount} Stripe frames`);
/* 
      if (frameCount < 3) {
        console.warn(`[AddCardDeatils] Expected 3+ frames, found ${frameCount}. Skipping card fill.`);
        return;
      } */

      // Frame 0: Card number
      const numberFrame = await frames.nth(0).contentFrame();
      if (numberFrame) {
        const numberBox = numberFrame.getByRole('textbox', { name: /credit or debit card number/i });
        await numberBox.waitFor({ state: 'visible', timeout: 5000 });
        await numberBox.fill(cardNumber);
        console.log('[AddCardDeatils] Filled card number');
      }

      // Frame 1: Expiry date
      const expiryFrame = await frames.nth(1).contentFrame();
      if (expiryFrame) {
        const expiryBox = expiryFrame.getByRole('textbox', { name: /credit or debit card/i });
        await expiryBox.waitFor({ state: 'visible', timeout: 5000 });
        await expiryBox.fill(expiry);
        console.log('[AddCardDeatils] Filled expiry date');
      }

      // Frame 2: CVC
      const cvcFrame = await frames.nth(2).contentFrame();
      if (cvcFrame) {
        const cvcBox = cvcFrame.getByRole('textbox', { name: /cvc|cvv/i });
        await cvcBox.waitFor({ state: 'visible', timeout: 5000 });
        await cvcBox.fill(cvc);
        console.log('[AddCardDeatils] Filled CVC');
      }

      console.log('[AddCardDeatils] Card details filled successfully');
    } 
    catch (error) {
      console.error('[AddCardDeatils] Error filling card details:', error.message);
      throw error;
    }
  }
}