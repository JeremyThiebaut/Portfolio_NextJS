import MyLayout from "../components/MyLayout";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="container">
      <MyLayout>
        <Component {...pageProps} />
      </MyLayout>
    </div>
  );
}
