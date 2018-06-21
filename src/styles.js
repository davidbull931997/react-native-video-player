import React from 'react';
import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const common = StyleSheet.create({
    container: {
        flex: 1
    },
    subContainer: {
        position: 'relative'
    }
});

const control = StyleSheet.create({
    container: {
        bottom: 0,
        width: '100%',
        alignSelf: 'center',
        position: 'absolute',
        // backgroundColor: '#2d3436',
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button:{
        paddingVertical: 5
    }
});

const styles = {
    common,
    control
};

export default styles;