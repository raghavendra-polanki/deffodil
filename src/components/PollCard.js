import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const PollCard = (props) => {
    console.log(props)
    return(
        <div>
            { props.poll ? (
                <Card >
                    <CardMedia style={{height: 0, paddingTop: '56.25%'}}
                    image={props.poll.media[0]}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        {props.poll.question}
                    </Typography>
                    <Typography component="p">
                        {props.poll.desc}
                    </Typography>
                    </CardContent>
                    <CardActions>
                    <Button size="small" color="primary" href={props.poll.media[0]} target="_blank">
                        Go To Poll
                    </Button>
                    <Button size="small" color="primary" href={'/polls/edit?id='+props.poll.id}>
                        Edit
                    </Button>
                    </CardActions>
                </Card>
            ) : null}
        </div>
    )
}

export default PollCard