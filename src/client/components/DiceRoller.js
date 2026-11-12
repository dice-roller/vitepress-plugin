import { defineComponent, h, onMounted, shallowRef } from 'vue';

// Mount the interactive roller only in the browser. Rendering nothing during
// SSR avoids hydration mismatches and keeps browser-only code out of the server.
const DiceRoller = defineComponent({
    name: 'DiceRoller',
    inheritAttrs: false,

    setup(_, { attrs, slots }) {
        const component = shallowRef(null);

        onMounted(async () => {
            const { DiceRoller: VueDiceRoller } = await import('@dice-roller/vue');
            component.value = VueDiceRoller;
        });

        // Forward notation and other attributes, listeners, and slots to the
        // actual component after it has loaded.
        return () => component.value
            ? h(component.value, attrs, slots)
            : null;
    },
});

export { DiceRoller };
export default DiceRoller;
