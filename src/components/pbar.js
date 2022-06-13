import React from "react";

const Pbar = () => {
  const [progress, setProgress] = React.useState(0);

  const startProcess = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((progress) => {
        if (progress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return progress + 1;
      });
    }, 50);
  };
  return (
    <div className="cont">
      <div className="progress-bar">
        <div
          className="progress-bar-inner"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="pers">
        {progress}%
        <br />
        <button onClick={startProcess} className="startBtn">
          Start Process
        </button>
      </div>
    </div>
  );
};

export default Pbar;
