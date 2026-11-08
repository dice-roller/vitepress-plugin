import { DiceRoller } from './components/DiceRoller.js';

export * from './components/index.js';

export const enhanceAppWithDiceRoller = (app) => {
    app.component('DiceRoller', DiceRoller);
};
