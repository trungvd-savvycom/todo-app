import { createApp } from './main';
import { renderToString } from '@vue/server-renderer';

export async function render(url) {
  const { app, router, store } = createApp();

  router.push(url);
  await router.isReady();

  const appHtml = await renderToString(app);

  return {
    appHtml,
    state: store.state
  };
}
