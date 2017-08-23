import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  ScrollView,
  Dimensions,
  Image,
  TouchableHighlight,
  Alert
} from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

const SLIDES = [
  {
    shoeImage: require("./shoe1.png"),
    shoePrice: 120,
    shoeName: "Air Structure 19",
    shoeDescription:
      "From the Flymesh upper to the triple-density foam midsole, the Nike Air Zoom Structure 19 Men’s Running Shoe offers plenty of support and the response you need for a smooth, stable ride that feels ultra fast.",
    shoeCategory: "Men’s Running Shoe",
    shoePhrase: "Air",
    backgroundColor: "#8850FF",
    touchableBackgroundColor: "#CAB1FF",
    gradient: require("./gradient1.png")
  },
  {
    shoeImage: require("./shoe2.png"),
    shoePrice: 129,
    shoeName: "Air Solstice QS",
    shoeDescription:
      "The Nike Air Solstice draws inspiration from the swoosh's classic running shoes of the 1980's updating the style with premium materials and impressive production quality.",
    shoeCategory: "Men’s Shoe",
    shoePhrase: "Class",
    backgroundColor: "#FFBA00",
    touchableBackgroundColor: "#FFDB79",
    gradient: require("./gradient2.png")
  },
  {
    shoeImage: require("./shoe3.png"),
    shoePrice: 140,
    shoeName: "Air Huarache Utility",
    shoeDescription:
      "The Nike Air Huarache Utility Men's Shoe toughens up a famous running shoe with a nylon upper, fused mudguard and vibrant detail.",
    shoeCategory: "Men’s Shoe",
    shoePhrase: "Safar",
    backgroundColor: "#4054FF",
    touchableBackgroundColor: "#9EA8FF",
    gradient: require("./gradient3.png")
  }
];

export default class App extends Component {
  scrollX = new Animated.Value(0);

  expandCard() {
    Alert.alert("🔥 added to ya wishlist 🔥", "", [{ text: "whatever" }]);
  }

