import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import style from '../assets/Album.module.css';
import AddNewAlbum from "./AddNewAlbum";

export default function Album() {
    // State for storing album data
    const [album, setAlbum] = useState([]);
    // State for tracking the addition of a new album
    const [addNew, setAddNew] = useState(false);
    // State for storing data of the newly added album
    const [fetchedData, setFetchedData] = useState('');

    // Function to handle the addition of a new album
    function onAddNewAlbum(data) {
        setAddNew(true);
        setFetchedData(data);
    }

    // Fetching album data from an API on component mount
    useEffect(() => {
        async function fetchAlbumData() {
            try {
                const albumArray = [];
                const response = await fetch('https://jsonplaceholder.typicode.com/albums');
                const responseJSON = await response.json();

                // Splitting the response data into arrays of 10 albums each
                
                for (let i = 0; i < responseJSON.length; i += 10) {
                    let emptyArray = [];
                    emptyArray = responseJSON.slice(i, [i + 10]);
                    albumArray.push(emptyArray);
                }

                setAlbum(albumArray);
            } catch (error) {
                console.error('Error fetching album data:', error);
            }
        }

        fetchAlbumData();
    }, []);

    return (
        <React.Fragment>
            {/* Header Section */}
            <header>
                <h1 className={`display-1 text-center py-5 `}>
                    <img src="https://cdn.onlinewebfonts.com/svg/img_296255.png" width={'100px'} alt="Album Logo" />
                    My Album
                </h1>
            </header>
            
            {/* Main Section */}
            <main className={style.albumMain}>
                <section className={style.albumSection}>
                    {/* Rendering Carousels for each set of 10 albums */}
                    {album.map((albumSet) => (
                        <Carousel album={albumSet} key={albumSet[0].userId} />
                    ))}
                    
                    {/* Displaying the newly added album */}
                    {addNew && (
                        <div style={{ "borderRadius": "0.75rem", "backgroundColor": "aliceblue", "cursor": "pointer", "border": "1px solid black", "boxShadow": "0 0 10px 1.5px #888" }}>
                            <img height={"250px"} width={"400px"} style={{ "borderRadius": "1rem" }} src="https://static.vecteezy.com/system/resources/previews/000/252/182/large_2x/mountain-landscape-pop-color-vector.jpg" alt="New Album" />
                            <div style={{ "backgroundColor": "rgba(240,248,255,0.9)", "borderRadius": "0.5rem", "padding": "10px" }}>
                                <h5 style={{ "textAlign": "center", "textTransform": "capitalize" }}>{fetchedData.title} {fetchedData.id}</h5>
                                <p style={{ "textAlign": "center" }} >{fetchedData.body}</p>
                            </div>
                        </div>
                    )}

                    {/* Component for adding new albums */}
                    <AddNewAlbum onAddNewAlbum={onAddNewAlbum} />
                </section>
            </main>
            
            {/* Footer Section */}
    
        </React.Fragment>
    );
}
