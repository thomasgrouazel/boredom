import { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [data, setData] = useState();
    const table = {
        education: 5,
        recreational: 4,
        social: 5,
        diy: 1,
        charity: 1,
        cooking: 3,
        relaxation: 1,
        music: 1,
        busywork: 1,
    };

    const [mesActivites, setMesActivites] = useState([]);
    const [max, setMax] = useState(table.education);
    const [activite, setActivite] = useState(Object.keys(table)[0]);
    const [participants, setParticipants] = useState(1);

    //je stock mon objet url dans un state
    const url = new URL("http://www.boredapi.com/api/activity/");

    console.log(url.toString());
    const api = async () => {
        url.searchParams.set("activity", activite);
        url.searchParams.set("activity", participants);

        try {
            const result = await fetch(url);
            const content = await result.json();
            setData(content);
        } catch (error) {
            console.log("Error");
        } finally {
            console.log("fin api");
        }
    };

    //je définis les paramètres via une fonction fléchée.
    //je crée un nouvel objet url contenant l'ancienne url mais avec de nouveaux paramètres (key, value).
    //cela permet donc d'ajouter/modifier des paramètres via onInput.
    //je modifie par exemple la value via un select pour proposer les différentes possibilités pour les types

    // const setParams = (key, value) => {
    //     setUrl((old) => {
    //         let newurl = new URL(old);
    //         newurl.searchParams.set(key, value);
    //         return newurl;
    //     });
    // };

    const favoris = () => {
        setMesActivites((old) => {
            return [...old, { ...data }];
        });
    };

    console.log("mesActivites", mesActivites);

    return (
        <div className="App">
            <div className="innerApp">
                <div>Activité</div>
                <select
                    onChange={(e) => {
                        setActivite(e.target.value);
                        setMax(table[e.target.value]);
                    }}
                >
                    <option value={"education"}>éducation</option>
                    <option value={"recreational"}>détente</option>
                    <option value={"social"}>social</option>
                    <option value={"diy"}>A faire soi-même</option>
                    <option value={"charity"}>Charité</option>
                    <option value={"cooking"}>Cuisine</option>
                    <option value={"relaxation"}>`Relaxation</option>
                    <option value={"music"}>Musique</option>
                    <option value={"busywork"}>S'occuper</option>
                </select>
                <div>Participants</div>
                <input
                    type="number"
                    min={0}
                    max={max}
                    value={participants > max ? max : participants}
                    onInput={(e) => {
                        setParticipants(e.target.value);
                    }}
                />
                <input onInput={(e) => setParams("type", e.target.value)} />
                <button onClick={() => api()}>Api</button>

                <div className="p">
                    {data && (
                        <div>
                            <h2>Proposition</h2>
                            <div className="result">
                                <p>{data?.accessibility}</p>
                                <p>{data?.activity}</p>
                                <p>{data?.key}</p>
                                <p>{data?.link}</p>
                                <p>{data?.participants}</p>
                                <p>{data?.price}</p>
                                <p>{data?.type}</p>
                                <button onClick={() => favoris()}>
                                    Favoris
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="favs">
                        <h2>Mes fav</h2>
                        <div>
                            {mesActivites.map((el, key) => (
                                <div className="fav" key={key}>
                                    <p>{el?.accessibility}</p>
                                    <p>{el?.activity}</p>
                                    <p>{el?.key}</p>
                                    <p>{el?.link}</p>
                                    <p>{el?.participants}</p>
                                    <p>{el?.price}</p>
                                    <p>{el?.type}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
