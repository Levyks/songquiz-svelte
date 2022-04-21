import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

register('en', () => import('@/locales/en.yaml'));
register('pt-BR', () => import('@/locales/pt-BR.yaml'));
register('es', () => import('@/locales/es.yaml'));

init({
    fallbackLocale: 'en',
    initialLocale: getLocaleFromNavigator(),
});