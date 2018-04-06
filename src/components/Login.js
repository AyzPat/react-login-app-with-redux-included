import React, { Component } from 'react';
import { View, StyleSheet,Image,Dimensions,KeyboardAvoidingView } from 'react-native';
import { Container, Item, Input, Header, Body, Content, Title, Button, Text , Label, Icon } from 'native-base';
import { Field, reduxForm } from 'redux-form';
import { Actions, ActionConst } from 'react-native-router-flux';
const ScreenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("window").width;
let buttonDisabled= true;
const validate = values => {
    const error = {};
    error.email = '';
    error.name = '';
    var ema = values.email;
    var nm = values.pwd;
    if (values.email === undefined) {
        ema = '';
    }

    if (values.pwd === undefined) {
        nm = '';
    }
    if (ema.length < 8 && ema !== '') {
        error.email = 'too short';
    }
    if (!ema.includes('@') && ema !== '') {
        error.email = '@ not included';
    }
    if (nm.length > 8) {
        error.pwd = 'max 8 characters';
    }

    return error;
};
class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            mail: '',
            pwd: '',
        };
        this.renderInput = this.renderInput.bind(this);
        this.submitted = this.submitted.bind(this);
        this.validated = this.validated.bind(this);
       
    }
    //   validated =(val)=>{
    //   this.setState({
    //       pwd:val
    //   })
    //   }
    validated = (type, val) => {
        
        if (type == 'email') {

            this.setState({
                mail: val
            })
        }
        if (type == 'password') {
            this.setState({
                pwd: val
            })
        }
    }
    submitted() {
        if(this.state.mail == 'Ayz@123.com' && this.state.pwd == 12345678 ){
            Actions.reset("items")
        }
    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        });
        this.setState({ isReady: true });
    }
    renderInput({ input, label, type, meta: { touched, error, warning } }) {
        var hasError = false;
        var security = false;
        if (error !== undefined) {
            hasError = true;
            buttonDisabled= true
        }
        if(!error && this.state.pwd !='' && this.state.mail != ''){
           buttonDisabled=false;
        }
        if(type == 'password'){
            security :true;
        }
       
        return (
            <View style={{marginBottom:25}}>
            <Item error={hasError} floatingLabel>
                <Label style={{marginLeft:25}}>{label}</Label>
                <Input secureTextEntry={type=='password' ? true :false} {...input} style={{marginLeft:25}} onChangeText={this.validated.bind(this, type)} />
                   
                    {/* {hasError ? <Icon style={styles.icon_style} name='close-circled' /> :<Text />} */}
            </Item>
             {hasError ? <Text style={{marginLeft:25}}>{error}</Text> : <Text />}
            </View>
        )
    }
    render() {
        const { handleSubmit, reset } = this.props;
        if (!this.state.isReady) {
            return <Expo.AppLoading />;
        }
        return (
        <KeyboardAvoidingView style={{flex:1}}
            behavior="padding"
          >
            <Container>
                {/* <Button onPress={Actions.home}></Button> */}
                <Container style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center', 
                    display: 'flex',
                }}>
                <Image style={{position:'absolute',top:0,left:0,height:ScreenHeight,width:ScreenWidth}}
        source={{uri:'https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}}
       ></Image>
        
      
                    <Content padder>
                        <Field name="email" label="Enter email" type="email" component={this.renderInput} value={this.state.name} />
                        <Field name="pwd" label="Enter password" type="password" component={this.renderInput} value={this.state.pwd} />
                        <Button style={{marginTop:'5%'}} block primary onPress={this.submitted} disabled={buttonDisabled == true ? true : false} success={buttonDisabled == true ? false : true}>
                            <Text>Submit</Text>
                        </Button>
                    </Content>
                </Container>

            </Container>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    // icon_style: {
    //   position:'absolute',
    //   top: 5,
    //   right: -5,
    //   paddingRight:0
    // },
  });
export default reduxForm({
    form: 'test',
    validate
})(Login)