import Navbar from "./components/Navbar";
import {
  Hero,
  PopularProducts,
  Offers,
  Footer,
  Services,
  Subscribe,
} from "./sections";

function App() {
  return (
    <main className="px-10 py-5 flex flex-col font-montserrat ">
      <Navbar />
      <section className="px-10 py-5">
        {" "}
        <Hero />
      </section>
      <section className="px-10 py-5">
        <PopularProducts />
      </section>
      <section className="px-10 py-5"> </section>
      <section className="px-10 py-5">
        {" "}
        <Services />{" "}
      </section>
      <section className="px-10 py-5">
        {" "}
        <Offers />{" "}
      </section>
      <section className="px-10 py-5">
        <Subscribe />
      </section>
      <section>
        {" "}
        <Footer />
      </section>
    </main>
  );
}

export default App;
