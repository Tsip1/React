/**
 * My First Game In React Native
 * set NODE_OPTIONS=--openssl-legacy-provider
 */

import { GameEngine } from 'react-native-game-engine';
import React, { useRef, useState } from 'react';
import { 
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
} from 'react-native';

import Constants from './Constants';
import Head from './components/Head';
import Food from './components/Food';
import Tail from './components/Tail';
import GameLoop from './systems/GameLoop';


const App = () => {
  const BoardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
  const engine = useRef(null);

  const [isGameRunning, setIsGameRunning] = useState(true);

  const randomPositions = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const getEntities = () => {
    return {
      head: {
        position: [0, 0],
        size: Constants.CELL_SIZE,
        updateFrequency: 10,
        xspeed: 0,
        yspeed: 0,
        renderer: <Head />
      },
      food: {
        position: [
          randomPositions[0, Constants.GRID_SIZE - 1],
          randomPositions[0, Constants.GRID_SIZE - 1],
        ],
        size: Constants.CELL_SIZE,
        updateFrequency: 10,
        nextMove: 10,
        xspeed: 0,
        yspeed: 0,
        renderer: <Food />
      },
      tail: {
        size: Constants.CELL_SIZE,
        elements: [],
        renderer: <Tail />
      },
    }
  }

  const resetGame = () => {
    handleEvent = (ev) => {
      if (ev.type === "game-over")
        this.refs.engine.swap(getEntities());
    };
    setIsGameRunning(true)
};

  return (
    <View style={styles.canvas}>
      <GameEngine
          ref={engine}
          style={{
          width: BoardSize,
          height: BoardSize,
          flex: null,
          backgroundColor: "#fff"
        }}
        entities={{
          head: {
            position: [0, 0],
            size: Constants.CELL_SIZE,
            updateFrequency: 10,
            nextMove: 10,
            xspeed: 0,
            yspeed: 0,
            renderer: <Head />,
          },
          food: {
            position: [
              randomPositions(0, Constants.GRID_SIZE - 1),
              randomPositions(0, Constants.GRID_SIZE - 1),
            ],
            size: Constants.CELL_SIZE,
            renderer: <Food />
          },
          tail: {
            size: Constants.CELL_SIZE,
            elements: [],
            renderer: <Tail />
          },
        }}
        
        systems = {[GameLoop]}
        running = {isGameRunning}
        onEvent = {(e) => {
          switch(e) {
            case "game-over":
              alert("game-over");
              setIsGameRunning(false);
              return;
          }
        }}
      />
      <View style={styles.controlContainer}>
        <View style={styles.controllerRow}>
          <View style={styles.controllerRow}>
            <TouchableOpacity onPress={() => engine.current.dispatch("move-up")}>
              <View style={styles.controlBtn} >
              <Text style={styles.text}> UP </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.controllerRow} >
            <TouchableOpacity onPress={() => engine.current.dispatch("move-left")}>
                <View style={styles.controlBtn}>
                  <Text style={styles.text}> {"<-"} </Text>
                </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.controllerRow}>
          <View style={[styles.controlBtn, {backgroundColor: null}]}>
            <TouchableOpacity onPress={() => engine.current.dispatch("move-right")}>
              <View style={styles.controlBtn}>
                <Text style={styles.text}> {"->"} </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.controllerRow}>
            <TouchableOpacity onPress={() => engine.current.dispatch("move-down")}>
              <View style={styles.controlBtn}>
                <Text style={styles.text}> DOWN </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        
      </View>
      {!isGameRunning && (
        <Button 
          onPress={resetGame}
          title="start over"
        >
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: "#858988",
    alignItems: "center",
    jjustifyContent: "center"
  },
  controlContainer: {
    marginTop: 10,
  },
  controllerRow: {
    flexDirection: "row",
    jjustifyContent: "center",
    alignItems: "center",
  },
  controlBtn: {
    backgroundColor: "#6C7CF3",
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Cochin",
    color: "#000",
  },
});

export default App;
