import Link from 'next/link';


export default function FirstPost() {
    return (
    <>
    <h1>最初の投稿</h1>
      <h2>
        <Link href="/">
          <a>トップページに戻る</a>
        </Link>
      </h2>
    </>
  );
}
