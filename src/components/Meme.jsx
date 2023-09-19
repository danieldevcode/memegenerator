import React from "react";

export default function Meme() {
  const [allMemes, setAllMemes] = React.useState([]);
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
    fontSize: "16px",
  });

  // Api call to memes
  React.useEffect(()=>{
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(data => {
        const memes =  data.data.memes;
        setAllMemes(memes)
      })
  }, [])

  // Change font size
  React.useEffect(() => {
    document.querySelectorAll(".imgContainer > p").forEach((p) => {
      p.style.fontSize = meme.fontSize;
    });
  }, [meme.fontSize]);

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function handleClick() {
    const objArr = [...allMemes];
    const randomMemeUrl = objArr[getRandomIntInclusive(0, 100)].url;

    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        randomImage: randomMemeUrl,
      };
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        [name]: name == "fontSize" ? `${value}px` : value,
      };
    });
  }

  return (
    <main>
      <div className="form">
        <div>
          <label htmlFor="bottomText">Top text</label>
          <input
            id="topText"
            type="text"
            onChange={handleChange}
            name="topText"
          />
          <label htmlFor="bottomText">Bottom text</label>
          <input
            id="bottomText"
            type="text"
            onChange={handleChange}
            name="bottomText"
          />
          <label htmlFor="fontSize">Font Size</label>
          <input
            id="fontSize"
            type="number"
            min="1"
            max="32"
            placeholder="16px"
            onChange={handleChange}
            name="fontSize"
          />
        </div>
        <button type="button" onClick={handleClick}>
          Get a new meme image 🖼️
        </button>
        <div className="imgContainer">
          <p>{meme.topText.toUpperCase()}</p>
          <img src={meme.randomImage} />
          <p>{meme.bottomText.toUpperCase()}</p>
        </div>
      </div>
    </main>
  );
}
