import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';

type SnackBarProps = {
    message: string;
    toggle: boolean
}

const SnackBarNotif = ({ message, toggle }: SnackBarProps) => {
    const [visible, setVisible] = React.useState(toggle);

    return (
        <View style={styles.container}>
            <Snackbar visible={visible} onDismiss={() => setVisible(false)} duration={1000}>
                {message}
            </Snackbar>
        </View>
    )
}

export default SnackBarNotif;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});