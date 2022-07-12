import React, { Ref } from 'react'
import { GLTF } from 'three-stdlib'

type ModelProps = {
  gltf: GLTF
  ref: React.Ref<any>
}

export default ModelProps