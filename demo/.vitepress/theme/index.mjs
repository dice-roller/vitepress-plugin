import DefaultTheme from 'vitepress/theme';
import { enhanceAppWithDiceRoller } from '../../../src/client/index.js';
import '../../../src/client/styles/index.css';

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        enhanceAppWithDiceRoller(app);
    },
};
