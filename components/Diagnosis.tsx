import React from "react";
import Router from "next/router";
// import ReactMarkdown from "react-markdown";

export type DiagnosisProps = {
  id?: string;
  answer: string;
};

const Diagnosis: React.FC<{ diagnosis: DiagnosisProps }> = ({ diagnosis }) => {
  const authorName = "Unknown author";
  return (
    <div onClick={() => Router.push("/diagnosis/[id]", `/diagnosis/${diagnosis.id}`)}>
      <h2>{diagnosis.answer}</h2>
      <small>By {authorName}</small>
      {/* <ReactMarkdown children={post.content} /> */}
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Diagnosis;
