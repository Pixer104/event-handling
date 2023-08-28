import React, { useState, useRef } from 'react';

const Recording = () => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [videoStream, setVideoStream] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const videoRef = useRef(null);
  const chunksRef = useRef([]);
  
  const startRecording = async () => {
    try {
      const videoStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const combinedStream = new MediaStream([...videoStream.getTracks(), ...audioStream.getTracks()]);

      const mediaRecorder = new MediaRecorder(combinedStream, { mimeType: 'video/webm' });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const recordedBlob = new Blob(chunksRef.current, { type: 'video/webm' });
        const videoURL = URL.createObjectURL(recordedBlob);
        videoRef.current.src = videoURL;
        setRecordedChunks(chunksRef.current);
        chunksRef.current = [];
      };

      setMediaRecorder(mediaRecorder);
      setVideoStream(videoStream);
      setAudioStream(audioStream);
      setRecording(true);
      mediaRecorder.start();
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      videoStream.getTracks().forEach(track => track.stop());
      audioStream.getTracks().forEach(track => track.stop());
      setRecording(false);
    }
  };

  return (
    <div>
      {recording ? (
        <div>
          <video ref={videoRef} controls autoPlay />
          <button onClick={stopRecording}>stop</button>
        </div>
      ) : (
        <button onClick={startRecording}>Start</button>
      )}
    </div>
  );
};

export default Recording;