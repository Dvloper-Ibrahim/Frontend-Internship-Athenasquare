import React from "react";
import "./App.css";

function App() {
  const [texts, setTexts] = React.useState([]);
  const [videoName, setVideoName] = React.useState("video 1");
  const videoContainerRef = React.useRef();

  React.useEffect(() => {
    async function getText() {
      await fetch("https://mocki.io/v1/ee762599-31ae-4a3d-a6c7-d596525945e1")
        .then((res) => res.json())
        .then((res) => setTexts(res.texts))
        .catch((e) => console.log(e));
    }
    getText();

    // Style While Scrolling
    window.addEventListener("scroll", forScroll);
    return () => {
      window.removeEventListener("scroll", forScroll);
    };
  }, []);

  // Change Some Style And Video On Scrolling
  function forScroll() {
    let videoContainer = videoContainerRef.current;
    if (window.scrollY >= 1660) {
      videoContainer.style.position = "absolute";
      videoContainer.style.right = "60px";
      videoContainer.style.left = "calc(100% - 760px)";
      videoContainer.style.top = "0";
      videoContainer.style["grid-row"] = "3/4";
    } else {
      videoContainer.style.position = "sticky";
      videoContainer.style.left = "100%";
      videoContainer.style.top = "100px";
      videoContainer.style["grid-row"] = "1/2";
    }
    if (window.scrollY >= 900 && window.scrollY < 1500) {
      setVideoName("video 2");
    } else if (window.scrollY >= 1500) {
      setVideoName("video 3");
    } else {
      setVideoName("video 1");
    }
  }

  // Elements Holding The Text Next To The Videos
  const dataSnippets = texts.map((element, i) => (
    <div key={i + 1}>
      <span>{element.heading}</span>
      <h1>{element.subHeading}</h1>
      <p>{element.description}</p>
      <div className="video-small-screen">
        <video autoPlay loop muted src={`./assets/video ${i + 1}.mp4`}></video>
      </div>
    </div>
  ));

  return (
    <section>
      <nav>
        <img
          src="https://global-uploads.webflow.com/62efc7cb58ad153bfb146988/62efcbe40b52a66c04de66ce_Frame%2011.png"
          alt="Logo"
        />
        <div className="items">
          <div>
            Product
            <span></span>
            <ul>
              <li>
                <a href="#">Kula Outreach</a>
              </li>
              <li>
                <a href="#">Kula Circles</a>
              </li>
            </ul>
          </div>
          <div>Our Story</div>
          <div>
            Product
            <span></span>
            <ul>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Guides</a>
              </li>
            </ul>
          </div>
        </div>
        <a href="#">Book a demo</a>
      </nav>
      <header>
        <h1>Double the hires, half the effort</h1>
        <p>
          Open conversations and nurture relationships at scale and be the first
          choice when your ideal candidate is ready to explore.
        </p>
        <button>View Kula Outreach</button>
      </header>
      <article>
        <div ref={videoContainerRef} className="video">
          <video autoPlay loop muted src={`./assets/${videoName}.mp4`}></video>
        </div>
        {dataSnippets}
      </article>
    </section>
  );
}

export default App;
