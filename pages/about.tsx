import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';


export const getStaticProps = async () => {
  const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
  const data = res.data;

  console.log(data[1]);

  return {
    props: {
      list: data,
    },
  };
};

const About = ({ list }:any) => {
  // const [list, setList] = useState([]);

  // useEffect(() => {
  //   const getList = async () => {
  //     const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
  //     const data = res.data;
  //     setList(data);
  //   };
  //   getList();
  // }, []);

  return (
    <div className="About">
      <h1>About 페이지</h1>
      {list.length &&
        list.slice(0, 10).map(
          (item:any) => <li key={item.id}>{item.title}</li>)}
    </div>
  );
};

export default About;