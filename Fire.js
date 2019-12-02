//import FirebaseKeys from "./config";
import firebase from "firebase";
require("firebase/firestore");

class Fire {
    constructor() {
        const firebaseConfig = {
            apiKey: "AIzaSyAsYGfy2ZnXbgqk3kWwC3LMQYR_cl2tuZk",
            authDomain: "viviantesting-91d90.firebaseapp.com",
            databaseURL: "https://viviantesting-91d90.firebaseio.com",
            projectId: "viviantesting-91d90",
            storageBucket: "viviantesting-91d90.appspot.com",
            messagingSenderId: "349032007214",
            appId: "1:349032007214:web:c5bd9de9253250940741bf",
            measurementId: "G-03R5S1ZN1J"
            
        }
        firebase.initializeApp(firebaseConfig);
    }

    addPost = async ({value, text, localUri }) => {
        const remoteUri = await this.uploadPhotoAsync(localUri, `Report_Photos/${this.uid}/${Date.now()}`);

        return new Promise((res, rej) => {
            this.firestore
                .collection("Report")
                .add({
                    text,
                    uid: this.uid,
                    timestamp: this.timestamp,
                    image: remoteUri,
                    value
                })
                .then(ref => {
                    res(ref);
                })
                .catch(error => {
                    rej(error);
                });
        });
    };

    uploadPhotoAsync = (uri, filename) => {
        return new Promise(async (res, rej) => {
            const response = await fetch(uri);
            const file = await response.blob();

            let upload = firebase
                .storage()
                .ref(filename)
                .put(file);

            upload.on(
                "state_changed",
                snapshot => {},
                err => {
                    rej(err);
                },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL();
                    res(url);
                }
            );
        });
    };

    createUser = async user => {
    
        try {
            await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);

            let db = this.firestore.collection("users").doc(this.uid);

            db.set({
                username: user.username,
                name: user.name,
                phone: user.phone,
                icno: user.icno,
                gender: user.gender,
                email: user.email,
                password: user.password
            });

            
        } catch (error) {
            alert(error);
        }
    };

    signOut = () => {
        firebase.auth().signOut();
    };

    get firestore() {
        return firebase.firestore();
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get timestamp() {
        return Date.now();
    }
}

Fire.shared = new Fire();
export default Fire;
