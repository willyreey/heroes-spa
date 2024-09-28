import { useLocation, useNavigate } from "react-router-dom"
import queryString from 'query-string'
import { useForm } from "../../hooks/useForm"
import { HeroCard } from "../components"
import { getHeroByName } from "../helpers"

export const Search = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const {q = ''} = queryString.parse(location.search)
  const heroes = getHeroByName(q)


  const onSearchSubmit = (e) => {
    e.preventDefault()
    navigate(`?q=${searchText}`)
  }

  const onNavigateBack = () =>{
    navigate(-1);
  }

  const { searchText, onInputChange} = useForm({
    searchText: q
  })
  return (
    <>
      <hr />
      <div className="row">
        <div className="col-5">
        <h4>Búsqueda</h4>
        <hr />
          <form onSubmit={onSearchSubmit} aria-label="form">
            <input 
              type="text" 
              placeholder="Buscar Héroe" 
              className="form-control" 
              name="searchText" 
              autoComplete="off" 
              value={searchText} 
              onChange={onInputChange}
            />
            <button className="btn btn-primary mt-3">
              Buscar
            </button>
            <button className="btn btn-success mt-3 mx-2" onClick={onNavigateBack}>
              Atras
            </button>
          </form>

        </div>
        
        <div className="col-7">
          <h4>Resultados</h4>
          <hr />
          <div 
            className="alert alert-primary animate__animated animate__fadeIn" 
            style={{ display: q !== '' ? 'none' : ''}}
          >
            Buscar un Héroe
          </div>

          <div 
            className="alert alert-danger animate__animated animate__fadeIn" 
            style={{ display: (heroes.length === 0) && (q.length > 0) ? '' : 'none'}}
            aria-label="alert-danger"
          >
            No se encontro un héroe con el nombre <b>{q}</b>.
          </div>
          <div className="row animate__animated animate__fadeIn">
            {
              heroes.map(hero => (
                <HeroCard key={hero.id} {...hero} />
              ))
            }
          </div>
        </div>
      </div>
    
    </>
  )
}
