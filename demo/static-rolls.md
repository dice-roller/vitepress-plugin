# Static rolls

Static rolls are evaluated when Markdown is rendered. In a production build, their results remain fixed until the site is rebuilt.

## Deterministic result

A one-sided die always produces `1`. This makes it easy to confirm that the static roll handler ran.

::: roll 1d1 :::

## Standard dice

Roll four six-sided dice. This result may change when the page is rendered again.

::: roll 4d6 :::

## Modifiers

Roll four six-sided dice and keep the highest three.

::: roll 4d6kh3 :::

Return to [Interactive rollers](./index.md) to check that the components load after navigation.
