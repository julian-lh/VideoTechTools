import React, {useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';


export function Camera(targetX = 0.5, props) {
    const cam = useRef()
    const { setDefaultCamera } = useThree()

    useEffect(() => void setDefaultCamera(cam.current), [])

    useFrame(() => {
      cam.current.updateMatrixWorld();
      cam.current.lookAt(0.5, 0.5, 0.5);
    })
    return <orthographicCamera ref={cam} zoom={170} near={0.0} {...props} />
  }