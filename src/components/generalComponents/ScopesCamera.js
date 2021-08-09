import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from 'react-three-fiber';

export const ScopesCamera = ({ position, target = [0, 0, 0], initialZoomScale = 1, zoomOffset = 0 }) => {
    const cam = useRef()
    const { setDefaultCamera } = useThree()

    // zoom to fit window
    const { camera, size: { width, height } } = useThree();
    const initialZoom = Math.min(width/initialZoomScale, height/initialZoomScale);

    useEffect(() => {
      camera.zoom = initialZoom + zoomOffset;
      camera.updateProjectionMatrix();
    },[zoomOffset])

    useEffect(() => void setDefaultCamera(cam.current), [])

    useFrame(() => {
      cam.current.updateMatrixWorld();
      cam.current.lookAt(target[0], target[1], target[2]);
    })

    return <orthographicCamera ref={cam} zoom={initialZoom} near={0.0} position={position} />
  }