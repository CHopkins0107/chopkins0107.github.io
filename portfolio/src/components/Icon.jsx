import './Icon.css'

const Icon = ({ icon, onClick, style }) => {
  return (
    <div className="icon" onClick={onClick} style={style}>
      <div className="icon-image">
        {icon.image ? (
          <img src={icon.image} alt={icon.name} />
        ) : (
          <div className="icon-placeholder">{icon.name.charAt(0)}</div>
        )}
      </div>
      <div className="icon-label">{icon.name}</div>
    </div>
  )
}

export default Icon
