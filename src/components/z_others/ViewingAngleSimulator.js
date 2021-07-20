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

const ViewingAngleSimulator = (props) => {
    const sphere = new SphereMesh();
    const camera = new OrthographicCamera(50, 50, 50, 50);

    const box = new BoxMesh();

    const [test, setTest] = useState(1);
    const [test2, setTest2] = useState(1);

    let cameraInitialPositionX = 3;
    let cameraInitialPositionY = 2;
    let cameraInitialPositionZ = -5;

    function move(distance) {
      TweenMax.to(sphere.position, 0.2, {
        z: sphere.position.z + distance,
      });

      TweenMax.to(camera.position, 0.2, {
        z: camera.position.z + distance,
      });
    }

    const large = () => box.geometry = new BoxGeometry(2, 2, 2);
    const small = () => box.geometry = new BoxGeometry(0.1, 2, 2);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <GLView
        style={{ height: 200, width: 300 }}
        onLayout={(event) => {
            setTest(event.nativeEvent.layout.height);
            setTest2(event.nativeEvent.layout.width);
            }}
        onContextCreate={ async (gl) => {
            // GL Parameter disruption
            const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

            // Renderer declaration and set properties
            const renderer = new Renderer({ gl });
            renderer.setViewport(-1,-5, width, height);

            renderer.setClearColor("#fff");

            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;

            // Scene declaration, add a fog, and a grid helper to see axes dimensions
            const scene = new Scene();
            scene.fog = new Fog("#3A96C4", 0.5, 10000);
            scene.add(new GridHelper(10, 10));

            // Add all necessary lights
            const ambientLight = new AmbientLight(0x101010, 0.5);
            scene.add(ambientLight);

            const light = new DirectionalLight( 0xffffff, 0.9 );
                    light.position.set( 5, 3, 1 );//.normalize();
            light.target.position.set(-5, 0, 0);
                    scene.add( light );
            scene.add(light.target);

            // Add sphere object instance  to our scene
            //scene.add(sphere);
            box.receiveShadow = true;
            scene.add(box);

            // Set camera position and look to sphere
            camera.position.set(
            cameraInitialPositionX,
            cameraInitialPositionY,
            cameraInitialPositionZ
            );

            camera.lookAt(box.position);
            camera.left = width/ -200;
            camera.right = width/ 200;
            camera.top = height/ 200;
            camera.bottom = height/ -200;
            camera.updateProjectionMatrix();

            // Render function
            const render = () => {
            requestAnimationFrame(render);
            renderer.render(scene, camera);
            gl.endFrameEXP();
            };
            render();
            }}
        > <Text style={{color: "green", fontSize: 50, top: 10, zIndex: 100}}>Test</Text>
        </GLView>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Button title="small" onPress={small}></Button>
            <Button title="large" onPress={large}></Button>
        </View>

    </View>
    );
  }

  class SphereMesh extends Mesh {
    constructor() {
      super(
        new SphereGeometry(0, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2),
        new MeshStandardMaterial({
          color: 0xff0000,
        })
      );
    }
  }

  class BoxMesh extends Mesh {
    constructor() {
      super(
        new BoxGeometry(2, 2, 2),
        new MeshPhongMaterial({color: 0x44aa88})
      );
    }
  }

  export default ViewingAngleSimulator;