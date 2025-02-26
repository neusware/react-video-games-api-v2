import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"

const getRotationTransition = (duration, from, loop = true) => ({
  from: from,
  to: from + 360,
  ease: "linear",
  duration: duration,
  type: "tween",
  repeat: loop ? Number.POSITIVE_INFINITY : 0,
})

const getTransition = (duration, from) => ({
  rotate: getRotationTransition(duration, from),
  scale: {
    type: "spring",
    damping: 20,
    stiffness: 300,
  },
})

const CircularText = ({ text, spinDuration = 20, onHover = "speedUp", className = "" }) => {
  const letters = Array.from(text)
  const controls = useAnimation()
  const [currentRotation, setCurrentRotation] = useState(0)

  useEffect(() => {
    controls.start({
      rotate: currentRotation + 360,
      scale: 1,
      transition: getTransition(spinDuration, currentRotation),
    })
  }, [spinDuration, controls, currentRotation])

  const handleHoverStart = () => {
    if (!onHover) return
    switch (onHover) {
      case "slowDown":
        controls.start({
          rotate: currentRotation + 360,
          scale: 1,
          transition: getTransition(spinDuration * 2, currentRotation),
        })
        break
      case "speedUp":
        controls.start({
          rotate: currentRotation + 360,
          scale: 1,
          transition: getTransition(spinDuration / 4, currentRotation),
        })
        break
      case "pause":
        controls.start({
          rotate: currentRotation,
          scale: 1,
          transition: {
            rotate: { type: "spring", damping: 20, stiffness: 300 },
            scale: { type: "spring", damping: 20, stiffness: 300 },
          },
        })
        break
      case "goBonkers":
        controls.start({
          rotate: currentRotation + 360,
          scale: 0.8,
          transition: getTransition(spinDuration / 20, currentRotation),
        })
        break
      default:
        break
    }
  }

  const handleHoverEnd = () => {
    controls.start({
      rotate: currentRotation + 360,
      scale: 1,
      transition: getTransition(spinDuration, currentRotation),
    })
  }

  return (
    <motion.div
      initial={{ rotate: 0 }}
      className={`circular-text ${className}`}
      animate={controls}
      onUpdate={(latest) => setCurrentRotation(Number(latest.rotate))}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      style={{ 
        position: "relative", 
        width: "60px", // Ajusta el tamaño del contenedor circular
        height: "60px", // Ajusta el tamaño del contenedor circular
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center" 
      }}
    >
      {letters.map((letter, i) => {
        const angle = (360 / letters.length) * i
        const radius = 35 // Ajusta el radio del círculo
        const x = radius * Math.cos((angle * Math.PI) / 180)
        const y = radius * Math.sin((angle * Math.PI) / 180)
        const transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`

        return (
          <span
            key={i}
            style={{
              position: "absolute",
              transform,
              transformOrigin: "center",
              WebkitTransform: transform,
              fontSize: "12px", // Ajusta el tamaño de la fuente
              fontWeight: "bold", // Hace el texto en negrita
            }}
          >
            {letter}
          </span>
        )
      })}
    </motion.div>
  )
}

export default CircularText