import { dehydrate, load, I18nSSRBufferContext } from 'i18n/storage';
import NextDocument, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { locales, namespaces } from 'i18n/config';

class Document extends NextDocument<{ dehydratedStrings: string }> {
  static async getInitialProps(ctx: DocumentContext) {
    await Promise.all(
      locales.flatMap((locale) => namespaces.map((namespace) => load(locale, namespace))),
    );

    const renderPage = ctx.renderPage;

    const i18nBuffer = new Set<string>();

    ctx.renderPage = () =>
      renderPage({
        enhanceApp: (App) => (props) => (
          <I18nSSRBufferContext.Provider value={i18nBuffer}>
            <App {...props} />
          </I18nSSRBufferContext.Provider>
        ),
      });

    const initialProps = await NextDocument.getInitialProps(ctx);

    return {
      ...initialProps,
      dehydratedStrings: dehydrate(i18nBuffer),
    };
  }

  render() {
    return (
      <Html lang={this.props.locale}>
        <Head />
        <body>
          <Main />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__i18n_strings=${this.props.dehydratedStrings}`,
            }}
          />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
