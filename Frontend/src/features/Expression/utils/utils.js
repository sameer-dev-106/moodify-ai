import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";


export const setup = async ({faceLandmarkerRef, videoRef, streamRef}) => {
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
    streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = streamRef.current;
    await videoRef.current.play();
};

export const detect = ({faceLandmarkerRef, videoRef, setExpression}) => {
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

        let currentExpression = "Neutral";

        // Expression Logic
        if (smile > 0.6) {
            currentExpression = "Happy";
        } else if (jawOpen > 0.6) {
            currentExpression = "Surprised";
        } else if (browDown > 0.5) {
            currentExpression = "Angry";
        } else if (frown > 0.001) {
            currentExpression = "Sad";
        }

        setExpression(currentExpression);

        return currentExpression;
    }
};