import { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [expression, setExpression] = useState("Detecting...");

  const setup = async () => {
    // Load MediaPipe
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm",
    );

    faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
      },
      runningMode: "VIDEO",
      numFaces: 1,
      outputFaceBlendshapes: true,
    });

    // Start Camera
    let stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    await videoRef.current.play();

    detect();
  };

  const detect = () => {
    if (!faceLandmarkerRef.current || !videoRef.current) return;

    const results = faceLandmarkerRef.current.detectForVideo(
      videoRef.current,
      Date.now(),
    );

    if (results.faceBlendshapes.length > 0) {
      const blendshapes = results.faceBlendshapes[0].categories;

      const getScore = (name) =>
        blendshapes.find((b) => b.categoryName === name)?.score || 0;

      const smile =
        (getScore("mouthSmileLeft") + getScore("mouthSmileRight")) / 2;

      const jawOpen = getScore("jawOpen");
      const browDown =
        (getScore("browDownLeft") + getScore("browDownRight")) / 2;
      const frown =
        (getScore("mouthFrownLeft") + getScore("mouthFrownRight")) / 2;

      // Expression Logic
      if (smile > 0.6) {
        setExpression("Happy 😄");
      } else if (jawOpen > 0.6) {
        setExpression("Surprised 😲");
      } else if (browDown > 0.5) {
        setExpression("Angry 😠");
      } else if (frown > 0.001) {
        setExpression("Sad 😢");
      } else {
        setExpression("Neutral 🙂");
      }
    }
  };

  useEffect(() => {
    setup();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <video ref={videoRef} width="500" style={{ borderRadius: "12px" }} />
      <h2>Emotion: {expression}</h2>
      <button onClick={detect}>Deteact expression</button>
    </div>
  );
}
