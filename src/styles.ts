//MUI styling - need to import make styles

import { makeStyles } from '@material-ui/core/styles';

//create hook usestyles = function call called makestyles , inside: pass back callback that return an object that returns all styles
const useStyles = makeStyles((theme) => ({

    container: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6)
    },
    icon: {
        marginRight: '20px'

    },
    buttons: {
        marginTop: '40px'
    },
    cardGrid: {
        padding: '20px 0'

    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'

    },
    cardMedia: {
        paddingTop: '56.25%' //16:9

    },
    cardContent: {
        flexGrow: 1,

    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: '50px 0'
    }



}))

export default useStyles;