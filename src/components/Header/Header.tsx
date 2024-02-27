
type HeaderTextType = {
    headerText: string;
}


function Header({headerText}: HeaderTextType){
    return(
        <header>
            <h1 className="text-green-dark capitalize">{headerText}</h1>
        </header>
    )
}

export default Header;