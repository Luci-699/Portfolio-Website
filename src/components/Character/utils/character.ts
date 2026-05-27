import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);

            // Recolor shirt & pants to black
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;

                const name = child.name.toLowerCase();
                const mat = mesh.material as THREE.MeshStandardMaterial;

                // Detect shirt/top clothing meshes
                const isShirt =
                  name.includes("shirt") ||
                  name.includes("top") ||
                  name.includes("cloth") ||
                  name.includes("tshirt") ||
                  name.includes("body_cloth") ||
                  name.includes("torso_cloth") ||
                  name.includes("sweater") ||
                  name.includes("jacket");

                // Detect pants/bottom clothing meshes
                const isPants =
                  name.includes("pant") ||
                  name.includes("trouser") ||
                  name.includes("leg_cloth") ||
                  name.includes("jean") ||
                  name.includes("short");

                if (isShirt) {
                  // Matte black for shirt
                  const newMat = mat.clone();
                  newMat.color.set(0x0a0a0a);
                  newMat.roughness = 0.85;
                  newMat.metalness = 0.05;
                  mesh.material = newMat;
                } else if (isPants) {
                  // Same matte black as shirt
                  const newMat = mat.clone();
                  newMat.color.set(0x0a0a0a);
                  newMat.roughness = 0.85;
                  newMat.metalness = 0.05;
                  mesh.material = newMat;
                }
              }
            });

            // Log all mesh names so we can fine-tune if needed
            console.log("Character meshes:");
            character.traverse((child: any) => {
              if (child.isMesh) console.log(" ->", child.name);
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
