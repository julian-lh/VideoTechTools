// WFM, Vektorskop, CIE-Farbmodell

import * as React from 'react';
import { Text, View, TouchableWithoutFeedback, Button } from 'react-native';

import { useState } from "react";

import { GLView } from "expo-gl";
import { Renderer } from "expo-three";

import {
    AmbientLight,
    CircleGeometry,
    SphereGeometry,
    Fog,
    GridHelper,
    Group,
    Mesh,
    MeshStandardMaterial,
    MeshPhongMaterial,
    MeshNormalMaterial,
    PerspectiveCamera,
    OrthographicCamera,
    PointLight,
    DirectionalLight,
    Scene,
    SpotLight,
    BoxGeometry,
    MeshBasicMaterial,
} from "three";

const WaveformMonitor = (props) => {
    const camera = new OrthographicCamera(-200, 1200, 900, -400);
    camera.position.set(0, 0, 1 );
    camera.lookAt( 0, 0, 0 );

    var dataArray = []; // eigentlich 2D, als Waveform-Argument nehmen
    //if (props.data){
    //    dataArray = props.data;
    //}
    const sineWave = new Array(800);
    for(var i = 0; i < sineWave.length; i++){
        sineWave[i] = 20 * Math.sin(i/20);
    if(i > 400){
        sineWave[i] += 300;
    }
    }
    const selectSine = () => dataArray = sineWave;
    const otherData = () => dataArray = [23, 45, 234, 34, 535];
    const propsData = () => dataArray = props.data;

    return (
      <View style={{ flex: 1}}>
      <GLView
        style={{ height: 200, width: 300 }}
        onLayout={(event) => {
          event.nativeEvent.layout.height;
          event.nativeEvent.layout.width;
            }}
        onContextCreate={ async (gl) => {
            const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
            const renderer = new Renderer({ gl });
            renderer.setViewport(-1,-5, width, height);
            renderer.setClearColor("#000");
            const scene = new Scene();


            // Graphen-Achsen erstellen
            // STRAIGHT LINES
            for (var y= -300; y <= 800; y += 100) {
                const points = [];
                points.push( new THREE.Vector3( - 100, y, 0 ) );
                points.push( new THREE.Vector3( 1000, y, 0 ) );

                const geometry = new THREE.BufferGeometry().setFromPoints( points );
                var lineMaterial = new THREE.LineBasicMaterial( { color: 0x666655} );
                if (y == 0) {
                    lineMaterial = new THREE.LineBasicMaterial( { color: 0xaaaa99, linewidth: 2} );
                }
                const line = new THREE.Line( geometry, lineMaterial );
                scene.add(line);
            }

            // DASHED LINES
            for (var y = -350; y <=700; y += 350) {
                if (y == -350 || y == 350) {
                const points = [];
                points.push( new THREE.Vector3( - 50, y, 0 ) );
                points.push( new THREE.Vector3( 1000, y, 0 ) );

                const geometry = new THREE.BufferGeometry().setFromPoints( points );
                const lineMaterial = new THREE.LineDashedMaterial( {
                    color: 0x666655,
                    scale: 1,
                    dashSize: 40,
                    gapSize: 10,
                } );

                const line = new THREE.Line( geometry, lineMaterial );
                line.computeLineDistances();
                scene.add(line);
                }
            }


            const updatePlotData = () => {
                // remove old data
                for(let object of scene.children){
                    if(object.name == "dataArray"){
                        scene.remove(object);
                    }
                }
                    // Add new data
                    const path = new THREE.Path();
                    for(var i=0; i< dataArray.length; i++){
                    path.lineTo( i, dataArray[i]);
                }
                const points = path.getPoints();
                const geometry = new THREE.BufferGeometry().setFromPoints( points );
                const material = new THREE.LineBasicMaterial( { color: 0x44ff00 } );
                    const line = new THREE.Line( geometry, material );
                line.name = "dataArray";
                scene.add( line );
                }

            // Render function
            const render = () => {
                requestAnimationFrame(render);
                updatePlotData();
                renderer.render(scene, camera);
                gl.endFrameEXP();
            };
            render();
        }}
      > <Text style={{color: "green", fontSize: 50, top: 10, zIndex: 100}}>Test</Text>
      </GLView>
          <Text>Test: {props.text}</Text>
          <Button title="Sine" onPress={selectSine}></Button>
          <Button title="Other" onPress={otherData}></Button>
          <Button title="PropsData" onPress={propsData}></Button>
    </View>
    );
  }


  class BoxMesh extends Mesh {
    constructor() {
      super(
        new BoxGeometry(2, 2, 2),
        new MeshPhongMaterial({color: 0x44aa88})
      );
    }
  }

  export default WaveformMonitor;