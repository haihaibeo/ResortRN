import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Profile: React.FC<{}> = ({}) => {
    return (
        <View style={styles.container}>
            <Text>
            Welcome to profile
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignContent:"flex-start"
    }
})

export default Profile;
