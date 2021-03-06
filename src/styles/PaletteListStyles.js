export default {
    root: {
        backgroundColor: 'blue',
        height: '120vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    container: {
        width: "50%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flexWrap: 'wrap'
    },
    nav: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        color: 'white',
        alignItems: 'center',
        "& a": {
            color: 'white'
        }
    },
    palettes: {
        boxSizing: 'border-box',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3,30%)',
        gridGap: '5%'

    }
}