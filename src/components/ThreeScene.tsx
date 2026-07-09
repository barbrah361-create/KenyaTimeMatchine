import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeSceneProps {
  mode: 'globe' | 'scene';
  year: number;
  countyId: string;
  onObjectClick?: (title: string, desc: string) => void;
}

export default function ThreeScene({ mode, year, countyId, onObjectClick }: ThreeSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredInfo, setHoveredInfo] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- SETUP SCENE, CAMERA & RENDERER ---
    const width = containerRef.current.clientWidth || 500;
    const height = containerRef.current.clientHeight || 400;

    const scene = new THREE.Scene();
    
    // Background theme: Dark luxury obsidian/space
    scene.background = new THREE.Color(0x0a0f0d);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffd700, 1.2); // Warm Golden Accent
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x1B5E20, 1, 50); // Forest Green Ambient
    pointLight.position.set(-10, -5, -10);
    scene.add(pointLight);

    // --- USER INTERACTION RAYCASTING ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let clickableObjects: THREE.Object3D[] = [];

    // --- RENDER GLOBE OR TOWN SCENE ---
    let mainGroup = new THREE.Group();
    scene.add(mainGroup);

    if (mode === 'globe') {
      // Setup animated 3D Earth Globe (Afro-Futuristic themed)
      camera.position.set(0, 0, 8);

      // Sphere geometry
      const sphereGeo = new THREE.SphereGeometry(3, 32, 32);
      const sphereMat = new THREE.MeshPhongMaterial({
        color: 0x111c15, // Dark emerald green forest depth
        emissive: 0x050f09,
        specular: 0x5D4037, // Rich bronze shimmer
        shininess: 25,
        wireframe: true // Grid-style structure for technological look
      });
      const globeMesh = new THREE.Mesh(sphereGeo, sphereMat);
      mainGroup.add(globeMesh);

      // Glow Ring (Equator / Time orbit)
      const ringGeo = new THREE.RingGeometry(3.5, 3.8, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xffd700, // Gold Ring
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.25,
        wireframe: true
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2.3;
      mainGroup.add(ringMesh);

      // Glowing particles around globe
      const particleGeo = new THREE.BufferGeometry();
      const particleCount = 200;
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        const radius = 4 + Math.random() * 2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions[i] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = radius * Math.cos(phi);
      }
      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const particleMat = new THREE.PointsMaterial({
        color: 0x2e7d32,
        size: 0.08,
        transparent: true,
        opacity: 0.8
      });
      const particles = new THREE.Points(particleGeo, particleMat);
      mainGroup.add(particles);

      // Glow beacon for Kenya (-1.29, 36.82 lat/lng) mapped to 3D sphere coordinate
      // Earth coordinate conversion (approximate for layout purposes)
      const beaconGeo = new THREE.SphereGeometry(0.18, 16, 16);
      const beaconMat = new THREE.MeshBasicMaterial({ color: 0xffd700 }); // Glowing gold
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      
      // Place beacon on front-right representing East Africa
      beacon.position.set(1.4, -0.2, 2.6);
      mainGroup.add(beacon);

      // Pulse circle around Kenya
      const pulseGeo = new THREE.RingGeometry(0.2, 0.4, 32);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: 0xffd700,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
      });
      const pulse = new THREE.Mesh(pulseGeo, pulseMat);
      pulse.position.copy(beacon.position);
      pulse.lookAt(0, 0, 0);
      mainGroup.add(pulse);

      // Animation variables for pulse
      let scaleTimer = 0;

      // Clickable elements
      beacon.name = "Kenya Beacon";
      clickableObjects.push(beacon);

      const handleMeshClick = () => {
        if (onObjectClick) {
          onObjectClick(
            "The Cradle of Humanity 🌍",
            "Kenya is highlighted on the Chronos Globe. It stands as the focal point of the Time Machine, bridging rich traditional heritages and pioneering technological futures."
          );
        }
      };

      containerRef.current.onclick = (e) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(clickableObjects);
        if (intersects.length > 0) {
          handleMeshClick();
        }
      };

      // Loop
      let reqId: number;
      const animate = () => {
        reqId = requestAnimationFrame(animate);
        mainGroup.rotation.y += 0.003;
        mainGroup.rotation.x = Math.sin(Date.now() * 0.0005) * 0.1;
        
        // Pulse animation
        scaleTimer += 0.05;
        const scaleVal = 1 + Math.sin(scaleTimer) * 0.4;
        pulse.scale.set(scaleVal, scaleVal, scaleVal);
        pulseMat.opacity = Math.max(0, 1 - (scaleVal - 0.6));

        renderer.render(scene, camera);
      };
      animate();

      return () => {
        cancelAnimationFrame(reqId);
        renderer.dispose();
      };

    } else {
      // --- INTERACTIVE TOWN SCENE ---
      camera.position.set(0, 8, 15);
      camera.lookAt(0, 1, 0);

      // Recreate elements based on Year
      const buildScene = () => {
        // Clear children
        while (mainGroup.children.length > 0) {
          mainGroup.remove(mainGroup.children[0]);
        }
        clickableObjects = [];

        // Ground Plane styling depends on year
        let groundColor = 0x2e7d32; // Forest Green (1895)
        let groundSpecular = 0x113d14;

        if (year >= 1963 && year < 2026) {
          groundColor = 0x424242; // Tarmac/Brick Grey
          groundSpecular = 0x111111;
        } else if (year >= 2026) {
          groundColor = 0x152b1b; // Solar glass green grid
          groundSpecular = 0x39a650;
        }

        const groundGeo = new THREE.BoxGeometry(20, 0.2, 20);
        const groundMat = new THREE.MeshPhongMaterial({
          color: groundColor,
          specular: groundSpecular,
          shininess: 10
        });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        mainGroup.add(ground);

        // Grid overlay for futuristic vibe in years >= 2026
        if (year >= 2026) {
          const gridHelper = new THREE.GridHelper(20, 20, 0xffd700, 0x1B5E20);
          gridHelper.position.y = 0.12;
          mainGroup.add(gridHelper);
        }

        // --- SCENARIO GENERATION BY ERA ---
        if (year <= 1920) {
          // --- PRE-COLONIAL & RAILROAD ERA ---
          // Round mud huts
          for (let i = 0; i < 4; i++) {
            const hutGroup = new THREE.Group();
            const posX = -6 + i * 4 + (Math.random() - 0.5) * 1.5;
            const posZ = -4 + (Math.random() - 0.5) * 3;

            // Base clay cylinder
            const baseGeo = new THREE.CylinderGeometry(1.2, 1.2, 1.5, 16);
            const baseMat = new THREE.MeshStandardMaterial({ color: 0x8d6e63 }); // Mud brown
            const base = new THREE.Mesh(baseGeo, baseMat);
            base.position.y = 0.75;
            hutGroup.add(base);

            // Roof thatch cone
            const roofGeo = new THREE.ConeGeometry(1.6, 1.2, 16);
            const roofMat = new THREE.MeshStandardMaterial({ color: 0x5d4037 }); // Dark dry straw
            const roof = new THREE.Mesh(roofGeo, roofMat);
            roof.position.y = 1.9;
            hutGroup.add(roof);

            hutGroup.position.set(posX, 0, posZ);
            hutGroup.name = `Traditional Manyatta ${i + 1}`;
            hutGroup.userData = {
              title: "Traditional African Manyatta 🛖",
              desc: "A beautifully hand-crafted indigenous clay homestead. Its grass-thatched roof acts as dynamic thermal insulation, keeping families cool during volcanic hot afternoons and cozy at night."
            };

            mainGroup.add(hutGroup);
            clickableObjects.push(base);
          }

          // Large Acacia tree
          const trunkGeo = new THREE.CylinderGeometry(0.3, 0.4, 4, 8);
          const trunkMat = new THREE.MeshStandardMaterial({ color: 0x3e2723 });
          const trunk = new THREE.Mesh(trunkGeo, trunkMat);
          trunk.position.set(5, 2, 4);
          mainGroup.add(trunk);

          const foliageGeo = new THREE.CylinderGeometry(2.5, 3.2, 0.8, 12);
          const foliageMat = new THREE.MeshPhongMaterial({ color: 0x1b5e20, flatShading: true });
          const foliage = new THREE.Mesh(foliageGeo, foliageMat);
          foliage.position.set(5, 4.2, 4);
          mainGroup.add(foliage);

          foliage.name = "Ancient Acacia Tree";
          foliage.userData = {
            title: "Ancient Acacia Tortilis 🌳",
            desc: "The sacred umbrella tree of the savannah. It served as a natural shaded courthouse where Elders gathered to settle disputes under natural direct democracy."
          };
          clickableObjects.push(foliage);

          // If year is 1900 or 1910: Add railway line!
          if (year >= 1900) {
            const trackGeo = new THREE.BoxGeometry(20, 0.1, 0.8);
            const trackMat = new THREE.MeshStandardMaterial({ color: 0x757575 });
            const track = new THREE.Mesh(trackGeo, trackMat);
            track.position.set(0, 0.1, 7);
            mainGroup.add(track);

            // Train carriage
            const trainGroup = new THREE.Group();
            const trainBodyGeo = new THREE.BoxGeometry(3, 1.2, 1.2);
            const trainBodyMat = new THREE.MeshStandardMaterial({ color: 0x3e2723 }); // Old coal-loco black
            const trainBody = new THREE.Mesh(trainBodyGeo, trainBodyMat);
            trainBody.position.y = 0.8;
            trainGroup.add(trainBody);

            const chimneyGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.6, 8);
            const chimney = new THREE.Mesh(chimneyGeo, trainBodyMat);
            chimney.position.set(-1, 1.5, 0);
            trainGroup.add(chimney);

            trainGroup.position.set(-2, 0, 7);
            trainGroup.name = "The Iron Snake";
            trainGroup.userData = {
              title: "The Uganda Railway Locomotives (1900) 🚂",
              desc: "The legendary locomotive of the Uganda Railway. It altered human trade lanes, cut down physical transit from weeks to hours, and established the swamp town that would become Nairobi."
            };
            mainGroup.add(trainGroup);
            clickableObjects.push(trainBody);
          }

        } else if (year >= 1930 && year < 1978) {
          // --- EARLY COLONIAL & INDEPENDENCE ERA ---
          // Colonial brick municipal offices & clock tower
          const bldgGroup = new THREE.Group();
          const bodyGeo = new THREE.BoxGeometry(4, 3, 3);
          const bodyMat = new THREE.MeshStandardMaterial({ color: 0xa1887f }); // Sandstone/brick red
          const body = new THREE.Mesh(bodyGeo, bodyMat);
          body.position.set(-4, 1.5, -2);
          bldgGroup.add(body);

          const roof2Geo = new THREE.ConeGeometry(2.8, 1.5, 4);
          const roof2Mat = new THREE.MeshStandardMaterial({ color: 0x8d6e63 });
          const roof2 = new THREE.Mesh(roof2Geo, roof2Mat);
          roof2.position.set(-4, 3.75, -2);
          roof2.rotation.y = Math.PI / 4;
          bldgGroup.add(roof2);

          bldgGroup.name = "Municipal Hall";
          bldgGroup.userData = {
            title: "Colonial Municipal Hall & Clock 🏫",
            desc: "Built with stone masonry and clay tiles, this layout represented administration quarters before local struggles claimed the land back for citizen governance."
          };
          mainGroup.add(bldgGroup);
          clickableObjects.push(body);

          // Retro Automobile
          const carGroup = new THREE.Group();
          const carBodyGeo = new THREE.BoxGeometry(2, 0.8, 1);
          const carBodyMat = new THREE.MeshStandardMaterial({ color: 0x311b92 }); // Deep vintage blue
          const carBody = new THREE.Mesh(carBodyGeo, carBodyMat);
          carBody.position.y = 0.6;
          carGroup.add(carBody);

          const cabinGeo = new THREE.BoxGeometry(1, 0.6, 0.8);
          const cabin = new THREE.Mesh(cabinGeo, carBodyMat);
          cabin.position.set(-0.2, 1.2, 0);
          carGroup.add(cabin);

          carGroup.position.set(3, 0.1, 4);
          carGroup.name = "Vintage Peugeot";
          carGroup.userData = {
            title: "Classic Vintage Sedan 🚗",
            desc: "A beautiful mid-century European import, symbolizing early urban commuting on freshly tarmacked commercial lanes."
          };
          mainGroup.add(carGroup);
          clickableObjects.push(carBody);

          // If independence year 1963: Add big festive national banners!
          if (year === 1963) {
            const poleGeo = new THREE.CylinderGeometry(0.08, 0.08, 5, 8);
            const poleMat = new THREE.MeshStandardMaterial({ color: 0xe0e0e0 });
            const pole = new THREE.Mesh(poleGeo, poleMat);
            pole.position.set(4, 2.5, -3);
            mainGroup.add(pole);

            const flagGeo = new THREE.BoxGeometry(1.8, 1, 0.08);
            const flagMat = new THREE.MeshStandardMaterial({ color: 0x1b5e20 }); // Rep green for independence focus
            const flag = new THREE.Mesh(flagGeo, flagMat);
            flag.position.set(4.9, 4.4, -3);
            mainGroup.add(flag);

            flag.name = "Uhuru Banner";
            flag.userData = {
              title: "The Birth of sovereignty (1963) 🇰🇪",
              desc: "The national flag of sovereign Kenya hoisted high! Replaces colonial banners with green (land wealth), black (the people), red (the sacrifice), and white (peace)."
            };
            clickableObjects.push(flag);
          }

        } else if (year >= 1985 && year < 2026) {
          // --- URBAN AND MOBILE MONEY BOOM ERA ---
          // Modern skyscrapers
          for (let i = 0; i < 3; i++) {
            const h = 5 + i * 2;
            const bGeo = new THREE.BoxGeometry(2.5, h, 2.5);
            const bMat = new THREE.MeshPhongMaterial({
              color: i === 1 ? 0x2e7d32 : 0x37474f,
              shininess: 40,
              flatShading: true
            });
            const bldg = new THREE.Mesh(bGeo, bMat);
            bldg.position.set(-6 + i * 4, h / 2, -4);
            bldg.name = `Skyscraper ${i + 1}`;
            bldg.userData = {
              title: i === 1 ? "Green Geothermal Center 🏢" : "Telecom HQ Skyrise",
              desc: `Representing Nairobi\'s expanding central business district in the ${year}s, where steel and architectural glass symbolize massive capital and service booms.`
            };
            mainGroup.add(bldg);
            clickableObjects.push(bldg);
          }

          // Iconic Decorated Matatu Minibus
          const matatuGroup = new THREE.Group();
          const matBody = new THREE.Mesh(
            new THREE.BoxGeometry(2.8, 1.2, 1.2),
            new THREE.MeshStandardMaterial({ color: 0xffeb3b }) // Vibrant yellow with graffiti art feel
          );
          matBody.position.y = 0.7;
          matatuGroup.add(matBody);

          // Windows
          const winGeo = new THREE.BoxGeometry(2.4, 0.4, 1.25);
          const winMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
          const win = new THREE.Mesh(winGeo, winMat);
          win.position.set(0, 1, 0);
          matatuGroup.add(win);

          matatuGroup.position.set(3, 0.1, 3);
          matatuGroup.name = "Nganya Matatu";
          matatuGroup.userData = {
            title: "Iconic Kenyan 'Nganya' Matatu 🚌",
            desc: "The legendary canvas of Kenyan youth pop culture. These minibuses feature bright hand-graffitied pop star portraits, massive speaker systems, and onboard dynamic wifi grids."
          };
          mainGroup.add(matatuGroup);
          clickableObjects.push(matBody);

          // Naivasha Wind Turbine in distance
          const turbineGroup = new THREE.Group();
          const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.15, 6), new THREE.MeshStandardMaterial({ color: 0xf5f5f5 }));
          pole.position.set(8, 3, -6);
          turbineGroup.add(pole);

          const bladeG = new THREE.Group();
          bladeG.position.set(8, 6, -6);
          for (let b = 0; b < 3; b++) {
            const blade = new THREE.Mesh(new THREE.BoxGeometry(0.15, 2.2, 0.05), new THREE.MeshBasicMaterial({ color: 0xffffff }));
            blade.position.y = 1.1;
            blade.rotation.z = (b * Math.PI * 2) / 3;
            bladeG.add(blade);
          }
          turbineGroup.add(bladeG);
          mainGroup.add(turbineGroup);

          pole.name = "Naivasha Wind Turbine";
          pole.userData = {
            title: "Ngong Hills Renewable Grid ⚡",
            desc: "Beautiful massive wind turbines spinning in Naivasha and Ngong Hills, turning steady rift valley winds into pure zero-emission grid power."
          };
          clickableObjects.push(pole);

          // Animation loop rotation for blades
          let bladeTimer = 0;
          const rotateBlades = () => {
            bladeTimer += 0.04;
            bladeG.rotation.z = bladeTimer;
          };
          // Expose to outer loop via custom function
          (mainGroup as any).customAnim = rotateBlades;

        } else if (year >= 2050) {
          // --- VISUAL AFRO-FUTURISTIC FUTURE MODE (SOLARPUNK & SPACE ELEVATOR) ---
          // Solarpunk vertical bio-towers
          const towerGroup = new THREE.Group();
          const centerGeo = new THREE.CylinderGeometry(1.5, 2.2, 9, 6);
          const centerMat = new THREE.MeshPhongMaterial({
            color: 0x111c15,
            transparent: true,
            opacity: 0.85,
            shininess: 90
          });
          const center = new THREE.Mesh(centerGeo, centerMat);
          center.position.set(-5, 4.5, -4);
          towerGroup.add(center);

          // Glowing neon rings around towers
          const ringG = new THREE.Mesh(
            new THREE.RingGeometry(2.3, 2.4, 32),
            new THREE.MeshBasicMaterial({ color: 0xffd700, side: THREE.DoubleSide })
          );
          ringG.rotation.x = Math.PI / 2;
          ringG.position.set(-5, 6, -4);
          towerGroup.add(ringG);

          // Vertical green terrace boxes
          const boxGeo = new THREE.BoxGeometry(2.8, 0.8, 1.8);
          const boxMat = new THREE.MeshStandardMaterial({ color: 0x1b5e20 }); // Vertical forest foliage
          const b1 = new THREE.Mesh(boxGeo, boxMat);
          b1.position.set(-5, 3, -4);
          towerGroup.add(b1);

          towerGroup.name = "Vertical Bio-Forest";
          towerGroup.userData = {
            title: "Algae-Wrapped Carbon-Absorbing Sky-Spires 🌲🔋",
            desc: "Year 2050+ architecture. Buildings are self-cooling biological skin organisms wrapped in high-yield light-absorbing algae, capturing urban carbon emissions instantly."
          };
          mainGroup.add(towerGroup);
          clickableObjects.push(center);

          // Equatorial Space Elevator Anchor (specifically if 2100)
          if (year === 2100) {
            const cableGeo = new THREE.CylinderGeometry(0.12, 0.12, 18, 8);
            const cableMat = new THREE.MeshBasicMaterial({ color: 0xffd700 }); // Golden nano-cable
            const cable = new THREE.Mesh(cableGeo, cableMat);
            cable.position.set(4, 9, -2);
            mainGroup.add(cable);

            // Space Elevator Base Station
            const baseGeo = new THREE.CylinderGeometry(2, 3, 2, 8);
            const baseMat = new THREE.MeshStandardMaterial({ color: 0x3e2723, roughness: 0.1 });
            const base = new THREE.Mesh(baseGeo, baseMat);
            base.position.set(4, 1, -2);
            mainGroup.add(base);

            // Floating pod climbing elevator
            const podGeo = new THREE.SphereGeometry(0.6, 16, 16);
            const podMat = new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: 0x1B5E20 });
            const pod = new THREE.Mesh(podGeo, podMat);
            pod.position.set(4, 4, -2);
            mainGroup.add(pod);

            base.name = "Mombasa Space Elevator";
            base.userData = {
              title: "Equatorial Space Elevator Base 🚀🌌",
              desc: "Mombasa base anchor. A magnificent carbon-nanotube tether ascending into geostationary orbit, launching green solar-sail spacecraft to deep planetary coordinate nodes."
            };
            clickableObjects.push(base);

            let podHeight = 3;
            let podDir = 1;
            const animateElevator = () => {
              podHeight += 0.05 * podDir;
              if (podHeight > 13 || podHeight < 3) podDir *= -1;
              pod.position.y = podHeight;
            };
            (mainGroup as any).customAnim = animateElevator;
          } else {
            // 2050 Magnetic Hover Transit
            const hoverTrack = new THREE.Mesh(
              new THREE.BoxGeometry(20, 0.1, 0.4),
              new THREE.MeshBasicMaterial({ color: 0x00e676 }) // Green glowing magnetic line
            );
            hoverTrack.position.set(0, 4.5, 4);
            mainGroup.add(hoverTrack);

            const hoverMatatu = new THREE.Mesh(
              new THREE.BoxGeometry(2, 0.8, 0.8),
              new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: 0x1b5e20, shininess: 100 })
            );
            hoverMatatu.position.set(-4, 4.9, 4);
            mainGroup.add(hoverMatatu);

            hoverMatatu.name = "Hover Matatu";
            hoverMatatu.userData = {
              title: "Autonomous Solarpunk Hover Matatu 🚊✨",
              desc: "Zero-friction autonomous transport gliders floating silently on localized magnetic high-altitude rails, powered by remote energy transmission."
            };
            clickableObjects.push(hoverMatatu);

            let hoverX = -8;
            const animateHover = () => {
              hoverX += 0.08;
              if (hoverX > 8) hoverX = -8;
              hoverMatatu.position.x = hoverX;
            };
            (mainGroup as any).customAnim = animateHover;
          }
        }
      };

      buildScene();

      // Mouse handler for Raycasting / Hover info popup
      const onMouseMove = (e: MouseEvent) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(clickableObjects);
        if (intersects.length > 0) {
          // Get the parent group or the mesh name
          let target: THREE.Object3D | null = intersects[0].object;
          while (target && !target.name && target.parent) {
            target = target.parent;
          }
          if (target && target.name) {
            setHoveredInfo(target.name);
          }
        } else {
          setHoveredInfo(null);
        }
      };

      const onCanvasClick = (e: MouseEvent) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(clickableObjects);
        if (intersects.length > 0) {
          let target: THREE.Object3D | null = intersects[0].object;
          while (target && !target.userData?.title && target.parent) {
            target = target.parent;
          }
          if (target && target.userData?.title && onObjectClick) {
            onObjectClick(target.userData.title, target.userData.desc);
          }
        }
      };

      window.addEventListener('mousemove', onMouseMove);
      containerRef.current.onclick = onCanvasClick;

      // Animate Town scene
      let reqId: number;
      const animateScene = () => {
        reqId = requestAnimationFrame(animateScene);

        // Drift main scene slightly for organic look
        mainGroup.rotation.y = Math.sin(Date.now() * 0.00015) * 0.15;

        // Call specific sub-animation (matatus, elevators, turbine blades)
        if ((mainGroup as any).customAnim) {
          (mainGroup as any).customAnim();
        }

        renderer.render(scene, camera);
      };
      animateScene();

      return () => {
        cancelAnimationFrame(reqId);
        window.removeEventListener('mousemove', onMouseMove);
        renderer.dispose();
      };
    }
  }, [mode, year, countyId]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-black">
      {/* 3D Canvas container */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Floating Instructions/Labels Overlay */}
      <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[11px] font-mono text-amber-400 pointer-events-none">
        {mode === 'globe' ? 'CHRONOS QUANTUM GLOBE' : `DYNAMIC METROPOLIS LAB: ${year}`}
      </div>

      <div className="absolute top-4 right-4 z-10 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[11px] font-mono text-emerald-400 pointer-events-none">
        DRAG TO ROTATE • HOVER & CLICK OBJECTS
      </div>

      {hoveredInfo && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-emerald-950/90 backdrop-blur-lg px-4 py-2 rounded-xl border border-emerald-500/30 text-xs font-mono text-emerald-300 animate-pulse pointer-events-none text-center shadow-lg">
          🎯 Inspecting: <span className="text-amber-300 font-bold">{hoveredInfo}</span>
        </div>
      )}
    </div>
  );
}
