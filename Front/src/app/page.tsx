export default function Home(props: any) {
  console.log(props);

  return <>Hello</>;
}

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:5000");
  return {
    props: {
      res,
    },
  };
};
