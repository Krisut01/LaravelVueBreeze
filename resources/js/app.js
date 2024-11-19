import '../css/app.css';
import './bootstrap';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createApp, h } from 'vue';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';





const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Use createInertiaApp to set up the Inertia app and resolve components dynamically
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`, // Dynamic path for components
            import.meta.glob('./Pages/**/*.vue') // Automatically import all Vue files in the Pages directory
        ),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .mount(el); // Mount the app to the DOM
    },
    progress: {
        color: '#4B5563', // Progress bar color
    },
});
