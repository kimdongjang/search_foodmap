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
        { post_id: 1, title: "test1", author: "user1", url: "http://ma", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis asperiores dolorum illo culpa fugiat qui magnam animi, enim numquam nostrum provident neque eius maxime pariatur, sint, vero laboriosam nemo magni.", image: "https://picsum.photos/100/100" },
        { post_id: 2, title: "test2", author: "user2", url: "http://ma", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis asperiores dolorum illo culpa fugiat qui magnam animi, enim numquam nostrum provident neque eius maxime pariatur, sint, vero laboriosam nemo magni.", image: "https://picsum.photos/100/100" },
        { post_id: 3, title: "test3", author: "user3", url: "http://ma", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis asperiores dolorum illo culpa fugiat qui magnam animi, enim numquam nostrum provident neque eius maxime pariatur, sint, vero laboriosam nemo magni.", image: "https://picsum.photos/100/100" },
        { post_id: 4, title: "test4", author: "user4", url: "http://ma", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis asperiores dolorum illo culpa fugiat qui magnam animi, enim numquam nostrum provident neque eius maxime pariatur, sint, vero laboriosam nemo magni.", image: "https://picsum.photos/100/100" },
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
        <div className="flex flex-col items-center justify-center">
            <div className="w-1/2 flex flex-col mt-5">
                {props.posts.map((post: Post) => (
                    <div onClick={() => handlePostClick(post)} className="cursor-pointer mt-5">
                        <header className="flex flex-row gap-3 items-center">
                            <img src="https://picsum.photos/30/30" className="rounded-full" />
                            <div> {post.author} </div>
                            <div className="text-sm text-gray-500"> {post.apply_date} </div>
                        </header>

                        <div className="grid grid-cols-4 gap-3">

                            <div className="col-span-3 flex flex-col">
                                <div className="font-bold text-lg pt-3">
                                    {post.title}
                                </div>

                                <div className="font-light text-sm pt-2">
                                    {post.content}
                                </div>
                            </div>

                            <div className="flex items-center">
                                <img src={post.image} />
                            </div>

                        </div>

                        <footer className="flex flex-row pt-7 gap-3 items-center">

                            <button className="hover:bg-gray-300 delay-100 duration-100 bg-gray-200 rounded-full py-1 px-2 text-xs">
                                Like
                            </button>

                            <div className="text-gray-500 text-xs">
                                7 min read
                            </div>

                            <div className="text-gray-500 text-xs">
                                Based on your reading history
                            </div>

                        </footer>

                        <hr className="mt-5" />

                    </div>

                ))}

            </div>

        </div>
    );

}