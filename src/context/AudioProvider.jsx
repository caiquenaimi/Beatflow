/* import { Text, View } from "react-native";
import { Component } from "react";
import * as MediaLibrary from "expo-media-library";

export class AudioProvider extends Component {
    constructor(props) {
        super(props);
}

getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();

    if(permission.granted) {
        return;
    }

    if(!permission.granted && permission.canAskAgain) {
        const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();

        if(status === "denied" && canAskAgain) {

        }

        if (status === "granted") {
            return;
        }
    }
}

componentDidMount() {
    this.getPermission();
}

render() {
    return (
        <View>
            <Text>AudioProvider</Text>
        </View>
    );
}


} */