import './Cards.css'

function Cards ({mostrar, pokemon, cerrar}) {
  return (
    // Muestra un modal con los detalles del Pokemon si `mostrar` es verdadero, de lo contrario, oculta el modal
    <div className="modal-container" onClick={cerrar} translate="no" style={{ display: mostrar ? 'grid' : 'none' }}>
      <section className="modal-body">
        {/* Muestra la imagen del Pokemon y sus tipos */}
        <div className="imagen-container">
          <img src={pokemon.imagen} alt={pokemon.nombre} className="imagen-detalle" />
          <section>
            {pokemon.types?.map(type => <span className='tag'>{type}</span>)}
          </section>
        </div>
        {/* Muestra el nombre y número de ID del Pokemon, así como sus habilidades y estadísticas */}
        <div className="data">
          <h2 className="titulo">{pokemon.nombre} (#{pokemon.id})</h2>

          <h3 className="titulo-seccion">Habilidades</h3>
          {/* Muestra las habilidades del Pokemon */}
          {pokemon.abilities?.map(ability => <span className='tag'>{ability}</span>)}

          <h3 className="titulo-seccion">Estadisticas</h3>
          <div className='stats'>
            {/* Muestra las estadísticas del Pokemon */}
            {pokemon.stats?.map(stat =>
              <section>
                <span className='puntos'>{stat.base}</span>
                <span>{stat.name}</span>
              </section>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Cards