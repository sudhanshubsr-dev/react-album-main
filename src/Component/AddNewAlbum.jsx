import Radium from "radium";
import React, { useState } from "react";

// Component to add a new album
const AddNewAlbum = (props) => {
    // State to manage the album title input
    const [albumTitle, setAlbumTitle] = useState("");
    // State to manage the album body input
    const [albumBody, setAlbumBody] = useState("");

    // Styles for the component using Radium
    const styles = {
        addNewAlbumButton: {
            height: "300px",
            width: "300px",
            minWidth: "250px",
            borderRadius: "0.75rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            border: "2px solid black",
            transition: "all 0.25s ease-in-out",
            background: "aliceblue",

            ':hover': {
                boxShadow: "0 0 10px 2.5px #555",
                transform: "scale(1.05)",
                background: "linear-gradient(to bottom, rgb(248, 231, 200), lightpink)"
            }
        },

        addNewAlbumH1: {
            fontWeight: "100",
            color: "#111"
        }
    };

    // Function to handle the form submission
    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            // Sending a POST request to add a new album
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    title: albumTitle,
                    body: albumBody,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            const responseJSON = await response.json();
            console.log(responseJSON);

            // Callback to notify the parent component about the new album
            props.onAddNewAlbum(responseJSON);

            // Clearing input fields after submission
            setAlbumBody('');
            setAlbumTitle('');
        } catch (error) {
            console.error('Error adding a new album:', error);
        }
    };

    return (
        <React.Fragment>
            {/* Button to trigger the modal */}
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={styles.addNewAlbumButton}>
                <h1 style={styles.addNewAlbumH1}>+ Add Album</h1>
            </button>

            {/* Modal for adding a new album */}
            <div className="modal fade" id="staticBackdrop" style={{ "backdropFilter": "blur(5px)" }} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title display-6 text-center w-100" id="staticBackdropLabel">Add Your Album</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* Form for adding a new album */}
                            <form onSubmit={onSubmitHandler}>
                                <div className="mb-3">
                                    <label htmlFor="formGroupExampleInput2" className="form-label">Enter Title</label>
                                    <input onChange={(e) => { setAlbumTitle(e.target.value) }} type="text" className="form-control" id="formGroupExampleInput2" value={albumTitle} placeholder="Enter Title" required></input>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formGroupExampleInput3" className="form-label">Enter Body</label>
                                    <input onChange={(e) => { setAlbumBody(e.target.value) }} type="text" className="form-control" id="formGroupExampleInput3" value={albumBody} placeholder="Enter Body" required></input>
                                </div>
                                <div className="modal-footer d-flex flex-row justify-content-evenly">
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Radium(AddNewAlbum);
