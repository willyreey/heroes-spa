import { useMemo } from "react";
import { HeroCard } from "./";
import { getHeroByPublisher } from "../helpers"


export const HeroList = ({publisher}) => {

    const heroes = useMemo(() =>getHeroByPublisher(publisher),[publisher])
    

  return (
            <div className="row align-items-center">
              {heroes.map(heroe =>
                <HeroCard 
                  key={heroe.id}
                  {...heroe}
                />   
              )}
            </div>
  )
}
