import React from "react";
import styles from "./profilePanel.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Segment, Icon, Image, Tab } from "semantic-ui-react";
import Owned from "./Owned";
import Liked from "./Liked";
import Favorites from "./Favorites";

const ProfilePanel = ({ closeProfileScreen }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { confessions } = useSelector((state) => state.confessions);
  return (
    <Segment style={{ width: 800 }}>
      <div className={styles.profile__top__area}>
        <button className={styles.backBtn} onClick={() => closeProfileScreen()}>
          <Icon link name="left arrow" />
        </button>
        <Image
          src={currentUser.photoURL}
          circular
          bordered
          className={styles.profile__avatar}
        />
        <span className={styles.profile__user__name}>
          {currentUser.displayName}
        </span>
        <q className={styles.profile__user__biography}>
          You know you are in love when you cant fall asleep because reality
          finally better than your dream.
        </q>
      </div>

      <Tab
        menu={{ secondary: true, pointing: true }}
        panes={[
          {
            menuItem: "İtiraflarım",
            render: () => (
              <Tab.Pane attached={false}>
                <Owned confessions={confessions} currentUser={currentUser} />
              </Tab.Pane>
            ),
          },
          {
            menuItem: "Beğendiklerim",
            render: () => (
              <Tab.Pane attached={false}>
                <Liked confessions={confessions} currentUser={currentUser} />
              </Tab.Pane>
            ),
          },
          {
            menuItem: "Favorilerim",
            render: () => (
              <Tab.Pane attached={false}>
                <Favorites
                  confessions={confessions}
                  currentUser={currentUser}
                />
              </Tab.Pane>
            ),
          },
        ]}
      />
    </Segment>
  );
};

export default ProfilePanel;
