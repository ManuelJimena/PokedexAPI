import './Cards.css';

// Definimos un componente de función llamado `Cards`, que recibe tres props: `mostrar`, `pokemon` y `cerrar`
function Cards({ mostrar, pokemon, cerrar }) {

  return (
    // Si `mostrar` es verdadero, mostrar el modal, de lo contrario, ocultarlo
    <div
      className="modal-container"
      onClick={cerrar}
      translate="no"
      // Para mostrar u ocultar, usamos una condición ternaria
      // `mostrar ? 'grid' : 'none'` hace que el modal se muestre si `mostrar` es verdadero
      style={{ display: mostrar ? 'grid' : 'none' }}
    >
      <section className="modal-body">
        {/* El modal muestra la imagen del pokemon, sus tipos, el número de ID y sus estadísticas */}
        {/* La primera sección contiene la imagen del Pokemon */}
        <div className="imagen-container">
          {/* Mostramos la imagen del Pokemon, que se encuentra en la prop `pokemon.imagen` */}
          <img src={pokemon.animation} alt={pokemon.nombre} className="imagen-detalle" />
          <section>
            {/* Esta sección contiene los tipos del Pokemon */}
            {/* Mostramos cada tipo del Pokemon usando un método `map` */}
            {pokemon.tipos?.map((tipo, index) => (
              // Cada tipo es un span que contiene `type` como texto y una clase `tag`
              // Usamos el índice dentro de la función `map` como key
              <span key={index} className={tipo}>
                {tipo}
              </span>
            ))}
          </section>
        </div>
        {/* La segunda sección contiene el nombre del pokemon, su ID, sus habilidades y sus estadísticas */}
        <div className="data">
          {/* Mostramos el nombre del pokemon (contenida en `pokemon.nombre`) */}
          {/* También mostramos su ID (contenida en `pokemon.id`) */}
          <h2 className="titulo">
            {pokemon.nombre} (#{pokemon.id})
          </h2>

          {/* Mostramos las habilidades del Pokemon */}
          {/* Agregamos un título de sección */}
          <h3 className="titulo-seccion">Habilidades</h3>
          {/* Mostramos cada habilidad del Pokemon usando un método `map` */}
          {pokemon.abilities?.map((ability, index) => (
            // Cada habilidad es un span que contiene `ability` como texto y una clase `tag`
            // Usamos el índice dentro de la función `map` como key
            <span key={index} className="tag">
              {ability}
            </span>
          ))}

          {/* Mostramos las estadísticas del Pokemon */}
          {/* Agregamos un título de sección */}
          <h3 className="titulo-seccion">Estadisticas</h3>
          <div className="stats">
            {/* Mostramos cada estadística del Pokemon usando un método `map` */}
            {pokemon.stats?.map((stat, index) => (
              // Cada estadística es una sección que contiene dos span:
              // el primer span contiene la base de la estadística (`stat.base`) y una clase `puntos`
              // el segundo span contiene el nombre de la estadística (`stat.name`)
              // Usamos `stat.name` como key, porque esperamos que cada estadística tenga un nombre único
              <section key={stat.name}>
                <span className="puntos">{stat.base}</span>
                <span>{stat.name}</span>
              </section>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cards;