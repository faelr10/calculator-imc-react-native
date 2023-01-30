import React from 'react'
import { View, Text, Share, TouchableOpacity } from 'react-native'
import styles from './style';

export default function ResultImc(props) {

    const onShare = async () => {
        const result = await Share.share({
            message: `Meu IMC hoje é: ${props.resultImc} => ${props.mediaImc}`
        })
    }

    return (
        <View style={styles.contextImc}>
            <View style={styles.boxShareButton} >
                {props.resultImc !== null ?
                    <TouchableOpacity onPress={onShare} style={styles.shared}>
                        <Text style={styles.sharedText}>Share</Text>
                    </TouchableOpacity>
                    :
                    <View />
                }
            </View>
            <Text style={styles.information}>{props.messageResultImc}</Text>
            <Text style={styles.numberImc}>{props.resultImc}</Text>
            <Text style={styles.media}>{props.mediaImc}</Text>
        </View >
    );
}