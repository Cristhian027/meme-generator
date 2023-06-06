import { useState, useEffect } from "react";
import MemesData from "./MemesData";

function Meme() {
    // let [memeImg, setMemeImg] = useState("http://i.imgflip.com/1bij.jpg");
    const [meme, setMeme] = useState({
        topText: "",
        bottonText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })

    const [allMemeImage, setAllMemeImage] = useState(MemesData)


    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(res => setAllMemeImage(res.data.memes))
    }, [])

    function getMemeImage() {
        // const arrayMeme = allMemeImage.data.memes
        const randomNumber = Math.floor(Math.random() * allMemeImage.length)
        const url = allMemeImage[randomNumber].url;
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }));
    }

    function handleChange(event) {
        const { name, value } = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
        <main>
            <div className="form">
                <input
                    type="text"
                    className="form--input"
                    placeholder="top text"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    className="form--input"
                    placeholder="button text"
                    name="bottonText"
                    value={meme.bottonText}
                    onChange={handleChange}
                />
                <button
                    onClick={getMemeImage}
                    className="form--button"
                >
                    Get a new meme image 🖼
                </button>
            </div>

            <div className="meme">
                <img className="meme--img" src={meme.randomImage} />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottonText}</h2>
            </div>
        </main>
    )
}
export default Meme;