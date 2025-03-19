import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';

const { Meta } = Card;

const App: React.FC = () => (
  <Card
    style={{ width: 500 }}
    cover={
      <img
        alt="example"
        src="https://static.vecteezy.com/system/resources/previews/046/089/653/large_2x/the-protagonists-heroic-deeds-are-met-with-thunderous-applause-and-cheers-as-fans-eagerly-root-for-their-favorite-character-to-triumph-photo.jpg"
      />
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
      title="Card title"
      description="This is the description"
    />
  </Card>
);

export default App;