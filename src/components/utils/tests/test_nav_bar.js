import NavBar from '../nav_bar';

const TestNavBar = () => {
    return (
        <div style={{backgroundColor: '#000', height: '100vh'}}>
            <NavBar
                onToHomepage={() => {
                    alert('onToHomepage');
                }}
                onYourRooftop={() => alert('onYourRooftop')}
                onTransaction={() => alert('onYourRooftop')}
                onDocuments={() => alert('onYourRooftop')}
                onAvailablePanels={() => alert('onYourRooftop')}
                onAccount={() => alert('onYourRooftop')}
            ></NavBar>
        </div>
    );
};

export default TestNavBar;
