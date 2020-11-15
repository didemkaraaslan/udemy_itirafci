import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Comment, Divider, Segment, Label, Icon } from "semantic-ui-react";
import {
  setCurrentCategory,
  likeConfession,
  dislikeConfession,
  addFavorite,
} from "./confessionSlice";
import { pickTagColor } from "../../utils/functions";
import maleAvatar from "../../images/male_avatar.png";
import femaleAvatar from "../../images/female_avatar.png";
import styles from "./confession.module.css";

const Confession = ({ confession }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  const getUserAvatar = (confession) => {
    const gender = confession.user.gender;
    let avatar = gender === "female" ? femaleAvatar : maleAvatar;

    if (confession.shareAs === "user") {
      avatar = confession.user.photoURL ? confession.user.photoURL : avatar;
    }
    return (
      <Comment.Avatar src={avatar} className={styles.confession__avatar} />
    );
  };

  const timeFromNow = (timestamp) => moment(timestamp).fromNow();

  const handleLike = (confession) => {
    dispatch(likeConfession(confession));
  };

  const handleDislike = (confession) => {
    dispatch(dislikeConfession(confession));
  };

  const favoriteConfession = (confession) => {
    dispatch(addFavorite(confession));
  };

  return (
    <Segment loading={!confession} style={{ width: 740 }}>
      <Comment.Group className={styles.comment}>
        <Comment>
          {getUserAvatar(confession)}
          <Comment.Content>
            {confession.shareAs === "user" ? (
              <Comment.Author as="a">{confession.user.username}</Comment.Author>
            ) : (
              <Comment.Author as="a">Anonim</Comment.Author>
            )}
            <Comment.Metadata>
              <span>{timeFromNow(confession.timestamp)}</span>
            </Comment.Metadata>
            <span style={{ position: "absolute", right: "-40px", top: "-7px" }}>
              <Icon
                name={
                  confession.favorites[currentUser.uid] === 1
                    ? "heart"
                    : "heart outline"
                }
                size="large"
                onClick={(e) => favoriteConfession(confession)}
              />
            </span>
            <Comment.Text>{confession.content}</Comment.Text>
            {confession.tags.map((prop, key) => (
              <Label
                key={key}
                as="a"
                basic
                size="tiny"
                color={pickTagColor(prop)}
                onClick={(event, data) => {
                  dispatch(setCurrentCategory(prop));
                }}
              >
                <span>{prop}</span>
              </Label>
            ))}

            <Divider />

            <Comment.Actions>
              <Comment.Action onClick={(e) => handleLike(confession)}>
                <Icon
                  name={
                    confession.feelings[currentUser.uid] === 1
                      ? "thumbs up"
                      : "thumbs up outline"
                  }
                />
                {confession.numberOfLikes}
              </Comment.Action>
              <Comment.Action onClick={(e) => handleDislike(confession)}>
                <Icon
                  name={
                    confession.feelings[currentUser.uid] === -1
                      ? "thumbs up"
                      : "thumbs up outline"
                  }
                />
                {confession.numberOfDislikes}
              </Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </Segment>
  );
};

export default Confession;
