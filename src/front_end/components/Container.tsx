import {StyleSheet, View, ViewProps} from 'react-native';
import { Colors } from '../styles/constants';  

type ContainerProps = ViewProps;

export default function Container({ children, ...rest }: ContainerProps) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.fundo,
    },
});
