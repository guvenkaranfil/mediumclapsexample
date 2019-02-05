import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default class ClapButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.count > 0 ? props.count : 0,
      claps: []
    };
    this.clap = this.clap.bind(this);
    this.keepClapping = this.keepClapping.bind(this);
    this.stopClapping = this.stopClapping.bind(this);
  }

  animationComplete(countNum) {
    claps = this.state.claps;
    claps.splice(claps.indexOf(countNum), 1);
    this.setState({ claps });
  }

  clap() {
    let count = this.state.count;
    let claps = this.state.claps;
    count++;
    claps.push(count);
    this.setState({ count: count });
  }
  renderClaps() {
    return this.state.claps.map(countNum => (
      <ClapBubble
        key={countNum}
        count={countNum}
        animationComplete={this.animationComplete.bind(this)}
      />
    ));
  }

  keepClapping() {
    this.clapTimer = setInterval(() => this.clap(), 150);
  }

  stopClapping() {
    clearInterval(this.clapTimer);
  }

  render() {
    let clapColor = this.state.count > 0 ? "#15a872" : "black";
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.clapButton}
          onPress={this.clap}
          onPressIn={this.keepClapping}
          onPressOut={this.stopClapping}
        >
          <Ionicons name="ios-hand" size={35} color={clapColor} />
        </TouchableOpacity>
        {this.renderClaps()}
      </View>
    );
  }
}

class ClapBubble extends Component {
  constructor() {
    super();
    this.state = {
      positionY: new Animated.Value(0),
      opacity: new Animated.Value(0)
    };
  }
  componentDidMount() {
    Animated.parallel([
      Animated.timing(this.state.positionY, {
        toValue: -120,
        duration: 500
      }),
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 500
      })
    ]).start(() =>
      setTimeout(() => {
        this.props.animationComplete(this.props.count);
      }, 300)
    );
  }
  render() {
    let animationStyle = {
      transform: [{ translateY: this.state.positionY }],
      opacity: this.state.opacity
    };
    return (
      <Animated.View style={[styles.clapBubble, animationStyle]}>
        <Text style={styles.clapText}>+ {this.props.count}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  clapButton: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    bottom: 20,
    right: 20,
    backgroundColor: "#ecf0f1",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowColor: "black",
    shadowOffset: { height: 3, width: 1 },
    zIndex: 1
  },
  clapBubble: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    bottom: 20,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#15a872"
  },
  clapText: {
    fontSize: 14,
    color: "white"
  }
});
