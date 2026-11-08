<p align="center">
    <img src="https://dice-roller.github.io/documentation/dice-roller-logo.png" alt="RPG Dice Roller" style="max-width: 100%;" width="200"/>
</p>

# RPG Dice Roller VitePress Plugin

Add interactive dice rollers to [VitePress](https://vitepress.dev/) pages using Markdown.

The plugin connects the [Markdown-it dice roller](https://github.com/dice-roller/markdown-it-dice-roller) and [Vue component](https://github.com/dice-roller/vue) to VitePress. Rolls currently use RPG Dice Roller v5; v6 support will be added in the shared packages separately.

## Install

```bash
npm install -D @dice-roller/vitepress-plugin-dice-roller
```

### Markdown configuration

Register the Markdown-it plugin in `.vitepress/config.js`:

```javascript
import { defineConfig } from 'vitepress';
import { diceRollerPlugin } from '@dice-roller/vitepress-plugin-dice-roller';

export default defineConfig({
    markdown: {
        config(md) {
            md.use(diceRollerPlugin);
        },
    },
});
```

### Theme configuration

Register the component and import its styles in `.vitepress/theme/index.js`:

```javascript
import DefaultTheme from 'vitepress/theme';
import { enhanceAppWithDiceRoller } from '@dice-roller/vitepress-plugin-dice-roller/client';
import '@dice-roller/vitepress-plugin-dice-roller/style.css';

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        enhanceAppWithDiceRoller(app);
    },
};
```

If your theme already has an `enhanceApp` hook, add the helper to that hook alongside your existing component and plugin registrations.

The interactive component is imported after mounting in the browser, so VitePress can pre-render pages without running its browser code. No extra `<ClientOnly>` wrapper is needed.

## Usage

### Interactive roller

Use `roller` to display an editable notation field and Roll button:

```markdown
::: roller :::
```

Supply a starting notation:

```markdown
::: roller 4d6 :::
```

```markdown
::: roller 4d6kh3+2 :::
```

The starting notation is not rolled automatically. Visitors can edit it and press Roll or Enter.

### Static roll

Use `roll` to insert a result when Markdown is rendered, including during a production build:

```markdown
::: roll 4d6 :::
```

Static rolls are fixed in the generated page until it is rebuilt. They do not display an interactive component.

## Options

Pass options as the second argument to `md.use`:

```javascript
md.use(diceRollerPlugin, {
    rollOptions: {
        as: 'code',
    },
    rollerOptions: {},
});
```

`rollOptions` and `rollerOptions` are passed through to the corresponding Markdown-it plugins. Static rolls support `as: 'blockquote'`, `'code'` or `'codeblock'`, or a `renderRoll(result)` callback returning Markdown.

## Styles

The exported stylesheet uses VitePress theme variables, including its light and dark colours. You can override the `--dice-roller-*` variables in your own stylesheet, imported after the plugin stylesheet:

```javascript
import '@dice-roller/vitepress-plugin-dice-roller/style.css';
import './custom.css';
```

For example:

```css
:root {
    --dice-roller-border-radius: 12px;
    --dice-roller-form-height: 3rem;
    --dice-roller-output-border-color: var(--vp-c-brand-1);
}
```

See [the default variables](./src/client/styles/default-theme-vars.css) for all available overrides. Custom themes can define these variables without using VitePress's default theme.

## Licence

[MIT](./LICENSE.txt).
