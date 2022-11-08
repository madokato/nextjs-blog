import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/layout';

export default function FirstPost() {
    return (
    <>
    <Layout>
    <Head>
      <title>最初の投稿yo</title>
    </Head>
    <h1>最初の投稿</h1>
      <h2>
        <Link href="/" legacyBehavior>
         <a>トップページに戻る</a>
        </Link>
      </h2>
      </Layout>
    </>
  );
}
