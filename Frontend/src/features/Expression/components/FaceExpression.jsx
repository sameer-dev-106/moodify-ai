import { useEffect, useRef, useState } from "react";
import { setup, detect } from "../utils/utils";

// cspell: ignore Landmarker
export default function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const streamRef = useRef(null);
  const [expression, setExpression] = useState("Detecting...");

  useEffect(() => {
    setup({ faceLandmarkerRef, videoRef, streamRef });

    // Store refs in variables for cleanup
    const videoElement = videoRef.current;
    const faceLandmarker = faceLandmarkerRef.current;

    // Cleanup
    return () => {
      if (faceLandmarker) {
        faceLandmarker.close();
      }

      if (videoElement && videoElement.srcObject) {
        videoElement.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  async function handleClick() {
    const Expression = detect({ faceLandmarkerRef, videoRef, setExpression });
    console.log(expression);
    onClick(expression);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <video ref={videoRef} width="500" style={{ borderRadius: "12px" }} />
      <h2>Emotion: {expression}</h2>
      <button onClick={handleClick}>Detect expression</button>
    </div>
  );
}
