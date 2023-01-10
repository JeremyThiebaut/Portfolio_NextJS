import Navbar from "./Navbar";

const MyLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default MyLayout;
