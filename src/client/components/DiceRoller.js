import { defineClientComponent } from 'vitepress';

// Load the interactive component only after mounting, keeping browser APIs and
// its generated input IDs out of VitePress's server-rendered pages.
const DiceRoller = defineClientComponent(() =>
    import('@dice-roller/vue').then(({ DiceRoller }) => DiceRoller),
);

export { DiceRoller };
export default DiceRoller;
