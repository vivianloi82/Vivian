//This is an example code to Scan QR code//
import React, { Component } from 'react';
//import react in our code.
import { Text, View, Linking, TouchableHighlight, PermissionsAndroid, Platform, StyleSheet} from 'react-native';
// import all basic components
import { CameraKitCameraScreen, } from 'react-native-camera-kit';
//import CameraKitCameraScreen we are going to use.
import Fire from "../Fire";

export default class FindMyCarScreen extends Component {
  constructor() {
  
     super();
    this.state = {
      //variable to hold the qr value
      qrvalue: '',
      opneScanner: false,
      show: false,
    };
}
componentDidMount() {
  const user = this.props.uid || Fire.shared.uid;

  this.unsubscribe = Fire.shared.firestore
    .collection("users")
    .doc(user)
    .onSnapshot(doc => {
      this.setState({ user: doc.data() });
    });


}
componentWillMount()
{
    // check if the FindMyCar database is empty or not
    const user = this.props.uid || Fire.shared.uid;

    Fire.shared.firestore.collection("FindMyCar").where("uid", "==", user).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        if (!doc.exists)
        {  
          this.setState({ show: false })
        }
        else{
          console.log(doc.data().SlotName)
          this.setState({ show: true })
          this.setState({ qrvalue: doc.data().SlotName });
        }
      })
    })
    // if it is empty then all is visible with scan qrcode button
    // else display temporary slotname to user with found button 
}

DeleteTempSlotName() //delete temporary slotname
{
  const user = this.props.uid || Fire.shared.uid;

  Fire.shared.firestore.collection("FindMyCar").where("uid", "==", user).get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      if (doc.exists)
      {  
        console.log(doc.id)
        this.setState({ show: false, qrvalue:'' })
        var id = doc.id
   
           Fire.shared.firestore.collection("FindMyCar").doc(id).delete().then(() => {
          console.log("Document successfully deleted!");
         
        }).catch((error) => {
          console.error("Error removing document: ", error);
        
        });
      
       
      }
   
    })
  })


}
  // onOpenlink() {
  //   //Function to open URL, If scanned 
  //   Linking.openURL(this.state.qrvalue);
  //   //Linking used to open the URL in any browser that you have installed
  // }

  onBarcodeScan(qrvalue) {
    //called after the successful scanning of QRCode/Barcode
    const user = this.props.uid || Fire.shared.uid;

    Fire.shared.firestore.collection("FindMyCar").where("uid", "==", user).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        if (doc.exists)
        {  
          console.log(doc.id)
          this.setState({ show: false, qrvalue:'' })
          var id = doc.id
     
             Fire.shared.firestore.collection("FindMyCar").doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
           
          }).catch((error) => {
            console.error("Error removing document: ", error);
          
          });
        
         
        }
     
      })
    })
    Fire.shared.firestore.collection("ParkingSlots").where("SlotName", "==", qrvalue).get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      const data = ( doc.data().SlotName);
      if (data === qrvalue)
      {
        const user = this.props.uid || Fire.shared.uid;

        this.setState({ qrvalue: data });
        this.setState({ opneScanner: false, show: true }); 
        //create new database "FindMyCar" to store temporary slotname to user
        Fire.shared.firestore.collection("FindMyCar").add({
          SlotName: qrvalue,
          uid: user,
          id: doc.id

        })
         }
      else 
      {      
        this.setState({ qrvalue: '' });
        this.setState({ opneScanner: false });
      }
    });
  })
  
  }
  onOpneScanner() {
    var that =this;
    //To Start Scanning
    if(Platform.OS === 'android'){
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,{
              'title': 'CameraExample App Camera Permission',
              'message': 'CameraExample App needs access to your camera '
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //If CAMERA Permission is granted
            that.setState({ qrvalue: '' });
            that.setState({ opneScanner: true });
          } else {
            alert("CAMERA permission denied");
          }
        } catch (err) {
          alert("Camera permission err",err);
          console.warn(err);
        }
      }
      //Calling the camera permission function
      requestCameraPermission();
    }else{
      that.setState({ qrvalue: '' });
      that.setState({ opneScanner: true });
    }    
  }
  render() {
    let displayModal;
    //If qrvalue is set then return this view
    if (!this.state.opneScanner) {
      return (
        <View style={styles.container}>
            <Text style={styles.heading}>Find My Car</Text>
            <Text style={styles.simpleText}>{this.state.qrvalue ? 'Parking Slot: '+this.state.qrvalue : ''}</Text>
            {/* {this.state.qrvalue ? 
              <TouchableHighlight
                onPress={() => this.onOpenlink()}
                style={styles.button}>
                  <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Open Link</Text>
              </TouchableHighlight>
              : null
            } */}
 {this.state.show ? (
           <TouchableHighlight
           onPress={() => this.DeleteTempSlotName()}
           style={styles.button}>
             <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Found</Text>
         </TouchableHighlight>
        ) : null}

            <TouchableHighlight
           
              onPress={() => this.onOpneScanner()}
              style={styles.button}> 
                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>
                Open QR Scanner
                </Text>
            </TouchableHighlight>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <CameraKitCameraScreen
          showFrame={false}
          //Show/hide scan frame
          scanBarcode={true}
          //Can restrict for the QR Code only
          laserColor={'blue'}
          //Color can be of your choice
          frameColor={'yellow'}
          //If frame is visible then frame color
          colorForScannerFrame={'black'}
          //Scanner Frame color
          onReadCode={event =>
            this.onBarcodeScan(event.nativeEvent.codeStringValue)
          }
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2c3539',
    padding: 10,
    width:300,
    marginTop:16
  },
  heading: { 
    color: 'black', 
    fontSize: 24, 
    alignSelf: 'center', 
    padding: 10, 
    marginTop: 30 
  },
  simpleText: { 
    color: 'black', 
    fontSize: 20, 
    alignSelf: 'center', 
    padding: 10, 
    marginTop: 16
  }
});
