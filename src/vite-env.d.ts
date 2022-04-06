/// <reference types="svelte" />
/// <reference types="vite/client" />

type Locale = {
    [key: string]: string | Locale;
}

declare module "@/locales/*.yaml" {
    const locale: Locale;
    export default locale;
}