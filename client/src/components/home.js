import Layout from "./layout";

const Home = () => {
  return (
    <Layout>
      <h3 className="h3-header">Here's all of our FREE content! 😜</h3>
      <div>♡ FREE.</div>
      <div>♡ FREE.</div>
      <div>♡ FREE.</div>
      <div>♡ FREE.</div>
      <style>{`
        .h3-header {
          font-size: 22px;
          margin: 25px 0;
        }
        div {
          font-size: 17px;
          margin-bottom: 15px;
        }
      `}</style>
    </Layout>
  );
};

export default Home;
