import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { chromium } from 'playwright';

const baseURL = process.env.TEST_BASE_URL || 'http://127.0.0.1:4173';

let browser;
let page;

before(async () => {
    browser = await chromium.launch({ headless: true });
    page = await browser.newPage();
});

after(async () => {
    await browser?.close();
});

test('interactive rollers receive their initial notation and can roll', async () => {
    await page.goto(baseURL, { waitUntil: 'networkidle' });

    const inputs = page.locator('.dice-roller input[name="notation"]');
    assert.equal(await inputs.count(), 5);
    assert.equal(await inputs.nth(0).inputValue(), '4d6');
    assert.equal(await inputs.nth(1).inputValue(), '');
    assert.equal(await inputs.nth(2).inputValue(), '4d6kh3');
    assert.equal(await inputs.nth(3).inputValue(), '2d6+d8+3');
    assert.equal(await inputs.nth(4).inputValue(), 'not-a-roll');

    const basic = page.locator('.dice-roller').nth(0);
    await basic.getByRole('button', { name: 'Roll' }).click();
    await basic.locator('output[name="output"]').waitFor();
    assert.match(await basic.locator('output[name="output"]').innerText(), /4d6/i);

    const empty = page.locator('.dice-roller').nth(1);
    assert.equal(await empty.getByRole('button', { name: 'Roll' }).isDisabled(), true);

    const invalid = page.locator('.dice-roller').nth(4);
    await invalid.getByRole('button', { name: 'Roll' }).click();
    await invalid.getByRole('alert').waitFor();
    assert.match(await invalid.getByRole('alert').innerText(), /invalid notation/i);

    await invalid.locator('input[name="notation"]').fill('1d1');
    await invalid.locator('input[name="notation"]').press('Enter');
    await invalid.locator('output[name="output"]').waitFor();
    assert.equal(await invalid.getByRole('alert').count(), 0);
    assert.match(await invalid.locator('output[name="output"]').innerText(), /1d1/i);
});

test('static rolls render and client-side navigation restores interactive rollers', async () => {
    await page.goto(new URL('/static-rolls', baseURL).href, { waitUntil: 'networkidle' });
    const content = await page.locator('main').innerText();
    assert.match(content, /Deterministic result/);
    assert.match(content, /1d1/);

    await page.getByRole('link', { name: 'Interactive rollers' }).first().click();
    await page.locator('.dice-roller input[name="notation"]').first().waitFor();
    assert.equal(await page.locator('.dice-roller input[name="notation"]').first().inputValue(), '4d6');
});
