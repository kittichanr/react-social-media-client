import React, { useState } from 'react'
import { Icon, Button, Confirm, Popup } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'

import { FETCH_POSTS_QUERY } from '../utils/graphql'

import MyPopup from '../components/MyPopup'

const DeleteButton = ({ postId, commentId, callback }) => {
    const [confirmOpen, setConfirmOpen] = useState()

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

    const [deletePostOrMutation] = useMutation(mutation, {
        variables: {
            postId,
            commentId
        },
        update(proxy) {
            setConfirmOpen(false);
            if (!commentId) {
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                })
                proxy.writeQuery({
                    query: FETCH_POSTS_QUERY, data: {
                        getPosts: data.getPosts.filter(p => p.id !== postId)
                    }
                })
            }
            if (callback) callback()
        }
    })

    return (
        <>
            <MyPopup content={commentId ? 'Delete comment' : 'Delete post'}>
                <Button as='div' color='red' floated='right' onClick={() => setConfirmOpen(true)}>
                    <Icon name='trash' style={{ margin: 0 }} />
                </Button>
            </MyPopup>
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePostOrMutation}
            />
        </>
    )
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId:ID!){
        deletePost(postId: $postId)
    }
`

const DELETE_COMMENT_MUTATION = gql`
    mutation deletePost($postId:ID!, $commentId:ID!){
        deleteComment(postId: $postId,commentId: $commentId){
            id 
            comments {
                id username createdAt body
            }
            commentCount
        }
    }
`

export default DeleteButton
