import { useRef, useState } from 'react'

let animationController

const Player = () => {
  const [file, setFile] = useState(null)
  const canvasRef = useRef()
  const audioRef = useRef()
  const source = useRef()
  const analyzer = useRef()

  const handleAudioPlay = () => {}
  const visualizeData = () => {}

  return (
    <>
      <div className="audio">
        <input
          type="file"
          onChange={({ target: { files } }) => files[0] && setFile(files[0])}
        />
        {file && (
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
        )}
      </div>
    </>
  )
}

export default Player
