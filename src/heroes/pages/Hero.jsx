import { useMemo } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getHeroById } from "../helpers/getHeroById"
import '../components/HeroCard.css'


export const Hero = () => {

  const { id } = useParams()
  const hero = useMemo(() =>getHeroById(id),[id])

  const navigate = useNavigate()

  const onNavigateBack = () =>{
    navigate(-1);
  }

  if( !hero ){
    return <Navigate to="/marvel"/>
  }
  console.log(hero);

  return (
    <div className="justify-content-center animate__animated animate__slideInLeft">
        <div className="row mx-auto mt-5">
          <div className="col-4">
          <img className="img-thumbnail" src={`../../assets/heroes/${id}.jpg`} alt="Card image cap" />
          </div>
         
          <div className="col-4">
            <h2>{hero.superhero}</h2>
            <small>{hero.characters}</small>
            <hr />
            <h5>{hero.publisher}</h5>
            <p>Primera aparición: <br />{hero.first_appearance}</p>
            {
              (hero.alter_ego !== hero.characters)
              && <p>{hero.characters}</p>
            }
            <hr />
            <button className="btn btn-success" onClick={onNavigateBack}>Atras</button>
          </div>
          
        </div>
    </div>
  )
}
