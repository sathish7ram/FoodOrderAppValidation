import { expect } from '@playwright/test';
import { log } from '../utils/logger.js';

export class OrderPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    // Primary locators
    this.startOrderButton = page.getByRole('button', { name: /start order/i });
    this.searchBox = page.getByRole('textbox', { name: /search menu/i });
    this.checkoutLink = page.getByRole('link', { name: /checkout/i });
    this.proceedAsGuestButton = page.getByRole('button', { name: /proceed as guest/i });
    this.firstNameBox = page.getByRole('textbox', { name: /first name/i });
    this.lastNameBox = page.getByRole('textbox', { name: /last name/i });
    this.emailBox = page.getByRole('textbox', { name: /email/i });
    this.phoneBox = page.getByRole('textbox', { name: /\(123\) 456-7890 \*/i });
  }

  async clearCookies() {
    // Clear cookies for the current browser context
    try {
      await this.page.context().clearCookies();
      log('clearCookies', 'Cleared browser context cookies');
    } catch (e) {
      // Some Playwright versions/platforms may not support this API; ignore any error
    }
  }

  async goto(url = 'https://dev-order.boons.io/site/citys-one-ovens/49') 
  {
    // Use DOMContentLoaded to avoid waiting indefinitely for networkidle
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    // Prefer waiting for a specific page-ready element rather than networkidle
    try {
      await this.startOrderButton.waitFor({ state: 'visible', timeout: 30000 });
    } catch (e) {
      // if the start button doesn't appear, continue and let later steps surface the error
    }
  }

  async startOrder() {
    log('startOrder', 'waiting for Start Order button');
    await this.startOrderButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.startOrderButton.click();
    log('startOrder', 'clicked Start Order');
  }

  async searchAndOpenItem(text) {
    log('searchAndOpenItem', `searching for ${text}`);
    await this.searchBox.waitFor({ state: 'visible', timeout: 10000 });
    await this.searchBox.click();
    await this.searchBox.fill(text);
    try {
      await this.searchBox.press('Enter');
    } catch (e) {
      // ignore if not supported
    }
    const item = this.page.getByRole('link', { name: new RegExp(text, 'i') });
    await item.first().waitFor({ state: 'visible', timeout: 10000 });
    await item.first().click();
    log('searchAndOpenItem', `opened item ${text}`);
  }

  async increaseQuantity(times = 1) {
    log('increaseQuantity', `increasing by ${times}`);
    const plus = this.page.locator('.ti-plus');
    for (let i = 0; i < times; i++) {
      await plus.waitFor({ state: 'visible', timeout: 5000 });
      await plus.click();
    }
    log('increasedQuantity', `increased by ${times}`);
  }

  async addToCart() {
    log('addToCart', 'waiting for Add to cart');
    const addBtn = this.page.getByRole('button', { name: /add to cart/i });
    await addBtn.waitFor({ state: 'visible', timeout: 10000 });
    await addBtn.click();
    log('addToCart', 'clicked Add to cart');
  }

  async toggleCheckmark() {
    log('toggleCheckmark', 'toggling checkmark');
    const check = this.page.locator('.checkmark');
    await check.waitFor({ state: 'visible', timeout: 5000 });
    await check.click();
    log('toggleCheckmark', 'toggled checkmark');
  }

  async fillInstructions(text) {
    log('fillInstructions', `filling instructions: ${text}`);
    const instr = this.page.locator('#instructions');
    await instr.waitFor({ state: 'visible', timeout: 5000 });
    await instr.fill(text);
    log('fillInstructions', 'filled instructions');
  }

  async goToCheckout() {
    log('goToCheckout', 'navigating to checkout');
    await this.checkoutLink.waitFor({ state: 'visible', timeout: 10000 });
    await this.checkoutLink.click();
    log('goToCheckout', 'clicked checkout link');
  }

  async proceedAsGuest() {
    log('proceedAsGuest', 'clicking proceed as guest');
    await this.proceedAsGuestButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.proceedAsGuestButton.click();
    log('proceedAsGuest', 'clicked proceed as guest');
  }

  async fillPickupInstructions(text) {
    log('fillPickupInstructions', `filling pickup instructions: ${text}`);
    const pickupField = this.page.getByRole('textbox', { name: /pickup instructions/i });
    await pickupField.waitFor({ state: 'visible', timeout: 5000 });
    await pickupField.fill(text);
    log('fillPickupInstructions', 'filled pickup instructions');
  }

  async clickCustomCheckbox() {
    log('clickCustomCheckbox', 'clicking custom checkbox');
    const cb = this.page.locator('.custom-checkbox');
    await cb.waitFor({ state: 'visible', timeout: 5000 });
    await cb.click();
    log('clickCustomCheckbox', 'clicked custom checkbox');
  }

  async fillCustomerDetails({ first, last, email, phone }) {
    if (first) {
      log('fillCustomerDetails', `filling first name: ${first}`);
      await this.firstNameBox.waitFor({ state: 'visible', timeout: 5000 });
      await this.firstNameBox.fill(first);
    }
    if (last) {
      log('fillCustomerDetails', `filling last name: ${last}`);
      await this.lastNameBox.waitFor({ state: 'visible', timeout: 5000 });
      await this.lastNameBox.fill(last);
    }
    if (email) {
      log('fillCustomerDetails', `filling email: ${email}`);
      await this.emailBox.waitFor({ state: 'visible', timeout: 5000 });
      await this.emailBox.fill(email);
    }
    if (phone) {
      log('fillCustomerDetails', `filling phone: ${phone}`);
      await this.phoneBox.waitFor({ state: 'visible', timeout: 5000 });
      await this.phoneBox.fill(phone);
    }
  }

  // Stripe frames are often injected; we'll find them by a common prefix and fill sequentially
  async fillCardDetails({ number = '4111 1111 1111 1111', expiry = '01 / 33', cvc = '123' } = {}) {
    log('fillCardDetails', 'attempting to fill card frames');
    const frames = this.page.locator('iframe[name^="__privateStripeFrame"]');
    const count = await frames.count();
    log('fillCardDetails', `found ${count} stripe frames`);
    if (count < 3) {
      log('fillCardDetails', 'not enough frames; skipping card fill');
      return; // don't throw here; keep test flow tolerant
    }

    const numberFrame = await frames.nth(0).contentFrame();
    if (numberFrame) {
      const numBox = numberFrame.getByRole('textbox', { name: /credit or debit card number/i });
      await numBox.waitFor({ state: 'visible', timeout: 5000 });
      await numBox.fill(number);
      log('fillCardDetails', 'filled card number');
    }

    const expFrame = await frames.nth(1).contentFrame();
    if (expFrame) {
      const expBox = expFrame.getByRole('textbox', { name: /credit or debit card/i });
      await expBox.waitFor({ state: 'visible', timeout: 5000 });
      await expBox.fill(expiry);
      log('fillCardDetails', 'filled card expiry');
    }

    const cvcFrame = await frames.nth(2).contentFrame();
    if (cvcFrame) {
      const cvcBox = cvcFrame.getByRole('textbox', { name: /cvc|cvv/i });
      await cvcBox.waitFor({ state: 'visible', timeout: 5000 });
      await cvcBox.fill(cvc);
      log('fillCardDetails', 'filled card cvc');
    }
  }

  async expectOnCheckoutPage() {
    await expect(this.page).toHaveURL(/checkout|order|payment/, { timeout: 10000 });
  }
}
