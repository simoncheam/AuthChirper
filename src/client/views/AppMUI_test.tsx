import React from 'react'
import { Typography, AppBar, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container } from '@material-ui/core'
import { PhotoCamera } from '@mui/icons-material';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import useStyles from '../../styles';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]



const AppMUI_test = () => {
    const classes = useStyles();
    return (
        <>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    < PhotoCamera className={classes.icon} />

                    <Typography variant="h6">
                        Photo Album

                    </Typography>


                </Toolbar>
            </AppBar>
            <main className={classes.container}>
                <div>
                    <Container maxWidth="sm" >

                        <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                            Photo Album
                        </Typography  >

                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Hello everyone, this is a photo album. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate sapiente blanditiis ducimus similique ut distinctio numquam vitae, dolorum soluta, dolore ab quisquam saepe reprehenderit, veritatis aspernatur eius natus. Praesentium, blanditiis.

                        </Typography>

                    </Container>
                </div>
                <div className={classes.buttons}>

                    <Grid container spacing={2} justify="center">
                        <Grid item>
                            <Button variant="contained" color="primary">
                                See my photos
                        </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="primary">
                                Secondary action
                        </Button>
                        </Grid>
                    </Grid>
                </div>
                <Container className={classes.cardGrid} maxWidth='md'>


                    <Grid container spacing={4}>
                        {cards.map((card) => (

                            //this is key for responsive design!
                            <Grid item key={card} xs={12} sm={6} md={4}>  
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://source.unsplash.com/random"
                                        title="Image Title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5">
                                            Heading
                                        </Typography>
                                        <Typography>
                                            This is a media card. Use this section to describe anything.
                                        </Typography>

                                    </CardContent>

                                    <CardActions>
                                        <Button size="small" color="primary">View</Button>
                                        <Button size="small" color="primary">Edit</Button>
                                    </CardActions>



                                </Card>
                            </Grid>

                        ))}






                    </Grid>

                </Container>


                {/* <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button>One</Button>
                    <Button>Two</Button>
                    <Button>Three</Button>
                </ButtonGroup> */}


            </main>
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom >
                    Footer
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" >
                    Something here to give footer a purpose
                </Typography>

            </footer>



        </>
    )
}

export default AppMUI_test
