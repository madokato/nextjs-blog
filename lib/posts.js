import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

//path.join(引数1,引数2....)は引数にディレクトリ名を複数指定することで/を追加して、引数1/引数2.....という文字列を取得します。

//cwd=current woriking deirectory
const postsDirectory = path.join(process.cwd(), 'posts');
// cwd/posts

export function getSortedPostsData() {
  //posts 下のファイル名一覧を取得する
  //readdirはディレクトリを読み込み、中身のファイルを配列で返す。
  //Syncは処理を同期的に実行するという意味
  //fsはなに？？
  const fileNames = fs.readdirSync(postsDirectory);
//console.log(fileNames)=pre.rendering.md,
//                       ssg-ssr.md                      

  
  const allPostsData = fileNames.map((fileName) => {
    // id を取得するために、拡張子 .md をファイル名から除去する
    const id = fileName.replace(/\.md$/, '');
   //   /pre.rendering,
  //    /ssg-ssr   

    // Markdown を文字列に読み込む
    const fullPath = path.join(postsDirectory, fileName);
    // 　cwd/posts/pre.rendering.md,
    //cwd/posts/pre.ssg-ssr.md
       
       
   //fullPathの中身が取得します。utf-8で取得する。
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    


    // gray-matter を使用してメタデータ部をパースする。パースはマークダウン部分のmeta部分をjsonオブジェクトに変換する。
    const matterResult = matter(fileContents);


    // id とデータをあわせる
    //matter
    return {
      id,
      ...matterResult.data,
    };
  });

  // 日付で投稿をソートする
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}




//postsdirectgory=cwd/posts
export function getAllPostIds() {
//cwd/postsの中のファイルを持ってくる
    const fileNames = fs.readdirSync(postsDirectory);

/*
[
 *   {
 *     params: {
 *       id: 'ssg-ssr'
 *     }
 *   },
 *   {
 *     params: {
 *       id: 'pre-rendering'
 *     }
 *   }
 * ]

*/
    return fileNames.map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ''),
        },
      };
    });
  }


  export  async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
  
    // gray-matter を使用してメタデータ部をパースする
    const matterResult = matter(fileContents);
    const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  
    // id とデータをあわせる
    return {
      id,
      contentHtml,
      ...matterResult.data,
    };
  }
