import path from '@/configs/model.json'
import MoveCharacter from '@/components/molecules/MoveCharacter'
import JumpCharacter from '@/components/molecules/JumpCharacter'
import StopCharacter from '@/components/molecules/StopCharacter'

export default function Characters() {

  return (
    <>
    {/* 飛び跳ねるキャラクター */}
    {path.jumpCharacter.map((item, index) => {
      return (<JumpCharacter position={item.position} rotation-y={item.rotationY} path={item.path} scale={item.scale} />)
    })}

    {/* 往復するキャラクター */}
    {path.moveCharacter.map((item, index) => {
        return (<MoveCharacter position={item.position} rotation-y={item.rotationY} path={item.path} scale={item.scale} />)
    })}

    {/* 静止するキャラクター */}
    {path.stopCharacter.map((item, index) => {
        return (<StopCharacter position={item.position}  rotation-y={item.rotationY} path={item.path} scale={item.scale} />)
    })}
    </>
  )
}
