import React, { useState } from "react";
import Layout from "../../components/Layout";
import Router from "next/router";
import { DiagnosisProps } from "../../components/Diagnosis";
import { User } from "@prisma/client";
import prisma from "../../lib/prisma";
import { GetStaticProps } from "next";
export const getStaticProps: GetStaticProps = async () => {
  //   const feed = [
  //     {
  //       id: "1",
  //       title: "Prisma is the perfect ORM for Next.js",
  //       content: "[Prisma](https://github.com/prisma/prisma) and Next.js go _great_ together!",
  //       published: false,
  //       author: {
  //         name: "Nikolas Burk",
  //         email: "burk@prisma.io",
  //       },
  //     },
  //   ]

  const diagnosis = await prisma.diagnosis.findMany();
  const user = await prisma.user.findUnique({
    where: {
      email: "subaru@example.com",
    },
  });

  return {
    props: { diagnosis, user },
    revalidate: 10,
  };
};

type Props = {
  diagnosis: DiagnosisProps[];
  user: User;
};

const Diagnose: React.FC<Props> = (props) => {
  const [answer, setAnswer] = useState("");
  const [answer_2, setAnswer2] = useState("");
  const { user } = props;
  console.log(props);
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(answer);
    try {
      const body = { answer, answer_2, user };
      await fetch("/api/diagnosis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/diagnose");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          <input
            autoFocus
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="回答"
            type="text"
            value={answer}
          />

          <input
            autoFocus
            onChange={(e) => setAnswer2(e.target.value)}
            placeholder="回答2"
            type="text"
            value={answer_2}
          />

          <input disabled={!answer} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Diagnose;
