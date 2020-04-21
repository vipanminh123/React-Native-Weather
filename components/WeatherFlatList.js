import React, { Component } from 'react';
import { FlatList, Text, View, Image, StyleSheet } from 'react-native';

import WeatherFlatListItem from './WeatherFlatListItem';

export default class WeatherFlatList extends Component {
    render() {
        const { data } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <FlatList
                        style={styles.flatList}
                        horizontal={true}
                        data={data}
                        renderItem={({item, index}) => {
                            return (
                                <WeatherFlatListItem item={item} index={index} />
                            )
                        }}
                        keyExtractor={(item, index) => item.dt.toString()}
                    ></FlatList>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20,
    },
    innerContainer: {
        height: 150,
    },
    flatList: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
});