# Interactive rollers

This demo loads the plugin directly from this repository. Edit the plugin source and use these examples to check the result without publishing a release.

Enter a notation and press **Roll** or **Enter**. Use the theme switch to check light and dark colours.

## Basic roll

Roll four six-sided dice. Edit the notation to try a different expression.

::: roller 4d6 :::

## Empty notation

The Roll button should be disabled until a notation is entered.

::: roller :::

## Modifiers

Roll four six-sided dice and keep the highest three.

::: roller 4d6kh3 :::

## Multiple dice types

Combine dice and a fixed bonus in one expression.

::: roller 2d6+d8+3 :::

## Invalid notation

Press Roll to display an error. Replace the notation with `d20` and roll again to check recovery.

::: roller not-a-roll :::

## Things to check

- Each roller keeps its own notation, result and error state.
- The notation field works with both the Roll button and the Enter key.
- Copying a result works where clipboard access is available.
- Inputs, results and errors remain readable in both themes and on narrow screens.
- Visit [Static rolls](./static-rolls.md) and return to check client-side navigation.

The shared Vue component currently uses RPG Dice Roller v5.
