import {StyleSheet, View, ViewProps} from 'react-native';

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
        backgroundColor: '#364B4B',
    },
});
