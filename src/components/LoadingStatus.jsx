import "../css/LoadingStatus.css";

function LoadingStatus() {
  return (
    <div className="loading-container">
      <h2>Loading Cats...</h2>

      <div className="loading-animation">
        <div className="spinner"></div>
      </div>

      {/* <p className="loading-info">
            Please wait while we generate your story...
        </p> */}
    </div>
  );
}

export default LoadingStatus;
