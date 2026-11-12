import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createSSRApp, h } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { DiceRoller } from '../src/client/components/DiceRoller.js';

test('the client-only roller renders no interactive markup on the server', async () => {
    const html = await renderToString(createSSRApp({
        render: () => h(DiceRoller, { notation: '4d6kh3', 'data-test': 'forwarded' }),
    }));

    assert.equal(html, '<!---->');
});
