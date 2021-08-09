import React, {useRef, useState, useEffect, useMemo} from 'react';
import { Text } from 'react-native';
import * as THREE from 'three';

import gamutData from '../../../calculations/data/GamutData.json';


export const GamutBounds = ({ showRec601, showRec709, showRec2020 }) => {

    var visibleGamutBounds = [ showRec601, showRec709, showRec2020 ];
    var visibleGamutData = [];

    visibleGamutBounds.forEach((value, idx) => {
      if (value) {
        visibleGamutData.push(gamutData[idx]);
      }
    });

    return(
      <>
        {visibleGamutData.map((x, idx) => <GamutTriangle r={x.r} g={x.g} b={x.b} lineColor={x.previewColor} key={idx}/>)}
      </>
    );
  }


export const GamutLabels = ({ showRec601, showRec709, showRec2020 }) => {

    var visibleGamutBounds = [ showRec601, showRec709, showRec2020 ];
    var visibleGamutData = [];
    var showDescription = false;
    visibleGamutBounds.forEach((value, idx) => {
      if (value) {
        visibleGamutData.push(gamutData[idx]);
        showDescription = true;
      }
    });

    return(
      <>
        {showDescription ? <Text>Legende:</Text> : null}
        {visibleGamutData.map((x, idx) => <Text style={{color: x.previewColor}} key={idx}>{x.name}</Text>)}
      </>
    );
  }


const GamutTriangle = (props) => {
    const mesh = useRef();
    const shape = useMemo(() => {
      const s = new THREE.Shape();
      s.moveTo(props.r[0], props.r[1], 0);
      s.lineTo(props.g[0],props.g[1], 0);
      s.lineTo(props.b[0],props.b[1], 0);
      s.lineTo(props.r[0],props.r[1], 0);
      return s;
    }, [])

    const d65x1 = useMemo(() => {
      const s = new THREE.Shape();
      s.moveTo(-0.01, -0.01);
      s.lineTo(0.01, 0.01);
      return s;
    }, [])

    const d65x2 = useMemo(() => {
      const s = new THREE.Shape();
      s.moveTo(-0.01, 0.01);
      s.lineTo(0.01, -0.01);
      return s;
    }, [])

    const points = shape.getPoints();
    const geometryPoints = new THREE.BufferGeometry().setFromPoints( points );

    const pointsd65x1 = d65x1.getPoints();
    const geometryPointsd65x1 = new THREE.BufferGeometry().setFromPoints( pointsd65x1 );
    const pointsd65x2 = d65x2.getPoints();
    const geometryPointsd65x2= new THREE.BufferGeometry().setFromPoints( pointsd65x2 );

    const color = new THREE.Color( props.lineColor);

    return (
      <>
      <line ref={mesh} position={[0, 0, 0]} geometry={geometryPoints}>
        <lineBasicMaterial color={color} />
      </line>
      <line ref={mesh} position={[0.3127, 0.3290, 0]} geometry={geometryPointsd65x1}>
        <lineBasicMaterial color={color} />
      </line>
      <line ref={mesh} position={[0.3127, 0.3290, 0]} geometry={geometryPointsd65x2}>
        <lineBasicMaterial color={color} />
      </line>
      </>
    );
  }