  render() {
    return (
      <View style={styles.container}>
        {SLIDES.map((slide, index) => {
          return (
            <Animated.View
              key={index}
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: slide.backgroundColor,
                zIndex: -index,
                opacity: this.scrollX.interpolate({
                  inputRange: [deviceWidth * index, deviceWidth * (index + 1)],
                  outputRange: [1, 0]
                })
              }}
            />
          );
        })}
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.scrollX } } }],
            { useNativeDriver: true }
          )}
        >
          {SLIDES.map((slide, index) => {
            return (
              <View key={index} style={styles.cardContainer}>
                <Animated.View style={styles.card}>
                  <View style={styles.cardTopContainer}>
                    <Image
                      style={styles.gradientImage}
                      source={slide.gradient}
                    />
                    <Animated.View
                      style={[
                        styles.nikeImageContainer,
                        {
                          transform: [
                            {
                              translateX: this.scrollX.interpolate({
                                inputRange: [
                                  deviceWidth * index,
                                  deviceWidth * (index + 1)
                                ],
                                outputRange: [0, -deviceWidth * 0.2]
                              })
                            }
                          ]
                        }
                      ]}
                    >
                      <Image
                        style={styles.nikeImage}
                        source={require("./nike-logo.png")}
                      />
                      <Text style={styles.shoePriceText}>
                        ${slide.shoePrice}
                      </Text>
                    </Animated.View>
                    <Animated.View
                      style={{
                        marginBottom: 8,
                        transform: [
                          {
                            translateX: this.scrollX.interpolate({
                              inputRange: [
                                deviceWidth * index,
                                deviceWidth * (index + 1)
                              ],
                              outputRange: [0, -deviceWidth * 0.4]
                            })
                          }
                        ]
                      }}
                    >
                      <Text style={styles.shoeNameText}>
                        {slide.shoeName.toUpperCase()}
                      </Text>
                    </Animated.View>
                    <Animated.View
                      style={{
                        transform: [
                          {
                            translateX: this.scrollX.interpolate({
                              inputRange: [
                                deviceWidth * index,
                                deviceWidth * (index + 1)
                              ],
                              outputRange: [0, -deviceWidth * 0.6]
                            })
                          }
                        ]
                      }}
                    >
                      <Text style={styles.shoeDescriptionText}>
                        {slide.shoeDescription}
                      </Text>
                    </Animated.View>
                    <Text style={styles.shoePhraseText}>
                      {slide.shoePhrase.toUpperCase()}
                    </Text>
                    <View />
                  </View>
                  <Animated.View
                    style={[
                      styles.buttonContainer,
                      {
                        transform: [
                          {
                            translateX: this.scrollX.interpolate({
                              inputRange: [
                                deviceWidth * index,
                                deviceWidth * (index + 1)
                              ],
                              outputRange: [0, -deviceWidth * 0.2]
                            })
                          }
                        ]
                      }
                    ]}
                  >
                    <TouchableHighlight
                      underlayColor={slide.touchableBackgroundColor}
                      onPress={() => this.expandCard()}
                      style={[
                        styles.button,
                        { borderColor: slide.backgroundColor }
                      ]}
                    >
                      <Text
                        style={[
                          styles.buttonText,
                          { color: slide.backgroundColor }
                        ]}
                      >
                        WISH LIST
                      </Text>
                    </TouchableHighlight>
                    <Text style={styles.shoeCategoryText}>
                      {slide.shoeCategory.toUpperCase()}
                    </Text>
                  </Animated.View>
                </Animated.View>
                <Animated.View
                  pointerEvents="none"
                  style={[
                    styles.shoeImageContainer,
                    {
                      transform: [
                        {
                          translateX: this.scrollX.interpolate({
                            inputRange: [
                              deviceWidth * index,
                              deviceWidth * (index + 1)
                            ],
                            outputRange: [0, -deviceWidth * 1]
                          })
                        }
                      ]
                    }
                  ]}
                >
                  <Image style={styles.shoeImage} source={slide.shoeImage} />
                </Animated.View>
              </View>
            );
          })}
        </Animated.ScrollView>
        <View style={styles.pageIndicatorContainer}>
          <View style={styles.inActivePageIndicator} />
          <View style={styles.inActivePageIndicator} />
          <View style={styles.inActivePageIndicator} />
          <Animated.View
            style={[
              styles.activePageIndicator,
              {
                transform: [
                  {
                    translateX: this.scrollX.interpolate({
                      inputRange: [0, deviceWidth, deviceWidth * 2],
                      outputRange: [0, 24, 48]
                    })
                  },
                  {
                    scaleX: this.scrollX.interpolate({
                      inputRange: [
                        0,
                        deviceWidth * 0.5,
                        deviceWidth,
                        deviceWidth * 1.5,
                        deviceWidth * 2
                      ],
                      outputRange: [1, 1.5, 1, 1.5, 1]
                    })
                  }
                ]
              }
            ]}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardContainer: {
    width: deviceWidth,
    height: deviceHeight,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    width: deviceWidth - 64,
    height: deviceHeight * 0.8,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 15
    },
    shadowRadius: 25
  },
  cardTopContainer: {
    flex: 3,
    overflow: "hidden",
    padding: 28,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "transparent"
  },
  gradientImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: deviceWidth - 64,
    height: deviceHeight * 0.8,
    resizeMode: "cover"
  },
  nikeImageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 40
  },
  nikeImage: {
    width: 40,
    resizeMode: "contain"
  },
  shoePriceText: {
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 0.38,
    color: "white"
  },
  shoeNameText: {
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 1.5,
    color: "white"
  },
  shoeDescriptionText: {
    fontSize: 11,
    letterSpacing: 0.07,
    lineHeight: 13,
    color: "white"
  },
  shoePhraseText: {
    position: "absolute",
    bottom: 0,
    left: -32,
    width: deviceWidth * 2,
    fontSize: deviceWidth / 2,
    fontWeight: "900",
    letterSpacing: 20,
    color: "rgba(0,0,0,0.3)"
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    marginBottom: 12,
    paddingVertical: 15,
    paddingHorizontal: 64,
    borderWidth: 1.5,
    borderRadius: 40
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 1.5
  },
  shoeCategoryText: {
    fontSize: 12,
    color: "#AEAEAE"
  },
  shoeImageContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center"
  },
  shoeImage: {
    top: 64,
    width: deviceWidth,
    resizeMode: "contain"
  },
  pageIndicatorContainer: {
    position: "absolute",
    bottom: 24,
    width: 64,
    height: 3,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
    borderRadius: 1.5
  },
  inActivePageIndicator: {
    width: 16,
    height: 3,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 1.5
  },
  activePageIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 16,
    height: 3,
    backgroundColor: "white",
    borderRadius: 1.5
  }
});
