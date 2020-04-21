import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class WeatherFlatListItem extends Component {

    genIcon = (description) => {
        let icon;
        switch (description) {
            case 'Haze':
                icon = "ios-cloudy";
                break;
            case 'Snow':
                icon = "ios-snow";
                break;
            case 'Clouds':
                icon = "ios-cloudy";
                break;
            case 'Clear':
                icon = "ios-sunny";
                break;
            case 'Rain':
                icon = "ios-rainy";
                break;
            case 'Fog':
                icon = "ios-partlysunny";
                break;
            default:
                icon = "ios-sunny";
        }
        return icon;
    };

    getDateMonth = () => {
        const { index } = this.props;
        let day = new Date();
        let nextDay = day.setDate(day.getDate() + index);
        nextDay = new Date(nextDay);
        // console.log(nextDay);
        let date = nextDay.getDate();
        let month = nextDay.getMonth();
        return `${date} / ${month}`;
    }

    render() {
        const { item, index } = this.props;
        
        return (
            <View style={styles.container}>
                <Text style={styles.date}>{this.getDateMonth()}</Text>
                <Icon name={this.genIcon(item.weather[0].main)} style={styles.weatherIcon} size={40} color="#FFFFFF" />
                <Text style={styles.degrees}>{`${Math.round(item.temp.day - 273.15)}°C`}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width: 90,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'grey',
        margin: 4
    },
    date: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        margin: 20
    },
    degrees: {
        fontSize: 16,
        color: 'white',
        margin: 10
    }
});