import Link from 'next/link';
import React from 'react'
import { Post } from '../types/post';
import style from '../styles/board.module.css'
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';


/**
 * 외부 API Endpoint로 Call해서 Post로 정보를 가져온다.
 * @returns 
 */
export const getStaticProps: GetStaticProps = async () => {
    // const res = await fetch("https://.../posts");
    // const posts = await res.json();
    const posts: Array<Post> = [
        { post_id: 1, title: "test1", author: "user1", url: "http://ma", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis asperiores dolorum illo culpa fugiat qui magnam animi, enim numquam nostrum provident neque eius maxime pariatur, sint, vero laboriosam nemo magni." },
        { post_id: 2, title: "test2", author: "user2", url: "http://ma", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis asperiores dolorum illo culpa fugiat qui magnam animi, enim numquam nostrum provident neque eius maxime pariatur, sint, vero laboriosam nemo magni." },
        { post_id: 3, title: "test3", author: "user3", url: "http://ma", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis asperiores dolorum illo culpa fugiat qui magnam animi, enim numquam nostrum provident neque eius maxime pariatur, sint, vero laboriosam nemo magni." },
        { post_id: 4, title: "test4", author: "user4", url: "http://ma", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis asperiores dolorum illo culpa fugiat qui magnam animi, enim numquam nostrum provident neque eius maxime pariatur, sint, vero laboriosam nemo magni." },
    ]

    // posts 데이터가 담긴 prop를 빌드 시간에 Blog 컴포넌트로 전달한다.
    return {
        props: {
            posts
        }
    };
}

export default boards;


function boards(props: any) {
    const router = useRouter()
    const handlePostClick = (post: Post) => {
        router.push({
            pathname: '/boards/' + post.post_id,
            query: {
                post_id: post.post_id,
                title: post.title,
                author: post.author,
                url: post.url,
                content: post.content,
            },
        },
            '/boards/' + post.post_id);
    }
    return (
        <div className={style.tableWrap}>
            <table className={style.tableColumnList}>
                <colgroup>
                    <col width="140" />
                    <col width="auto" />
                    <col width="140" />
                    <col width="120" />
                </colgroup>
                <thead className={style.tableColumnListHeader}>
                    <tr >
                        <th >번호</th>
                        <th >제목</th>
                        <th >등록일</th>
                        <th >조회수</th>
                    </tr>
                </thead>
                <tbody>
                    {props && props.posts.map((post: Post, index: any) =>
                    (
                        <tr onClick={() => handlePostClick(post)} key={index}>
                            <td className={style.tableColumnListData} >{post.post_id}</td>
                            <td className={style.tableColumnListData} >{post.title}</td>
                            <td className={style.tableColumnListData} >{post.apply_date}</td>
                            <td className={style.tableColumnListData} >{post.count}</td>
                        </tr>
                    )
                    )}

                </tbody>
            </table>
        </div>);

}

// boards.getStaticProps = async (ctx:any) => {
//     const res = await fetch('https://api.github.com/repos/vercel/next.js')
//     const json = await res.json()
//     return { posts: json.stargazers_count }
// }