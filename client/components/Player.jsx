import { useRef, useState } from 'react'

function AudioPlayer() {
  let animationController

  // Create state for audio
  const [file, setFile] = useState(null)
  // create reference for canvas, audio, source and analyzer
  const canvasRef = useRef()
  const audioRef = useRef()
  const source = useRef()
  const analyzer = useRef()

  const handleAudioPlay = () => {
    // Create a new AudioContext
    let audioContext = new AudioContext()
    // Get the audio element
    let mediaElement = audioRef.current
    // check for source
    if (!source.current) {
      source.current = audioContext.createMediaElementSource(mediaElement)
      analyzer.current = audioContext.createAnalyser()
      source.current.connect(analyzer.current)
      analyzer.current.connect(audioContext.destination)
    }
    // Call the visualizeData function
    visualizeData()
  }

  // Function to visualize the audio
  const visualizeData = () => {
    // Request animation frame for continuous visualization
    animationController = window.requestAnimationFrame(visualizeData)
    // If the audio is paused, cancel the animation
    if (audioRef.current.paused) {
      return cancelAnimationFrame(animationController)
    }

    // Create a new Uint8Array to hold the frequency data
    const songData = new Uint8Array(analyzer.current.frequencyBinCount)
    analyzer.current.getByteFrequencyData(songData)
    // Set the width of each bar
    const bar_width = 3
    let start = 0
    // Get the 2d rendering context of the canvas
    const ctx = canvasRef.current.getContext('2d')
    // Clear the canvas before rendering
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    // Loop through the frequency data to render the bars
    for (let i = 0; i < songData.length; i++) {
      start = i * 4
      // Create a gradient for the bar color
      let gradient = ctx.createLinearGradient(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      )
      gradient.addColorStop(0.2, '#2392f5')
      gradient.addColorStop(0.5, '#fe0095')
      gradient.addColorStop(1.0, 'purple')
      ctx.fillStyle = gradient

      // Render the bar on the canvas
      ctx.fillRect(start, canvasRef.current.height, bar_width, -songData[i])
    }
  }

  return (
    <>
      <div className="audio">
        <h1>Audio Player</h1>
        <input
          type="file"
          id="upload-file"
          onChange={({ target: { files } }) => files[0] && setFile(files[0])}
        />
        <label htmlFor="upload-file" className="upload">
          Upload Audio
        </label>
        {file && (
          <>
            <audio
              ref={audioRef}
              onPlay={handleAudioPlay}
              src={window.URL.createObjectURL(file)}
              controls
            >
              <track
                kind="captions"
                src="captions.vtt"
                srcLang="en"
                label="English"
                default
              ></track>
            </audio>
            <p className="filename">{file.name}</p>
          </>
        )}
        <canvas ref={canvasRef} className='visualizer'></canvas>
      </div>
    </>
  )
}

export default AudioPlayer
