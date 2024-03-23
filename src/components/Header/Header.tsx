
type HeaderTextType = {
    headerText: string;
}


function Header({headerText}: HeaderTextType){
    return(
        <header>
            <h1 className="p-2 text-green-dark capitalize font-bold text-lg">{headerText}</h1>
        </header>
    )
}

export default Header;