import BackToTopButton from "./BackToTopButton";

const MyLayout = ({ children }) => {
  return (
    <>
      {children}
      <BackToTopButton />
    </>
  );
};

export default MyLayout;
