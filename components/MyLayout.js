import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MyLayout = ({ children }) => {
  return (
    <div className="container">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default MyLayout;
