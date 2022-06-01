import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import styles from './post.module.css'

const Content = (props:any) => {
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