import { Roll, Roller } from '@dice-roller/markdown-it-dice-roller';

// Register with markdown.config: (md) => md.use(diceRollerPlugin, options).
export const diceRollerPlugin = (md, options = {}) => {
    md.use(Roll, options.rollOptions || {});
    md.use(Roller, options.rollerOptions || {});
};
