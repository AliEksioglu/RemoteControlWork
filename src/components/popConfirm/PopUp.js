import { QuestionCircleOutlined, WarningOutlined } from '@ant-design/icons';
import React from 'react';
import { Popconfirm } from 'antd';

function TypeOfIcon(type) {
  switch (type) {
    case "warning":
      return <WarningOutlined
        style={{
          color: 'orange',
          fontSize: "large",
          display: 'flex'
        }}
      />
    case "questions":
      return <QuestionCircleOutlined
        style={{
          color: '#0099FF',
          fontSize: "large",
          display: 'flex'
        }}
      />
  }
}

function PopUp({cancelText = "Hayır",okText = "Evet", type, title, description, children , onConfirm , onCancel = () => {}}) {
  return <Popconfirm
    okButtonProps={{
      className: "bg-green-500",
    }}
    cancelButtonProps={{
      className: "bg-red-500",
      type: "primary"
    }}
    okText={okText}
    cancelText ={cancelText}
    onConfirm={onConfirm}
    onCancel={onCancel}
    title={title}
    description={description}
    icon={TypeOfIcon(type)}
  >
    {children}
  </Popconfirm>

}

export default PopUp;