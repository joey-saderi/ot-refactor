import React from "react";
import Layout from "../../src/Layout";
import Profile_container from "../../src/containers/Profile_container";
import language from "../../public/languages/fa/user.json";

const Profile = () => {
  return (
    <Layout>
      <Profile_container language={language}/>
    </Layout>
  );
};

export default Profile;
