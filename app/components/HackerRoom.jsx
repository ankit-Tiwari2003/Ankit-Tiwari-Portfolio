import { useGLTF, useTexture } from '@react-three/drei';

export function HackerRoom(props) {
  const { nodes, materials } = useGLTF('/models/hacker-room.glb');

  const monitortxt = useTexture('textures/desk/monitor.png');
  const screenTxt = useTexture('textures/desk/ud.png');

  return (
    <group {...props} dispose={null}>
      {/* Move the screen slightly forward on the z-axis to avoid overlap */}
      <mesh geometry={nodes.screen_screens_0.geometry} material={materials.screens} position={[0, 0, 0.5]}>
        <meshMatcapMaterial map={screenTxt} />
      </mesh>

      {/* Move the glass slightly back on the z-axis to avoid overlap */}
      <mesh geometry={nodes.screen_glass_glass_0.geometry} material={materials.glass} position={[0, 0, -0.5]} />

      {/* Other meshes */}
      <mesh geometry={nodes.table_table_mat_0_1.geometry} material={materials.table_mat} position={[0, 0, 0]} />
      <mesh geometry={nodes.table_table_mat_0_2.geometry} material={materials.computer_mat} position={[0, 0.2, 0]}>
        <meshMatcapMaterial map={monitortxt} />
      </mesh>
      <mesh geometry={nodes.table_table_mat_0_3.geometry} material={materials.server_mat} />
      <mesh geometry={nodes.table_table_mat_0_4.geometry} material={materials.vhsPlayer_mat} />
      <mesh geometry={nodes.table_table_mat_0_5.geometry} material={materials.stand_mat} />
      <mesh geometry={nodes.table_table_mat_0_6.geometry} material={materials.mat_mat} />
      <mesh geometry={nodes.table_table_mat_0_7.geometry} material={materials.arm_mat} />
      <mesh geometry={nodes.table_table_mat_0_8.geometry} material={materials.tv_mat} position={[0, -0.1, 0]}>
        <meshMatcapMaterial map={monitortxt} />
      </mesh>
      <mesh geometry={nodes.table_table_mat_0_9.geometry} material={materials.cables_mat} />
      <mesh geometry={nodes.table_table_mat_0_10.geometry} material={materials.props_mat} />
      <mesh geometry={nodes.table_table_mat_0_11.geometry} material={materials.ground_mat} />
      <mesh geometry={nodes.table_table_mat_0_12.geometry} material={materials.key_mat} />
    </group>
  );
}

useGLTF.preload('/models/hacker-room.glb');
