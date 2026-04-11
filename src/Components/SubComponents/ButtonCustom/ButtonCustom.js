import { Pressable,StyleSheet,Text } from "react-native";

export default function ButtonCustom({heading,divStyle,textStyle,pressFun}){
   const style=StyleSheet.create({
    div:divStyle,
    text:textStyle
   })
    return (
        <Pressable onPressOut={pressFun} style={style.div}>
            <Text style={style.text}>{heading}</Text>
        </Pressable>
    )
}
