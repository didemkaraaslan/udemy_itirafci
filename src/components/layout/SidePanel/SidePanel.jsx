import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "semantic-ui-react";
import { setCurrentCategory } from "../../../features/confession/confessionSlice";
import * as Tag from "../../../utils/Tags";

const SidePanel = () => {
  const dispatch = useDispatch();
  const { currentCategory } = useSelector((state) => state.confessions);

  const handleMenuItemClick = (name, event) => {
    event.preventDefault();
    dispatch(setCurrentCategory(name));
  };

  return (
    <Menu
      vertical
      fixed="left"
      pointing
      style={{
        marginTop: 61,
        width: 380,
        fontSize: "1.1rem",
      }}
    >
      {/* Genel Kategoriler */}
      <Menu.Item>
        <Menu.Header>Kategoriler</Menu.Header>
        <Menu.Menu>
          <Menu.Item
            name={Tag.ALL}
            as="a"
            icon="hashtag"
            active={currentCategory === Tag.ALL}
            onClick={(event) => handleMenuItemClick(Tag.ALL, event)}
          />
          <Menu.Item
            name={Tag.REGRET}
            as="a"
            icon="hashtag"
            active={currentCategory === Tag.REGRET}
            onClick={(event) => handleMenuItemClick(Tag.REGRET, event)}
          />
          <Menu.Item
            name={Tag.FIRST_EXPERIENCE}
            as="a"
            icon="hashtag"
            active={currentCategory === Tag.FIRST_EXPERIENCE}
            onClick={(event) =>
              handleMenuItemClick(Tag.FIRST_EXPERIENCE, event)
            }
          />
          <Menu.Item
            name={Tag.SAD}
            as="a"
            icon="hashtag"
            active={currentCategory === Tag.SAD}
            onClick={(event) => handleMenuItemClick(Tag.SAD, event)}
          />
          <Menu.Item
            name={Tag.GUILTY}
            as="a"
            icon="hashtag"
            active={currentCategory === Tag.GUILTY}
            onClick={(event) => handleMenuItemClick(Tag.GUILTY, event)}
          />
          <Menu.Item
            name={Tag.LOVE}
            as="a"
            icon="hashtag"
            active={currentCategory === Tag.LOVE}
            onClick={(event) => handleMenuItemClick(Tag.LOVE, event)}
          />
          <Menu.Item
            name={Tag.HAPPY}
            as="a"
            icon="hashtag"
            active={currentCategory === Tag.HAPPY}
            onClick={(event) => handleMenuItemClick(Tag.HAPPY, event)}
          />
          <Menu.Item
            name={Tag.CHEATING}
            as="a"
            icon="hashtag"
            active={currentCategory === Tag.CHEATING}
            onClick={(event) => handleMenuItemClick(Tag.CHEATING, event)}
          />
          <Menu.Item
            name={Tag.MOCKING}
            as="a"
            icon="hashtag"
            active={currentCategory === Tag.MOCKING}
            onClick={(event) => handleMenuItemClick(Tag.MOCKING, event)}
          />
          <Menu.Item
            name={Tag.SEXUAL_ABUSE}
            as="a"
            icon="hashtag"
            active={currentCategory === Tag.SEXUAL_ABUSE}
            onClick={(event) => handleMenuItemClick(Tag.SEXUAL_ABUSE, event)}
          />
          <Menu.Item
            name={Tag.CONGRATULATIONS}
            as="a"
            icon="hashtag"
            active={currentCategory === Tag.CONGRATULATIONS}
            onClick={(event) => handleMenuItemClick(Tag.CONGRATULATIONS, event)}
          />
        </Menu.Menu>
      </Menu.Item>
      {/* Özel Kategoriler */}
      <Menu.Item>
        <Menu.Header>Özel Kategoriler</Menu.Header>
        <Menu.Menu>
          <Menu.Item
            name={Tag.NOT_ANONYMOUS}
            as="a"
            icon="hashtag"
            active={currentCategory === Tag.NOT_ANONYMOUS}
            onClick={(event) => handleMenuItemClick(Tag.NOT_ANONYMOUS, event)}
          />
          <Menu.Item
            name={Tag.ONLY_ANONYMOUS}
            as="a"
            icon="hashtag"
            active={currentCategory === Tag.ONLY_ANONYMOUS}
            onClick={(event) => handleMenuItemClick(Tag.ONLY_ANONYMOUS, event)}
          />
          <Menu.Item
            name={Tag.MOST_APPROVED}
            as="a"
            icon="hashtag"
            active={currentCategory === Tag.MOST_APPROVED}
            onClick={(event) => handleMenuItemClick(Tag.MOST_APPROVED, event)}
          />
          <Menu.Item
            name={Tag.MOST_JUDGED}
            as="a"
            icon="hashtag"
            active={currentCategory === Tag.MOST_JUDGED}
            onClick={(event) => handleMenuItemClick(Tag.MOST_JUDGED, event)}
          />
        </Menu.Menu>
      </Menu.Item>
    </Menu>
  );
};

export default SidePanel;
