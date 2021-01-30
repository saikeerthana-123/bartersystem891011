import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'

export default class RequestScreen extends Component{
  constructor(){
    super();
    this.state ={
      userId : firebase.auth().currentUser.email,
      Name:"",
      reasonToRequest:"",
      IsRequestActive:"",
      requestedname:"",
      Status:"",
      requestId:"",
      docId:"",
      userDocId:""
    }
  }

  createUniqueId(){
    return Math.random().toString(36).substring(7);
  }

  componentDidMount(){
    this.getRequest()
    this.getIsRequestActive()
  }
  
  getIsRequestActive=()=>{
    db.collection('users').where('email_id','==',this.state.userId)
    .onSnapshot(querySnapshot => { querySnapshot.forEach(doc => {
       this.setState({
          IsRequestActive:doc.data().IsRequestActive,
          userDocId : doc.id 
        }) 
      }) 
    })
  }

  getRequest=()=>{
    var Request = db.collection('requested').where('user_id','==',this.state.userId).get()
    .then((snapshot)=>{
      snapshot.forEach((doc) => {
        if(doc.data().status!=='received'){
          this.setState({
          "requestId" : doc.data().request_id,
          "requestedname": doc.data().name,
          "Status":doc.data().status,
          "docId": doc.id
        })}
      });
  })
  }

  addRequest =async(Name,reasonToRequest)=>{
    var userId = this.state.userId
    var randomRequestId = this.createUniqueId()
    db.collection('requested').add({
        "user_id": userId,
        "name":Name,
        "reason_to_request":reasonToRequest,
        "request_id"  : randomRequestId,
        status:'requested',
        date:firebase.firestore.FieldValue.serverTimestamp()
    })

      await this.getRequest()
      db.collection('users').where('email_id','==',this.state.userId).get()
      .then((snapshot)=>{
        snapshot.forEach((doc) => {
          db.collection('users').doc(doc.id).update({
            IsRequestActive:true
          })
        });
    })

    this.setState({
        Name :'',
        reasonToRequest : '',
        request_id:randomRequestId
    })

    return Alert.alert("Requested Successfully")
  }

  render(){
    console.log(this.state.IsRequestActive)
    if(this.state.IsRequestActive==true){
      return(
      <View style={{flex:1}}>
        <View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
          <Text>Name</Text>
          <Text>{this.state.requestedname}</Text>
        </View>
        <View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
          <Text>Status</Text>
          <Text>{this.state.Status}</Text>
        </View>
      </View>)
    }
    else{
    return(
        <View style={{flex:1}}>
          <MyHeader title="Requestk" navigation ={this.props.navigation}/>
            <KeyboardAvoidingView style={styles.keyBoardStyle}>
              <TextInput
                style ={styles.formTextInput}
                placeholder={"enter name"}
                onChangeText={(text)=>{
                    this.setState({
                        Name:text
                    })
                }}
                value={this.state.Name}
              />
              <TextInput
                style ={[styles.formTextInput,{height:300}]}
                multiline
                numberOfLines ={8}
                placeholder={"Why do you need"}
                onChangeText ={(text)=>{
                    this.setState({
                        reasonToRequest:text
                    })
                }}
                value ={this.state.reasonToRequest}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{this.addRequest(this.state.Name,this.state.reasonToRequest)}}
                >
                <Text>Request</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )}
  }
}

const styles = StyleSheet.create({
  keyBoardStyle : {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
    },
  }
)
