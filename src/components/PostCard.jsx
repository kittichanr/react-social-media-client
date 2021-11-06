import React, { useContext } from 'react'
import { Card, Icon, Label, Image, Button, Popup } from 'semantic-ui-react'

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Link } from 'react-router-dom'

import { AuthContext } from '../contexts/auth'

import LikeButton from '../components/LikeButton'
import DeleteButton from '../components/DeleteButton'
import MyPopup from '../components/MyPopup'

dayjs.extend(relativeTime);

const PostCard = (props) => {
    const { id, body, createdAt, username, comments, likes, likeCount, commentCount, } = props.post

    const { user } = useContext(AuthContext)

    const commentOnPost = () => {

    }

    return (
        <Card>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/post/${id}`}>{dayjs(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <MyPopup content='Comment on post'>
                    <Button labelPosition='right' as={Link} to={`/post/${id}`}>
                        <Button color='blue' basic onClick={commentOnPost}>
                            <Icon name='comment' />
                        </Button>
                        <Label basic color='blue' pointing='left'>
                            {commentCount}
                        </Label>
                    </Button>
                </MyPopup>
                {user && user.username === username && <DeleteButton postId={id} />}
            </Card.Content>
        </Card>
    )
}

export default PostCard
