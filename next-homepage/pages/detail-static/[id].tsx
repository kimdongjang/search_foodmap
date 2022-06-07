import React from "react";
import axios from "axios";

const DetailStatic = ({ item }:any) => {
  return (
    <div>
      {item && (
        <div className="Detail">
          <h1 style={{ color: "#fff" }}>with Static Generation</h1>
          <h1>{item.title}</h1>
          <p>{item.body}</p>
          <p>{item.id}번째 게시글</p>
        </div>
      )}
    </div>
  );
};

export default DetailStatic;

export const getStaticPaths = async () => {
  console.log("path")
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true,
  };
};

export const getStaticProps = async (ctx:any) => {
  console.log("props")
  const id = ctx.params.id;
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