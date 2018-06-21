import React from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  Animated,
  StatusBar,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';
// import Orientation from 'react-native-orientation';
import propTypes from 'prop-types';

//VARIABLES


//COMPONENTSs


//STYLESHEET
import styleSheet from './styles';

export default class CustomVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: true,
      fullScreen: false
    }
    this.fullScreenAnimationValue = new Animated.Value(0);
    let { width, height } = Dimensions.get('window');
    this.fullScreenAnimXYVal = new Animated.ValueXY({ x: 0, y: 0 });
    this.videoSize = {
      width: 0,
      height: 0
    }
  }

  playFullScreenAnimation = () => {
    let { width, height } = Dimensions.get('window');
    this.fullScreenAnimXYVal.setValue({ x: this.videoSize.width, y: this.videoSize.height });
    Animated.timing(this.fullScreenAnimXYVal, {
      toValue: { x: width, y: height },
      duration: 500
    }).start();
  }

  onEnd = () => {
    this.setState({ paused: true });
  }

  onLayout = e => {
    if (this.videoSize.width == 0 && this.videoSize.height == 0) {
      this.videoSize = e.nativeEvent.layout;
    }
  }

  componentWillMount = () => {

  }

  componentDidMount = () => {
  }

  render = () => {

    let TouchableComponent = Platform.os == 'ios' ? TouchableOpacity : TouchableOpacity;
    let fullScreenStyle = {};
    // this.fullScreenAnimXYVal.
    // let fullscreenAnimInterpolate = this.fullScreenAnimationValue.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: [null, '100%']
    // })
    if (Platform.OS == 'android') {
      let statusBarHeight = StatusBar.currentHeight;
      if (this.state.fullScreen) {
        let { width, height } = Dimensions.get('window');
        fullScreenStyle = {
          top: -statusBarHeight,
          // left: 0,
          width: this.fullScreenAnimXYVal.x,
          height: this.fullScreenAnimXYVal.y,
          zIndex: 999,
          position: 'absolute',
        }
      }
    }

    return (
      <Animated.View style={[styleSheet.common.container, fullScreenStyle]}>
        <View style={[styleSheet.common.container, styleSheet.common.subContainer]} onLayout={this.onLayout}>
          <Video
            source={this.props.source}   // Can be a URL or a local file.
            //poster="https://scontent.fdad2-1.fna.fbcdn.net/v/t31.0-8/28161796_758228141044247_4282492713976983489_o.jpg?_nc_cat=0&_nc_eui2=AeF8RYwaCBIBipbuBz8BNLIhfBVoDiIuVwXjVMZZsqTjomTHsAh4fjDqd2HBvLhAqQb08DEKFvALqjHjAvwrLRoINN_nVmDjbLki81CPshTxnQ&oh=2b3ca8657351508c451b8e7e3a911c11&oe=5BBD028F" // uri to an image to display until the video plays
            ref={(ref) => {
              this.player = ref
            }}                                      // Store reference
            // fullscreen={this.state.fullScreen}

            controls={Platform.OS == 'ios'}
            rate={1.0}                              // 0 is paused, 1 is normal.
            volume={1.0}                            // 0 is muted, 1 is normal.
            // muted={true | false}                      // Mutes the audio entirely. Default false
            paused={this.state.paused}                     // Pauses playback entirely. Default false
            resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
            // repeat={true | false}                     // Repeat forever. Default false
            // playInBackground={true | false}           // Audio continues to play when app entering background. Default false
            // playWhenInactive={true | false}           // [iOS] Video continues to play when control or notification center are shown. Default false
            ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
            progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
            // onBuffer={this.onBuffer}                // Callback when remote video is buffering
            onEnd={this.onEnd}                      // Callback when playback finishes
            // onError={this.videoError}               // Callback when video cannot be loaded
            // onFullscreenPlayerWillPresent={this.fullScreenPlayerWillPresent} // Callback before fullscreen starts
            // onFullscreenPlayerDidPresent={this.fullScreenPlayerDidPresent}   // Callback after fullscreen started
            // onFullscreenPlayerWillDismiss={this.fullScreenPlayerWillDismiss} // Callback before fullscreen stops
            // onFullscreenPlayerDidDismiss={this.fullScreenPlayerDidDissmiss}  // Callback after fullscreen stopped
            // onLoadStart={this.loadStart}            // Callback when video starts to load
            // onLoad={this.setDuration}               // Callback when video loads
            // onProgress={this.setTime}               // Callback every ~250ms with currentTime
            // onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
            style={[styleSheet.common.container]}
            {...this.props.videoProps}
          />
          {
            Platform.OS == 'android' &&
            <View style={styleSheet.control.container}>
              <View style={{ position: 'relative', width: '100%' }}>
                <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: '#2d3436', opacity: 0.3 }} />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <View style={styleSheet.control.buttonContainer}>
                    <TouchableComponent style={styleSheet.control.button}
                      onPress={() => { this.setState({ paused: !this.state.paused }) }}>
                      <Icon name={this.state.paused ? 'play' : 'pause'} size={30} color={'white'} />
                    </TouchableComponent>
                  </View>
                  <View style={styleSheet.control.buttonContainer}>
                    <TouchableComponent style={styleSheet.control.button}>
                      <Text>A</Text>
                    </TouchableComponent>
                  </View>
                  <View style={styleSheet.control.buttonContainer}>
                    <TouchableComponent style={styleSheet.control.button}>
                      <Text>A</Text>
                    </TouchableComponent>
                  </View>
                  <View style={styleSheet.control.buttonContainer}>
                    <TouchableComponent style={styleSheet.control.button}>
                      <Text>A</Text>
                    </TouchableComponent>
                  </View>
                  <View style={styleSheet.control.buttonContainer}>
                    <TouchableComponent style={styleSheet.control.button}
                      onPress={() => this.setState({ fullScreen: !this.state.fullScreen }, () => {
                        this.playFullScreenAnimation();
                        // if (this.state.fullScreen) {
                        //     this.player.dismissFullscreenPlayer();
                        // } else {
                        //     this.player.presentFullscreenPlayer();
                        // }
                      })}
                    >
                      <Icon name={this.state.fullScreen ? 'fullscreen-exit' : 'fullscreen'} size={30} color={'white'} />
                    </TouchableComponent>
                  </View>
                </View>
              </View>
            </View>
          }
        </View>
      </Animated.View>
    );
  }
}

CustomVideo.propTypes = {
  source: propTypes.object.isRequired
}
CustomVideo.defaultProps = {
  source: { uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }
}
