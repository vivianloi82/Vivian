//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import { Text, View, TouchableOpacity, StyleSheet, FlatList,Image } from 'react-native';
//import all the basic component we have used
import Fire from "../Fire";
import { 
    Container,
    Header, 
    Content, 
    Card, 
    CardItem, 
    Thumbnail, 
   
    Button, 
    Left, 
    Body, 
    Right,
    Icon
    
 } from 'native-base';
 import IconFontAwe from 'react-native-vector-icons/FontAwesome5' 
export default class BrowseRewardsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            BrowseRewards: [],
            category: '',
            points: '',
            title: '',
            image:'',
            user:{

          
            }

        });
        this.ref = Fire.shared.firestore.collection("BrowseRewards");
    }



    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot((querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                //    console.log(doc.data().category);
                //    console.log(doc.data().points);
                //    console.log(doc.data().title);
                data.push({
                    category: doc.data().category,
                    points: doc.data().points,
                    title: doc.data().title,
                    image:  doc.data().image,
                });
                this.setState({
                    BrowseRewards: data,

                })
             //   console.log(this.state.BrowseRewards);
            });


        });
      
    }

renderSeparator = ()=>
{
    return (
        <View 
        style={{
            marginVertical:10
        }}
        />

       
    )
}
// PurchaseReward= (rewardPoint) =>
// {
//     const user = Fire.shared.uid;

//     this.unsubscribeuser = Fire.shared.firestore
//     .collection("users")
//     .doc(user)
//     .onSnapshot(doc => {
//       this.setState({ user: doc.data() });
//     });
//     console.log( this.state.user.points-rewardPoint )

// }
  
    render() {
        return (
            <View style={{ flex: 1 }}>

                <FlatList
                    data={this.state.BrowseRewards}
                    renderItem={({ item }) => {
                        return (

                            <View>

<Card>
            <CardItem>
              <Left>
                <Thumbnail source={require('./ImagesPromo/rewIcon.png')} />
                <Body>
                  <Text>{item.title}</Text>
                  <Text note>{item.category}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              {/* <Image source={require('../ImagesPromo/browse1.jpg')} style={{height: 100, width: 100, flex: 1}}/> */}
              <Image source={{uri:item.image}} style={{height: 200, width: null, flex: 1}}  />
            </CardItem>
            <CardItem>
            
              <Body>
                <View transparent style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                  <IconFontAwe name = "crown" style ={{fontSize : 20, color : 'green',marginRight:5}} />
                  <Text style={{fontSize:20}}>{item.points} points</Text>
                </View>
              </Body>
              <Right>
                  {/* onPress={this.PurchaseReward(item.points)} */}
            <TouchableOpacity style={styles.Purchasebutton} >

<Text style={styles.buttonText}>Purchase</Text>
</TouchableOpacity>
              </Right>  
            </CardItem>
          </Card>
                                 {/* <Text>{item.title}</Text>
                                <Text>{item.category}</Text>
                                <Text>{item.points}</Text>
                                */}
                            </View>

                        )

                    }}
                    keyExtractor={(item)=>item.title}
                    ItemSeparatorComponent={this.renderSeparator}


                />


            </View>
        );
    }
}const styles = StyleSheet.create({
    Purchasebutton: {
    
        backgroundColor: "#5885AF",
        borderRadius: 8,
       padding:5,
        alignItems: "center",
        justifyContent: "center",
        width:100,
        // borderColor:"#38AEE6",
        // borderWidth:2,
    
        bottom: 0
    
      },
      buttonText: {
        fontSize: 20,
        color: 'black'
      },
   });