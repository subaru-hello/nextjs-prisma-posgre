import React from "react";
import { GetStaticProps } from "next";
import Layout from "../../components/Layout";
import Diagnosis, { DiagnosisProps } from "../../components/Diagnosis";
import prisma from "../../lib/prisma";
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

  return {
    props: { diagnosis },
    revalidate: 10,
  };
};

type Props = {
  diagnosis: DiagnosisProps[];
};

const Diagnose: React.FC<Props> = (props) => {
  console.log(props);
  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {props.diagnosis.map((diagno) => (
            <div key={diagno.id} className="diagnosis">
              <Diagnosis diagnosis={diagno} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Diagnose;
