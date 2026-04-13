import { useEffect, useRef, useState } from "react";
import { setup, detect } from "../utils/utils";

// cspell: ignore Landmarker
export default function FaceExpression() {
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

  return (
    <div style={{ textAlign: "center" }}>
      <video ref={videoRef} width="500" style={{ borderRadius: "12px" }} />
      <h2>Emotion: {expression}</h2>
      <button
        onClick={() => {
          detect({ faceLandmarkerRef, videoRef, setExpression });
        }}
      >
        Detect expression
      </button>
    </div>
  );
}
