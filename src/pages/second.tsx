import Link from 'next/link';
import { useTranslation } from 'i18n/useTranslation';

const SecondPage = () => {
  const t = useTranslation('second');

  return (
    <div style={{ padding: 32 }}>
      <h1>{t('second-page-title')}</h1>
      <Link href="/">{t('index-page-link')}</Link>
      <footer>
        <Link href="/second" locale="en">
          <a>EN</a>
        </Link>
        <Link href="/second" locale="ru">
          <a>RU</a>
        </Link>
      </footer>
    </div>
  );
};

export default SecondPage;
