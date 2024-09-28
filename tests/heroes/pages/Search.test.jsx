import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { Search } from "../../../src/heroes/pages/Search"

const mockedSetSearchParams = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedSetSearchParams
}))

describe('Pruebas en Search', () => { 

    beforeEach(() => jest.clearAllMocks)

    test('Debe de mostrarse correctamente con valores por defecto', () => { 

        const {container} = render(
            <MemoryRouter>
                <Search/>
            </MemoryRouter>
        )
        expect(container).toMatchSnapshot()
    
     })

    test('Debe de mostrar a batman y el input con el valor del queryString', () => { 

        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Search/>
            </MemoryRouter>
        )

        const input = screen.getByRole('textbox')
        expect(input.value).toBe('batman')

        const img = screen.getByRole('img')
        expect(img.src).toContain('assets/heroes/dc-batman.jpg')

        const alertDanger = screen.getByLabelText('alert-danger')
        expect(alertDanger.style.display).toBe('none') 

    })

    test('Debe de mostrar un error si no se encuentra el hero', () => { 

        render(
            <MemoryRouter initialEntries={['/search?q=gatubela']}>
                <Search/>
            </MemoryRouter>
        )

        const alertDanger = screen.getByLabelText('alert-danger')
        expect(alertDanger.style.display).toBe('') 
    
    })

    test('Debe de llamar el navigate a la pantalla nuevas', () => { 

        render(
            <MemoryRouter initialEntries={['/search']}>
                <Search/>
            </MemoryRouter>
        )

        const input = screen.getByRole('textbox')
        fireEvent.change(input, {target:{name: 'searchText', value: 'superman'}})
        const form = screen.getByLabelText('form')
        fireEvent.submit( form )
        expect( mockedSetSearchParams ).toHaveBeenCalled(); 
        expect( mockedSetSearchParams ).toHaveBeenCalledWith('?q=superman')
        
    
    })

 })