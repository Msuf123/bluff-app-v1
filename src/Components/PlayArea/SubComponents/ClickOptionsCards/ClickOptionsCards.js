import { Image, StyleSheet, View } from "react-native"

export default function ClikOptions({topValue,rotateValue}){
    return(
        <View style={[style.div,topValue?{top:"50%",left:"100%",transform:[{translateY:"-50%"},{translateX:"-50%"}]}:{},rotateValue==-90?{left:"0%",transform:[{translateY:"-50%"},{translateX:"-50%"}]}:{},]}>
          <Image style={[style.img]} source={require("@/assets/mic.png")}></Image>
          
        </View>
    )
}
const style=StyleSheet.create({
  div:{
   width:20,
   height:20,
   backgroundColor:"white",
   position:"absolute",
   top:"98%",
   borderRadius:50
  },img:{
   width:20,
   height:20
  }
})