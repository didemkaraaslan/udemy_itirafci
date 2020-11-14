import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "semantic-ui-react";
import * as Tag from "../../../utils/Tags";

const SidePanel = () => {
  const dispatch = useDispatch();

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
          <Menu.Item name={Tag.ALL} as="a" icon="hashtag" />
          <Menu.Item name={Tag.REGRET} as="a" icon="hashtag" />
          <Menu.Item name={Tag.FIRST_EXPERIENCE} as="a" icon="hashtag" />
          <Menu.Item name={Tag.SAD} as="a" icon="hashtag" />
          <Menu.Item name={Tag.GUILTY} as="a" icon="hashtag" />
          <Menu.Item name={Tag.LOVE} as="a" icon="hashtag" />
          <Menu.Item name={Tag.HAPPY} as="a" icon="hashtag" />
          <Menu.Item name={Tag.CHEATING} as="a" icon="hashtag" />
          <Menu.Item name={Tag.MOCKING} as="a" icon="hashtag" />
          <Menu.Item name={Tag.SEXUAL_ABUSE} as="a" icon="hashtag" />
          <Menu.Item name={Tag.CONGRATULATIONS} as="a" icon="hashtag" />
        </Menu.Menu>
      </Menu.Item>
      {/* Özel Kategoriler */}
      <Menu.Item>
        <Menu.Header>Özel Kategoriler</Menu.Header>
        <Menu.Menu>
          <Menu.Item name={Tag.NOT_ANONYMOUS} as="a" icon="hashtag" />
          <Menu.Item name={Tag.ONLY_ANONYMOUS} as="a" icon="hashtag" />
          <Menu.Item name={Tag.MOST_APPROVED} as="a" icon="hashtag" />
          <Menu.Item name={Tag.MOST_JUDGED} as="a" icon="hashtag" />
        </Menu.Menu>
      </Menu.Item>
    </Menu>
  );
};

export default SidePanel;
