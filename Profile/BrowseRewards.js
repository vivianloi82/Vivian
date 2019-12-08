//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
//import all the basic component we have used
import Fire from "../Fire";

export default class BrowseRewardsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rewards: {
                category: '',
                points: '',
                title: ''
            }

        };
    }



    componentDidMount() {
        Fire.shared.firestore.collection("BrowseRewards")
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    console.log(doc.data());
                    this.setState({
                        rewards: {
                            category: doc.data().category,
                            points: doc.data().points,
                            title: doc.data().title,
                        }


                    })
                });


            })
            .catch(err => {
                console.log('Error getting document', err);

            });
    }



    renderRewards = () => {
        return (
            <View>
                <Text>
                    {this.state.rewards.category}
                </Text>
                <Text>
                    {this.state.rewards.title}
                </Text>
                <Text>
                    {this.state.rewards.points}
                </Text>

            </View>
        );
    };
    render() {
        return (
            <View style={{ flex: 1 }}>

                <FlatList
                    data={rewards}
                    renderItem={({ item }) => this.renderRewards(item)}


                />


            </View>
        );
    }
}