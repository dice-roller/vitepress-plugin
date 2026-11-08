import { defineConfig } from 'vitepress';
import { diceRollerPlugin } from '../../src/node/index.js';

export default defineConfig({
    title: 'Dice Roller Demo',
    description: 'Development demo for the RPG Dice Roller VitePress plugin.',
    markdown: {
        config(md) {
            md.use(diceRollerPlugin);
        },
    },
    themeConfig: {
        nav: [
            { text: 'Interactive rollers', link: '/' },
            { text: 'Static rolls', link: '/static-rolls' },
        ],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/dice-roller/vitepress-plugin' },
        ],
    },
});
