import React, { useEffect, useRef, useState } from "react";
import {
  FilesetResolver,
  FaceLandmarker,
} from "@mediapipe/tasks-vision";

import { useSong } from "../home/hooks/useSong";

const FaceExpression = () => {

  const { handleGetSong } = useSong()
  const videoRef = useRef(null);

  // Latest detected expression
  const latestExpression = useRef("Waiting...");

  const [expression, setExpression] = useState("Waiting...");

  useEffect(() => {
    let faceLandmarker;
    let animationFrameId;

    const getScore = (blendshapes, name) => {
      return (
        blendshapes.find((b) => b.categoryName === name)?.score || 0
      );
    };

    const detectExpression = (blendshapes) => {
      const smileLeft = getScore(blendshapes, "mouthSmileLeft");
      const smileRight = getScore(blendshapes, "mouthSmileRight");

      const jawOpen = getScore(blendshapes, "jawOpen");

      const blinkLeft = getScore(blendshapes, "eyeBlinkLeft");
      const blinkRight = getScore(blendshapes, "eyeBlinkRight");

      const browUp = getScore(blendshapes, "browInnerUp");

      const frownLeft = getScore(blendshapes, "mouthFrownLeft");
      const frownRight = getScore(blendshapes, "mouthFrownRight");

      const browDownLeft = getScore(blendshapes, "browDownLeft");
      const browDownRight = getScore(blendshapes, "browDownRight");

      if (smileLeft > 0.6 && smileRight > 0.6) {
        return "happy";
      }

      if (jawOpen > 0.6 && browUp > 0.5) {
        return "surprised";
      }

      if (blinkLeft > 0.3 && blinkRight > 0.3) {
        return "blink";
      }

      if (frownLeft > 0.3 && frownRight > 0.3) {
        return "sad";
      }

      if (
        browDownLeft > 0.6 &&
        browDownRight > 0.6 &&
        smileLeft < 0.2 &&
        smileRight < 0.2
      ) {
        return "😡 Angry";
      }

      if (
        smileLeft < 0.2 &&
        smileRight < 0.2 &&
        jawOpen < 0.2
      ) {
        return "neutral";
      }

      return "neutral";
    };

    const detect = () => {
      if (!faceLandmarker || !videoRef.current) {
        animationFrameId = requestAnimationFrame(detect);
        return;
      }

      const results = faceLandmarker.detectForVideo(
        videoRef.current,
        performance.now()
      );

      if (results.faceBlendshapes.length > 0) {
        latestExpression.current = detectExpression(
          results.faceBlendshapes[0].categories
        );
      }

      animationFrameId = requestAnimationFrame(detect);
    };

    const initialize = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        videoRef.current.srcObject = stream;
        await videoRef.current.play();

      const vision = await FilesetResolver.forVisionTasks(
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm"
);

        faceLandmarker = await FaceLandmarker.createFromOptions(
          vision,
          {
            baseOptions: {
              modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
            },
            runningMode: "VIDEO",
            numFaces: 1,
            outputFaceBlendshapes: true,
          }
        );

        detect();
      } catch (err) {
        console.error(err);
      }
    };

    initialize();

    return () => {
      cancelAnimationFrame(animationFrameId);

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        width={640}
      />

      <h2>{expression}</h2>

      <button
    onClick={() => {
        const mood = latestExpression.current;

        setExpression(mood);

        if (
            mood === "happy" ||
            mood === "sad" ||
            mood === "surprised" ||
            mood === "neutral" ||
            mood === "blink" 
            
        ) {
            handleGetSong({ mood });
        }
    }}
>
    Detect Mood
</button>
    </div>
  );
};

export default FaceExpression;