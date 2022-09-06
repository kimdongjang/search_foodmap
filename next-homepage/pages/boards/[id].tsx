import axios from "axios";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import AppLayout from "../../components/AppLayout";
import { Post } from "../../types/post";

export const getServerSideProps = async (ctx: { params: { id: any; }; }) => {
    console.log(ctx.params.id)
    const id = ctx.params.id;

    // 해당 페이지의 id 번호를 통해 게시글의 세부 정보를 조회
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    const data = res.data;  
  
    return {
      props: {
        item: data,
      },
    };
  };
  
const Content = (props: Post) => {
    const router = useRouter()
    console.log(router.query)
    return (
        <div>
            <h1>{router.query.title}</h1>
            <p>{router.query.content}</p>
        </div>
    )
}

export default Content;